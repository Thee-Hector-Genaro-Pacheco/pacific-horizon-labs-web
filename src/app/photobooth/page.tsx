import { CtaBand } from "@/components/ui";
import { PhotoboothHero } from "@/components/photobooth/photobooth-hero";
import { PhotoboothStory } from "@/components/photobooth/photobooth-story";
import { EventExperienceGallery } from "@/components/photobooth/event-experience-gallery";
import { PhotoboothEngineering } from "@/components/photobooth/photobooth-engineering";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Photo Booth",
  description:
    "The Pacific Horizon AI Photo Booth is a native iPadOS application with real-time AR effects, multi-face tracking, photo and video capture, event branding, and QR-based delivery.",
  path: "/photobooth",
});

export default function PhotoBoothPage() {
  return (
    <>
      {/* SECTION 1: Cinematic Hero */}
      <PhotoboothHero />

      {/* SECTION 2: Immersive Scroll-Driven Storytelling ("From moment to memory") */}
      <PhotoboothStory />

      {/* SECTION 3: Event Experience Gallery */}
      <EventExperienceGallery />

      {/* SECTION 4: Engineering Architecture & Hardware Credibility */}
      <PhotoboothEngineering />

      {/* SECTION 5: Booking Resolution */}
      <CtaBand
        title="Planning an event?"
        body="Pick a date, see which time windows are open, and tell us about the venue and the experience you have in mind."
        primary={{ href: "/book", label: "Check dates and request" }}
        secondary={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
