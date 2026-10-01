import { risingOps } from "@/config/products";

/** The Rising Ops pipeline, with the human approval step called out. */
export function OpsPipeline({ className = "" }: { className?: string }) {
  return (
    <ol className={`relative grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0 ${className}`}>
      {/* Connector line on large screens */}
      <span
        aria-hidden="true"
        className="absolute top-[1.375rem] right-[8%] left-[8%] hidden h-px bg-line-strong lg:block"
      />
      {risingOps.pipeline.map((s, i) => {
        const human = "human" in s && s.human;
        return (
          <li key={s.step} className="relative lg:px-3 lg:text-center">
            <div
              className={`flex items-start gap-4 rounded-xl border p-4 lg:flex-col lg:items-center lg:border-0 lg:bg-transparent lg:p-0 ${
                human ? "border-signal/50 bg-signal-soft" : "border-line bg-ink-raised"
              }`}
            >
              <span
                className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                  human
                    ? "border-signal bg-signal text-ink"
                    : "border-line-strong bg-ink text-paper-dim"
                }`}
              >
                {human ? <PersonIcon /> : `0${i + 1}`}
              </span>
              <div className="lg:mt-5">
                <p className={`text-[0.9375rem] font-medium ${human ? "text-signal" : "text-paper"}`}>
                  {s.step}
                  {human && <span className="sr-only"> (human approval required)</span>}
                </p>
                <p className="mt-1 text-sm leading-6 text-mute">{s.detail}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-5">
      <circle cx="10" cy="7" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 17c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const inbox = [
  { tag: "Inquiry", subject: "Booth availability for a spring event", state: "Draft ready", tone: "signal" },
  { tag: "Vendor", subject: "Updated invoice and payment terms", state: "Summarized", tone: "tide" },
  { tag: "Receipt", subject: "Order confirmation", state: "Filed", tone: "mute" },
  { tag: "Promo", subject: "Seasonal sale ends tonight", state: "Archived", tone: "mute" },
] as const;

const toneClass = {
  signal: "text-signal",
  tide: "text-tide",
  mute: "text-mute",
};

/** Illustrative operator console: classified inbox plus a draft awaiting approval. */
export function OpsConsole({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of the Rising Ops console: incoming emails sorted into categories, with a drafted reply waiting for human approval before it can be sent."
      className={`overflow-hidden rounded-2xl border border-line-strong bg-ink-raised shadow-[0_40px_120px_-50px_rgb(143_179_196/0.3)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <span className="font-mono text-[0.625rem] tracking-[0.14em] text-mute uppercase">Rising Ops · Inbox</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
      </div>

      <ul className="divide-y divide-line">
        {inbox.map((m) => (
          <li key={m.subject} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 px-4 py-3 sm:px-5">
            <span className={`font-mono text-[0.625rem] tracking-[0.12em] uppercase ${toneClass[m.tone]}`}>
              {m.tag}
            </span>
            <span className="truncate text-sm text-paper-dim">{m.subject}</span>
            <span className="font-mono text-[0.625rem] tracking-[0.1em] text-mute uppercase">{m.state}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-line bg-ink p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-signal uppercase">
            Draft · Awaiting approval
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.1em] text-mute uppercase">Not sent</span>
        </div>
        <div className="mt-3 space-y-2" aria-hidden="true">
          <span className="block h-2 w-11/12 rounded-full bg-paper/10" />
          <span className="block h-2 w-4/5 rounded-full bg-paper/10" />
          <span className="block h-2 w-3/5 rounded-full bg-paper/10" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-paper px-3.5 py-1.5 font-medium text-ink">Approve &amp; send</span>
          <span className="rounded-full border border-line-strong px-3.5 py-1.5 text-paper-dim">Edit</span>
          <span className="rounded-full border border-line-strong px-3.5 py-1.5 text-paper-dim">Reject</span>
        </div>
      </div>
    </div>
  );
}
