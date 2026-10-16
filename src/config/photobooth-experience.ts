/**
 * /photobooth experience configuration.
 *
 * Everything you are expected to swap lives here: the iPad screen media for
 * the scroll sequence, scroll length and beat ranges, gallery photos, theme
 * concept art, package pricing, FAQ, and LocalBusiness schema fields.
 *
 * Colors, spacing, and durations live in `src/app/photobooth/photobooth.css`.
 *
 * Anything in [square brackets] is a placeholder that is visible on the page.
 * Replace it before launch.
 */

import { booking } from "./booking";

/* ------------------------------------------------------------------------ */
/* Scroll sequence media                                                     */
/* ------------------------------------------------------------------------ */

/**
 * A numbered image sequence, e.g. frame_0001.webp … frame_0150.webp.
 * `pattern` uses `{index}` for the zero-padded frame number.
 */
export type FrameSet = {
  pattern: string;
  frameCount: number;
  /** Number of the first file (ffmpeg starts at 1). */
  startIndex: number;
  /** Digits in the file number (frame_0001 = 4). */
  padLength: number;
  /** Intrinsic pixel size of every frame. Keeps the canvas from shifting layout. */
  width: number;
  height: number;
};

export type SequenceMedia =
  /** A single still photo behind the booth interface. */
  | {
      kind: "image";
      src: string;
      /** Smaller copy (800 px wide) served to phones. */
      mobileSrc?: string;
      width: number;
      height: number;
    }
  /** WebP frames drawn to a canvas. Recommended: scrubs smoothly on iOS Safari. */
  | { kind: "frames"; desktop: FrameSet; mobile: FrameSet; poster: string }
  /** Scroll sets video.currentTime. Needs all-intra encoding (see README). */
  | {
      kind: "video";
      src: string;
      mobileSrc?: string;
      poster: string;
      width: number;
      height: number;
    };

/* ------------------------------------------------------------------------ */
/* Prints                                                                    */
/* ------------------------------------------------------------------------ */

/**
 * /book preselects "Digital + prints" from this query value. Must match an
 * id in experienceTypes (src/config/booking.ts).
 */
export const printBookingHref = "/book?experience=digital_print";

/**
 * Prints shown in the Physical keepsake beat and the Digital + print
 * section. Illustrative: these are the site's sample event images laid out
 * as prints, not photos of real prints. Top of the stack first.
 */
export const printStack = {
  illustrative: true,
  /** Placeholder for the event name printed under each photo. */
  eventLabel: "Your event name",
  prints: [
    { src: "/media/photobooth/synthetic-guests-master-800.webp", alt: "", width: 800, height: 600 },
    { src: "/media/photobooth/wedding_event.webp", alt: "", width: 1440, height: 811 },
    { src: "/media/photobooth/corporate_event.webp", alt: "", width: 1440, height: 811 },
  ],
} as const;

export type BeatId = "idle" | "lock" | "countdown" | "capture" | "result" | "print";

export type Beat = {
  id: BeatId;
  /** Start and end of this beat as a fraction (0–1) of the sequence scroll length. */
  range: readonly [number, number];
  label: string;
  heading: string;
  body: string;
  /**
   * Optional still shown for this beat in the reduced-motion version.
   * Without it the screen is rendered over the sequence photo or poster.
   */
  still?: string;
  stillAlt: string;
  /** Optional link under the beat copy. */
  cta?: { label: string; href: string };
};

