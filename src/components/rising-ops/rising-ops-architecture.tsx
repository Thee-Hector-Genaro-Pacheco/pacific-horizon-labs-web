import { SectionHeader } from "@/components/ui";

const builtCapabilities = [
  {
    domain: "01 / INGESTION & CONTEXT",
    title: "Gmail Message Intelligence",
    badge: "BUILT TODAY",
    summary:
      "Direct integration with Gmail to index incoming business mail without cloud duplication.",
    items: [
      {
        name: "Thread Context Reconstruction",
        detail: "Traverses complete conversation history so replies consider prior commitments.",
      },
      {
        name: "Structured Classification",
        detail: "Distinguishes client inquiries, vendor terms, payment receipts, and clutter.",
      },
      {
        name: "Executive Summarization",
        detail: "Extracts core intent and action items into high-density operator briefings.",
      },
    ],
  },
  {
    domain: "02 / STAGING & SAFETY",
    title: "Draft Preparation & Send Locks",
    badge: "BUILT TODAY",
    summary:
      "Responses are drafted and placed into Gmail Drafts without automated send capabilities.",
    items: [
      {
        name: "Gmail Draft Placement",
        detail: "Replies are generated directly into Gmail Drafts for review in the operator's client.",
      },
      {
        name: "Separately Controlled Transmission",
        detail: "Current workflow does not automatically send approved drafts; email transmission remains separately controlled.",
      },
      {
        name: "Account Safeguards",
        detail: "Scoped permissions ensure the system operates strictly within designated mailbox boundaries.",
      },
    ],
  },
  {
    domain: "03 / SUPERVISION & VOICE",
    title: "Approval State & Voice Workflow",
    badge: "BUILT TODAY",
    summary:
      "A deterministic state machine halts operations until an affirmative human decision is captured, with tested voice approval logic.",
    items: [
      {
        name: "Deterministic State Machine",
        detail: "Every staged action holds in Pending until an explicit Approve or Reject is stored.",
      },
      {
        name: "Voice Approval Workflow",
        detail: "Implemented voice approval logic designed for phone briefings with keypad (DTMF) decision capture; live connection in progress.",
      },
      {
        name: "Decision Recording",
        detail: "Records operator identity and authorization state with audit timestamps.",
      },
    ],
  },
  {
    domain: "04 / HYGIENE & AUDITING",
    title: "Mailbox Cleanup & Auditability",
    badge: "BUILT TODAY",
    summary:
      "A six-stage safe hygiene pipeline and verifiable state trace of every analysis and decision.",
    items: [
      {
        name: "Six-Stage Cleanup Pipeline",
        detail: "Scan → Plan → Review → Approve → Dry Run → Trash ensures zero blind deletions.",
      },
      {
        name: "Protected-Message Safeguards",
        detail: "Invoices, contracts, and designated protected messages remain untouched.",
      },
      {
        name: "Chronological Operational Ledger",
        detail: "Maintains an accountable, verifiable trace of message classification and approval records.",
      },
    ],
  },
] as const;

const plannedRoadmap = [
  {
    status: "PLANNED // ROADMAP",
    title: "Multi-Channel Notification Bridges",
    description:
      "Extending approval dispatch from phone notifications to secure SMS and operator Slack channels.",
  },
  {
    status: "PLANNED // ROADMAP",
    title: "Multi-Mailbox Tenant Clustering",
    description:
      "Coordinating inbound routing across multiple department aliases while preserving strict per-mailbox data isolation.",
  },
  {
    status: "PLANNED // ROADMAP",
    title: "Specialized Back-Office Connectors",
    description:
      "Staging proposals across calendar schedulers and back-office order tracking tools behind the same human approval gate.",
  },
] as const;

export function RisingOpsArchitecture() {
  return (
    <section
      aria-labelledby="capabilities-title"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="capabilities-title"
          index="03"
          label="System Architecture"
          title="What the system is built to do."
          intro="Current architecture centers on Gmail intelligence, strict non-sending draft placement, deterministic approval gates, and tested voice approval workflows."
        />

        {/* BUILT TODAY: 4 Operational Domains */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 md:mt-20">
          {builtCapabilities.map((cap) => (
            <div
              key={cap.domain}
              className="rounded-2xl border border-line bg-ink-raised p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-colors hover:border-line-strong"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[0.625rem]">
                  <span className="text-signal uppercase tracking-widest font-semibold">
                    {cap.domain}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400 border border-emerald-500/20">
                    <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                    {cap.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-medium tracking-tight text-paper">
                  {cap.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {cap.summary}
                </p>

                <div className="mt-6 space-y-3.5 border-t border-line pt-5">
                  {cap.items.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <p className="text-sm font-medium text-paper-dim flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-signal" />
                        <span>{item.name}</span>
                      </p>
                      <p className="text-xs leading-relaxed text-mute pl-3.5">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PLATFORM DIRECTION: Clearly Labeled Roadmap */}
        <div className="mt-20 md:mt-28 rounded-2xl border border-line-strong bg-ink p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
            <div>
              <p className="eyebrow text-tide">04 / Future Evolution</p>
              <h3 className="heading text-xl sm:text-2xl text-paper mt-1">
                Platform Direction
              </h3>
            </div>
            <span className="rounded-full border border-line bg-ink-raised px-3 py-1 font-mono text-xs text-mute uppercase tracking-widest">
              Explicitly Labeled Roadmap
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm sm:text-base text-mute leading-relaxed">
            These features represent active research directions at Pacific Horizon Labs.
            They are not claimed as current production capabilities.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {plannedRoadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-line bg-ink-raised p-5 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[0.5625rem] text-tide border border-tide/20 uppercase font-medium">
                    {item.status}
                  </span>
                  <h4 className="mt-2 text-sm sm:text-base font-medium text-paper">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-mute">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
