import Link from "next/link";
import type { ComponentProps } from "react";
import { Arrow, delay } from "@/components/ui";
import { photoBooth } from "@/config/products";
import { faqs, packages, themeOptions } from "@/config/photobooth-experience";
import { FadeReveal } from "./fade-reveal";
import { ThemeArt } from "./placeholder-art";

function PbButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "secondary" }) {
  return (
    <Link {...props} className={`group pb-btn pb-btn-${variant} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

/**
 * Page-specific summary limited to what the iPad app does today. The shared
 * photoBooth.summary in products.ts (used on other pages) also claims event
 * branding, which the app only partly supports.
 */
const heroSummary =
  "An interactive photo booth for live events, built as a native iPadOS app with live face effects, photo and Loop capture, and QR delivery to guests' phones.";

export function PbHero() {
  return (
    <section aria-labelledby="photobooth-hero-title" className="relative pt-24 pb-4 md:pt-40 md:pb-10">
      <div className="container-site">
        <p className="pb-eyebrow anim-rise">AI photo booth rental · Orange County, CA</p>
        <div className="anim-rise mt-5 flex flex-wrap items-center gap-3" style={delay(60)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-(--pb-line) px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--pb-text-dim)">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-(--pb-primary)" />
            {photoBooth.status}
          </span>
          <span className="pb-eyebrow">{photoBooth.platform}</span>
        </div>

        <h1
          id="photobooth-hero-title"
          className="display anim-rise mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,5.75rem)]"
          style={delay(120)}
        >
          Pacific Horizon AI Photo Booth
        </h1>

        <div className="anim-rise mt-8 grid gap-8 md:grid-cols-12 md:items-end" style={delay(180)}>
          <p className="lede text-(--pb-text-dim) md:col-span-7">{heroSummary}</p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <PbButton href="/book">Book an event</PbButton>
            <PbButton href="/contact" variant="secondary">
              Ask a question
            </PbButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ThemePicker() {
  return (
    <section aria-labelledby="themes-title" className="pb-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="themes-title" className="pb-h2">
              Tonight&rsquo;s theme
            </h2>
            <p className="lede mt-5 text-(--pb-text-dim)">
              Before the event, you pick the AI background guests step into. Try one below.
            </p>
          </div>
          {themeOptions.some((t) => !t.src) && (
            <span className="pb-placeholder-tag">Concept art, not final output</span>
          )}
        </div>

        <FadeReveal className="mt-10">
          <fieldset className="pb-themes">
            <legend className="sr-only">Pick a background theme (preview only)</legend>
            {themeOptions.map((t, i) => (
              <label key={t.id} className="pb-theme">
                <input
                  type="radio"
                  name="pb-theme"
                  value={t.id}
                  defaultChecked={i === 0}
                  className="sr-only"
                />
                <div className="pb-theme-art">
                  {t.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.src} alt={t.alt} width={600} height={800} loading="lazy" decoding="async" />
                  ) : (
                    <div role="img" aria-label={t.alt} className="h-full">
                      <ThemeArt themeId={t.id} idPrefix={`theme-${t.id}`} />
                    </div>
                  )}
                  {!t.src && <span className="pb-placeholder-tag">Concept art</span>}
                  <span className="pb-bracket" aria-hidden="true">
                    <span className="pb-corner" />
                    <span className="pb-corner" />
                    <span className="pb-corner" />
                    <span className="pb-corner" />
                  </span>
                </div>
                <span className="pb-theme-name block">{t.name}</span>
                <span className="pb-theme-desc block">{t.description}</span>
              </label>
            ))}
          </fieldset>
        </FadeReveal>
      </div>
    </section>
  );
}

export function Packages() {
  return (
    <section aria-labelledby="packages-title" className="pb-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="packages-title" className="pb-h2">
              Packages and pricing
            </h2>
            <p className="lede mt-5 text-(--pb-text-dim)">
              Every event gets a written quote.
            </p>
          </div>
          <span className="pb-placeholder-tag">Placeholder pricing</span>
        </div>
        <FadeReveal className="mt-10">
          <ul className="grid gap-4 md:grid-cols-3" role="list">
            {packages.map((p, i) => (
              <li key={i} className="pb-card">
                <h3 className="text-lg font-medium">{p.name}</h3>
                <p className="mt-4 text-3xl font-medium tracking-tight">{p.price}</p>
                <p className="pb-eyebrow mt-2">{p.duration}</p>
                <ul className="pb-list mt-6">
                  {p.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </FadeReveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="pb-section border-t border-(--pb-line)">
      <div className="container-site">
        <h2 id="faq-title" className="pb-h2">
          Photo booth rental questions
        </h2>
        <FadeReveal className="mt-10">
          <div className="pb-faq">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}

export function BookingCta() {
  return (
    <section aria-labelledby="book-title" className="container-site pb-24 md:pb-32">
      <div className="pb-card px-6 py-14 md:px-14 md:py-20">
        <h2 id="book-title" className="pb-h2 max-w-3xl">
          Book the booth for your event
        </h2>
        <FadeReveal>
          <p className="lede mt-5 max-w-xl text-(--pb-text-dim)">
            Pick a date, see which time windows are open, and tell us about the venue.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PbButton href="/book">Book an event</PbButton>
            <PbButton href="/contact" variant="secondary">
              Ask a question
            </PbButton>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
}
