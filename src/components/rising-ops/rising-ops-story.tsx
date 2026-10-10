"use client";

import { ScrollStoryStage } from "@/components/immersive/scroll-story-stage";
import { RisingOpsStageVisual } from "@/components/rising-ops/rising-ops-stage-visual";
import {
  risingOpsStoryChapters,
  type RisingOpsChapter,
} from "@/config/rising-ops-story";

export function RisingOpsStory() {
  return (
    <div id="operations-flow" className="border-t border-line">
      <ScrollStoryStage<RisingOpsChapter>
        chapters={risingOpsStoryChapters}
        scrollTrackHeightVh={580}
        ariaLabel="From signal to decision: The supervised Pacific Rising Ops workflow"
        renderStage={({ activeIndex, chapterProgress, isReducedMotion }) => (
          <RisingOpsStageVisual
            activeIndex={activeIndex}
            chapterProgress={chapterProgress}
            isReducedMotion={isReducedMotion}
          />
        )}
        renderSidebar={({ chapters, activeIndex }) => {
          const current = chapters[activeIndex];
          if (!current) return null;

          return (
            <div
              key={current.id}
              className="space-y-3 sm:space-y-5 md:space-y-6 anim-chapter-reveal"
            >
              {/* Chapter eyebrow and step index */}
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-signal" />
                <p className="eyebrow text-signal">{current.eyebrow}</p>
                <span className="ml-auto rounded bg-ink px-2 py-0.5 font-mono text-[0.625rem] border border-line text-tide">
                  {current.statusBadge}
                </span>
              </div>

              {/* Chapter Main Heading */}
              <div>
                <h2 className="heading text-[clamp(1.5rem,3.8vw,3.25rem)] text-paper transition-all duration-300">
                  {current.title}
                </h2>
                <p className="mt-1 sm:mt-2.5 text-xs sm:text-sm md:text-base font-medium text-paper-dim">
                  {current.subtitle}
                </p>
              </div>

              {/* Narrative description */}
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-mute line-clamp-3 sm:line-clamp-none">
                {current.description}
              </p>

              {/* Architecture tags */}
              <div className="hidden sm:flex flex-wrap gap-2 pt-1">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-line bg-ink px-2.5 py-1 font-mono text-[0.6875rem] tracking-wider text-paper-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Technical telemetry metrics */}
              <div className="grid grid-cols-3 gap-2 rounded-xl border border-line-strong bg-ink-raised p-2 sm:p-3">
                {current.metrics.map((m) => (
                  <div key={m.label} className="space-y-0.5 sm:space-y-1">
                    <p className="font-mono text-[0.5rem] sm:text-[0.5625rem] tracking-widest text-mute uppercase">
                      {m.label}
                    </p>
                    <p className="font-mono text-[0.6875rem] sm:text-xs md:text-sm font-medium text-paper">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
