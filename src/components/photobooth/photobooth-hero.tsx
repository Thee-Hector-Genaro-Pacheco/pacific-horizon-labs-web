"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PerspectiveViewport } from "@/components/immersive/perspective-viewport";
import { BoothVisual } from "@/components/booth-visual";
import { ButtonLink, StatusPill } from "@/components/ui";
import { photoBooth } from "@/config/products";

export function PhotoboothHero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !heroRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Controlled entrance motion sequence
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 }
        );
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4"
        );
      }

      if (ledeRef.current) {
        tl.fromTo(
          ledeRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
      }

      if (visualWrapperRef.current) {
        tl.fromTo(
          visualWrapperRef.current,
          { opacity: 0, y: 32, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.6"
        );

        // Subtle restrained scroll-depth parallax
        gsap.to(visualWrapperRef.current, {
          y: 40,
          rotateX: 2.5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="photobooth-hero-title"
      className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28"
    >
      {/* Background Engineering Hairline Grid */}
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-50"
      />

      {/* Subtle ambient dawn horizon glow (restrained) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 aspect-[3/1] w-[min(70rem,100%)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(242,166,90,0.07),transparent_70%)] blur-3xl"
      />

      <div className="container-site relative">
        {/* Top Badges */}
        <div ref={badgeRef} className="flex flex-wrap items-center gap-3">
          <StatusPill>{photoBooth.status}</StatusPill>
          <span className="eyebrow">{photoBooth.platform}</span>
          <span className="hidden sm:inline-block size-1 rounded-full bg-line-strong" />
          <span className="hidden sm:inline-block font-mono text-xs text-mute uppercase tracking-widest">
            Hardware Loop V2
          </span>
        </div>

        {/* Cinematic Main Headline */}
        <h1
          ref={headlineRef}
          id="photobooth-hero-title"
          className="display mt-6 max-w-[16ch] text-[clamp(2.75rem,7vw,5.75rem)] text-paper"
        >
          Pacific Horizon AI Photo Booth
        </h1>

        {/* Hero Lede & CTAs */}
        <div
          ref={ledeRef}
          className="mt-8 grid gap-8 md:grid-cols-12 md:items-end"
        >
          <p className="lede md:col-span-7">{photoBooth.summary}</p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href="/book">Book an event</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask a question
            </ButtonLink>
          </div>
        </div>

        {/* Featured Hardware Visual Container with Restrained Perspective */}
        <div
          ref={visualWrapperRef}
          className="relative mx-auto mt-14 max-w-5xl md:mt-20"
        >
          {/* Subtle Technical Frame Accents */}
          <div className="absolute -top-6 inset-x-0 hidden sm:flex items-center justify-between font-mono text-[0.625rem] tracking-[0.16em] text-mute uppercase">
            <span>FIGURE 1.0 // HARDWARE LOOP</span>
            <span className="text-signal">NATIVE IPADOS APPLICATION</span>
          </div>

          <PerspectiveViewport tiltAngleX={1.5} perspectivePx={1400}>
            <div className="relative group">
              <BoothVisual />
            </div>
          </PerspectiveViewport>

          {/* Quick anchor jump to the interactive story sequence */}
          <div className="mt-8 flex justify-center">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink-raised px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper-dim hover:border-line-strong hover:text-paper transition-all"
            >
              <span>Explore interactive story</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-signal"
              >
                <path
                  d="M8 3v10M4 9l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
