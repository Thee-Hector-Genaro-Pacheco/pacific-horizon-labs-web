"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ParallaxLayerProps = {
  children: ReactNode;
  /**
   * Vertical pixel displacement offset during scroll.
   * Positive moves down with scroll, negative moves against scroll (parallax depth).
   * Default: -30
   */
  speed?: number;
  className?: string;
  triggerId?: string;
};

/**
 * Reusable parallax depth primitive.
 *
 * Provides subtle, hardware-accelerated foreground/background parallax
 * using GSAP ScrollTrigger and CSS transforms.
 *
 * Domain-agnostic: can be used for product mockups, architectural layers,
 * typography offsets, or floating technical metadata.
 *
 * Accessibility:
 * - Automatically bypassed when `prefers-reduced-motion` is active.
 * - Cleans up GSAP contexts on unmount.
 */
export function ParallaxLayer({
  children,
  speed = -30,
  className = "",
  triggerId,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !layerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const target = layerRef.current;
    const trigger = triggerId
      ? document.getElementById(triggerId) || target
      : target;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { y: -speed / 2 },
        {
          y: speed / 2,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [speed, triggerId]);

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
