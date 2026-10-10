import { CapabilityGrid, SectionHeader } from "@/components/ui";
import { photoBooth } from "@/config/products";

const whyIpad = [
  {
    title: "Portability",
    body: "One device holds the camera, the screen, and the software. Setup is lighter and faster than a computer, camera, and display wired together.",
  },
  {
    title: "Performance",
    body: "A native Swift app has direct access to the camera pipeline and GPU, so effects stay smooth while tracking several faces at once.",
  },
  {
    title: "Reliability",
    body: "Fewer components means fewer failure points at an event, where there is no time to troubleshoot cables or drivers.",
  },
  {
    title: "Commercial readiness",
    body: "A maintained, updatable application is a foundation for repeatable operation across many events, not a one-off build.",
  },
];

export function PhotoboothEngineering() {
  return (
    <>
      {/* SECTION 4A: Core Technical Capabilities */}
      <section
        aria-labelledby="engineering-capabilities-title"
        className="border-t border-line py-24 md:py-32"
      >
        <div className="container-site">
          <SectionHeader
            id="engineering-capabilities-title"
            index="03"
            label="Engineering Pipeline"
            title="Real hardware. Native code. Zero cloud latency."
            intro={
              <p>
                The platform covers the full guest loop, from the moment someone steps in front
                of the camera to the moment they have their media. Effects, face tracking, and
                frame composition execute locally on device.
              </p>
            }
          />
          <div className="mt-16 md:mt-20">
            <CapabilityGrid groups={photoBooth.capabilities} />
          </div>
        </div>
      </section>

      {/* SECTION 4B: Evolution Timeline */}
      <section
        aria-labelledby="evolution-title"
        className="border-t border-line py-24 md:py-32"
      >
        <div className="container-site">
          <SectionHeader
            id="evolution-title"
            index="04"
            label="Evolution"
            title="From a Raspberry Pi prototype to a native iPad platform."
            intro="The booth was proven with real guests before it was engineered for commercial deployment."
          />
          <ol className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-0">
            <span
              aria-hidden="true"
              className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-line-strong via-line-strong to-signal md:block"
            />
            {photoBooth.evolution.map((e, i) => (
              <li key={e.stage} className="reveal relative pl-8 md:pl-0 md:pr-10">
                <span
                  aria-hidden="true"
                  className={`absolute top-0.5 left-0 size-3.5 rounded-full border-2 md:relative md:block ${
                    i === photoBooth.evolution.length - 1
                      ? "border-signal bg-signal"
                      : "border-line-strong bg-ink"
                  }`}
                />
                {i < photoBooth.evolution.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-5 bottom-[-2.5rem] left-[0.4375rem] w-px bg-line-strong md:hidden"
                  />
                )}
                <p className="eyebrow md:mt-8">
                  <span className="text-signal">0{i + 1}</span> {e.stage}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-paper">{e.title}</h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-7 text-mute">{e.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 4C: Why iPadOS Hardware Architecture */}
      <section
        aria-labelledby="why-title"
        className="border-t border-line py-24 md:py-32"
      >
        <div className="container-site">
          <SectionHeader
            id="why-title"
            index="05"
            label="Hardware Choice"
            title="The right platform for a machine people walk up to."
          />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {whyIpad.map((w) => (
              <li key={w.title} className="reveal bg-ink p-7 md:p-8">
                <h3 className="text-lg font-medium tracking-tight text-paper">{w.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mute">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4D: Connected QR Delivery Infrastructure */}
      <section
        aria-labelledby="social-title"
        className="border-t border-line py-24 md:py-32"
      >
        <div className="container-site grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-3">
            <span className="text-signal">06</span> / Guest Handoff
          </p>
          <div className="md:col-span-9">
            <h2 id="social-title" className="heading max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] text-paper">
              The QR code is a link, not a dead end.
            </h2>
            <div className="lede mt-6 max-w-2xl space-y-4">
              <p>
                Guests scan a code on screen to continue on their own phone. Today that flow can
                direct guests to the Pacific Horizon Labs Instagram profile, and the same
                mechanism supports event-specific destinations and digital delivery.
              </p>
              <p>
                Codes can point to a stable address on this site, so the destination can change
                without reprinting anything.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
