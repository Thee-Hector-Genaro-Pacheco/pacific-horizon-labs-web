/**
 * Product data shared by the homepage and the individual product pages.
 *
 * Wording note: capabilities are described as capabilities or development
 * areas, not as a guarantee that every item is live for every event.
 */

export type CapabilityGroup = {
  title: string;
  items: { name: string; detail: string }[];
};

export const photoBooth = {
  name: "Pacific Horizon AI Photo Booth",
  shortName: "AI Photo Booth",
  href: "/photobooth",
  status: "Commercial platform",
  platform: "iPadOS · Swift · SwiftUI",
  summary:
    "An interactive photo booth for live events, built as a native iPadOS application with real-time camera effects, event branding, and instant digital delivery.",
  highlights: [
    "Native iPadOS app built in Swift and SwiftUI",
    "Real-time augmented-reality effects, including multi-face",
    "Photo, video, and boomerang capture",
    "Event-specific frames and branding",
    "QR-based digital delivery, local saving, and printing",
  ],
  capabilities: [
    {
      title: "Capture",
      items: [
        { name: "Camera capture", detail: "Direct camera integration tuned for booth lighting and framing." },
        { name: "Photo", detail: "Still capture with countdown and on-screen preview." },
        { name: "Video & boomerang", detail: "Short-form motion capture suited to social sharing." },
      ],
    },
    {
      title: "Effects",
      items: [
        { name: "Augmented reality", detail: "Live effects rendered over the camera feed in real time." },
        { name: "Multi-face", detail: "Effects that follow several guests in frame at once." },
        { name: "AI-assisted visuals", detail: "Generative and AI-driven looks, an active development area." },
      ],
    },
    {
      title: "Delivery",
      items: [
        { name: "QR delivery", detail: "Guests scan a code to retrieve their media on their own phone." },
        { name: "Local saving", detail: "Media saved on the device for the event record." },
        { name: "Printing", detail: "Physical prints for events that want a take-home." },
      ],
    },
    {
      title: "Operation",
      items: [
        { name: "Event configuration", detail: "Per-event setup of modes, effects, and delivery options." },
        { name: "Frames & branding", detail: "Custom overlays, colors, and marks for each event or sponsor." },
        { name: "Social integration", detail: "A QR flow that can point guests to social profiles after capture." },
      ],
    },
  ] satisfies CapabilityGroup[],
  evolution: [
    {
      stage: "Prototype",
      title: "Raspberry Pi and a camera",
      body: "The first booth ran on a Raspberry Pi with an attached camera and real-time AR. It proved the core loop: step up, see yourself transformed, walk away with something.",
    },
    {
      stage: "Validation",
      title: "A working interactive experience",
      body: "Running the prototype with real guests showed what mattered in practice: fast feedback, effects that track reliably, and getting media into people's hands quickly.",
    },
    {
      stage: "Platform",
      title: "Native iPadOS application",
      body: "The booth was rebuilt in Swift and SwiftUI for iPad. The move brought better camera hardware, smoother rendering, simpler transport and setup, and a foundation suited to commercial events.",
    },
  ],
} as const;

export const risingOps = {
  name: "Pacific Rising Ops",
  shortName: "Rising Ops",
  href: "/rising-ops",
  status: "In development",
  platform: "Agentic operations · Human approval",
  summary:
    "An operations automation system that reads, sorts, and drafts so people can decide. Consequential actions wait for human approval.",
  highlights: [
    "Email ingestion, classification, and summarization",
    "Draft replies prepared for review",
    "Nothing important is sent without human approval",
    "Inbox organization and promotional cleanup",
    "Twilio-based voice operations in development",
  ],
  pipeline: [
    { step: "Ingest", detail: "New mail arrives from connected inboxes." },
    { step: "Classify", detail: "Messages are sorted by type and urgency." },
    { step: "Summarize", detail: "Long threads are condensed to what needs a decision." },
    { step: "Draft", detail: "A proposed reply is prepared." },
    { step: "Approve", detail: "A person reviews, edits, or rejects the draft.", human: true },
    { step: "Send", detail: "Only approved messages go out." },
  ],
  capabilities: [
    {
      title: "Understand",
      items: [
        { name: "Email ingestion", detail: "Connects to Gmail to read incoming business mail." },
        { name: "Classification", detail: "Separates inquiries, vendors, receipts, and noise." },
        { name: "Summarization", detail: "Short summaries of messages and long threads." },
      ],
    },
    {
      title: "Prepare",
      items: [
        { name: "Draft generation", detail: "Proposed replies written for a person to review." },
        { name: "Workflow automation", detail: "Repeatable back-office steps handled consistently." },
        { name: "Voice operations", detail: "Twilio-based call handling, currently in development." },
      ],
    },
    {
      title: "Act, with approval",
      items: [
        { name: "Human approval", detail: "Consequential actions are held until someone signs off." },
        { name: "Approved sending", detail: "Messages are sent only after they are approved." },
        { name: "Inbox organization", detail: "Labeling, archiving, and promotional-email cleanup." },
      ],
    },
  ] satisfies CapabilityGroup[],
} as const;

export const products = [photoBooth, risingOps] as const;
