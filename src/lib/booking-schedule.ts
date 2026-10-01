/**
 * Date and booking-window math shared by the /book page and the availability
 * function. Uses relative imports (not `@/`) so the Netlify Functions bundler
 * can resolve it, and only standard `Intl`/`Date` APIs.
 */
import { booking } from "../config/booking";

export type BookingWindow = { start: string; end: string };
export type DateCheck = "ok" | "invalid" | "too_soon" | "too_far" | "closed";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value: string | null | undefined): value is string {
  if (!value || !ISO_DATE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/** Today's date (YYYY-MM-DD) in the given time zone. */
export function todayIn(timeZone: string, now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** First and last requestable dates, given today's date. */
export function bookableRange(today: string) {
  return {
    min: addDays(today, booking.minLeadDays),
    max: addDays(today, booking.maxAdvanceDays),
  };
}

export function checkDate(date: string | null | undefined, today: string): DateCheck {
  if (!isIsoDate(date)) return "invalid";
  const { min, max } = bookableRange(today);
  // ISO dates compare correctly as strings.
  if (date < min) return "too_soon";
  if (date > max) return "too_far";
  if (booking.closedWeekdays.includes(new Date(`${date}T00:00:00Z`).getUTCDay())) return "closed";
  return "ok";
}

/** Milliseconds the zone is ahead of UTC at a given instant. */
function zoneOffset(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(instant));
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value);
  const wall = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return wall - Math.floor(instant / 1000) * 1000;
}

/** UTC instant for a local wall-clock time: `minutes` after midnight on `date` in `timeZone`. */
export function zonedInstant(date: string, minutes: number, timeZone: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const wall = Date.UTC(y, m - 1, d, 0, minutes);
  const first = wall - zoneOffset(wall, timeZone);
  // Second pass corrects for a DST change between the guess and the answer.
  return wall - zoneOffset(first, timeZone);
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Every standard booking window on a date, per the rules in config/booking. */
export function bookingWindows(date: string, timeZone: string): BookingWindow[] {
  const windows: BookingWindow[] = [];
  const lastStart = toMinutes(booking.latestEnd) - booking.eventDurationMinutes;
  for (let m = toMinutes(booking.earliestStart); m <= lastStart; m += booking.slotIntervalMinutes) {
    windows.push({
      start: new Date(zonedInstant(date, m, timeZone)).toISOString(),
      end: new Date(zonedInstant(date, m + booking.eventDurationMinutes, timeZone)).toISOString(),
    });
  }
  return windows;
}
