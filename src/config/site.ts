/**
 * Site-wide configuration for Pacific Horizon Labs LLC.
 *
 * Everything that identifies the company (name, contact details, social
 * destinations, navigation) lives here so it can be changed in one place.
 */

/**
 * Canonical public URL. Set NEXT_PUBLIC_SITE_URL in your hosting provider
 * once the custom domain is live. Netlify exposes `URL` automatically at
 * build time, which covers the default *.netlify.app address.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000";

export const site = {
  legalName: "Pacific Horizon Labs LLC",
  name: "Pacific Horizon Labs",
  shortName: "PHL",
  url: siteUrl.replace(/\/$/, ""),
  tagline: "Intelligent systems, built to leave the lab.",
  description:
    "Pacific Horizon Labs LLC builds software, automation, and interactive experiences that operate in the real world, including the Pacific Horizon AI Photo Booth and Pacific Rising Ops.",

  contact: {
    email: "hector@pacifichorizonlabs.com",
  },

  social: {
    // Destination of the /follow short link. Set to null to send /follow to the homepage instead.
    instagram: "https://www.instagram.com/pacifichorizonlabs/" as string | null,
  },

  // Shown at the top of Privacy, Terms, and SMS pages. Update whenever those pages change.
  legalLastUpdated: "September 30, 2026",
} as const;

export const contactEmailHref = `mailto:${site.contact.email}`;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Photo Booth", href: "/photobooth" },
  { label: "Rising Ops", href: "/rising-ops" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Systems",
    items: [
      { label: "AI Photo Booth", href: "/photobooth" },
      { label: "Book an event", href: "/book" },
      { label: "Rising Ops", href: "/rising-ops" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Follow", href: "/follow" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "SMS Terms", href: "/sms" },
    ],
  },
];

/** Inquiry categories used on the contact page and in the contact form. */
export const inquiryTypes = [
  {
    id: "events",
    label: "Event booking",
    description: "Photo booth availability, event formats, branding, and logistics.",
  },
  {
    id: "partnerships",
    label: "Business partnership",
    description: "Venues, agencies, planners, and companies interested in working together.",
  },
  {
    id: "technology",
    label: "Technology inquiry",
    description: "Questions about our software, automation work, or engineering approach.",
  },
  {
    id: "general",
    label: "General",
    description: "Vendors, verification requests, press, and anything else.",
  },
] as const;

/** Paths included in sitemap.xml. */
export const publicRoutes = [
  "/",
  "/photobooth",
  "/book",
  "/rising-ops",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/sms",
] as const;
