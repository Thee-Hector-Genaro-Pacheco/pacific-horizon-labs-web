import { ButtonLink, delay, StatusPill } from "@/components/ui";

const queueStream = [
  {
    type: "VENDOR REQUEST",
    from: "operations@example-vendor.com",
    subject: "Vendor Equipment Delivery & Site Access Request",
    status: "Draft Staged",
    badge: "Gate Active",
    tone: "text-signal",
  },
  {
    type: "INVOICE",
    from: "billing@example-supplier.com",
    subject: "Updated Invoice & Remittance Terms #4102",
    status: "Summarized",
    badge: "Protected",
    tone: "text-tide",
  },
  {
    type: "SCHEDULING",
    from: "coordinator@example-partner.org",
    subject: "Technical Walkthrough Schedule Request",
    status: "Indexed",
    badge: "Queue Staged",
    tone: "text-paper-dim",
  },
] as const;

export function RisingOpsHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28"
    >
      {/* Background Architectural Grid */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="container-site relative">
        {/* Eyebrow & Status Pills */}
        <div className="anim-rise flex flex-wrap items-center gap-3">
          <StatusPill tone="tide">SUPERVISED OPERATIONS</StatusPill>
          <span className="eyebrow">PACIFIC RISING OPS</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-ink px-2.5 py-0.5 font-mono text-[0.625rem] text-mute uppercase">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            HUMAN IN COMMAND
          </span>
        </div>

        {/* Hero Headline */}
        <h1
          id="hero-title"
          className="display anim-rise mt-6 max-w-[18ch] text-[clamp(2.75rem,7vw,5.75rem)] text-paper"
          style={delay(60)}
        >
          AI operations with a human in command.
        </h1>

        {/* Lede and CTA Buttons */}
        <div
          className="mt-8 grid gap-8 md:grid-cols-12 md:items-end"
          style={delay(120)}
        >
          <p className="lede anim-rise md:col-span-7">
            Pacific Rising Ops handles the cognitive workload of email reading,
            structured classification, thread summarization, and draft
            preparation—while enforcing deterministic human approval gates before
            consequential actions occur.
          </p>

          <div className="anim-rise flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href="#operations-flow">Explore workflow</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to us
            </ButtonLink>
          </div>
        </div>

        {/* System Telemetry Badges Strip */}
        <div
          className="anim-rise mt-10 flex flex-wrap items-center gap-2 sm:gap-4 border-y border-line py-3 font-mono text-[0.625rem] sm:text-[0.6875rem] text-mute"
          style={delay(180)}
        >
          <div className="flex items-center gap-1.5 text-paper">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>INBOX ACTIVE</span>
          </div>
          <span className="text-line-strong">/</span>
          <div className="flex items-center gap-1.5 text-paper">
            <span className="size-2 rounded-full bg-tide" />
            <span>VOICE: IN PROGRESS</span>
          </div>
          <span className="text-line-strong">/</span>
          <div className="flex items-center gap-1.5 text-signal font-medium">
            <span className="size-2 rounded-full bg-signal animate-pulse" />
            <span>APPROVAL REQUIRED</span>
          </div>
          <span className="text-line-strong">/</span>
          <div className="flex items-center gap-1.5 text-mute">
            <span>SEND PATH: APPROVAL REQUIRED</span>
          </div>
        </div>

        {/* Mission Control Operations Console Preview */}
        <div
          className="anim-rise mx-auto mt-12 max-w-5xl md:mt-16"
          style={delay(240)}
        >
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-raised shadow-[0_40px_120px_-50px_rgba(143,179,196,0.3)]">
            {/* Console Titlebar */}
            <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-paper">
                <span className="size-2 rounded-full bg-signal animate-pulse" />
                <span className="uppercase font-semibold">
                  RISING OPS CONSOLE · ACTIVE SUPERVISION
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.625rem] text-mute">
                <span className="rounded bg-black/60 px-2 py-0.5 border border-white/10 hidden sm:inline">
                  GMAIL // VOICE WORKFLOW
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                </span>
              </div>
            </div>

            {/* Console Body: Queue Stream + Active Staged Draft */}
            <div className="grid gap-px bg-line lg:grid-cols-12">
              {/* Left Column: Operational Queue Stream */}
              <div className="bg-ink-raised p-4 sm:p-6 lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between font-mono text-[0.625rem] text-mute">
                  <span className="uppercase tracking-widest text-paper-dim flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Incoming Signal Queue
                  </span>
                  <span className="text-tide font-medium">STREAM ACTIVE · 3 MONITORED</span>
                </div>

                <div className="space-y-2">
                  {queueStream.map((item) => (
                    <div
                      key={item.subject}
                      className="group rounded-xl border border-line bg-ink p-3 space-y-1 transition-all hover:border-line-strong hover:bg-ink-raised/60"
                    >
                      <div className="flex items-center justify-between font-mono text-[0.5625rem]">
                        <span className={`uppercase font-medium ${item.tone}`}>
                          {item.type}
                        </span>
                        <span className="rounded bg-black/50 px-1.5 py-0.5 text-mute border border-white/5">
                          {item.badge}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm font-medium text-paper truncate group-hover:text-white transition-colors">
                        {item.subject}
                      </p>
                      <div className="flex items-center justify-between font-mono text-[0.5625rem] text-mute pt-0.5">
                        <span className="truncate max-w-[14rem]">{item.from}</span>
                        <span className="text-paper-dim">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Approval Boundary */}
              <div className="bg-ink p-4 sm:p-6 lg:col-span-5 flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-line shadow-[inset_0_0_30px_rgba(242,166,90,0.06)]">
                <div>
                  <div className="flex items-center justify-between font-mono text-[0.625rem]">
                    <span className="text-signal uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-signal animate-ping" />
                      Policy Boundary
                    </span>
                    <span className="rounded bg-signal-soft px-1.5 py-0.5 text-signal font-semibold border border-signal/30">
                      HOLD ACTIVE
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm sm:text-base font-semibold text-paper">
                    Draft Reply Staged in Gmail
                  </h3>
                  <p className="mt-1 text-xs text-mute leading-relaxed">
                    A response draft has been generated and saved directly to
                    Gmail Drafts. External transmission is blocked pending human
                    approval.
                  </p>

                  <div className="mt-3 rounded-lg border border-line bg-ink-raised p-2.5 font-mono text-[0.5625rem] space-y-1">
                    <p className="text-mute truncate">
                      TO: operations@example-vendor.com
                    </p>
                    <p className="text-paper-dim truncate">
                      SUBJECT: Re: Vendor Equipment Delivery &amp; Site Access
                    </p>
                    <p className="text-signal font-medium flex items-center gap-1">
                      <span className="size-1 rounded-full bg-signal" />
                      STATE: Awaiting Operator Approval
                    </p>
                  </div>
                </div>

                <div className="border-t border-line pt-3 flex items-center justify-between font-mono text-[0.5625rem] text-mute">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Operator in Command
                  </span>
                  <span>Zero Unattended Sending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
