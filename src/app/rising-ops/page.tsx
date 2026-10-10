import { CtaBand } from "@/components/ui";
import { RisingOpsArchitecture } from "@/components/rising-ops/rising-ops-architecture";
import { RisingOpsHero } from "@/components/rising-ops/rising-ops-hero";
import { RisingOpsPhilosophy } from "@/components/rising-ops/rising-ops-philosophy";
import { RisingOpsStory } from "@/components/rising-ops/rising-ops-story";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rising Ops",
  description:
    "Pacific Rising Ops is a supervised agentic operations system in development at Pacific Horizon Labs. It reads, classifies, summarizes, and drafts, while people retain authority over consequential actions.",
  path: "/rising-ops",
});

export default function RisingOpsPage() {
  return (
    <>
      {/* SECTION 1: Cinematic Operations Console Hero */}
      <RisingOpsHero />

      {/* SECTION 2: Immersive Operations Story ("From signal to decision") */}
      <RisingOpsStory />

      {/* SECTION 3: Human in Command Philosophy */}
      <RisingOpsPhilosophy />

      {/* SECTION 4 & 5: System Capabilities & Platform Direction */}
      <RisingOpsArchitecture />

      {/* SECTION 6: Operational Status */}
      <section
        aria-labelledby="status-title"
        className="border-t border-line py-24 md:py-32"
      >
        <div className="container-site grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-3">
            <span className="text-signal">05</span> / Status
          </p>
          <div className="md:col-span-9">
            <h2
              id="status-title"
              className="heading max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] text-paper"
            >
              Built for our own operations first.
            </h2>
            <div className="lede mt-6 max-w-2xl space-y-4">
              <p>
                Rising Ops is being developed and proven inside Pacific Horizon
                Labs&apos; own day-to-day operations. It is not an unmonitored
                autonomous bot; it is a supervised system designed to remove
                cognitive overhead while keeping founders and operators firmly in
                command.
              </p>
              <p>
                It is not offered as a commercial mass-market product today. If
                your organization has a high volume of repetitive inbound
                communication that requires strict human oversight, we would like
                to discuss your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Booking / Contact Resolution */}
      <CtaBand
        title="Drowning in repetitive operations?"
        body="Tell us what your team does over and over. We're interested in the workflows that would benefit from this supervised approach."
        primary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}
