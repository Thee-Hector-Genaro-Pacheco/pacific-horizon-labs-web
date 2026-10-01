"use client";

import { useId, useState, type FormEvent } from "react";
import { inquiryTypes, site } from "@/config/site";

/**
 * V1 contact form with no backend: it composes an email in the visitor's
 * own mail app. Nothing is stored or transmitted by this site.
 */
export function ContactForm() {
  const id = useId();
  const [composed, setComposed] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const type = inquiryTypes.find((t) => t.id === data.get("type"))?.label ?? "General";
    const name = String(data.get("name") ?? "").trim();
    const org = String(data.get("organization") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `[${type}] Inquiry from ${name}${org ? `, ${org}` : ""}`;
    const body = [
      message,
      "",
      "—",
      `Name: ${name}`,
      org ? `Organization: ${org}` : null,
      `Reply to: ${email}`,
      `Inquiry type: ${type}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed(true);
  }

  const field =
    "mt-2 block w-full rounded-xl border border-line-strong bg-ink px-4 py-3 text-[0.9375rem] text-paper placeholder:text-mute/70 transition-colors hover:border-paper/30 focus:border-signal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2";
  const label = "text-sm font-medium text-paper";

  return (
    <form onSubmit={onSubmit} className="space-y-7" aria-describedby={`${id}-note`}>
      <fieldset>
        <legend className={label}>What is this about?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {inquiryTypes.map((t, i) => (
            <label
              key={t.id}
              className="group relative flex cursor-pointer flex-col rounded-xl border border-line-strong bg-ink p-4 transition-colors hover:border-paper/30 has-[:checked]:border-signal has-[:checked]:bg-signal-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal"
            >
              <input
                type="radio"
                name="type"
                value={t.id}
                defaultChecked={i === 0}
                className="sr-only"
              />
              <span className="text-[0.9375rem] font-medium text-paper">{t.label}</span>
              <span className="mt-1 text-xs leading-5 text-mute">{t.description}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-org`} className={label}>
            Organization <span className="font-normal text-mute">(optional)</span>
          </label>
          <input id={`${id}-org`} name="organization" autoComplete="organization" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={label}>
          Your email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          placeholder="For events, include the date, location, and expected guest count."
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-paper px-7 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white"
        >
          Compose email
        </button>
        <p id={`${id}-note`} className="text-xs leading-5 text-mute sm:max-w-xs sm:text-right">
          Opens your email app with this message filled in. Nothing is stored by this website.
        </p>
      </div>

      <p role="status" className="text-sm text-paper-dim empty:hidden">
        {composed && (
          <>
            If your email app didn&apos;t open, write to us directly at{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-paper underline decoration-signal underline-offset-4"
            >
              {site.contact.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
