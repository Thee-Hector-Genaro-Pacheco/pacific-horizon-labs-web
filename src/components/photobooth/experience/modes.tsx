"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { eventFrames, modeCards, type ModeMedia } from "@/config/photobooth-experience";
import { FadeReveal } from "./fade-reveal";

/**
 * The three capture modes guests choose from in the app, each with a short
 * screen recording, plus a row of real event-frame examples. Cards without
 * media are hidden; with no media at all the section renders nothing.
 */
export function Modes() {
  const cards = modeCards.filter((card) => card.media);
  if (cards.length === 0) return null;
  const frames = eventFrames.slice(0, 3);

  return (
    <section aria-labelledby="modes-title" className="pb-section">
      <div className="container-site">
        <div className="max-w-2xl">
          <h2 id="modes-title" className="pb-h2">
            Modes
          </h2>
          <p className="lede mt-5 text-(--pb-text-dim)">Guests pick one of these on the iPad.</p>
        </div>

        <FadeReveal className="mt-10">
          <ul className="grid gap-4 md:grid-cols-3" role="list">
            {cards.map((card) => (
              <li key={card.id} className="pb-card pb-mode">
                <ModeVideo media={card.media!} />
                <h3 className="mt-5 text-lg font-medium">{card.name}</h3>
                <p className="mt-2 text-(--pb-text-dim)">{card.description}</p>
              </li>
            ))}
          </ul>
        </FadeReveal>

        {frames.length > 0 && (
          <div className="mt-14">
            <h3 className="text-lg font-medium">Frames</h3>
            <p className="mt-2 text-(--pb-text-dim)">Event frame overlay on photos.</p>
            <p className="mt-1 text-sm text-(--pb-text-mute)">Custom event branding on guest screens: coming soon.</p>
            <FadeReveal className="mt-6">
              <ul className="grid gap-4 sm:grid-cols-3" role="list">
                {frames.map((frame) => (
                  <li key={frame.src} className="pb-frame">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      width={frame.width}
                      height={frame.height}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      unoptimized
                    />
                  </li>
                ))}
              </ul>
            </FadeReveal>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Muted looping recording that plays only while on screen. preload="none"
 * means nothing downloads until it first scrolls into view. With
 * prefers-reduced-motion it never plays, so only the poster shows.
 */
function ModeVideo({ media }: { media: ModeMedia }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (visible && !reducedMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reducedMotion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="pb-mode-video"
      poster={media.poster}
      width={media.width}
      height={media.height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={media.alt}
    >
      <source src={media.webm} type="video/webm" />
      <source src={media.mp4} type="video/mp4" />
    </video>
  );
}
