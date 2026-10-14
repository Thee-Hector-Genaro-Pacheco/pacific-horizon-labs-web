"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallerySets } from "@/config/photobooth-experience";

const MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Opens a section through a circular aperture as it scrolls into view.
 * The clip is removed once open so it never crops tall content.
 */
export function IrisReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(
        el,
        { "--pb-iris-r": 0.04 },
        {
          "--pb-iris-r": 1,
          ease: "power1.in",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
            onLeave: () => (el.style.clipPath = "none"),
            onEnterBack: () => (el.style.clipPath = ""),
          },
        },
      );
      return () => (el.style.clipPath = "");
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={`pb-iris ${className}`}>
      {children}
    </div>
  );
}

/**
 * Pinned photo grid. Each later set opens over the previous one through an
 * iris as you scroll. Reduced motion: all sets listed one after another.
 */
export function IrisGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      const sets = gsap.utils.toArray<HTMLElement>("[data-set]", el).slice(1);
      const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });
      sets.forEach((set, i) => tl.fromTo(set, { "--pb-iris": 0 }, { "--pb-iris": 1, duration: 1 }, 0.3 + i * 1.5));
      tl.set({}, {}, "+=0.3");
      ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom bottom", animation: tl, scrub: 0.3 });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className="pb-gallery-track">
      <div className="pb-gallery-sticky">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 id="gallery-title" className="pb-h2">
              Gallery
            </h2>
            {gallerySets.some((set) => set.photos.some((p) => p.illustrative || !p.src)) && (
              <span className="pb-placeholder-tag">Illustrative images until real event photos are added</span>
            )}
          </div>
          <div className="pb-gallery-stack">
            {gallerySets.map((set, si) => (
              <div key={set.id} data-set className="pb-gallery-set">
                <h3 className="pb-eyebrow">
                  <span className="pb-accent">0{si + 1}</span> {set.label}
                </h3>
                <ul className="pb-gallery-grid" role="list" data-count={set.photos.length > 2 ? "many" : "few"}>
                  {set.photos.map((photo, pi) => (
                    <li key={pi} style={{ "--pb-tile-ar": `${photo.width} / ${photo.height}` } as CSSProperties}>
                      {photo.src ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          unoptimized
                        />
                      ) : (
                        <div role="img" aria-label={photo.alt} className="pb-tile-empty">
                          Photo coming soon
                        </div>
                      )}
                      {photo.illustrative && <span className="pb-placeholder-tag pb-tile-tag">Illustrative</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