export const boothSequence = {
  /*
   * To use real footage, replace with for example:
   *
   * media: {
   *   kind: "frames",
   *   poster: "/media/photobooth/sequence/poster.webp",
   *   desktop: { pattern: "/media/photobooth/sequence/desktop/frame_{index}.webp",
   *              frameCount: 150, startIndex: 1, padLength: 4, width: 1440, height: 1080 },
   *   mobile:  { pattern: "/media/photobooth/sequence/mobile/frame_{index}.webp",
   *              frameCount: 90, startIndex: 1, padLength: 4, width: 800, height: 600 },
   * },
   *
   * Footage maps linearly onto the whole scroll length: frame 0 at the top of
   * the sequence, the last frame at the bottom. Time it to the beat ranges below.
   */
  media: {
    kind: "image",
    src: "/media/photobooth/synthetic-guests-master.webp",
    mobileSrc: "/media/photobooth/synthetic-guests-master-800.webp",
    width: 1440,
    height: 1080,
  } as SequenceMedia,

  /**
   * Shows an "Illustrative image" label on the iPad screen. Set to false once
   * the media is real footage from an event.
   */
  illustrative: true,

  /**
   * During the countdown the background racks out of focus while the area
   * inside this CSS mask stays sharp. Shape it around the guests in your media.
   */
  focusMask: "radial-gradient(ellipse 46% 74% at 50% 62%, #000 58%, transparent 86%)",

  /**
   * Draw the booth UI (welcome screen, face brackets, countdown, flash,
   * shutter, QR) on top of the media. Keep `true` for raw camera
   * footage. Set `false` if your footage is a screen recording of the app,
   * which already contains its own UI.
   */
  drawInterface: true,

  /** The captured photo shown next to the QR code. Undefined reuses the media. 4:3. */
  resultPhoto: "/media/photobooth/synthetic-guests-master.webp" as string | undefined,

  /**
   * The app draws fixed corner brackets around the whole viewfinder, not one
   * per face. Set true to draw a bracket on each face in `faces` instead,
   * once the app shows per-face brackets.
   */
  faceBrackets: false,

  /**
   * Face bracket positions (used only when faceBrackets is true), in percent
   * of the screen (x/y = center).
   * Line these up with the guests in your footage.
   */
  faces: [
    { x: 32, y: 39, w: 13, h: 22 },
    { x: 48.5, y: 27.5, w: 13, h: 22 },
    { x: 69, y: 35, w: 13, h: 22 },
  ],

  /** Height of the scroll track that drives the sequence, in svh. */
  scrollLength: { desktop: 620, mobile: 480 },

  /** Pixel width below which the mobile frame set and layout are used. */
  mobileBreakpoint: 768,

  beats: [
    {
      id: "idle",
      range: [0, 0.13],
      label: "Welcome",
      heading: "A ready screen between guests",
      body: "The booth waits on a welcome screen until someone taps Continue. Then guests pick Classic, AR Party, or Loop.",
      stillAlt: "iPad welcome screen reading Ready when you are, with a Continue button",
    },
    {
      id: "lock",
      range: [0.13, 0.3],
      label: "Faces",
      heading: "It tracks up to four faces",
      body: "Face tracking follows up to four guests at once, so live effects stay on each face as people move.",
      stillAlt: "Three guests on the live camera view, framed by cyan viewfinder corner brackets",
    },
    {
      id: "countdown",
      range: [0.3, 0.48],
      label: "Countdown",
      heading: "Five seconds to get ready",
      body: "A five-second countdown gives the group time to settle in. Guests can switch it to ten seconds.",
      stillAlt: "The number 5 counting down on the iPad screen with the background softly out of focus",
    },
    {
      id: "capture",
      range: [0.48, 0.6],
      label: "Capture",
      heading: "Photo or Loop",
      body: "Classic and AR Party take a photo. Loop records a short clip that plays forward, then back. Some AR effects record a Loop instead of a photo.",
      stillAlt: "Capture flash on the iPad screen as the shutter fires",
    },
    {
      id: "result",
      range: [0.6, 0.8],
      label: "Delivery",
      heading: "Scan to download",
      body: "A QR code appears on screen. Guests scan it with their own phone to download their photo or Loop. No email forms, no shared keyboard.",
      stillAlt: "The captured photo next to a QR code labelled Scan to download",
    },
    {
      id: "print",
      range: [0.8, 1],
      label: "Physical keepsake",
      heading: "Digital when you want it. Printed when you want something to keep.",
      body: "Optional physical keepsakes for eligible events. Print availability is confirmed with your event package.",
      stillAlt: "A small stack of printed event photos with white borders, the top print showing three guests at a gala",
      cta: { label: "Request Print Availability", href: printBookingHref },
    },
  ] as readonly Beat[],
} as const;

/* ------------------------------------------------------------------------ */
/* Modes                                                                     */
/* ------------------------------------------------------------------------ */

/**
 * A short screen recording of the mode in the real app. Prepare it with the
 * ffmpeg commands in the README (720 px wide, under 2 MB each).
 */
export type ModeMedia = {
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
  /** Describes what the recording shows, for screen readers. */
  alt: string;
};

