"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fades a section's body in (opacity 0 → 1, 24px upward slide) as it scrolls
 * into view, tied to scroll position. Wrap the body only, so headings stay
 * visible. No clip-path and no reserved height; without JS the content is
 * simply visible. Same behavior on every screen size and motion preference.
 */
export function FadeReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 70%", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
