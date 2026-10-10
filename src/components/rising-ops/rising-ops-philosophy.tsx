import { SectionHeader } from "@/components/ui";

const controlFlow = [
  {
    step: "01",
    label: "INPUT",
    title: "Inbound Signal",
    description: "Gmail messages & threads enter the staged message queue.",
    tone: "border-line bg-ink",
    textColor: "text-paper-dim",
  },
  {
    step: "02",
    label: "ANALYSIS",
    title: "AI Cognitive Workload",
    description: "Thread reconstruction, classification, and summarization.",
    tone: "border-line bg-ink",
    textColor: "text-tide",
  },
  {
    step: "03",
    label: "PROPOSAL",
    title: "Proposed Action",
    description: "Reply drafted in Gmail Drafts; mailbox cleanup plan staged.",
    tone: "border-line bg-ink",
    textColor: "text-paper",
  },
  {
    step: "04",
    label: "GATE",
    title: "Policy Approval Gate",
    description: "Execution halts. External transmission is locked at this boundary.",
    tone: "border-signal/50 bg-signal-soft/30 ring-1 ring-signal/30",
    textColor: "text-signal font-semibold",
    highlight: true,
  },
  {
    step: "05",
    label: "DECISION",
    title: "Human Operator",
    description: "Explicit decision via web console or voice approval response.",
    tone: "border-signal bg-signal-soft ring-1 ring-signal",
    textColor: "text-signal font-bold",
    highlight: true,
  },
  {
    step: "06",
    label: "ACTION",
    title: "Authorized Execution",
    description: "Only human-approved operations proceed; state is recorded in ledger.",
    tone: "border-emerald-500/40 bg-emerald-500/10",
    textColor: "text-emerald-400 font-semibold",
  },
] as const;

const principles = [
  {
    index: "P.01",
    title: "Drafting is cheap. Sending is irreversible.",
    body: "Generating a proposed reply or compiling an inbox cleanup plan carries zero external consequence. Sending an email, moving client records, or modifying threads impacts real business relationships. Rising Ops stages work in drafts and holds external actions until an operator approves.",
  },
  {
    index: "P.02",
    title: "Deterministic state, not probabilistic autonomy.",
    body: "Language models are exceptional at summarizing messy email threads and structuring context, but they should never make consequential business commitments unattended. In Rising Ops, the decision to proceed is gated by deterministic state machines, not probabilistic model output.",
  },
  {
    index: "P.03",
    title: "Auditable operational accountability.",
    body: "Every event—from message ingestion and classification to draft preparation and operator phone verification—is timestamped and tracked. There are no silent background actions; an operator can always trace why a message was flagged, how it was summarized, and who authorized the outcome.",
  },
] as const;

export function RisingOpsPhilosophy() {
  return (
    <section
      aria-labelledby="philosophy-title"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="philosophy-title"
          index="02"
          label="Supervision Philosophy"
          title={
            <>
              AI handles cognitive workload.{" "}
              <span className="text-signal">Humans retain authority.</span>
            </>
          }
          intro="Automation is most valuable when its boundaries are absolute. We deliberately rejected the 'fully autonomous agent' model in favor of a supervised architecture where people make consequential calls."
        />

        {/* Visual Architectural Control Flow Diagram */}
        <div className="mt-16 md:mt-20">
          <div className="rounded-2xl border border-line-strong bg-ink-raised p-5 sm:p-8 md:p-10 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 font-mono text-[0.6875rem] text-mute">
              <span className="uppercase tracking-widest text-paper">
                SUPERVISED CONTROL-FLOW ARCHITECTURE
              </span>
              <span className="text-signal font-medium">
                PROTECTED BOUNDARY ENFORCED
              </span>
            </div>

            {/* Step-by-Step Flow Grid */}
            <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
              {/* Desktop Connecting Hairline with Animated Signal Flow */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-[5%] right-[5%] hidden h-px -translate-y-6 bg-line lg:block overflow-hidden"
              >
                <div className="anim-connector-flow size-full bg-[linear-gradient(90deg,transparent,rgba(242,166,90,0.8),transparent)] [background-size:240px_100%]" />
              </div>

              {controlFlow.map((item) => (
                <div
                  key={item.step}
                  className={`relative flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all hover:border-line-strong ${item.tone} ${
                    "highlight" in item && item.highlight ? "anim-gate-glow" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[0.625rem]">
                      <span className="text-mute">{item.step}</span>
                      <span className={`uppercase font-semibold ${item.textColor}`}>
                        {item.label}
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-paper">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-mute">
                      {item.description}
                    </p>
                  </div>

                  {"highlight" in item && item.highlight && (
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5 font-mono text-[0.5625rem] text-signal border border-signal/30 w-fit">
                      <span className="size-1 rounded-full bg-signal animate-pulse" />
                      HUMAN CHECKPOINT
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Guardrail Callout Banner */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-line bg-ink px-4 py-3 font-mono text-xs text-mute">
              <span className="flex items-center gap-2 text-paper">
                <span className="size-1.5 rounded-full bg-signal" />
                <span>Rule: No external communication sends without human approval.</span>
              </span>
              <span className="text-paper-dim">
                Drafts stay in Gmail Drafts · Send locks enforced
              </span>
            </div>
          </div>
        </div>

        {/* Three Core Principles Cards */}
        <div className="mt-12 md:mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="reveal bg-ink p-7 md:p-10 space-y-3">
              <span className="font-mono text-xs text-signal font-semibold">
                {p.index}
              </span>
              <h3 className="text-lg md:text-xl font-medium tracking-tight text-paper">
                {p.title}
              </h3>
              <p className="text-sm md:text-[0.9375rem] leading-relaxed text-mute">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
