/**
 * Booking rules for the Pacific Horizon AI Photo Booth.
 *
 * Shared by the /book page (browser) and the availability function
 * (netlify/functions/availability.ts), so both apply the same rules. Keep
 * this file free of `@/` imports and of browser- or Node-only APIs.
 *
 * Values marked DECISION are starting points chosen by engineering, not
 * settled business policy. Confirm or change them before relying on them.
 */

export const booking = {
  /** IANA time zone all dates and times are interpreted in. */
  timeZone: "America/Los_Angeles",
  /** Short label shown next to times in the UI. */
  timeZoneLabel: "Pacific Time",

  // DECISION: how many days ahead a request must be made.
  minLeadDays: 2,

  // DECISION: how far ahead customers can request a date.
  maxAdvanceDays: 365,

  // DECISION: length of a standard booking window offered to customers.
  // Longer or shorter coverage can be requested in the notes.
  eventDurationMinutes: 180,

  // How often a booking window can start (60 = on the hour).
  slotIntervalMinutes: 60,

  // DECISION: earliest event start and latest event end, local time, 24-hour "HH:MM".
  earliestStart: "10:00",
  latestEnd: "23:00",

  // DECISION: time blocked before and after an event for travel, setup, and
  // teardown. A window is shown as open only if this whole span is free.
  setupBufferMinutes: 60,
  teardownBufferMinutes: 60,

  // DECISION: weekdays that are never offered. 0 = Sunday … 6 = Saturday.
  closedWeekdays: [] as readonly number[],
} as const;

/** Shown wherever a price would go. No pricing is configured yet. */
export const quoteLabel = "Request a quote";

export const eventTypes = [
  { id: "wedding", label: "Wedding", description: "Receptions, rehearsal dinners, and after-parties." },
  { id: "corporate", label: "Corporate event", description: "Conferences, company parties, and team events." },
  { id: "private-party", label: "Private party", description: "Birthdays, anniversaries, and celebrations." },
  { id: "school", label: "School / university", description: "Dances, graduations, orientations, and campus events." },
  { id: "brand-activation", label: "Brand activation", description: "Launches, pop-ups, and branded guest experiences." },
  { id: "other", label: "Other", description: "Something else. Tell us about it in the notes." },
] as const;

export const eventSettings = [
  { value: "Indoor", label: "Indoor" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Unknown", label: "Not sure yet" },
] as const;

/**
 * Netlify Forms form name. The field names submitted by the booking flow must
 * match the static blueprint in public/__forms.html, which is what Netlify
 * reads at deploy time.
 */
export const bookingFormName = "event-booking";
export const bookingFormEndpoint = "/__forms.html";
