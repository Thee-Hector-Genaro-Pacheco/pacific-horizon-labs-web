/**
 * Content definition for the 6-chapter immersive scroll story.
 * "From moment to memory"
 *
 * This configuration is consumed by the Photo Booth scroll stage
 * and can be edited or extended without touching the underlying
 * scroll-story animation primitives.
 *
 * Factual-copy alignment:
 * All claims reflect established project capabilities:
 * native iPadOS app (Swift / SwiftUI), camera capture, multi-face tracking,
 * AR effects, custom event frames, QR digital delivery, and print workflow.
 * Unsupported specifications (e.g. frame rates, sensor resolution, landmark counts,
 * Metal shaders, lab print claims) are generalized to technical interface language.
 */

export type StoryChapter = {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  tags: readonly string[];
  metrics: {
    label: string;
    value: string;
  }[];
  accent: string;
};

/**
 * Centralized synthetic/production media configuration for the scroll story.
 *
 * One single base event image flows continuously through the entire experience:
 * 1. Chapter 01 (Step into Frame): Live camera feed with HUD overlays
 * 2. Chapter 02 (Real-Time Effects): Live view with AR tracking elements
 * 3. Chapter 03 (Capture): Capture flash & freeze-frame separation
 * 4. Chapter 04 (Transform): Branded event frame composition
 * 5. Chapter 05 (Deliver): Transferred onto the smartphone screen preview
 * 6. Chapter 06 (Print): Rendered inside the physical keepsake print
 *
 * When `baseEventImageSrc` is undefined or empty, the visual stage
 * automatically renders high-fidelity synthetic silhouette vector artwork as fallback.
 */
export type PhotoboothStoryMedia = {
  baseEventImageSrc?: string;
  alt: string;
};

export const photoboothStoryMedia: PhotoboothStoryMedia = {
  // TO INSERT REAL / SYNTHETIC EVENT IMAGE: uncomment and provide local path below:
  // e.g. baseEventImageSrc: "/images/photobooth/sample-event-capture.webp",
  baseEventImageSrc: "/images/photobooth/synthetic-guests-master.png",
  alt: "Event guests enjoying the Pacific Horizon photo booth experience",
};

export const photoboothStoryChapters: readonly StoryChapter[] = [
  {
    id: "step-into-frame",
    chapter: "01",
    eyebrow: "01 / Detection & HUD",
    title: "Step into frame.",
    subtitle: "The hardware loop begins the moment guests approach.",
    description:
      "A native iPadOS camera pipeline tuned for booth framing and event lighting. Multi-face tracking runs on-device without cloud round trips.",
    tags: ["iPadOS Camera Pipeline", "Native Multi-Face Tracking", "On-Device Processing"],
    metrics: [
      { label: "Pipeline", value: "Native Swift" },
      { label: "Detection", value: "Multi-Face" },
      { label: "Camera Feed", value: "Live View" },
    ],
    accent: "#f2a65a",
  },
  {
    id: "real-time-effects",
    chapter: "02",
    eyebrow: "02 / Real-Time AR",
    title: "Live effects on device.",
    subtitle: "Augmented-reality treatments rendered directly over the camera feed.",
    description:
      "Face tracking follows guests in real time across the frame. Guests interact with responsive digital treatments rendered live on device.",
    tags: ["Face Tracking", "Real-Time AR", "On-Device Processing"],
    metrics: [
      { label: "Rendering", value: "On-Device" },
      { label: "Tracking", value: "Face Mesh" },
      { label: "Effects", value: "Real-Time AR" },
    ],
    accent: "#f2a65a",
  },
  {
    id: "capture",
    chapter: "03",
    eyebrow: "03 / Camera Capture",
    title: "Controlled capture flash.",
    subtitle: "Still, video, and boomerang sequences.",
    description:
      "A calibrated countdown captures the moment with on-screen preview, producing still, video, or boomerang assets ready for event branding.",
    tags: ["Still Capture", "Boomerang Loop", "Video Capture"],
    metrics: [
      { label: "Modes", value: "Photo · Video" },
      { label: "Motion", value: "Boomerang" },
      { label: "Preview", value: "On-Screen" },
    ],
    accent: "#eceae4",
  },
  {
    id: "transform",
    chapter: "04",
    eyebrow: "04 / Event Branding",
    title: "Event treatment & branded frame.",
    subtitle: "Automatic composition tailored to the host or occasion.",
    description:
      "Captured media composites into custom event overlays, colors, sponsor marks, and stylized treatments before guests step away.",
    tags: ["Custom Overlays", "Event Typography", "Sponsor Branding"],
    metrics: [
      { label: "Overlay", value: "Custom Frame" },
      { label: "Layout", value: "Event Tailored" },
      { label: "Branding", value: "Per-Event" },
    ],
    accent: "#f2a65a",
  },
  {
    id: "deliver",
    chapter: "05",
    eyebrow: "05 / Guest Handoff",
    title: "Touchless digital delivery.",
    subtitle: "Scan. Save. Share.",
    description:
      "A dynamic on-screen QR code allows guests to retrieve their media immediately on their own devices. No shared keyboards, no line bottleneck.",
    tags: ["QR Direct Retrieval", "Mobile-Optimized", "Zero-Touch"],
    metrics: [
      { label: "Handoff", value: "Dynamic QR" },
      { label: "Retrieval", value: "Guest Phone" },
      { label: "Device Touch", value: "Touchless" },
    ],
    accent: "#8fb3c4",
  },
  {
    id: "print",
    chapter: "06",
    eyebrow: "06 / Physical Keepsake",
    title: "Tangible physical prints.",
    subtitle: "A permanent keepsake for guests to take home.",
    description:
      "For events that want a physical take-home, the booth integrates with an on-site printing workflow producing keepsake prints during the event.",
    tags: ["On-Site Print Flow", "Event Keepsake", "Print & Digital"],
    metrics: [
      { label: "Delivery", value: "On-Site" },
      { label: "Output", value: "Physical Print" },
      { label: "Format", value: "Event Frame" },
    ],
    accent: "#eceae4",
  },
] as const;
