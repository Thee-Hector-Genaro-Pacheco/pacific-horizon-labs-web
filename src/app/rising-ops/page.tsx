import { OpsConsole, OpsPipeline } from "@/components/ops-visual";
import { CapabilityGrid, CtaBand, PageHero, SectionHeader, StatusPill } from "@/components/ui";
import { risingOps } from "@/config/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rising Ops",
  description:
    "Pacific Rising Ops is an operations automation system in development at Pacific Horizon Labs. It classifies, summarizes, and drafts, while people approve consequential actions.",
  path: "/rising-ops",
});

const commitments = [
  {
    title: "Approval before consequence",
    body: "Drafting a reply is cheap to undo. Sending one isn't. Rising Ops holds important outgoing communication until a person approves it.",
  },
  {
    title: "Visible work",
    body: "Classifications, summaries, and drafts are shown to the operator, so it's clear what the system did and why something is waiting.",
  },
  {
    title: "Narrow before broad",
    body: "Low-risk housekeeping like labeling and promotional cleanup is automated first. Higher-stakes actions stay behind review.",
  },
];

export default function RisingOpsPage() {
  return (
    <>
      <PageHero
        label={
          <span className="inline-flex flex-wrap items-center gap-3">
            <StatusPill tone="tide">{risingOps.status}</StatusPill>
            <span>{risingOps.platform}</span>
          </span>
        }
        title="Pacific Rising Ops"
        intro={
          <p>
            An intelligent operations system that handles the repetitive parts of running a
            business: reading, sorting, summarizing, and drafting. People stay in control of
            what actually gets sent.
          </p>
        }
        aside={<OpsConsole />}
      />

      <section aria-labelledby="flow-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <SectionHeader
            id="flow-title"
            index="01"
            label="How it works"
            title={
              <>
                Five steps of automation. <span className="text-signal">One human checkpoint.</span>
              </>
            }
            intro="Every incoming message follows the same path. The approval step sits between drafting and sending, and it isn't optional for consequential communication."
          />
          <div className="mt-16 md:mt-24">
            <OpsPipeline />
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <SectionHeader
            id="capabilities-title"
            index="02"
            label="Architecture"
            title="What the system is built to do."
            intro="Current architecture centers on email, with voice operations through Twilio in development."
          />
          <div className="mt-16 md:mt-20">
            <CapabilityGrid groups={risingOps.capabilities} />
          </div>
        </div>
      </section>

      <section aria-labelledby="commitments-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site">
          <SectionHeader
            id="commitments-title"
            index="03"
            label="Human in the loop"
            title="Not autonomous, on purpose."
            intro="Automation is most useful when you can trust it. These are the rules Rising Ops is designed around."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-3">
            {commitments.map((c, i) => (
              <li key={c.title} className="reveal bg-ink p-7 md:p-10">
                <span className="font-mono text-xs text-tide">R.0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-paper">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-mute">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="status-title" className="border-t border-line py-24 md:py-32">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-3">
            <span className="text-signal">04</span> / Status
          </p>
          <div className="md:col-span-9">
            <h2 id="status-title" className="heading max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] text-paper">
              Built for our own operations first.
            </h2>
            <p className="lede mt-6 max-w-2xl">
              Rising Ops is in active development and is being used initially to run Pacific
              Horizon Labs&apos; own business workflows. It isn&apos;t offered as a commercial
              product yet. If your business has the same kind of operational load, we&apos;d like
              to hear about it.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Drowning in repetitive operations?"
        body="Tell us what your team does over and over. We're interested in the workflows that would benefit from this approach."
        primary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}
