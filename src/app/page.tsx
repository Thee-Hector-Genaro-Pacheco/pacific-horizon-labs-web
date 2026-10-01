import type { Metadata } from "next";
import Link from "next/link";
import { BoothVisual } from "@/components/booth-visual";
import { HorizonGraphic } from "@/components/horizon-graphic";
import { OpsConsole } from "@/components/ops-visual";
import { Arrow, ButtonLink, CtaBand, SectionHeader, StatusPill, delay } from "@/components/ui";
import { photoBooth, products, risingOps } from "@/config/products";
import { site } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const disciplines = [
  { name: "Software", detail: "Native apps and services, written and maintained in-house." },
  { name: "Applied AI", detail: "Models used where they help: vision, language, and drafting." },
  { name: "Automation", detail: "Repetitive operations handled consistently, with review built in." },
  { name: "Physical systems", detail: "Cameras, devices, and printers working on site, not in a demo." },
  { name: "Interactive experiences", detail: "Things people walk up to, use, and remember." },
];

const principles = [
  {
    title: "Prototype on real hardware",
    body: "The photo booth started as a Raspberry Pi with a camera, running in front of real guests. Ideas get tested in the conditions they will live in.",
  },
  {
    title: "Rebuild when the platform is wrong",
    body: "When the prototype hit its limits, we moved it to a native iPadOS app instead of patching around it. The right foundation is cheaper than the wrong one.",
  },
  {
    title: "People approve what matters",
    body: "Automation prepares the work. Anything consequential, like a message to a customer, waits for a person to approve it.",
  },
  {
    title: "Run it ourselves first",
    body: "Rising Ops is built to operate our own business before anyone else's. We find the rough edges so customers don't have to.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-50" />
        <div className="container-site flex min-h-[min(100svh,64rem)] flex-col pt-32 md:pt-44">
          <p className="eyebrow anim-rise">
            {site.legalName}
          </p>
          <h1
            id="hero-title"
            className="display anim-rise mt-6 max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] text-paper"
            style={delay(80)}
          >
            Intelligent systems, built to leave the lab.
          </h1>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
            <p className="lede anim-rise md:col-span-6" style={delay(160)}>
              We build software, automation, and interactive experiences that operate in the
              real world: at live events, inside day-to-day business operations, and on hardware
              people actually touch.
            </p>
            <div
              className="anim-rise flex flex-wrap gap-3 md:col-span-6 md:justify-end"
              style={delay(240)}
            >
              <ButtonLink href="#systems">Explore our systems</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            </div>
          </div>
          <div className="relative mt-auto -mx-[clamp(1.25rem,4vw,3rem)] pt-10">
            <HorizonGraphic className="h-[clamp(14rem,38vw,30rem)] w-full" />
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section aria-labelledby="positioning-title" className="border-t border-line py-24 md:py-36">
        <div className="container-site">
          <SectionHeader
            id="positioning-title"
            index="01"
            label="The lab"
            title={
              <>
                A technology company working where software meets{" "}
                <span className="text-mute">physical operations.</span>
              </>
            }
            intro="Pacific Horizon Labs designs and builds its own products end to end. Our work sits at the intersection of five disciplines, and most of what we ship touches more than one."
          />
          <ul className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-5">
            {disciplines.map((d, i) => (
              <li
                key={d.name}
                className="reveal border-b border-line py-8 md:border-r md:border-b-0 md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium tracking-tight text-paper">{d.name}</h3>
                <p className="mt-2 text-sm leading-6 text-mute">{d.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Systems overview */}
      <section id="systems" aria-labelledby="systems-title" className="border-t border-line py-24 md:py-36">
        <div className="container-site">
          <SectionHeader
            id="systems-title"
            index="02"
            label="Systems"
            title="Two systems, one engineering practice."
            intro="Each product is designed, built, and operated by Pacific Horizon Labs."
          />
          <div className="mt-16 grid gap-4 md:mt-20 lg:grid-cols-2">
            {products.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-raised p-7 transition-colors duration-300 hover:border-line-strong md:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <StatusPill tone={i === 0 ? "signal" : "tide"}>{p.status}</StatusPill>
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-mute uppercase">
                    {p.platform}
                  </span>
                </div>
                <h3 className="heading mt-14 text-[clamp(1.75rem,3vw,2.5rem)] text-paper md:mt-20">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-7 text-paper-dim">{p.summary}</p>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-paper">
                  Learn more <span className="sr-only">about {p.name}</span>
                  <Arrow />
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-x-100 ${
                    i === 0 ? "bg-signal" : "bg-tide"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo booth feature */}
      <section aria-labelledby="booth-title" className="overflow-hidden border-t border-line py-24 md:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">
              <span className="text-signal">03</span> / {photoBooth.shortName}
            </p>
            <h2 id="booth-title" className="heading mt-6 text-[clamp(2rem,4.2vw,3.5rem)] text-paper">
              A photo booth that runs like an app, because it is one.
            </h2>
            <p className="lede mt-6">
              The Pacific Horizon AI Photo Booth is a native iPadOS application built in Swift and
              SwiftUI. It tracks faces in real time, applies effects live, and is built to get
              photos and video into guests&apos; hands quickly.
            </p>
            <ul className="mt-10 space-y-3 border-t border-line pt-8">
              {photoBooth.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.9375rem] text-paper-dim">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={photoBooth.href} variant="secondary">
                See the photo booth
              </ButtonLink>
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <BoothVisual />
          </div>
        </div>
      </section>

      {/* Rising Ops feature */}
      <section aria-labelledby="ops-title" className="overflow-hidden border-t border-line py-24 md:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal order-2 lg:order-1 lg:col-span-6">
            <OpsConsole />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">
              <span className="text-signal">04</span> / {risingOps.shortName}
            </p>
            <h2 id="ops-title" className="heading mt-6 text-[clamp(2rem,4.2vw,3.5rem)] text-paper">
              Automation that drafts. People who decide.
            </h2>
            <p className="lede mt-6">
              Pacific Rising Ops reads incoming business email, sorts it, summarizes it, and
              prepares replies. Nothing consequential goes out until a person approves it.
            </p>
            <ul className="mt-10 space-y-3 border-t border-line pt-8">
              {risingOps.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.9375rem] text-paper-dim">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-tide" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={risingOps.href} variant="secondary">
                See Rising Ops
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering philosophy */}
      <section aria-labelledby="principles-title" className="border-t border-line py-24 md:py-36">
        <div className="container-site">
          <SectionHeader
            id="principles-title"
            index="05"
            label="How we build"
            title="Systems earn trust in the field, not on a slide."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal bg-ink p-7 md:p-10">
                <span className="font-mono text-xs text-signal">P.0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-paper md:text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-7 text-mute">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Bring us an event, a workflow, or a hard problem."
        body="Booking the photo booth, exploring a partnership, or asking about our technology: start with a short note and we'll take it from there."
        secondary={{ href: "/about", label: "About the company" }}
      />
    </>
  );
}