export type ModeCard = {
  id: "classic" | "ar-party" | "loop";
  name: string;
  description: string;
  /** Cards without media are hidden. */
  media?: ModeMedia;
};

/*
 * Example once recordings exist:
 *   media: {
 *     webm: "/media/photobooth/modes/classic.webm",
 *     mp4: "/media/photobooth/modes/classic.mp4",
 *     poster: "/media/photobooth/modes/classic.webp",
 *     width: 720, height: 540,
 *     alt: "Screen recording of a Classic session: countdown, capture, and the photo review screen",
 *   },
 */
export const modeCards: readonly ModeCard[] = [
  { id: "classic", name: "Classic", description: "A clean photo." },
  { id: "ar-party", name: "AR Party", description: "A photo with live face effects." },
  { id: "loop", name: "Loop", description: "A short clip that plays forward, then back." },
];

export type EventFrameImage = {
  src: string;
  /** Describe the frame and what it says, e.g. "Gold border reading Celebrating the Big 50! around a group photo". */
  alt: string;
  width: number;
  height: number;
};

/** Up to 3 photos showing real event frame overlays from the app. Empty hides the row. */
export const eventFrames: readonly EventFrameImage[] = [];

/* ------------------------------------------------------------------------ */
/* Gallery                                                                   */
/* ------------------------------------------------------------------------ */

export type GalleryPhoto = {
  /** Leave undefined to show an empty "photo coming soon" tile. */
  src?: string;
  alt: string;
  width: number;
  height: number;
  /** Labels the tile "Illustrative". Set false for real event photos. */
  illustrative: boolean;
};

export type GallerySet = {
  id: string;
  label: string;
  photos: readonly GalleryPhoto[];
};

const illustrative = (src: string, alt: string, width = 1440, height = 811): GalleryPhoto => ({
  src: `/media/photobooth/${src}.webp`,
  alt: `Illustrative image: ${alt}`,
  width,
  height,
  illustrative: true,
});

/**
 * Each set fills the grid; scrolling iris-wipes from one set to the next.
 * 1–2 photos per set lay out in two columns, 3 or more in three.
 * Replace with real event photos and set `illustrative: false`.
 */
