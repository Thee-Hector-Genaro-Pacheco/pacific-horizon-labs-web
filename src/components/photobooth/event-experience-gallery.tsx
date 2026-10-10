"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ButtonLink, SectionHeader } from "@/components/ui";
import {
  photoboothGalleryCategories,
  type GalleryCategory,
} from "@/config/photobooth-gallery";
import { GallerySceneArtwork } from "@/components/photobooth/gallery-scene-artwork";

export function EventExperienceGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory: GalleryCategory =
    photoboothGalleryCategories[activeIndex] ?? photoboothGalleryCategories[0];

  // WAI-ARIA arrow key navigation for tablist
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const total = photoboothGalleryCategories.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % total);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };

  return (
    <section
      id="gallery"
      aria-labelledby="event-gallery-title"
      className="border-t border-line py-24 md:py-32"
    >
      <div className="container-site">
        <SectionHeader
          id="event-gallery-title"
          index="02"
          label="Event Environments"
          title="Engineered for every occasion."
          intro="Every event format can be configured with custom frame branding, tailored capture modes, and delivery flows suited to your venue."
        />

        {/* Large Accessible Category Navigation Tabs */}
        <div className="mt-12 md:mt-16">
          <div
            role="tablist"
            aria-label="Event category selector"
            onKeyDown={handleKeyDown}
            className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
          >
            {photoboothGalleryCategories.map((cat, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative shrink-0 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "bg-paper text-ink font-semibold shadow-md"
                      : "border border-line bg-ink text-mute hover:border-line-strong hover:text-paper"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        isSelected ? "bg-signal" : "bg-line-strong"
                      }`}
                    />
                    <span>0{idx + 1}</span>
                    <span>{cat.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Active Scene Showcase */}
        <div
          key={activeCategory.id}
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          className="mt-8 overflow-hidden rounded-3xl border border-line bg-ink-raised transition-all duration-500 animate-in fade-in"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Visual Media Stage */}
            <div className="relative lg:col-span-7 bg-[#050607] p-4 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-line overflow-hidden">
              {/* Background Hairline Grid */}
              <div
                aria-hidden="true"
                className="grid-field pointer-events-none absolute inset-0 opacity-40"
              />

              {/*
                ========================================================================
                SLOT FOR REAL PRODUCTION MEDIA:
                File: src/config/photobooth-gallery.ts (media.src)
                When high-res production photography or short video loops are ready,
                uncomment and provide src in photobooth-gallery.ts:

                {activeCategory.media.src ? (
                  <Image
                    src={activeCategory.media.src}
                    alt={activeCategory.media.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <GallerySceneArtwork categoryId={activeCategory.id} />
                )}
                ========================================================================
              */}
              <div className="relative w-full max-w-xl aspect-[16/10] overflow-hidden rounded-2xl border border-line-strong bg-ink shadow-2xl">
                {activeCategory.media.src ? (
                  <div className="relative size-full">
                    <Image
                      src={activeCategory.media.src}
                      alt={activeCategory.media.alt}
                      fill
                      unoptimized
                      className="object-cover object-center"
                    />
                    {/* Event frame overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 flex flex-col justify-between p-4 sm:p-5 pointer-events-none">
                      <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                        <div>
                          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-paper uppercase font-semibold">
                            {activeCategory.media.frameTheme.headerText}
                          </p>
                          <p className="font-mono text-[0.5625rem] text-mute tracking-wider mt-0.5">
                            {activeCategory.media.frameTheme.subText}
                          </p>
                        </div>
                        <span className="rounded-full border border-line bg-black/50 px-2.5 py-1 font-mono text-[0.5rem] tracking-widest text-signal uppercase backdrop-blur">
                          {activeCategory.media.frameTheme.badgeText}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/15 pt-2.5 font-mono text-[0.5625rem] text-mute">
                        <span>FRAME LAYOUT // 16:9 &amp; 4x6</span>
                        <span className="text-paper-dim">PACIFIC HORIZON ENGINE</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <GallerySceneArtwork categoryId={activeCategory.id} />
                )}
              </div>
            </div>

            {/* Content & Capabilities Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Category Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-signal">
                    <span className="size-1.5 rounded-full bg-signal" />
                    {activeCategory.badge}
                  </span>
                  <span className="font-mono text-xs text-mute uppercase tracking-widest">
                    Format 0{activeIndex + 1}
                  </span>
                </div>

                {/* Title and Tagline */}
                <div>
                  <h3 className="heading text-2xl sm:text-3xl text-paper">
                    {activeCategory.label}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-medium text-paper-dim">
                    {activeCategory.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-mute">
                  {activeCategory.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 pt-2">
                  <p className="eyebrow text-paper-dim">Included Experiences</p>
                  <ul className="space-y-2">
                    {activeCategory.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-paper-dim">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Configuration Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-line">
                  {activeCategory.specs.map((spec) => (
                    <div key={spec.label} className="rounded-lg bg-ink p-2.5 border border-line">
                      <p className="font-mono text-[0.5625rem] uppercase tracking-wider text-mute">
                        {spec.label}
                      </p>
                      <p className="font-mono text-xs font-medium text-paper mt-1">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <ButtonLink href="/book">
                  Book for {activeCategory.label}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Discuss format
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
