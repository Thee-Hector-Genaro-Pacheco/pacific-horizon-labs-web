import type { BaseChapter } from "@/components/immersive/scroll-story-stage";

export type RisingOpsChapter = BaseChapter & {
  tags: readonly string[];
  metrics: readonly {
    label: string;
    value: string;
  }[];
  statusBadge: string;
  stateColor: string;
};

export const risingOpsStoryChapters: readonly RisingOpsChapter[] = [
  {
    id: "intake",
    chapter: "01",
    eyebrow: "01 / Ingestion & Queue",
    title: "Signal enters the queue.",
    subtitle: "Inbound communication captured in a staged operational queue.",
    description:
      "Inbound messages arrive through the Gmail retrieval pipeline into a staged queue. Headers, sender history, and thread context are indexed without altering the source mailbox.",
    tags: ["Gmail Intake", "Thread Indexing", "Queue Staging"],
    metrics: [
      { label: "Channel", value: "Gmail Intake" },
      { label: "Queue State", value: "Staged" },
      { label: "Safety", value: "Isolated" },
    ],
    statusBadge: "QUEUE // ACTIVE",
    stateColor: "#8fb3c4",
  },
  {
    id: "understand",
    chapter: "02",
    eyebrow: "02 / Intelligence & Extraction",
    title: "Context & thread intelligence.",
    subtitle: "Turning raw text into structured operational clarity.",
    description:
      "The system reconstructs multi-turn thread context, separates relevant inquiries from noise, produces concise operational summaries, and extracts required action flags.",
    tags: ["Thread Context", "Intent Extraction", "Summary Engine"],
    metrics: [
      { label: "Context", value: "Full Thread" },
      { label: "Category", value: "Inquiry" },
      { label: "Priority", value: "High" },
    ],
    statusBadge: "ANALYSIS // COMPLETE",
    stateColor: "#f2a65a",
  },
  {
    id: "prepare",
    chapter: "03",
    eyebrow: "03 / Draft Preparation",
    title: "Draft prepared in Gmail.",
    subtitle: "Staged reply ready for operator review.",
    description:
      "A contextual response is composed directly into Gmail Drafts. The draft is staged and tagged with pending approval status. Current workflow does not automatically send approved drafts.",
    tags: ["Draft Generation", "Gmail Staged", "Non-Sending"],
    metrics: [
      { label: "Target", value: "Gmail Drafts" },
      { label: "Status", value: "Staged" },
      { label: "Send Path", value: "Controlled" },
    ],
    statusBadge: "DRAFT // STAGED",
    stateColor: "#8fb3c4",
  },
  {
    id: "approval-gate",
    chapter: "04",
    eyebrow: "04 / Policy Boundary",
    title: "The human approval gate.",
    subtitle: "Consequential actions stop until an operator decides.",
    description:
      "The system comes to a deliberate halt at the policy gate. Protected external actions require explicit human authorization. The state machine awaits an affirmative Approve or Reject.",
    tags: ["Policy Barrier", "Deterministic State", "Approval Records"],
    metrics: [
      { label: "Boundary", value: "Enforced" },
      { label: "State", value: "Awaiting Gate" },
      { label: "Auto-Send", value: "None" },
    ],
    statusBadge: "GATE // AWAITING APPROVAL",
    stateColor: "#f2a65a",
  },
  {
    id: "voice-ops",
    chapter: "05",
    eyebrow: "05 / Voice Interface",
    title: "Voice approval workflow.",
    subtitle: "Implemented voice review with live integration in progress.",
    description:
      "An implemented voice approval workflow with tested approval logic. Designed to deliver phone briefings allowing operators to record an explicit Approve or Reject decision directly over a call as live Twilio connection progresses.",
    tags: ["Voice Workflow", "Audio Briefing", "DTMF / Voice Input"],
    metrics: [
      { label: "Workflow", value: "Implemented" },
      { label: "Logic", value: "Tested" },
      { label: "Live Connection", value: "In Progress" },
    ],
    statusBadge: "VOICE // IN PROGRESS",
    stateColor: "#8fb3c4",
  },
  {
    id: "mailbox-ops",
    chapter: "06",
    eyebrow: "06 / Safe Mailbox Cleanup",
    title: "Scan, plan, review, trash.",
    subtitle: "Six-stage mailbox hygiene with protected-message guardrails.",
    description:
      "A disciplined hygiene pipeline: Scan inbox, generate plan, human reviews, approve plan, run dry-run simulation, and execute to Trash. Invoices, contracts, and protected messages remain untouched.",
    tags: ["6-Stage Hygiene", "Protected Messages", "Trash Safety"],
    metrics: [
      { label: "Pipeline", value: "Scan → Trash" },
      { label: "Safeguards", value: "Protected List" },
      { label: "Deletion", value: "To Trash Only" },
    ],
    statusBadge: "HYGIENE // STAGED",
    stateColor: "#eceae4",
  },
  {
    id: "audit",
    chapter: "07",
    eyebrow: "07 / State & Auditability",
    title: "Deterministic operational trace.",
    subtitle: "Verifiable timeline of every action and decision.",
    description:
      "Every classification, summary, draft creation, and approval decision is recorded in an auditable chronological state machine. Operations remain accountable and verifiable.",
    tags: ["Chronological Ledger", "State Machine", "Audit Events"],
    metrics: [
      { label: "Ledger", value: "Auditable" },
      { label: "Decisions", value: "Recorded" },
      { label: "Accountability", value: "Deterministic" },
    ],
    statusBadge: "AUDIT // RECORDED",
    stateColor: "#f2a65a",
  },
] as const;
