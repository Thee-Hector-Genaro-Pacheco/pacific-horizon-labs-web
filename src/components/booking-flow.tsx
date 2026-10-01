"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, useSyncExternalStore, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import {
  booking,
  bookingFormEndpoint,
  bookingFormName,
  eventSettings,
  eventTypes,
  quoteLabel,
} from "@/config/booking";
import { contactEmailHref, site } from "@/config/site";
import { bookableRange, bookingWindows, checkDate, todayIn } from "@/lib/booking-schedule";

type Slot = { start: string; end: string; available: boolean };

type Availability =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "live"; slots: Slot[]; mock: boolean }
  | { state: "closed" }
  | { state: "offline"; slots: Slot[] } // live lookup failed; windows are unverified
  | { state: "invalid"; message: string };

type FieldErrors = Partial<
  Record<"event_type" | "event_date" | "preferred_time" | "full_name" | "email" | "phone" | "city" | "guest_count", string>
>;

type ErrorProps = { "aria-invalid": boolean; "aria-describedby": string | undefined };

const tz = booking.timeZone;

const timeFormat = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
const zoneFormat = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" });
// Dates are plain YYYY-MM-DD values; format them at noon UTC so no zone shifts the day.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const formatDate = (date: string) => dateFormat.format(new Date(`${date}T12:00:00Z`));
const zoneName = (iso: string) =>
  zoneFormat.formatToParts(new Date(iso)).find((p) => p.type === "timeZoneName")?.value ?? "";
const formatWindow = (s: { start: string; end: string }) =>
  `${timeFormat.format(new Date(s.start))} – ${timeFormat.format(new Date(s.end))}`;

const dateMessages = {
  invalid: "Enter a valid date.",
  too_soon: `Requests need at least ${booking.minLeadDays} days' notice. Choose a later date, or contact us directly for short-notice events.`,
  too_far: `We take requests up to ${booking.maxAdvanceDays} days ahead. Choose an earlier date.`,
  closed: "We don't offer events on this day of the week. Choose another date.",
} as const;

// "Today" depends on the visitor's clock, so it is read only in the browser.
// The server snapshot is null, which keeps the static HTML hydration-safe.
const noSubscribe = () => () => {};

const field =
  "mt-2 block w-full rounded-xl border border-line-strong bg-ink px-4 py-3 text-[0.9375rem] text-paper placeholder:text-mute/70 transition-colors hover:border-paper/30 focus:border-signal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-signal/70";
const labelStyle = "text-sm font-medium text-paper";
const choiceCard =
  "relative flex cursor-pointer flex-col rounded-xl border border-line-strong bg-ink p-4 transition-colors hover:border-paper/30 has-[:checked]:border-signal has-[:checked]:bg-signal-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal";

