import Link from "next/link";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { photoBooth, products } from "@/config/products";
import { contactEmailHref, site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Pacific Horizon Labs LLC is an engineering-focused technology company building software, automation, and interactive systems for real-world operations.",
  path: "/about",
});

const practices = [
  {
    title: "We own the whole stack",
    body: "Hardware choices, native apps, back-end services, and the operating procedures around them are designed together, by the same team.",
  },
  {
    title: "We test where it counts",
    body: "A feature is finished when it works at an event or inside a real workflow, not when it works on a development machine.",
  },
  {
    title: "We keep people accountable for outcomes",
    body: "AI and automation do preparation work. Decisions with consequences belong to a person who can be asked about them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the company"
        title="An engineering lab that ships to the real world."
        intro={
          <p>
            {site.legalName} is a technology company that designs and builds software and
            intelligent systems for live events and business operations. We work across native
            apps, applied AI, automation, and the physical hardware those systems run on.
          </p>
        }
      />

      <section aria-labelledby="what-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <SectionHeader
            id="what-title"
            index="01"
            label="What we build"
            title="Products we operate, not prototypes we abandon."
            intro="We currently develop two systems. Both are built in-house and run in real conditions."
          />
          <ul className="mt-16 grid border-t border-line md:mt-20">
            {products.map((p) => (
              <li key={p.href} className="reveal border-b border-line">
                <Link
                  href={p.href}
                  className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-10"
                >
                  <span className="eyebrow md:col-span-3">{p.status}</span>
                  <span className="text-2xl font-medium tracking-tight text-paper transition-colors group-hover:text-signal md:col-span-4 md:text-3xl">
                    {p.name}
                  </span>
                  <span className="text-[0.9375rem] leading-7 text-mute md:col-span-5">{p.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="story-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-3">
            <span className="text-signal">02</span> / Origin
          </p>
          <div className="md:col-span-9">
            <h2 id="story-title" className="heading max-w-3xl text-[clamp(2rem,4.2vw,3.5rem)] text-paper">
              It started with a camera and a single-board computer.
            </h2>
            <div className="lede mt-8 max-w-2xl space-y-5">
              <p>
                The first product began as a Raspberry Pi prototype: a camera, real-time
                augmented-reality effects, and a screen guests could step up to. It was rough, but
                it answered the question that mattered: do people enjoy using this?
              </p>
              <p>
                They did. Running it as a real interactive experience showed what a commercial
                version would need: steadier performance, simpler setup, more reliable hardware,
                and room to grow into new capture modes and delivery options.
              </p>
              <p>
                So we rebuilt it as a native iPadOS application in Swift and SwiftUI. That
                replatforming became the Pacific Horizon AI Photo Booth, and the pattern behind it
                (prototype on real hardware, validate with real people, then commit to the right
                platform) is how we approach everything we build.
              </p>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {photoBooth.evolution.map((e, i) => (
                <li key={e.stage} className="bg-ink-raised p-6">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <p className="mt-4 text-[0.9375rem] font-medium text-paper">{e.title}</p>
                  <p className="mt-1 eyebrow">{e.stage}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="practice-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <SectionHeader
            id="practice-title"
            index="03"
            label="How we work"
            title="Small team, full ownership."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-3">
            {practices.map((p, i) => (
              <li key={p.title} className="reveal bg-ink p-7 md:p-10">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-paper">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-mute">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="facts-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-1">
            <span className="text-signal">04</span> / Company details
          </p>
          <div className="md:col-span-9">
            <h2 id="facts-title" className="sr-only">
              Company details
            </h2>
            <dl className="grid border-t border-line">
              {[
                ["Legal name", site.legalName],
                ["Entity type", "Limited liability company"],
                ["Focus", "Software, applied AI, automation, and interactive systems"],
                ["Products", products.map((p) => p.name).join(" · ")],
              ].map(([term, value]) => (
                <div key={term} className="grid gap-1 border-b border-line py-5 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-sm text-mute">{term}</dt>
                  <dd className="text-[0.9375rem] text-paper sm:col-span-2">{value}</dd>
                </div>
              ))}
              <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm text-mute">Contact</dt>
                <dd className="text-[0.9375rem] text-paper sm:col-span-2">
                  <a
                    href={contactEmailHref}
                    className="underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with Pacific Horizon Labs."
        body="Events, partnerships, vendor relationships, or technology questions all start the same way."
      />
    </>
  );
}
