"use client";

type RisingOpsStageVisualProps = {
  activeIndex: number;
  chapterProgress?: number;
  isReducedMotion: boolean;
};

export function RisingOpsStageVisual({
  activeIndex,
  isReducedMotion,
}: RisingOpsStageVisualProps) {
  const step = Math.min(Math.max(activeIndex, 0), 6);
  const transitionClass = isReducedMotion
    ? "transition-none"
    : "transition-all duration-500 ease-out";

  return (
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl select-none">
      {/* Console Chassis: Technical mission-control enclosure */}
      <div className="relative rounded-[1.5rem] sm:rounded-[2rem] border border-line-strong bg-[#06080b] p-3 sm:p-4 md:p-5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_40px_-15px_rgba(143,179,196,0.12)]">
        {/* Chassis Top Bar */}
        <div className="mb-2.5 sm:mb-3 flex items-center justify-between border-b border-line pb-2.5 font-mono text-[0.5625rem] sm:text-[0.625rem] text-mute">
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                step === 3
                  ? "bg-signal animate-ping"
                  : step === 4
                  ? "bg-tide animate-pulse"
                  : "bg-emerald-400/80 animate-pulse"
              }`}
            />
            <span className="tracking-[0.16em] uppercase text-paper font-semibold">
              PACIFIC RISING OPS
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-paper-dim hidden sm:inline">
              SUPERVISED OPERATIONAL GATE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-ink px-2 py-0.5 border border-line font-medium text-paper">
              PHASE 0{step + 1} / 07
            </span>
          </div>
        </div>

        {/* Viewport Screen */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] bg-ink-raised border border-white/5 p-3 sm:p-5 flex flex-col justify-between">
          {/* Subtle Ambient Studio Field Grid */}
          <div
            aria-hidden="true"
            className="grid-field pointer-events-none absolute inset-0 opacity-25"
          />

          {/* Active Sensor Scanline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden z-20"
          >
            <div className="anim-scan h-1/5 w-full bg-gradient-to-b from-transparent via-tide/[0.04] to-transparent" />
          </div>

          {/* =========================================================================
              PHASE 01: INTAKE (Signal enters the queue)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 0 ? 1 : 0,
              pointerEvents: step === 0 ? "auto" : "none",
              transform: step === 0 ? "translateY(0)" : "translateY(-12px)",
            }}
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-tide uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-tide animate-pulse" />
                INBOUND GMAIL STREAM
              </span>
              <span className="text-mute">MSG ID: msg_8f29d</span>
            </div>

            {/* Inbound Email Card */}
            <div className="relative my-auto space-y-2.5 rounded-xl border border-line-strong bg-ink/90 p-3 sm:p-4 shadow-xl overflow-hidden">
              {/* Ingest highlight beam */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-tide/80 to-transparent" />

              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="rounded-md bg-signal-soft px-2 py-0.5 font-mono text-[0.5rem] sm:text-[0.5625rem] tracking-wider text-signal uppercase font-medium">
                  VENDOR REQUEST · PENDING REVIEW
                </span>
                <span className="font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
                  Today · 09:14:02 AM
                </span>
              </div>

              <div>
                <p className="font-mono text-[0.5625rem] sm:text-[0.6875rem] text-paper-dim">
                  <span className="text-mute">FROM:</span> operations@example-vendor.com
                </p>
                <h4 className="mt-1 font-sans text-xs sm:text-sm font-semibold text-paper">
                  Vendor Equipment Delivery &amp; Site Access Request
                </h4>
              </div>

              <p className="font-sans text-[0.625rem] sm:text-xs text-mute leading-relaxed line-clamp-2">
                &ldquo;Inquiry regarding confirmed site delivery access on Saturday morning for equipment staging...&rdquo;
              </p>
            </div>

            {/* Bottom Queue Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-paper-dim">
              <span className="flex items-center gap-1.5 text-tide">
                <span className="size-1 rounded-full bg-tide animate-ping" />
                PAYLOAD BUFFERED · UNTOUCHED IN GMAIL
              </span>
              <span className="flex items-center gap-1">
                <span className="size-1 rounded-full bg-emerald-400" />
                TLS VERIFIED
              </span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 02: UNDERSTAND (Thread Context & Intelligence Extraction)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 1 ? 1 : 0,
              pointerEvents: step === 1 ? "auto" : "none",
              transform: step === 1 ? "translateY(0)" : step < 1 ? "translateY(12px)" : "translateY(-12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-signal uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                STRUCTURED INTELLIGENCE
              </span>
              <span className="text-mute">THREAD DEPTH: 3 MSGS</span>
            </div>

            {/* Intelligence Grid */}
            <div className="my-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
              {/* Thread Context */}
              <div className="rounded-xl border border-line bg-ink/80 p-2.5 sm:p-3 space-y-1.5">
                <p className="font-mono text-[0.5rem] tracking-widest text-mute uppercase">
                  Thread Context
                </p>
                <p className="text-[0.6875rem] font-medium text-paper">
                  Vendor coordination following initial purchase order.
                </p>
                <span className="inline-block font-mono text-[0.5rem] text-tide">
                  Thread ID: thrd_33a1
                </span>
              </div>

              {/* Action Intent */}
              <div className="rounded-xl border border-line bg-ink/80 p-2.5 sm:p-3 space-y-1.5">
                <p className="font-mono text-[0.5rem] tracking-widest text-signal uppercase">
                  Extracted Intent
                </p>
                <p className="text-[0.6875rem] font-medium text-paper">
                  Vendor delivery schedule confirmation.
                </p>
                <span className="inline-block font-mono text-[0.5rem] text-signal font-semibold">
                  Action Required: True
                </span>
              </div>

              {/* Structured Summary Card (Full width on mobile/desktop) */}
              <div className="sm:col-span-2 rounded-xl border border-signal/30 bg-signal-soft/30 p-2.5 sm:p-3 shadow-[0_0_20px_rgba(242,166,90,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.5rem] tracking-widest text-signal uppercase font-semibold flex items-center gap-1">
                    <span className="size-1 rounded-full bg-signal" />
                    Executive Summary
                  </span>
                  <span className="font-mono text-[0.5rem] text-mute">Deterministic Extraction</span>
                </div>
                <p className="mt-1 text-xs sm:text-[0.8125rem] text-paper font-medium leading-relaxed">
                  Vendor requesting confirmed site access window for equipment delivery. Requires site access clearance before reply.
                </p>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>ZERO UNSUPPORTED ML METRICS</span>
              <span className="text-paper font-semibold">READY FOR DRAFT STAGING</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 03: PREPARE (Draft Staging in Gmail · Non-Sending)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 2 ? 1 : 0,
              pointerEvents: step === 2 ? "auto" : "none",
              transform: step === 2 ? "translateY(0)" : step < 2 ? "translateY(12px)" : "translateY(-12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-tide uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-tide" />
                GMAIL DRAFT STAGING
              </span>
              <span className="text-signal font-semibold">STATUS // AWAITING APPROVAL</span>
            </div>

            {/* Gmail Draft UI Preview */}
            <div className="my-auto rounded-xl border border-line-strong bg-ink p-3 sm:p-4 space-y-2 shadow-2xl">
              <div className="border-b border-line pb-2 space-y-1">
                <div className="flex items-center justify-between text-[0.5625rem] font-mono">
                  <span className="text-mute">TO:</span>
                  <span className="text-paper">operations@example-vendor.com</span>
                </div>
                <div className="flex items-center justify-between text-[0.5625rem] font-mono">
                  <span className="text-mute">SUBJECT:</span>
                  <span className="text-paper">Re: Vendor Equipment Delivery Schedule</span>
                </div>
              </div>

              {/* Draft Body with Blinking Typing Cursor */}
              <div className="rounded bg-black/40 p-2 sm:p-2.5 font-sans text-[0.625rem] sm:text-xs text-paper-dim leading-relaxed">
                <p>Hi Vendor Operations Team,</p>
                <p className="mt-1">
                  Thank you for the update. We have noted the request for an 08:00 AM delivery window on Saturday and staged it on our schedule, pending site access verification.
                  <span className={`inline-block w-1 h-3 bg-signal/80 ml-1 translate-y-0.5 ${isReducedMotion ? "" : "anim-cursor"}`} />
                </p>
                <p className="mt-1 text-mute text-[0.5625rem] font-mono">
                  — Pacific Horizon Labs Operations Draft
                </p>
              </div>

              {/* Guardrail callout */}
              <div className="flex items-center justify-between rounded-lg bg-black/60 px-2.5 py-1.5 border border-white/10">
                <span className="flex items-center gap-1.5 font-mono text-[0.5rem] sm:text-[0.5625rem] text-signal font-medium">
                  <span className="animate-pulse">🔒</span> DRAFT SAVED IN GMAIL · NOT TRANSMITTED
                </span>
                <span className="font-mono text-[0.5rem] text-mute uppercase">Send Locked</span>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>DESTINATION: GMAIL DRAFTS</span>
              <span className="text-signal font-semibold">EXTERNAL SEND: DISABLED</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 04: HUMAN APPROVAL GATE (The Core Barrier)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 3 ? 1 : 0,
              pointerEvents: step === 3 ? "auto" : "none",
              transform: step === 3 ? "translateY(0)" : step < 3 ? "translateY(12px)" : "translateY(-12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-signal uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-signal animate-ping" />
                POLICY GATE // EXECUTION PAUSED
              </span>
              <span className="rounded bg-signal/15 px-2 py-0.5 text-signal font-semibold border border-signal/30">
                HUMAN APPROVAL REQUIRED
              </span>
            </div>

            {/* Central Decision Barrier Card */}
            <div
              className={`my-auto rounded-xl border-2 border-signal/60 bg-ink p-3.5 sm:p-5 text-center space-y-3 sm:space-y-4 shadow-[0_0_50px_rgba(242,166,90,0.15)] ${
                isReducedMotion ? "" : "anim-gate-glow"
              }`}
            >
              <div>
                <p className="font-mono text-[0.5625rem] tracking-widest text-signal uppercase font-semibold">
                  PROPOSED ACTION · PROTECTED BOUNDARY
                </p>
                <h4 className="mt-1 text-sm sm:text-base font-semibold text-paper">
                  Approve Draft Reply to Vendor Access Request?
                </h4>
                <p className="mt-1 text-[0.625rem] sm:text-xs text-mute max-w-sm mx-auto">
                  Protected external actions require explicit human authorization. The system remains stopped at this boundary.
                </p>
              </div>

              {/* Action Buttons Representation */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="flex-1 max-w-[9.5rem] rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-center transition-all hover:bg-emerald-500/20 hover:scale-[1.02] cursor-default">
                  <p className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    APPROVE
                  </p>
                  <p className="font-mono text-[0.5rem] text-emerald-300/80 mt-0.5">
                    Record Authorization
                  </p>
                </div>

                <div className="flex-1 max-w-[9.5rem] rounded-lg border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-center transition-all hover:bg-rose-500/20 hover:scale-[1.02] cursor-default">
                  <p className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                    REJECT
                  </p>
                  <p className="font-mono text-[0.5rem] text-rose-300/80 mt-0.5">
                    Halt &amp; Archive
                  </p>
                </div>
              </div>

              <div className="rounded bg-black/60 py-1 px-2.5 font-mono text-[0.5rem] sm:text-[0.5625rem] text-paper-dim">
                STATE TRANSITION: DETERMINISTIC · AUDITED OPERATOR IDENTITY
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>AUTONOMOUS SENDING: NEVER</span>
              <span className="text-paper font-semibold">HUMAN IN COMMAND</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 05: VOICE OPERATIONS (Voice Approval Workflow)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 4 ? 1 : 0,
              pointerEvents: step === 4 ? "auto" : "none",
              transform: step === 4 ? "translateY(0)" : step < 4 ? "translateY(12px)" : "translateY(-12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-tide uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-tide animate-pulse" />
                VOICE APPROVAL WORKFLOW
              </span>
              <span className="text-tide font-semibold">TWILIO INTEGRATION // IN PROGRESS</span>
            </div>

            {/* Call Terminal Interface */}
            <div className="my-auto rounded-xl border border-line-strong bg-ink p-3 sm:p-4 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <div>
                  <p className="font-mono text-[0.5rem] text-mute uppercase">Operator Review Target</p>
                  <p className="font-mono text-xs font-semibold text-paper mt-0.5">
                    +1 (555) ***-OPS1 (TESTED)
                  </p>
                </div>

                {/* Animated Waveform Representation */}
                <div className="flex items-center gap-1 h-5">
                  {[6, 14, 20, 10, 16, 22, 12, 15, 8].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full bg-tide ${
                        isReducedMotion
                          ? ""
                          : i % 3 === 0
                          ? "anim-waveform-1"
                          : i % 3 === 1
                          ? "anim-waveform-2"
                          : "anim-waveform-3"
                      }`}
                      style={{
                        height: isReducedMotion ? "10px" : `${h}px`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Synthesized Voice Readout */}
              <div className="rounded-lg bg-black/60 p-2.5 font-mono text-[0.5625rem] sm:text-[0.625rem] text-paper-dim space-y-1">
                <p className="text-tide font-semibold">VOICE BRIEFING:</p>
                <p className="font-sans text-xs text-paper">
                  &ldquo;Rising Ops notice. Draft staged for vendor access request. Press 1 to approve draft, or press 2 to reject.&rdquo;
                </p>
              </div>

              {/* Operator DTMF Keypad State */}
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-[0.625rem]">
                <div className="rounded-md border border-emerald-500/60 bg-emerald-500/20 py-1.5 text-emerald-400 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center justify-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  KEY [ 1 ] · RECORDED APPROVED
                </div>
                <div className="rounded-md border border-line bg-black/40 py-1.5 text-mute">
                  KEY [ 2 ] · REJECT
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>VOICE APPROVAL LOGIC</span>
              <span className="text-emerald-400 font-semibold">STATE RECORDED: APPROVED</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 06: MAILBOX OPERATIONS (Safe 6-Stage Hygiene & Protected Rules)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 5 ? 1 : 0,
              pointerEvents: step === 5 ? "auto" : "none",
              transform: step === 5 ? "translateY(0)" : step < 5 ? "translateY(12px)" : "translateY(-12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-paper uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-paper" />
                MAILBOX HYGIENE WORKFLOW
              </span>
              <span className="text-signal font-semibold">STAGED · 6-STEP PIPELINE</span>
            </div>

            {/* Pipeline Stage Chips */}
            <div className="my-auto space-y-2.5">
              <div className="grid grid-cols-6 gap-1 text-center font-mono text-[0.4375rem] sm:text-[0.5rem]">
                {[
                  { name: "SCAN", done: true },
                  { name: "PLAN", done: true },
                  { name: "REVIEW", done: true },
                  { name: "APPROVE", active: true },
                  { name: "DRY RUN", pending: true },
                  { name: "TRASH", pending: true },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`rounded py-1 font-semibold transition-all ${
                      s.done
                        ? "bg-paper/10 text-paper border border-white/10"
                        : s.active
                        ? "bg-signal-soft text-signal border border-signal/60 animate-pulse shadow-[0_0_15px_rgba(242,166,90,0.25)] font-bold"
                        : "bg-ink text-mute border border-line"
                    }`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>

              {/* Safeguards Card */}
              <div className="rounded-xl border border-line-strong bg-ink p-2.5 sm:p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.5rem] tracking-wider text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    PROTECTED MESSAGES (UNTOUCHED)
                  </span>
                  <span className="font-mono text-[0.5rem] text-mute">FILTER: EXACT MATCH</span>
                </div>

                <div className="space-y-1 font-mono text-[0.5rem] sm:text-[0.5625rem]">
                  <div className="flex items-center justify-between rounded bg-black/50 px-2 py-1 text-paper-dim">
                    <span>INV-2026-0819.PDF (PROTECTED)</span>
                    <span className="text-emerald-400 font-semibold">PRESERVED</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-black/50 px-2 py-1 text-paper-dim">
                    <span>CLIENT_CONTRACT_ADDENDUM</span>
                    <span className="text-emerald-400 font-semibold">PRESERVED</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-black/50 px-2 py-1 text-mute">
                    <span>RECURRING PROMOTIONS (x42)</span>
                    <span className="text-signal">STAGED FOR TRASH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>ZERO BLIND DELETION</span>
              <span className="text-paper font-semibold">NON-PERMANENT TRASH ONLY</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 07: AUDITABILITY (Deterministic State & Timeline)
             ========================================================================= */}
          <div
            className={`absolute inset-3 sm:inset-5 flex flex-col justify-between ${transitionClass}`}
            style={{
              opacity: step === 6 ? 1 : 0,
              pointerEvents: step === 6 ? "auto" : "none",
              transform: step === 6 ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-[0.5625rem] sm:text-[0.625rem]">
              <span className="text-signal uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                OPERATIONAL AUDIT TIMELINE
              </span>
              <span className="text-tide font-semibold">SESSION #892</span>
            </div>

            {/* Chronological Audit Log */}
            <div className="my-auto space-y-1.5 rounded-xl border border-line-strong bg-ink p-2.5 sm:p-3.5 font-mono text-[0.5rem] sm:text-[0.5625rem]">
              {[
                { time: "09:14:02", tag: "INGEST", text: "Gmail message indexed (msg_8f29d)", tone: "text-tide" },
                { time: "09:14:04", tag: "ANALYZE", text: "Intent classified: VENDOR_REQUEST", tone: "text-paper" },
                { time: "09:14:06", tag: "DRAFT", text: "Response staged in Gmail Drafts (Not sent)", tone: "text-paper-dim" },
                { time: "09:14:12", tag: "GATE", text: "Halted at policy boundary; voice approval staged", tone: "text-signal font-semibold" },
                { time: "09:14:48", tag: "OPERATOR", text: "Voice DTMF key recorded (Key 1)", tone: "text-emerald-400 font-semibold" },
                { time: "09:14:49", tag: "STATE", text: "Approval state saved to deterministic ledger", tone: "text-paper font-semibold" },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-line/50 pb-1 last:border-0 last:pb-0"
                >
                  <span className="text-mute">{log.time}</span>
                  <span className={`px-1.5 py-0.2 rounded bg-black/60 ${log.tone}`}>
                    {log.tag}
                  </span>
                  <span className="truncate max-w-[15rem] sm:max-w-[20rem] text-right text-paper-dim">
                    {log.text}
                  </span>
                </div>
              ))}

              {/* Live Terminal Prompt Row */}
              <div className="flex items-center gap-1.5 text-signal font-mono text-[0.5rem] pt-1.5 border-t border-line/40 mt-1">
                <span className="text-mute">&gt;</span>
                <span className="text-paper-dim">LEDGER: SYNCHRONIZED</span>
                <span className="text-white/20">|</span>
                <span className="text-signal">READY FOR NEXT INTAKE CYCLE</span>
                <span className={`inline-block w-1.5 h-2.5 bg-signal ml-auto ${isReducedMotion ? "" : "anim-cursor"}`} />
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
              <span>DETERMINISTIC STATE</span>
              <span className="text-signal font-semibold">FULL HUMAN ACCOUNTABILITY</span>
            </div>
          </div>
        </div>

        {/* Console Bottom Hardware Trim */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-line pt-2 font-mono text-[0.5rem] sm:text-[0.5625rem] text-mute">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal" />
            <span className="uppercase text-paper-dim">SYSTEM: SUPERVISED</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span>INBOX: ACTIVE</span>
            <span className="text-white/20">|</span>
            <span>VOICE: IN PROGRESS</span>
            <span className="text-white/20">|</span>
            <span className="text-signal">GATE: ARMED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
