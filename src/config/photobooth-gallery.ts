/**
 * Event Experience Gallery Configuration
 *
 * Centralized data and media asset definitions for the cinematic
 * event-use gallery on /photobooth.
 *
 * FUTURE MEDIA INTEGRATION:
 * When production event photography and short-form video loops become available,
 * replace the `media` field below with local static assets (e.g. `/images/photobooth/events/...`)
 * or streaming video sources.
 *
 * Factual-copy alignment:
 * Placeholders represent illustrative frame concepts and templates,
 * not claims of completed past client engagements.
 */

export type GalleryCategory = {
  id: "wedding" | "corporate" | "private-party" | "school" | "brand-activation";
  label: string;
  tagline: string;
  badge: string;
  description: string;
  highlights: readonly string[];
  specs: {
    label: string;
    value: string;
  }[];
  /**
   * Media asset definition.
   * Currently populated with architectural visual placeholders.
   * Point `src` to real production images or video files when captured.
   */
  media: {
    type: "placeholder" | "image" | "video";
    src?: string;
    aspectRatio: "16/9" | "4/3" | "1/1";
    alt: string;
    frameTheme: {
      accentColor: string;
      headerText: string;
      subText: string;
      badgeText: string;
    };
  };
};

export const photoboothGalleryCategories: readonly GalleryCategory[] = [
  {
    id: "wedding",
    label: "Wedding",
    tagline: "Ceremony & Reception",
    badge: "Keepsake & Favor",
    description:
      "Minimalist aesthetic framing with event typography. Configurable for physical keepsake prints and touchless QR retrieval tailored to wedding receptions.",
    highlights: [
      "Custom monogram and wedding date typography",
      "Configurable event framing for wedding venues",
      "Physical keepsake prints and touchless QR delivery",
    ],
    specs: [
      { label: "Frame Layout", value: "Custom Monogram / 4x6" },
      { label: "Guest Flow", value: "Keepsake & Photo Favor" },
      { label: "Setup Mode", value: "Wedding Reception" },
    ],
    media: {
      type: "image",
      src: "/images/photobooth/wedding_event.png",
      aspectRatio: "16/9",
      alt: "Wedding celebration photo booth concept preview",
      frameTheme: {
        accentColor: "#f2a65a",
        headerText: "EMILY & LIAM",
        subText: "SAMPLE MONOGRAM // WEDDING SUITE",
        badgeText: "FRAME TEMPLATE",
      },
    },
  },
  {
    id: "corporate",
    label: "Corporate Event",
    tagline: "Conferences & Galas",
    badge: "Sponsor Ready",
    description:
      "Clean corporate and sponsor branding for summits, conferences, and galas. Custom logo overlays and touchless QR handoffs for high guest volume.",
    highlights: [
      "Sponsor and organizer logo integration",
      "Streamlined camera flow suited to high event volume",
      "Still, video, and boomerang capture formats",
    ],
    specs: [
      { label: "Frame Layout", value: "Co-Branded / 4x6 & 1:1" },
      { label: "Guest Flow", value: "High Volume" },
      { label: "Setup Mode", value: "Corporate Summit" },
    ],
    media: {
      type: "image",
      src: "/images/photobooth/corporate_event.png",
      aspectRatio: "16/9",
      alt: "Corporate gala and summit photo booth concept preview",
      frameTheme: {
        accentColor: "#8fb3c4",
        headerText: "PACIFIC SUMMIT",
        subText: "ANNUAL CONFERENCE // SPONSOR SUITE",
        badgeText: "FRAME TEMPLATE",
      },
    },
  },
  {
    id: "private-party",
    label: "Private Party",
    tagline: "Birthdays & Milestones",
    badge: "Group Motion",
    description:
      "Motion capture, boomerang loops, and AR effects designed for milestone birthdays, private celebrations, and evening parties.",
    highlights: [
      "Multi-face AR tracking for group photos",
      "Boomerang motion capture for social sharing",
      "Direct QR phone retrieval for guests",
    ],
    specs: [
      { label: "Frame Layout", value: "Custom Event Overlay" },
      { label: "Guest Flow", value: "Group Motion" },
      { label: "Setup Mode", value: "Private Celebration" },
    ],
    media: {
      type: "image",
      src: "/images/photobooth/synthetic-guests-party.png",
      aspectRatio: "16/9",
      alt: "Private celebration photo booth experience preview",
      frameTheme: {
        accentColor: "#f2a65a",
        headerText: "CELEBRATION 2026",
        subText: "MILESTONE NIGHTS // PRIVATE SUITE",
        badgeText: "FRAME TEMPLATE",
      },
    },
  },
  {
    id: "school",
    label: "School / University",
    tagline: "Graduations & Formals",
    badge: "High Throughput",
    description:
      "Continuous guest throughput suited to homecomings, graduations, and university formals with quick queue clearance.",
    highlights: [
      "Class crest and institution-specific branding",
      "Touchless QR delivery to keep lines moving",
      "Self-contained iPadOS kiosk setup",
    ],
    specs: [
      { label: "Frame Layout", value: "Institution Crest & Branding" },
      { label: "Guest Flow", value: "Continuous Queue" },
      { label: "Setup Mode", value: "Campus Formal" },
    ],
    media: {
      type: "image",
      src: "/images/photobooth/graduation_event.png",
      aspectRatio: "16/9",
      alt: "University graduation formal photo booth concept preview",
      frameTheme: {
        accentColor: "#eceae4",
        headerText: "COMMENCEMENT GALA",
        subText: "CLASS OF 2026 // CAMPUS FORMAL",
        badgeText: "FRAME TEMPLATE",
      },
    },
  },
  {
    id: "brand-activation",
    label: "Brand Activation",
    tagline: "Experiential Retail & Launches",
    badge: "Campaign Integration",
    description:
      "Interactive brand experiences where custom overlays, AR effects, and QR destinations align with campaign marketing.",
    highlights: [
      "Custom AR treatments configured for the launch",
      "QR delivery flow linking to brand or social destinations",
      "Compact, self-contained iPadOS booth presentation",
    ],
    specs: [
      { label: "Frame Layout", value: "Campaign Branding" },
      { label: "Guest Flow", value: "Experiential" },
      { label: "Setup Mode", value: "Brand Activation" },
    ],
    media: {
      type: "image",
      src: "/images/photobooth/brand_activation.png",
      aspectRatio: "16/9",
      alt: "Brand activation interactive booth concept preview",
      frameTheme: {
        accentColor: "#f2a65a",
        headerText: "PRODUCT LAUNCH",
        subText: "EXPERIENTIAL CAMPAIGN // KEY VISUAL",
        badgeText: "FRAME TEMPLATE",
      },
    },
  },
] as const;
