"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type BaseChapter = {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description?: string;
};

export type ScrollStoryStageProps<T extends BaseChapter = BaseChapter> = {
  chapters: readonly T[];
  scrollTrackHeightVh?: number; // e.g. 500 = 500vh
  renderStage: (props: {
    progress: number;
    activeIndex: number;
    chapterProgress: number;
    isReducedMotion: boolean;
  }) => ReactNode;
  renderSidebar?: (props: {
    chapters: readonly T[];
    activeIndex: number;
    progress: number;
    onSelectChapter: (index: number) => void;
  }) => ReactNode;
  className?: string;
  ariaLabel?: string;
};

// External store for prefers-reduced-motion to avoid setState in effect
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Generic, reusable pinned scroll story stage.
 *
 * This primitive manages a continuous scroll track pinned to the viewport
 * using GSAP ScrollTrigger and CSS sticky positioning.
 *
 * It is completely domain-agnostic: a Photo Booth experience, an architectural
 * walkthrough (Exterior -> Living Room -> Kitchen), or an engineering breakdown
 * can all use this exact stage with custom chapter payloads.
 *
 * Accessibility & Performance:
 * - Honors `prefers-reduced-motion` via `useSyncExternalStore` by disabling pinning and rendering a clean linear sequence.
 * - Cleans up all GSAP timelines and ScrollTriggers on unmount using `gsap.context()`.
 * - Provides keyboard-accessible direct chapter selection controls.
 * - Optimized scroll updates: updates React state when chapters change or at stepped intervals,
 *   with direct DOM ref updates for the timeline scrub bar to prevent layout thrashing.
 * - Degrades gracefully if JavaScript is disabled.
 */