export function BookingFlow() {
  const id = useId();
  const router = useRouter();
  const today = useSyncExternalStore(noSubscribe, () => todayIn(tz), () => null);
  const range = today ? bookableRange(today) : null;

  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [availability, setAvailability] = useState<Availability>({ state: "idle" });
  const [slot, setSlot] = useState<Slot | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const request = useRef<AbortController | null>(null);

  const fid = (name: string) => `${id}-${name}`;
  const errorProps = (name: keyof FieldErrors): ErrorProps => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? fid(`${name}-error`) : undefined,
  });

  async function onDateChange(value: string) {
    setDate(value);
    setSlot(null);
    setErrors((e) => ({ ...e, event_date: undefined, preferred_time: undefined }));
    request.current?.abort();

    if (!value) return setAvailability({ state: "idle" });
    const check = checkDate(value, today ?? todayIn(tz));
    if (check === "closed") return setAvailability({ state: "closed" });
    if (check !== "ok") return setAvailability({ state: "invalid", message: dateMessages[check] });

    const controller = new AbortController();
    request.current = controller;
    setAvailability({ state: "loading" });

    const offline = () =>
      setAvailability({
        state: "offline",
        slots: bookingWindows(value, tz).map((w) => ({ ...w, available: true })),
      });

    try {
      const res = await fetch(`/api/availability?date=${encodeURIComponent(value)}`, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      const data = res.headers.get("content-type")?.includes("application/json") ? await res.json() : null;
      if (controller.signal.aborted) return;
      if (res.ok && data?.status === "ok" && Array.isArray(data.slots)) {
        setAvailability({ state: "live", slots: data.slots, mock: data.mock === true });
      } else if (res.ok && data?.status === "closed") {
        setAvailability({ state: "closed" });
      } else if (res.status === 422 && (data?.error === "too_soon" || data?.error === "too_far")) {
        setAvailability({ state: "invalid", message: dateMessages[data.error as "too_soon" | "too_far"] });
      } else {
        offline();
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      offline();
    }
  }

  const slots = availability.state === "live" || availability.state === "offline" ? availability.slots : [];
  const openCount = slots.filter((s) => s.available).length;
  const selectedType = eventTypes.find((t) => t.id === eventType);

  function validate(form: HTMLFormElement): FieldErrors {
    const value = (name: string) => String(new FormData(form).get(name) ?? "").trim();
    const input = (name: string) => form.elements.namedItem(name) as HTMLInputElement | null;
    const next: FieldErrors = {};
    if (!eventType) next.event_type = "Choose an event type.";
    if (!date) next.event_date = "Choose your event date.";
    else if (availability.state === "invalid") next.event_date = availability.message;
    else if (availability.state === "closed") next.event_date = dateMessages.closed;
    if (date && availability.state === "live" && openCount === 0)
      next.preferred_time = "There are no open windows on this date. Choose another date.";
    else if (date && (availability.state === "live" || availability.state === "offline") && !slot)
      next.preferred_time = "Choose a time window.";
    else if (availability.state === "loading") next.preferred_time = "Availability is still loading.";
    if (!value("full_name")) next.full_name = "Enter your full name.";
    if (!value("email") || !input("email")?.validity.valid) next.email = "Enter a valid email address.";
    if (value("phone").replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can reach you at.";
    if (!value("city")) next.city = "Enter the city where the event takes place.";
    const guests = Number(value("guest_count"));
    if (!value("guest_count") || !Number.isInteger(guests) || guests < 1)
      next.guest_count = "Enter an estimated guest count (a whole number).";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    setSubmitError(false);

    const first = Object.keys(found)[0] as keyof FieldErrors | undefined;
    if (first) {
      const target =
        first === "event_type"
          ? form.querySelector<HTMLInputElement>('input[name="event_type_choice"]')
          : first === "preferred_time"
            ? form.querySelector<HTMLInputElement>('input[name="slot_choice"]:not(:disabled)') ??
              document.getElementById(fid("event_date"))
            : document.getElementById(fid(first));
      target?.focus();
      return;
    }

    setSubmitting(true);
    const data = new FormData(form);
    const body = new URLSearchParams();
    // Only the fields declared in public/__forms.html are sent.
    for (const name of [
      "form-name",
      "bot-field",
      "event_type",
      "event_date",
      "preferred_time",
      "availability_status",
      "full_name",
      "email",
      "phone",
      "organization",
      "venue_name",
      "city",
      "guest_count",
      "event_setting",
      "notes",
    ]) {
      body.set(name, String(data.get(name) ?? ""));
    }

    try {
      const res = await fetch(bookingFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/book/thanks");
    } catch {
      setSubmitError(true);
      setSubmitting(false);
    }
  }

  const preferredTime = slot ? `${formatWindow(slot)} ${zoneName(slot.start)}` : "";
  const availabilityStatus =
    availability.state === "live"
      ? availability.mock
        ? "Mock data (development)"
        : "Shown as open on live calendar"
      : availability.state === "offline"
        ? "Not checked (live availability unavailable)"
        : "";

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
      <form onSubmit={onSubmit} noValidate aria-label="Event booking request" className="lg:col-span-8">
        <input type="hidden" name="form-name" value={bookingFormName} />
        <input type="hidden" name="event_type" value={selectedType?.label ?? ""} />
        <input type="hidden" name="event_date" value={date} />
        <input type="hidden" name="preferred_time" value={preferredTime} />
        <input type="hidden" name="availability_status" value={availabilityStatus} />
        <p className="hidden" aria-hidden="true">
          <label>
            Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <Step index="01" id={fid("step-type")} title="What kind of event?">
          <fieldset aria-describedby={errors.event_type ? fid("event_type-error") : undefined}>
            <legend className="sr-only">Event type</legend>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {eventTypes.map((t) => (
                <label key={t.id} className={choiceCard}>
                  <input
                    type="radio"
                    name="event_type_choice"
                    value={t.id}
                    checked={eventType === t.id}
                    onChange={() => {
                      setEventType(t.id);
                      setErrors((e) => ({ ...e, event_type: undefined }));
                    }}
                    className="sr-only"
                  />
                  <span className="text-[0.9375rem] font-medium text-paper">{t.label}</span>
                  <span className="mt-1 text-xs leading-5 text-mute">{t.description}</span>
                  <span className="mt-4 font-mono text-[0.6875rem] tracking-[0.12em] text-paper-dim uppercase">
                    {quoteLabel}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <FieldError id={fid("event_type-error")}>{errors.event_type}</FieldError>
        </Step>

        <Step index="02" id={fid("step-date")} title="When is it?">
          <div className="max-w-sm">
            <label htmlFor={fid("event_date")} className={labelStyle}>
              Event date
            </label>
            <input
              id={fid("event_date")}
              type="date"
              value={date}
              min={range?.min}
              max={range?.max}
              onChange={(e) => onDateChange(e.target.value)}
              className={`${field} [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100`}
              {...errorProps("event_date")}
              aria-describedby={[fid("event_date-hint"), errors.event_date && fid("event_date-error")]
                .filter(Boolean)
                .join(" ")}
            />
          </div>
          <p id={fid("event_date-hint")} className="mt-3 text-sm leading-6 text-mute">
            {range
              ? `Requests are open for ${formatDate(range.min)} through ${formatDate(range.max)}.`
              : `Requests need at least ${booking.minLeadDays} days' notice.`}{" "}
            All times are {booking.timeZoneLabel}.
          </p>
          <FieldError id={fid("event_date-error")}>{errors.event_date}</FieldError>
        </Step>

        <Step index="03" id={fid("step-time")} title="Choose a time window">
          <AvailabilityPanel
            availability={availability}
            date={date}
            openCount={openCount}
            slot={slot}
            hasError={Boolean(errors.preferred_time)}
            errorId={fid("preferred_time-error")}
            onSelect={(s) => {
              setSlot(s);
              setErrors((e) => ({ ...e, preferred_time: undefined }));
            }}
          />
          <FieldError id={fid("preferred_time-error")}>{errors.preferred_time}</FieldError>
        </Step>

        <Step index="04" id={fid("step-details")} title="Tell us about the event">
          <div className="grid gap-7 sm:grid-cols-2">
            <TextField id={fid("full_name")} name="full_name" label="Full name" autoComplete="name" error={errors.full_name} errorProps={errorProps("full_name")} />
            <TextField id={fid("organization")} name="organization" label="Organization" optional autoComplete="organization" />
            <TextField id={fid("email")} name="email" type="email" label="Email" autoComplete="email" error={errors.email} errorProps={errorProps("email")} />
            <TextField id={fid("phone")} name="phone" type="tel" label="Phone" autoComplete="tel" error={errors.phone} errorProps={errorProps("phone")} />
            <TextField id={fid("venue_name")} name="venue_name" label="Venue name" optional />
            <TextField id={fid("city")} name="city" label="City" autoComplete="address-level2" error={errors.city} errorProps={errorProps("city")} />
            <TextField
              id={fid("guest_count")}
              name="guest_count"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              label="Estimated guest count"
              error={errors.guest_count}
              errorProps={errorProps("guest_count")}
            />
            <fieldset>
              <legend className={labelStyle}>Setting</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {eventSettings.map((s) => (
                  <label key={s.value} className={`${choiceCard} items-center justify-center px-2 py-3 text-center`}>
                    <input
                      type="radio"
                      name="event_setting"
                      value={s.value}
                      defaultChecked={s.value === "Unknown"}
                      className="sr-only"
                    />
                    <span className="text-sm text-paper">{s.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="mt-7">
            <label htmlFor={fid("notes")} className={labelStyle}>
              Notes <span className="font-normal text-mute">(optional)</span>
            </label>
            <textarea
              id={fid("notes")}
              name="notes"
              rows={5}
              placeholder="Schedule, branding ideas, space at the venue, or anything else we should know."
              className={`${field} resize-y`}
            />
          </div>
        </Step>

        <div className="border-t border-line pt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 items-center justify-center rounded-full bg-paper px-7 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "Sending request…" : "Request booking"}
            </button>
            <p className="text-xs leading-5 text-mute sm:max-w-sm sm:text-right">
              This sends a request, not a reservation. Your date is not held until we confirm it with
              you. See our{" "}
              <Link href="/privacy" className="text-paper-dim underline underline-offset-2 hover:text-paper">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div role="alert" className="mt-6 empty:hidden">
            {submitError && (
              <p className="rounded-xl border border-signal/40 bg-signal-soft px-4 py-3 text-sm leading-6 text-paper">
                Your request couldn&apos;t be sent. Please try again, or email us at{" "}
                <a href={contactEmailHref} className="underline decoration-signal underline-offset-4">
                  {site.contact.email}
                </a>
                .
              </p>
            )}
            {Object.values(errors).some(Boolean) && (
              <p className="text-sm text-paper-dim">Some details need attention. Check the highlighted fields above.</p>
            )}
          </div>
        </div>
      </form>

      <aside aria-label="Your request" className="lg:col-span-4">
        <div className="rounded-2xl border border-line bg-ink-raised p-7 lg:sticky lg:top-28">
          <p className="eyebrow">Your request</p>
          <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
            <Summary term="Event">{selectedType?.label}</Summary>
            <Summary term="Date">{date && availability.state !== "invalid" ? formatDate(date) : undefined}</Summary>
            <Summary term="Time">{preferredTime || undefined}</Summary>
            <Summary term="Price">{selectedType ? quoteLabel : undefined}</Summary>
          </dl>
          <p className="eyebrow mt-10">How it works</p>
          <ol className="mt-4 space-y-4 text-sm leading-6 text-mute">
            <li className="flex gap-3">
              <span className="font-mono text-signal">01</span>You send a request with your preferred date and time.
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-signal">02</span>We review it and confirm availability and next steps.
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-signal">03</span>Your event is booked only once we confirm it with you.
            </li>
          </ol>
        </div>
      </aside>
    </div>
  );
}

function Step({ index, id, title, children }: { index: string; id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 first-of-type:border-t-0 first-of-type:pt-0">
      <p className="eyebrow">
        <span className="text-signal">{index}</span>
        <span aria-hidden="true"> / </span>
        Step {Number(index)} of 4
      </p>
      <h2 id={id} className="heading mt-3 text-2xl text-paper md:text-3xl">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-3 flex gap-2 text-sm leading-6 text-signal">
      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
      {children}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  optional,
  error,
  errorProps,
  ...input
}: {
  id: string;
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  errorProps?: ErrorProps;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">) {
  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label} {optional && <span className="font-normal text-mute">(optional)</span>}
      </label>
      <input id={id} name={name} className={field} {...input} {...errorProps} />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

function Summary({ term, children }: { term: string; children?: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <dt className="text-mute">{term}</dt>
      <dd className={`text-right ${children ? "text-paper" : "text-mute/60"}`}>{children ?? "—"}</dd>
    </div>
  );
}

function AvailabilityPanel({
  availability,
  date,
  openCount,
  slot,
  hasError,
  errorId,
  onSelect,
}: {
  availability: Availability;
  date: string;
  openCount: number;
  slot: Slot | null;
  hasError: boolean;
  errorId: string;
  onSelect: (slot: Slot) => void;
}) {
  const slots = availability.state === "live" || availability.state === "offline" ? availability.slots : [];

  const status =
    availability.state === "idle"
      ? "Choose a date to see open time windows."
      : availability.state === "loading"
        ? "Checking availability…"
        : availability.state === "live"
          ? openCount > 0
            ? `${openCount} open ${openCount === 1 ? "window" : "windows"} on ${formatDate(date)}.`
            : `No open windows on ${formatDate(date)}. Choose another date.`
          : availability.state === "closed"
            ? "We don't offer events on this day. Choose another date."
            : availability.state === "invalid"
              ? "Choose a date within the booking window."
              : "Live availability is temporarily unavailable. You can still submit an event inquiry and we’ll confirm the date manually.";

  return (
    <div className="rounded-2xl border border-line bg-ink-raised p-5 md:p-6" aria-busy={availability.state === "loading"}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm leading-6 text-paper-dim">
          {status}
        </p>
        {availability.state === "live" && (
          <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-mute uppercase">
            <span aria-hidden="true" className="anim-blink size-1.5 rounded-full bg-tide" />
            {availability.mock ? "Demo data" : "Live calendar"}
          </span>
        )}
      </div>

      {availability.state === "loading" && (
        <div aria-hidden="true" className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="anim-breathe h-[4.25rem] rounded-xl border border-line bg-ink" />
          ))}
        </div>
      )}

      {slots.length > 0 && (
        <fieldset className="mt-5" aria-describedby={hasError ? errorId : undefined}>
          <legend className="sr-only">
            {availability.state === "offline" ? "Preferred time window (not yet checked)" : "Available time windows"}
          </legend>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {slots.map((s) => (
              <label
                key={s.start}
                className={`${choiceCard} ${s.available ? "" : "cursor-not-allowed border-line opacity-45 hover:border-line"}`}
              >
                <input
                  type="radio"
                  name="slot_choice"
                  value={s.start}
                  disabled={!s.available}
                  checked={slot?.start === s.start}
                  onChange={() => onSelect(s)}
                  className="sr-only"
                />
                <span className={`text-[0.9375rem] font-medium tabular-nums ${s.available ? "text-paper" : "text-mute line-through"}`}>
                  {formatWindow(s)}
                </span>
                <span className="mt-1 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-mute uppercase">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${
                      availability.state === "offline" ? "bg-mute" : s.available ? "bg-tide" : "bg-line-strong"
                    }`}
                  />
                  {availability.state === "offline" ? "Preferred" : s.available ? "Open" : "Unavailable"}
                </span>
              </label>
            ))}
          </div>
          {availability.state === "offline" && (
            <p className="mt-4 text-xs leading-5 text-mute">
              These are our standard {booking.eventDurationMinutes / 60}-hour windows. Picking one tells us your
              preference; it doesn&apos;t mean the time is free.
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}
