import type { Config } from "@netlify/functions";
import { JWT } from "google-auth-library";
import { booking } from "../../src/config/booking";
import { bookingWindows, checkDate, todayIn, type BookingWindow } from "../../src/lib/booking-schedule";

/**
 * GET /api/availability?date=YYYY-MM-DD
 *
 * Returns which standard booking windows on one date are open, based on the
 * booking calendar's free/busy data. Only free/busy is ever requested from
 * Google, and only open/unavailable flags are returned to the browser.
 *
 * Environment (server-side only, never NEXT_PUBLIC_):
 *   GOOGLE_CALENDAR_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL,
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, BOOKING_TIMEZONE (optional),
 *   BOOKING_AVAILABILITY_MODE=mock (optional, never honored in production).
 */

const FREEBUSY_SCOPE = "https://www.googleapis.com/auth/calendar.freebusy";
const FREEBUSY_URL = "https://www.googleapis.com/calendar/v3/freeBusy";
const GOOGLE_TIMEOUT_MS = 8000;

type Busy = { start: number; end: number };
type Slot = BookingWindow & { available: boolean };

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function validTimeZone(tz: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

// Reused across warm invocations so access tokens are cached.
let authClient: JWT | undefined;

async function fetchBusy(timeMin: string, timeMax: string, timeZone: string): Promise<Busy[] | null> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Netlify often stores multi-line keys with literal "\n" sequences.
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!calendarId || !email || !key) return null;

  authClient ??= new JWT({ email, key, scopes: [FREEBUSY_SCOPE] });
  const { token } = await authClient.getAccessToken();
  if (!token) throw new Error("no access token");

  const res = await fetch(FREEBUSY_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, timeZone, items: [{ id: calendarId }] }),
    signal: AbortSignal.timeout(GOOGLE_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`freeBusy HTTP ${res.status}`);

  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>;
  };
  const calendar = data.calendars?.[calendarId];
  // A missing calendar or a per-calendar error (e.g. not shared with the
  // service account) must never be read as "everything is free".
  if (!calendar || calendar.errors?.length) throw new Error("calendar not accessible");

  return (calendar.busy ?? []).map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}

/** Development-only stand-in: deterministic busy block per date. */
function mockBusy(date: string, windows: BookingWindow[]): Busy[] {
  const seed = [...date].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const w = windows[seed % windows.length];
  return seed % 4 === 0 ? [] : [{ start: Date.parse(w.start), end: Date.parse(w.end) }];
}

function markSlots(windows: BookingWindow[], busy: Busy[]): Slot[] {
  const before = booking.setupBufferMinutes * 60_000;
  const after = booking.teardownBufferMinutes * 60_000;
  return windows.map((w) => {
    const from = Date.parse(w.start) - before;
    const to = Date.parse(w.end) + after;
    return { ...w, available: !busy.some((b) => b.start < to && b.end > from) };
  });
}

export default async function handler(req: Request) {
  if (req.method !== "GET") return json({ error: "method_not_allowed" }, 405, { Allow: "GET" });

  const url = new URL(req.url);
  const date = url.searchParams.get("date");
  if ([...url.searchParams.keys()].some((k) => k !== "date")) {
    return json({ error: "unexpected_parameter" }, 400);
  }

  const timeZone = process.env.BOOKING_TIMEZONE || booking.timeZone;
  if (!validTimeZone(timeZone)) {
    console.error("availability: BOOKING_TIMEZONE is not a valid IANA time zone");
    return json({ date, timezone: null, status: "unavailable", reason: "not_configured", slots: [] }, 503);
  }

  const check = checkDate(date, todayIn(timeZone));
  if (check === "invalid") return json({ error: "invalid_date" }, 400);
  if (check === "too_soon" || check === "too_far") return json({ error: check, date, timezone: timeZone }, 422);
  // checkDate narrowed `date` to a valid YYYY-MM-DD string beyond this point.
  const day = date as string;
  if (check === "closed") return json({ date: day, timezone: timeZone, status: "closed", slots: [] });

  const windows = bookingWindows(day, timeZone);
  if (windows.length === 0) return json({ date: day, timezone: timeZone, status: "closed", slots: [] });
  const timeMin = new Date(Date.parse(windows[0].start) - booking.setupBufferMinutes * 60_000).toISOString();
  const timeMax = new Date(
    Date.parse(windows[windows.length - 1].end) + booking.teardownBufferMinutes * 60_000,
  ).toISOString();

  const mock = process.env.BOOKING_AVAILABILITY_MODE === "mock" && process.env.CONTEXT !== "production";
  if (mock) {
    return json({ date: day, timezone: timeZone, status: "ok", mock: true, slots: markSlots(windows, mockBusy(day, windows)) });
  }

  try {
    const busy = await fetchBusy(timeMin, timeMax, timeZone);
    if (!busy) {
      return json({ date: day, timezone: timeZone, status: "unavailable", reason: "not_configured", slots: [] }, 503);
    }
    return json({ date: day, timezone: timeZone, status: "ok", slots: markSlots(windows, busy) });
  } catch (err) {
    // Log only the message: never the key, token, or Google response body.
    console.error("availability: calendar lookup failed:", err instanceof Error ? err.message : "unknown error");
    return json({ date: day, timezone: timeZone, status: "unavailable", reason: "calendar_error", slots: [] }, 503);
  }
}

export const config: Config = {
  path: "/api/availability",
  method: "GET",
  // Each request costs a Google API call; cap per-visitor volume.
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
