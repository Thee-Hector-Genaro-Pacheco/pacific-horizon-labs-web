"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { boothSequence, type BeatId } from "@/config/photobooth-experience";
import { BoothScreen } from "./booth-screen";
import { createFramesDriver, createVideoDriver, type MediaDriver } from "./sequence-media";

const { beats, media, scrollLength, mobileBreakpoint } = boothSequence;

/**
 * Pinned iPad scroll sequence. A CSS sticky container holds the iPad; one
 * scrubbed GSAP timeline (duration 1 = the whole track) animates the screen
 * layers, and its progress drives the footage and the side copy.
 *
 * With prefers-reduced-motion the CSS drops the pin and shows each beat as a
 * static screen next to its text, and no timeline is created.
 */
export function BoothSequence() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        mobile: `(max-width: ${mobileBreakpoint - 1}px)`,
      },
      (context) => {
        const { motion, mobile } = context.conditions as { motion: boolean; mobile: boolean };
        if (!motion) return;

        const screen = root.querySelector<HTMLElement>("[data-live] .pb-screen")!;
        const one = (sel: string) => screen.querySelector<HTMLElement>(sel);
        const all = (sel: string) => Array.from(screen.querySelectorAll<HTMLElement>(sel));
        const copy = Array.from(root.querySelectorAll<HTMLElement>("[data-beat-copy]"));
        const rail = Array.from(root.querySelectorAll<HTMLElement>("[data-rail] span"));

        let driver: MediaDriver | null = null;
        if (media.kind === "frames") {
          const canvas = screen.querySelector("canvas");
          if (canvas) driver = createFramesDriver(canvas, mobile ? media.mobile : media.desktop);
        } else if (media.kind === "video") {
          const video = screen.querySelector("video");
          if (video) driver = createVideoDriver(video, (mobile && media.mobileSrc) || media.src);
        }

        let active = -1;
        const setActive = (p: number) => {
          const idx = Math.max(0, beats.findIndex((b) => p >= b.range[0] && p <= b.range[1]));
          if (idx === active) return;
          active = idx;
          copy.forEach((el, i) => el.toggleAttribute("data-active", i === idx));
          rail.forEach((el, i) => el.toggleAttribute("data-on", i <= idx));
        };

        // Position inside a beat: at("lock", 0.5) = halfway through the lock beat.
        const range = (id: BeatId) => beats.find((b) => b.id === id)!.range;
        const at = (id: BeatId, f: number) => {
          const [a, b] = range(id);
          return a + (b - a) * f;
        };
        const span = (id: BeatId, f: number) => {
          const [a, b] = range(id);
          return (b - a) * f;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            const p = tl.progress();
            driver?.seek(p);
            setActive(p);
          },
        });
        tl.set({}, {}, 1); // pin total duration to 1

        if (boothSequence.drawInterface) {
          const welcome = one("[data-welcome]");
          const dimmer = one("[data-dimmer]");
          const brackets = all("[data-bracket]");
          const glow = one("[data-ring]");
          const nums = all("[data-num]");
          const flash = one("[data-flash]");
          const photo = one("[data-photo]");
          const qr = one("[data-qr]");

          // 1. Ready screen clears
          tl.to(welcome, { opacity: 0, scale: 1.04, duration: span("idle", 0.4) }, at("idle", 0.6));
          tl.to(dimmer, { opacity: 0, duration: span("idle", 0.4) }, at("idle", 0.6));

          // 2. Brackets settle in, then light up (cyan = tracking)
          tl.fromTo(
            brackets,
            { opacity: 0, scale: 1.15 },
            { opacity: 1, scale: 1, ease: "power3.out", stagger: span("lock", 0.1), duration: span("lock", 0.35) },
            at("lock", 0.05),
          );
          tl.to(screen, { "--pb-lock": 1, duration: span("lock", 0.12) }, at("lock", 0.55));

          // 3. Five-second countdown: background racks out of focus, 5 → 1 tick in turn
          tl.to(screen, { "--pb-rack": 1, duration: span("countdown", 0.12) }, at("countdown", 0));
          tl.to(glow, { opacity: 1, duration: span("countdown", 0.08) }, at("countdown", 0.04));
          const slot = 0.86 / nums.length;
          nums.forEach((num, k) => {
            const start = at("countdown", 0.08 + k * slot);
            const len = span("countdown", slot);
            tl.fromTo(num, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, ease: "power2.out", duration: len * 0.4 }, start);
            tl.fromTo(glow, { scale: 1.12 }, { scale: 1, ease: "power2.out", duration: len * 0.4 }, start);
            tl.to(num, { opacity: 0, scale: 0.9, duration: len * 0.3 }, start + len * 0.68);
          });
          tl.to([glow, ...brackets], { opacity: 0, duration: span("countdown", 0.06) }, at("countdown", 0.94));

          // 4. Capture: rack back to sharp, shutter closes and opens, chromatic flash
          tl.to(screen, { "--pb-rack": 0, duration: span("capture", 0.2) }, at("capture", 0));
          tl.to(screen, { "--pb-aperture": 0, ease: "power2.in", duration: span("capture", 0.3) }, at("capture", 0));
          tl.to(flash, { opacity: 1, duration: span("capture", 0.06) }, at("capture", 0.28));
          tl.set(photo, { opacity: 1 }, at("capture", 0.32));
          tl.fromTo(screen, { "--pb-split": 0 }, { "--pb-split": 1, duration: span("capture", 0.5) }, at("capture", 0.3));
          tl.to(screen, { "--pb-aperture": 1, ease: "power2.out", duration: span("capture", 0.35) }, at("capture", 0.36));
          tl.to(flash, { opacity: 0, duration: span("capture", 0.45) }, at("capture", 0.4));

          // 5. Delivery: the photo settles to the right, the QR code slides in
          tl.to(dimmer, { opacity: 0.85, duration: span("result", 0.2) }, at("result", 0.05));
          tl.fromTo(
            photo,
            { xPercent: 0, yPercent: 0, scale: 1 },
            { xPercent: 50, yPercent: 26, scale: 0.42, ease: "power3.inOut", duration: span("result", 0.3) },
            at("result", 0.05),
          );
          tl.fromTo(qr, { opacity: 0, x: -40 }, { opacity: 1, x: 0, ease: "power2.out", duration: span("result", 0.2) }, at("result", 0.35));
        }

        setActive(0);
        driver?.seek(0);

        ScrollTrigger.create({
          trigger: root.querySelector("[data-track]"),
          start: "top top",
          end: "bottom bottom",
          animation: tl,
          scrub: mobile ? true : 0.4,
        });

        return () => driver?.destroy();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="how-it-works" aria-labelledby="how-it-works-title">
      <div
        data-track
        className="pb-seq-track"
        style={
          {
            "--pb-seq-desktop": `${scrollLength.desktop}svh`,
            "--pb-seq-mobile": `${scrollLength.mobile}svh`,
          } as CSSProperties
        }
      >
        <div className="pb-seq-sticky">
          <div className="container-site pb-seq-grid">
            <div>
              <h2 id="how-it-works-title" className="pb-eyebrow">
                How a session works
              </h2>
              <div data-rail className="pb-rail mt-4" aria-hidden="true">
                {beats.map((b, i) => (
                  <span key={b.id} {...(i === 0 ? { "data-on": "" } : {})} />
                ))}
              </div>
              <ol className="pb-beats">
                {beats.map((b, i) => (
                  <li key={b.id} data-beat-copy className="pb-beat" {...(i === 0 ? { "data-active": "" } : {})}>
                    <div className="pb-beat-still">
                      {b.still ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.still} alt={b.stillAlt} width={1440} height={1080} loading="lazy" decoding="async" className="w-full rounded-xl" />
                      ) : (
                        <div className="pb-ipad" role="img" aria-label={b.stillAlt}>
                          <BoothScreen beat={b.id} />
                        </div>
                      )}
                    </div>
                    <span className="pb-eyebrow block">
                      <span className="pb-accent">0{i + 1}</span> {b.label}
                    </span>
                    <h3 className="mt-2">{b.heading}</h3>
                    <p>{b.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pb-seq-device" data-live>
              <div
                className="pb-ipad"
                role="img"
                aria-label="An iPad photo booth screen showing three guests at a gala. As you scroll it steps through a session: ready screen, face tracking, a five-second countdown, capture, and a QR code to download the photo."
              >
                <BoothScreen media={liveMedia()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Footage layer for the live screen; undefined keeps the generated scene. */
function liveMedia() {
  if (media.kind === "frames") {
    const { width, height } = media.desktop;
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.poster} alt="" width={width} height={height} className="pb-layer pb-media" decoding="async" />
        <canvas className="pb-layer pb-media pb-rack" width={width} height={height} />
      </>
    );
  }
  if (media.kind === "video") {
    return (
      <video
        className="pb-layer pb-media pb-rack"
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      />
    );
  }
  return undefined;
}
