import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

/** Stagger helper for `.anim-rise` elements. */
export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

const buttonStyles = {
  primary:
    "bg-paper text-ink hover:bg-white",
  secondary:
    "border border-line-strong text-paper hover:border-paper/40 hover:bg-paper/5",
};

export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-200 ${buttonStyles[variant]} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`size-4 transition-transform duration-300 ease-(--ease-out-quint) group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Section heading block: mono index + title + optional intro. */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
  className = "",
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:gap-10 ${className}`}>
      <p className="eyebrow md:col-span-3 md:pt-3">
        {index && <span className="text-signal">{index}</span>}
        {index && <span aria-hidden="true"> / </span>}
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="heading max-w-4xl text-[clamp(2rem,4.2vw,3.5rem)] text-paper">
          {title}
        </h2>
        {intro && <div className="lede mt-6 max-w-2xl">{intro}</div>}
      </div>
    </div>
  );
}

/** Interior-page hero shared by product, about, and contact pages. */
export function PageHero({
  label,
  title,
  intro,
  children,
  aside,
}: {
  label: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <p className="eyebrow anim-rise">{label}</p>
          <h1
            className="display anim-rise mt-6 text-[clamp(2.75rem,7vw,5.75rem)] text-paper"
            style={delay(80)}
          >
            {title}
          </h1>
          {intro && (
            <div
              className="lede anim-rise mt-8 max-w-2xl"
              style={delay(160)}
            >
              {intro}
            </div>
          )}
          {children && (
            <div
              className="anim-rise mt-10 flex flex-wrap gap-3"
              style={delay(240)}
            >
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-rise lg:col-span-5" style={delay(200)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

export function StatusPill({ children, tone = "signal" }: { children: ReactNode; tone?: "signal" | "tide" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper-dim">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${tone === "signal" ? "bg-signal" : "bg-tide"}`}
      />
      {children}
    </span>
  );
}

/** Grid of capability groups used on both product pages. */
export function CapabilityGrid({
  groups,
}: {
  groups: readonly { title: string; items: readonly { name: string; detail: string }[] }[];
}) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${
        groups.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {groups.map((group, gi) => (
        <div key={group.title} className="bg-ink p-6 md:p-8">
          <p className="eyebrow">
            <span className="text-signal">0{gi + 1}</span> {group.title}
          </p>
          <ul className="mt-8 space-y-6">
            {group.items.map((item) => (
              <li key={item.name}>
                <h3 className="text-[0.9375rem] font-medium text-paper">{item.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-mute">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBand({
  title,
  body,
  primary = { href: "/contact", label: "Start a conversation" },
  secondary,
}: {
  title: ReactNode;
  body: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="container-site py-24 md:py-32">
      <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-ink-raised px-6 py-16 md:px-16 md:py-24">
        <div
          aria-hidden="true"
          className="anim-breathe pointer-events-none absolute -bottom-1/2 left-1/2 aspect-square w-[min(56rem,140%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(242_166_90/0.22),transparent)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
        <div className="relative max-w-3xl">
          <h2 id="cta-title" className="heading text-[clamp(2rem,4.5vw,3.75rem)] text-paper">
            {title}
          </h2>
          <div className="lede mt-6 max-w-xl">{body}</div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