export const gallerySets: readonly GallerySet[] = [
  {
    id: "wedding",
    label: "Weddings and galas",
    photos: [
      illustrative("wedding_event", "a bride, groom, and two guests laughing in front of the photo booth at a floral wedding reception"),
      illustrative("synthetic-guests-party", "three guests in evening wear posing and making faces at the booth during a night party", 1440, 1080),
    ],
  },
  {
    id: "corporate",
    label: "Corporate and brand events",
    photos: [
      illustrative("corporate_event", "five colleagues in suits and gowns crowding into the frame at a corporate evening event"),
      illustrative("brand_activation", "three guests posing at the booth at a brand launch with product displays behind them"),
    ],
  },
  {
    id: "celebration",
    label: "Graduations and parties",
    photos: [
      illustrative("graduation_event", "graduates in caps and gowns celebrating with friends at the photo booth"),
      illustrative("synthetic-guests-master", "three friends laughing together at a gala in a glass-walled venue", 1440, 1080),
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Tonight's theme (concept art)                                             */
/* ------------------------------------------------------------------------ */

/** Page sections that can be switched off without deleting their code. */
export const photoboothFeatures = {
  /** "Tonight's theme" picker. Off until real AI background output exists. */
  themePicker: false,
  /**
   * "Modes" section after the scroll sequence. Off until real screen
   * recordings exist; even when on, it renders nothing unless at least one
   * mode card has media.
   */
  modes: false,
};

export type ThemeOption = {
  id: string;
  name: string;
  description: string;
  /** Leave undefined to show generated concept art. */
  src?: string;
  alt: string;
};

export const themeOptions: readonly ThemeOption[] = [
  {
    id: "golden-hour",
    name: "Golden hour pier",
    description: "Low sun over the water, long warm light.",
    alt: "Concept art: sunset over the ocean with a pier silhouette",
  },
  {
    id: "kelp-forest",
    name: "Kelp forest",
    description: "Deep teal water and tall swaying kelp.",
    alt: "Concept art: underwater kelp forest in teal light",
  },
  {
    id: "desert-night",
    name: "Desert night",
    description: "Dunes under a clear, star-filled sky.",
    alt: "Concept art: desert dunes under a night sky with stars",
  },
  {
    id: "paper-studio",
    name: "Paper studio",
    description: "Clean seamless backdrop, soft studio light.",
    alt: "Concept art: neutral seamless paper studio backdrop",
  },
  {
    id: "night-grid",
    name: "Night grid",
    description: "A violet horizon grid for late-night parties.",
    alt: "Concept art: glowing perspective grid receding to a violet horizon",
  },
  {
    id: "garden-arch",
    name: "Garden arch",
    description: "Greenery and blooms framing the group.",
    alt: "Concept art: garden arch covered in leaves and flowers",
  },
];

/* ------------------------------------------------------------------------ */
/* Packages                                                                  */
/* ------------------------------------------------------------------------ */

export const packages = [
  {
    name: "[Package name]",
    price: "$[min]–$[max]",
    duration: "[X] hours",
    includes: [
      "On-site AI photo booth with attendant [confirm]",
      "Photo capture with QR delivery to guests' phones",
      "Event frame overlay on photos",
    ],
  },
  {
    name: "[Package name]",
    price: "$[min]–$[max]",
    duration: "[X] hours",
    includes: [
      "Everything in the first package",
      "Photo and Loop capture",
      "AR Party live face effects",
    ],
  },
  {
    name: "[Package name]",
    price: "Custom quote",
    duration: "[X]+ hours",
    includes: [
      "Brand activations and multi-day events",
      "Custom event branding on guest screens (coming soon)",
      "[Fill in: data capture, sponsor placement, other options]",
    ],
  },
] as const;

/* ------------------------------------------------------------------------ */
/* FAQ                                                                       */
/* ------------------------------------------------------------------------ */

export const faqs = [
  {
    q: "How do guests get their photos?",
    a: "Each session ends with a QR code on the iPad. Guests scan it with their own phone camera and download their photo or Loop. Nobody types an email or phone number into a shared screen.",
  },
  {
    q: "Can the booth show our event name and branding?",
    a: "Photos and Loops can carry a frame overlay for your event. Your event name, colors, and logo on the guest screens are coming soon.",
  },
  {
    q: "What can guests capture?",
    a: "Photos and Loops. Guests choose Classic (a clean photo), AR Party (a photo with live face effects), or Loop (a short clip that plays forward, then back). Which modes are on is set for each event.",
  },
  {
    q: "Where do you serve?",
    a: "Orange County, California. [Fill in: cities covered and any travel fee beyond them.]",
  },
  {
    q: "How far ahead should we book?",
    a: `Requests need at least ${booking.minLeadDays} days' notice and can be made up to ${Math.round(booking.maxAdvanceDays / 30)} months ahead. Every request is confirmed by a person.`,
  },
  {
    q: "How much space and power does the booth need?",
    a: "[Fill in: floor footprint, outlet requirements, and whether Wi-Fi is needed.]",
  },
  {
    q: "Do you offer prints?",
    a: "Yes, as an optional add-on for eligible events. Print availability is confirmed with your event package, so mention it when you request a date.",
  },
  {
    q: "Can guests use AI backgrounds?",
    a: "Coming soon.",
  },
] as const;

/* ------------------------------------------------------------------------ */
/* LocalBusiness structured data                                             */
/* ------------------------------------------------------------------------ */

/**
 * Fields left as `null` are omitted from the JSON-LD, so nothing fake ships.
 * Fill them in before launch, then check the page with
 * https://search.google.com/test/rich-results
 */
export const localBusiness = {
  name: "Pacific Horizon AI Photo Booth",
  telephone: null as string | null, // e.g. "+1-949-555-0100"
  priceRange: null as string | null, // e.g. "$$"
  address: {
    streetAddress: null as string | null,
    addressLocality: null as string | null, // e.g. "Irvine"
    addressRegion: "CA",
    postalCode: null as string | null,
    addressCountry: "US",
  },
  geo: null as { latitude: number; longitude: number } | null,
  areaServed: ["Orange County, CA"],
  /** Absolute or site-relative URL of a real photo of the booth. */
  image: null as string | null,
  openingHours: null as string | null, // e.g. "Mo-Su 10:00-23:00"
};