export function ScrollStoryStage<T extends BaseChapter>({
  chapters,
  scrollTrackHeightVh = 520,
  renderStage,
  renderSidebar,
  className = "",
  ariaLabel = "Interactive scroll story",
}: ScrollStoryStageProps<T>) {
  const stageId = useId();
  const trackId = `scroll-track-${stageId.replace(/:/g, "")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const totalChapters = chapters.length;
  const lastIndexRef = useRef(0);
  const lastPercentRef = useRef(0);

  // Jump directly to specific chapter by element ID (avoids reading refs during render)
  const handleSelectChapter = useCallback(
    (targetIndex: number) => {
      if (typeof window === "undefined") return;
      const trackEl = document.getElementById(trackId);
      if (!trackEl) return;

      const targetPercent = Math.min(Math.max(targetIndex / (totalChapters - 1), 0), 1);
      const trackRect = trackEl.getBoundingClientRect();
      const scrollY = window.scrollY;
      const trackTop = trackRect.top + scrollY;
      const scrollableDistance = trackRect.height - window.innerHeight;
      const targetScroll = trackTop + targetPercent * Math.max(scrollableDistance, 0);

      window.scrollTo({
        top: targetScroll,
        behavior: isReducedMotion ? "auto" : "smooth",
      });
    },
    [totalChapters, isReducedMotion, trackId]
  );

  useEffect(() => {
    if (isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = document.getElementById(trackId);
    if (!track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
        onUpdate: (self) => {
          const rawP = self.progress;

          // 1. Direct hardware-accelerated DOM updates for scrub line (avoids re-rendering React tree)
          const pct = Math.round(rawP * 100);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${pct}%`;
          }
          if (percentTextRef.current) {
            percentTextRef.current.textContent = `${pct}% Complete`;
          }

          // 2. Calculate active chapter index
          const index = Math.min(
            Math.floor(rawP * totalChapters),
            totalChapters - 1
          );

          if (index !== lastIndexRef.current) {
            lastIndexRef.current = index;
            setActiveIndex(index);
          }

          // 3. Local chapter progress [0, 1]
          const chapterSize = 1 / totalChapters;
          const localP = (rawP - index * chapterSize) / chapterSize;
          setChapterProgress(Math.min(Math.max(localP, 0), 1));

          // 4. Update percent state only when shifted
          if (Math.abs(pct - lastPercentRef.current) >= 2) {
            lastPercentRef.current = pct;
            setProgressPercent(pct);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion, totalChapters, trackId]);

  // If reduced motion is requested, render accessible unpinned linear sequence
  if (isReducedMotion) {
    return (
      <section
        ref={containerRef}
        aria-label={ariaLabel}
        className={`relative py-16 md:py-24 ${className}`}
      >
        <div className="container-site space-y-20">
          {chapters.map((chapter, idx) => (
            <article
              key={chapter.id}
              className="grid gap-8 rounded-3xl border border-line bg-ink-raised p-6 md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <p className="eyebrow text-signal">{chapter.eyebrow}</p>
                  <h3 className="heading mt-4 text-2xl md:text-3xl text-paper">
                    {chapter.title}
                  </h3>
                  {chapter.subtitle && (
                    <p className="mt-2 text-base text-paper-dim font-medium">
                      {chapter.subtitle}
                    </p>
                  )}
                  {chapter.description && (
                    <p className="mt-4 text-sm leading-relaxed text-mute">
                      {chapter.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="md:col-span-7">
                {renderStage({
                  progress: (idx + 0.5) / totalChapters,
                  activeIndex: idx,
                  chapterProgress: 0.5,
                  isReducedMotion: true,
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={`relative ${className}`}
    >
      {/* Pinned Scroll Track */}
      <div
        id={trackId}
        style={{ height: `${scrollTrackHeightVh}vh` }}
        className="relative w-full"
      >
        {/* Sticky Viewport Stage: stays pinned while visitor scrubs down the track */}
        <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col justify-center">
          <div className="container-site relative h-full flex flex-col justify-between py-4 sm:py-8 md:py-12">
            {/* Top Navigation & Direct Jump bar */}
            <header className="relative z-20 flex items-center justify-between gap-3 border-b border-line pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-2 rounded-full bg-signal animate-pulse" />
                <span className="font-mono text-[0.6875rem] sm:text-xs uppercase tracking-[0.14em] text-paper-dim">
                  Interactive Story // {chapters[activeIndex]?.chapter} of{" "}
                  {String(totalChapters).padStart(2, "0")}
                </span>
              </div>

              {/* Accessible step buttons */}
              <nav aria-label="Chapter progress navigation">
                <ol className="flex items-center gap-1 sm:gap-2">
                  {chapters.map((ch, i) => {
                    const isCurrent = i === activeIndex;
                    return (
                      <li key={ch.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectChapter(i)}
                          aria-label={`Jump to Chapter ${ch.chapter}: ${ch.title}`}
                          aria-current={isCurrent ? "step" : undefined}
                          className={`group relative flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[0.625rem] sm:text-[0.6875rem] transition-all duration-300 ${
                            isCurrent
                              ? "bg-paper text-ink font-semibold shadow-sm"
                              : "bg-ink-raised border border-line text-mute hover:border-line-strong hover:text-paper"
                          }`}
                        >
                          <span>{ch.chapter}</span>
                          <span className="hidden xl:inline text-[0.5625rem] opacity-75">
                            {ch.title.split(" ")[0]}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </header>

            {/* Main Stage Grid: Left Sidebar Story + Right Cinematic Stage Visual */}
            <div className="relative z-10 grid flex-1 items-center gap-6 py-4 md:grid-cols-12 md:gap-10 lg:gap-16">
              {/* Sidebar Content (Current Chapter Information) */}
              <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center order-2 md:order-1">
                {renderSidebar ? (
                  renderSidebar({
                    chapters,
                    activeIndex,
                    progress: progressPercent / 100,
                    onSelectChapter: handleSelectChapter,
                  })
                ) : (
                  <div className="space-y-4">
                    <p className="eyebrow text-signal">
                      {chapters[activeIndex]?.eyebrow}
                    </p>
                    <h2 className="heading text-[clamp(1.5rem,3.2vw,2.75rem)] text-paper transition-all duration-300">
                      {chapters[activeIndex]?.title}
                    </h2>
                    {chapters[activeIndex]?.subtitle && (
                      <p className="text-sm sm:text-base font-medium text-paper-dim">
                        {chapters[activeIndex]?.subtitle}
                      </p>
                    )}
                    {chapters[activeIndex]?.description && (
                      <p className="text-xs sm:text-sm leading-relaxed text-mute">
                        {chapters[activeIndex]?.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Cinematic Visual Stage Display */}
              <div className="relative md:col-span-7 lg:col-span-8 flex items-center justify-center order-1 md:order-2">
                {renderStage({
                  progress: progressPercent / 100,
                  activeIndex,
                  chapterProgress,
                  isReducedMotion,
                })}
              </div>
            </div>

            {/* Bottom Timeline Indicator & Track Bar */}
            <footer className="relative z-20 flex items-center justify-between gap-4 border-t border-line pt-3 sm:pt-4 font-mono text-[0.625rem] sm:text-[0.6875rem] text-mute">
              <div className="flex items-center gap-3">
                <span className="text-paper-dim">
                  Scroll to advance timeline
                </span>
                <span className="hidden sm:inline text-line-strong">|</span>
                <span ref={percentTextRef} className="hidden sm:inline">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Scrub Line with direct ref manipulation */}
              <div className="relative h-1 w-28 sm:w-48 overflow-hidden rounded-full bg-line">
                <div
                  ref={progressBarRef}
                  className="absolute inset-y-0 left-0 bg-signal transition-all duration-100 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
