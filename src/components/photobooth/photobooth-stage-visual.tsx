"use client";

import { useId } from "react";
import Image from "next/image";
import { photoboothStoryMedia } from "@/config/photobooth-story";

export type PhotoboothStageVisualProps = {
  activeIndex: number; // 0 to 5
  chapterProgress: number; // 0 to 1 inside current chapter
  isReducedMotion: boolean;
};

// Fixed QR pattern for touchless retrieval handoff
const QR_BITS = [
  "111010111",
  "101001101",
  "111011111",
  "000110000",
  "110101011",
  "001010100",
  "111001101",
  "101110010",
  "111010111",
];

/**
 * Visual engine for the 6-chapter scroll story stage.
 *
 * Implements a continuous visual pipeline that seamlessly accepts a single
 * centralized synthetic/production event image (`photoboothStoryMedia.baseEventImageSrc`),
 * flowing continuously through:
 * 1. Live camera feed (with HUD, reticles, and scanlines)
 * 2. AR tracking overlay
 * 3. Captured freeze-frame (with flash and 3D card lift)
 * 4. Branded event frame composition
 * 5. Smartphone screen delivery preview
 * 6. Physical print keepsake
 *
 * When no image source is configured, high-fidelity synthetic silhouette vector artwork
 * renders automatically as fallback across all chapters.
 *
 * Chapter 05 (Guest Handoff / QR) features a balanced, scaled-down composition ensuring
 * generous padding, vertically centered elements, and zero text clipping at all screen sizes.
 */
export function PhotoboothStageVisual({
  activeIndex,
  chapterProgress,
  isReducedMotion,
}: PhotoboothStageVisualProps) {
  const gradientId = useId();

  // Clamp active index between 0 and 5
  const step = Math.min(Math.max(activeIndex, 0), 5);
  const transitionClass = isReducedMotion
    ? ""
    : "transition-all duration-700 ease-out";

  const hasEventImage = Boolean(photoboothStoryMedia.baseEventImageSrc);

  // Dynamic slow pan/zoom & subtle parallax transform across scroll story
  const dynamicTransform = isReducedMotion
    ? step >= 2
      ? "scale(0.97)"
      : "scale(1)"
    : step === 0
    ? `scale(${1.02 + chapterProgress * 0.035}) translateY(${chapterProgress * -6}px)`
    : step === 1
    ? `scale(${1.05 + chapterProgress * 0.025}) translateX(${chapterProgress * 5}px)`
    : step === 2
    ? "scale(0.97) translateY(-4px)"
    : step === 3
    ? "scale(0.985)"
    : step >= 4
    ? "scale(0.96) translateY(4px)"
    : "scale(1)";

  return (
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl select-none">
      {/* Device Enclosure: Industrial iPad chassis with fine rim lighting */}
      <div className="relative rounded-[1.75rem] sm:rounded-[2.25rem] border border-line-strong bg-[#050607] p-2.5 sm:p-4 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(242,166,90,0.12)]">
        {/* Hardware Camera Dot */}
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1.5 hidden size-2 -translate-y-1/2 rounded-full border border-paper/10 bg-paper/20 sm:block"
        />

        {/* Display Glass Viewport (4:3 aspect ratio) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem] bg-ink-raised border border-white/5">
          {/* Base Visual Scene: Configured Synthetic Image OR Silhouette Vector Artwork Fallback */}
          {hasEventImage && photoboothStoryMedia.baseEventImageSrc ? (
            <div className="absolute inset-0 size-full overflow-hidden">
              <Image
                src={photoboothStoryMedia.baseEventImageSrc}
                alt={photoboothStoryMedia.alt}
                fill
                unoptimized
                className={`size-full object-cover ${transitionClass}`}
                style={{
                  transform: dynamicTransform,
                  filter: step >= 3 ? "brightness(0.9) contrast(1.08)" : "none",
                }}
              />
              {/* Subtle ambient dusk tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          ) : (
            /* Synthetic Vector Scene Plate Fallback */
            <svg
              viewBox="0 0 800 600"
              className={`absolute inset-0 size-full ${transitionClass}`}
              style={{
                transform: dynamicTransform,
                filter: step >= 3 ? "brightness(0.9) contrast(1.08)" : "none",
              }}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id={`${gradientId}-bg`} cx="50%" cy="35%" r="85%">
                  <stop offset="0%" stopColor="#2c2117" />
                  <stop offset="50%" stopColor="#151315" />
                  <stop offset="100%" stopColor="#08080a" />
                </radialGradient>
                <radialGradient id={`${gradientId}-warmth`} cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#f2a65a" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#f2a65a" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#f2a65a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={`${gradientId}-skin1`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3d342d" />
                  <stop offset="100%" stopColor="#221e1a" />
                </linearGradient>
                <linearGradient id={`${gradientId}-skin2`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#372f29" />
                  <stop offset="100%" stopColor="#1e1b18" />
                </linearGradient>
                <linearGradient id={`${gradientId}-body`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1f2227" />
                  <stop offset="100%" stopColor="#111316" />
                </linearGradient>
              </defs>

              {/* Background Studio Fill & Atmospheric Warmth Glow */}
              <rect width="800" height="600" fill={`url(#${gradientId}-bg)`} />
              <circle cx="400" cy="240" r="320" fill={`url(#${gradientId}-warmth)`} />

              {/* Ambient Venue Bokeh Lights */}
              <g fill="#f5cd9e" opacity="0.4">
                <circle cx="140" cy="120" r="18" opacity="0.18" />
                <circle cx="210" cy="180" r="10" opacity="0.3" />
                <circle cx="260" cy="90" r="22" opacity="0.15" />
                <circle cx="560" cy="130" r="20" opacity="0.2" />
                <circle cx="630" cy="190" r="12" opacity="0.32" />
                <circle cx="670" cy="95" r="24" opacity="0.15" />
                <circle cx="390" cy="110" r="8" opacity="0.4" />
              </g>

              {/* Architectural Backdrop Curtains & Studio Guide Lines */}
              <g stroke="#eceae4" strokeOpacity="0.04">
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`x-${i}`} x1={(i + 1) * 80} y1="0" x2={(i + 1) * 80} y2="600" />
                ))}
                {Array.from({ length: 7 }, (_, i) => (
                  <line key={`y-${i}`} x1="0" y1={(i + 1) * 75} x2="800" y2={(i + 1) * 75} />
                ))}
              </g>

              {/* Simulated Event Guests (Silhouettes with warm rim highlights) */}
              <g transform="translate(0 600)">
                {/* Subject 01 (Left) */}
                <g transform="translate(290 0) scale(1)">
                  <ellipse cx="0" cy="-160" rx="46" ry="56" fill={`url(#${gradientId}-skin1)`} />
                  <ellipse
                    cx="0"
                    cy="-160"
                    rx="46"
                    ry="56"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                  />
                  <path
                    d="M-120 40 C -120 -45, -65 -85, 0 -85 C 65 -85, 120 -45, 120 40 Z"
                    fill={`url(#${gradientId}-body)`}
                  />
                  <path
                    d="M -20 -60 L 0 -10 L 20 -60"
                    stroke="#f2a65a"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    fill="none"
                  />
                </g>

                {/* Subject 02 (Right) */}
                <g transform="translate(520 0) scale(0.95)">
                  <ellipse cx="0" cy="-160" rx="45" ry="55" fill={`url(#${gradientId}-skin2)`} />
                  <ellipse
                    cx="0"
                    cy="-160"
                    rx="45"
                    ry="55"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                  />
                  <path
                    d="M-115 40 C -115 -45, -60 -85, 0 -85 C 60 -85, 115 -45, 115 40 Z"
                    fill={`url(#${gradientId}-body)`}
                  />
                  <path
                    d="M -18 -60 L 0 -10 L 18 -60"
                    stroke="#f2a65a"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    fill="none"
                  />
                </g>
              </g>
            </svg>
          )}

          {/* SVG Camera HUD & AR Overlay Layer (Renders over both image and vector fallback) */}
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 size-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Center Focal Crosshairs */}
            <g stroke="#f2a65a" strokeOpacity="0.4" strokeWidth="1" className={isReducedMotion ? "" : "anim-crosshair"}>
              <line x1="388" y1="300" x2="412" y2="300" />
              <line x1="400" y1="288" x2="400" y2="312" />
              <circle cx="400" cy="300" r="10" fill="none" stroke="#f2a65a" strokeOpacity="0.2" />
            </g>

            {/* CHAPTER 01 & 02: Face Detection HUD Reticles */}
            <g
              className="transition-opacity duration-500"
              style={{ opacity: step <= 1 ? 1 : 0.15 }}
            >
              {hasEventImage && photoboothStoryMedia.baseEventImageSrc ? (
                <>
                  {/* Face 01 (Left Guest) */}
                  <g className={isReducedMotion ? "" : "anim-reticle"}>
                    <path
                      d="M 216 192 V 176 H 232 M 308 176 H 324 V 192 M 324 274 V 290 H 308 M 232 290 H 216 V 274"
                      fill="none"
                      stroke="#f2a65a"
                      strokeWidth="1.5"
                    />
                    {/* Corner Lock-On Dots */}
                    <circle cx="216" cy="176" r="2" fill="#f2a65a" />
                    <circle cx="324" cy="176" r="2" fill="#f2a65a" />
                    <circle cx="324" cy="290" r="2" fill="#f2a65a" />
                    <circle cx="216" cy="290" r="2" fill="#f2a65a" />
                    {/* Internal Focal Target */}
                    <line x1="266" y1="233" x2="274" y2="233" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <line x1="270" y1="229" x2="270" y2="237" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <text
                      x="216"
                      y="168"
                      fill="#f2a65a"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      FACE 01 // TRACKED
                    </text>
                  </g>

                  {/* Face 02 (Center Guest) */}
                  <g className={isReducedMotion ? "" : "anim-reticle"}>
                    <path
                      d="M 338 134 V 118 H 354 M 432 118 H 448 V 134 M 448 218 V 234 H 432 M 354 234 H 338 V 218"
                      fill="none"
                      stroke="#f2a65a"
                      strokeWidth="1.5"
                    />
                    {/* Corner Lock-On Dots */}
                    <circle cx="338" cy="118" r="2" fill="#f2a65a" />
                    <circle cx="448" cy="118" r="2" fill="#f2a65a" />
                    <circle cx="448" cy="234" r="2" fill="#f2a65a" />
                    <circle cx="338" cy="234" r="2" fill="#f2a65a" />
                    {/* Internal Focal Target */}
                    <line x1="389" y1="176" x2="397" y2="176" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <line x1="393" y1="172" x2="393" y2="180" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <text
                      x="338"
                      y="110"
                      fill="#f2a65a"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      FACE 02 // TRACKED
                    </text>
                  </g>

                  {/* Face 03 (Right Guest) */}
                  <g className={isReducedMotion ? "" : "anim-reticle"}>
                    <path
                      d="M 502 158 V 142 H 518 M 590 142 H 606 V 158 M 606 236 V 252 H 590 M 518 252 H 502 V 236"
                      fill="none"
                      stroke="#f2a65a"
                      strokeWidth="1.5"
                    />
                    {/* Corner Lock-On Dots */}
                    <circle cx="502" cy="142" r="2" fill="#f2a65a" />
                    <circle cx="606" cy="142" r="2" fill="#f2a65a" />
                    <circle cx="606" cy="252" r="2" fill="#f2a65a" />
                    <circle cx="502" cy="252" r="2" fill="#f2a65a" />
                    {/* Internal Focal Target */}
                    <line x1="550" y1="197" x2="558" y2="197" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <line x1="554" y1="193" x2="554" y2="201" stroke="#f2a65a" strokeOpacity="0.35" strokeWidth="1" />
                    <text
                      x="502"
                      y="134"
                      fill="#f2a65a"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      FACE 03 // TRACKED
                    </text>
                  </g>
                </>
              ) : (
                <>
                  {/* Fallback Subject 01 Caliper */}
                  <g transform="translate(244 392)" className={isReducedMotion ? "" : "anim-reticle"}>
                    <path
                      d="M0 20V0H20 M72 0H92V20 M92 76V96H72 M20 96H0V76"
                      fill="none"
                      stroke="#f2a65a"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="-8"
                      fill="#f2a65a"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      FACE 01 // TRACKED
                    </text>
                  </g>

                  {/* Fallback Subject 02 Caliper */}
                  <g transform="translate(474 392)" className={isReducedMotion ? "" : "anim-reticle"}>
                    <path
                      d="M0 20V0H20 M72 0H92V20 M92 76V96H72 M20 96H0V76"
                      fill="none"
                      stroke="#f2a65a"
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="-8"
                      fill="#f2a65a"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      FACE 02 // TRACKED
                    </text>
                  </g>
                </>
              )}
            </g>

            {/* CHAPTER 02: Augmented Reality Landmark Mesh & Celestial AR Element */}
            <g
              className={transitionClass}
              style={{
                opacity: step === 1 ? 1 : step === 2 ? 0.35 : 0,
                transform: step >= 1 ? "scale(1)" : "scale(0.96)",
                transformOrigin:
                  hasEventImage && photoboothStoryMedia.baseEventImageSrc
                    ? "390px 170px"
                    : "400px 420px",
              }}
            >
              {hasEventImage && photoboothStoryMedia.baseEventImageSrc ? (
                <>
                  {/* Celestial AR Halo Above Guests */}
                  <g stroke="#f2a65a" strokeWidth="1" fill="none" opacity="0.85">
                    {/* Face 01 Halo */}
                    <g className={isReducedMotion ? "" : "anim-reticle"}>
                      <ellipse cx="270" cy="158" rx="28" ry="8" strokeOpacity="0.65" strokeDasharray="4 2" />
                      <circle cx="270" cy="150" r="2" fill="#f2a65a" />
                      <circle cx="248" cy="155" r="1.5" fill="#f2a65a" />
                      <circle cx="292" cy="155" r="1.5" fill="#f2a65a" />
                    </g>

                    {/* Face 02 Halo */}
                    <g className={isReducedMotion ? "" : "anim-reticle"}>
                      <ellipse cx="393" cy="100" rx="32" ry="9" strokeOpacity="0.65" strokeDasharray="5 2.5" />
                      <circle cx="393" cy="91" r="2" fill="#f2a65a" />
                      <circle cx="368" cy="97" r="1.5" fill="#f2a65a" />
                      <circle cx="418" cy="97" r="1.5" fill="#f2a65a" />
                    </g>

                    {/* Face 03 Halo */}
                    <g className={isReducedMotion ? "" : "anim-reticle"}>
                      <ellipse cx="554" cy="124" rx="30" ry="8" strokeOpacity="0.65" strokeDasharray="4 2" />
                      <circle cx="554" cy="116" r="2" fill="#f2a65a" />
                      <circle cx="530" cy="121" r="1.5" fill="#f2a65a" />
                      <circle cx="578" cy="121" r="1.5" fill="#f2a65a" />
                    </g>
                  </g>

                  {/* Face 01 Landmark Dots & Minimal Mesh */}
                  <g fill="#f2a65a" fillOpacity="0.85">
                    {[
                      [240, 219], [248, 217], [257, 216],
                      [275, 213], [281, 211], [287, 211],
                      [275, 216], [267, 229], [274, 237], [283, 235],
                      [260, 250], [276, 243], [288, 249], [283, 268], [272, 268],
                    ].map(([cx, cy], i) => (
                      <circle key={`f1-${i}`} cx={cx} cy={cy} r="1.75" />
                    ))}
                  </g>
                  <path
                    d="M 248 217 L 275 216 L 281 211 M 275 216 L 274 237 M 260 250 Q 272 268 288 249"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                  />

                  {/* Face 02 Landmark Dots & Minimal Mesh */}
                  <g fill="#f2a65a" fillOpacity="0.85">
                    {[
                      [358, 166], [365, 162], [373, 161],
                      [395, 152], [402, 148], [408, 147],
                      [383, 159], [378, 174], [386, 182], [397, 177],
                      [379, 196], [395, 188], [412, 183], [415, 192], [401, 205], [383, 206],
                    ].map(([cx, cy], i) => (
                      <circle key={`f2-${i}`} cx={cx} cy={cy} r="1.75" />
                    ))}
                  </g>
                  <path
                    d="M 365 162 L 383 159 L 402 148 M 383 159 L 386 182 M 379 196 Q 396 207 415 190"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                  />

                  {/* Face 03 Landmark Dots & Minimal Mesh */}
                  <g fill="#f2a65a" fillOpacity="0.85">
                    {[
                      [536, 173], [541, 174], [546, 176],
                      [568, 180], [575, 182], [582, 185],
                      [548, 175], [535, 188], [538, 195], [548, 197],
                      [525, 202], [537, 200], [558, 212], [550, 222], [535, 223],
                    ].map(([cx, cy], i) => (
                      <circle key={`f3-${i}`} cx={cx} cy={cy} r="1.75" />
                    ))}
                  </g>
                  <path
                    d="M 541 174 L 548 175 L 575 182 M 548 175 L 538 195 M 525 202 Q 540 223 558 212"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                  />
                </>
              ) : (
                <>
                  {/* Fallback Celestial AR Halo Above Subject 01 */}
                  <g stroke="#f2a65a" strokeWidth="1" fill="none" opacity="0.8">
                    <ellipse cx="290" cy="380" rx="35" ry="10" strokeOpacity="0.65" />
                    <circle cx="290" cy="370" r="2" fill="#f2a65a" />
                    <circle cx="270" cy="374" r="1.5" fill="#f2a65a" />
                    <circle cx="310" cy="374" r="1.5" fill="#f2a65a" />
                  </g>

                  {/* Fallback Celestial AR Halo Above Subject 02 */}
                  <g stroke="#f2a65a" strokeWidth="1" fill="none" opacity="0.8">
                    <ellipse cx="520" cy="392" rx="34" ry="10" strokeOpacity="0.65" />
                    <circle cx="520" cy="382" r="2" fill="#f2a65a" />
                    <circle cx="502" cy="386" r="1.5" fill="#f2a65a" />
                    <circle cx="538" cy="386" r="1.5" fill="#f2a65a" />
                  </g>

                  {/* Fallback Subject 1 Mesh Points */}
                  <g fill="#f2a65a" fillOpacity="0.85">
                    {[
                      [262, 430], [290, 418], [318, 430], [276, 456], [304, 456], [290, 478],
                      [260, 470], [320, 470], [274, 490], [306, 490], [290, 502],
                    ].map(([cx, cy], i) => (
                      <circle key={`m1-${i}`} cx={cx} cy={cy} r="2.5" />
                    ))}
                  </g>
                  <path
                    d="M262 430 L290 418 L318 430 M276 456 L290 478 L304 456 M260 470 L290 502 L320 470"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                  />

                  {/* Fallback Subject 2 Mesh Points */}
                  <g fill="#f2a65a" fillOpacity="0.85">
                    {[
                      [494, 440], [520, 428], [546, 440], [507, 464], [533, 464], [520, 484],
                      [492, 478], [548, 478], [505, 496], [535, 496], [520, 506],
                    ].map(([cx, cy], i) => (
                      <circle key={`m2-${i}`} cx={cx} cy={cy} r="2.5" />
                    ))}
                  </g>
                  <path
                    d="M494 440 L520 428 L546 440 M507 464 L520 484 L533 464 M492 478 L520 506 L548 478"
                    fill="none"
                    stroke="#f2a65a"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                  />
                </>
              )}
            </g>
          </svg>

          {/* CHAPTER 03: Restrained Capture Flash Pulse */}
          {step === 2 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 bg-white transition-opacity duration-300"
              style={{
                opacity: Math.max(0, 0.45 - chapterProgress * 0.45),
              }}
            />
          )}

          {/* CHAPTER 03+: Visually Separated Captured Frame Card */}
          <div
            className={`pointer-events-none absolute inset-3 sm:inset-6 z-15 rounded-xl border border-white/20 shadow-2xl ${transitionClass}`}
            style={{
              opacity: step >= 2 && step <= 4 ? 1 : 0,
              transform:
                step === 2
                  ? "translateY(-6px) scale(0.975) perspective(900px) rotateX(2deg)"
                  : step === 3
                  ? "translateY(0) scale(1) perspective(900px) rotateX(0deg)"
                  : "translateY(8px) scale(0.94)",
              boxShadow:
                step >= 2 ? "0 24px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(242,166,90,0.25)" : "none",
            }}
          >
            {/* Captured Still Indicator Badge */}
            <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 rounded bg-black/75 px-2 py-0.5 font-mono text-[0.5rem] tracking-widest text-signal border border-signal/20 backdrop-blur">
              <span className="size-1 rounded-full bg-signal" />
              <span>FRAME CAPTURE // SAVED</span>
            </div>
          </div>

          {/* Active Camera Scanline (Only in live detection chapters) */}
          {step <= 1 && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="anim-scan h-1/4 w-full bg-gradient-to-b from-transparent via-signal/[0.08] to-transparent" />
            </div>
          )}

          {/* Top Camera HUD Overlay */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-2.5 sm:p-4 text-paper-dim">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-2.5 sm:px-3 py-1 font-mono text-[0.5rem] sm:text-[0.5625rem] tracking-[0.14em] uppercase backdrop-blur border border-white/5">
              <span
                className={`size-1.5 rounded-full ${
                  step === 2
                    ? "bg-white animate-ping"
                    : step >= 3
                    ? "bg-tide"
                    : "bg-signal animate-pulse"
                }`}
              />
              {step === 0 && "LIVE CAMERA"}
              {step === 1 && "AR EFFECT · ACTIVE"}
              {step === 2 && "CAPTURE · COMPLETE"}
              {step === 3 && "EVENT FRAME · APPLIED"}
              {step === 4 && "DIGITAL DELIVERY · READY"}
              {step === 5 && "PRINT READY"}
            </div>

            <div className="hidden sm:flex items-center gap-2.5 font-mono text-[0.5625rem] tracking-[0.12em] text-paper-dim bg-black/60 px-3 py-1 rounded-full border border-white/5 backdrop-blur">
              <span>CAMERA FEED</span>
              <span className="text-white/20">|</span>
              <span>FACE TRACKING</span>
              <span className="text-white/20">|</span>
              <span className="text-signal">SWIFTUI</span>
            </div>
          </div>

          {/* CHAPTER 04: Event Treatment & Branded Frame Overlay */}
          <div
            className={`pointer-events-none absolute inset-0 z-20 p-3 sm:p-5 ${transitionClass}`}
            style={{
              opacity: step === 3 ? 1 : 0,
              transform: step === 3 ? "scale(1)" : "scale(1.03)",
            }}
          >
            <div className="size-full rounded-xl border border-signal/50 p-3 sm:p-4 flex flex-col justify-between shadow-[inset_0_0_35px_rgba(242,166,90,0.18)] bg-gradient-to-b from-black/20 via-transparent to-black/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.5625rem] sm:text-[0.6875rem] tracking-[0.2em] uppercase text-signal font-semibold">
                  PACIFIC HORIZON LABS
                </span>
                <span className="rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[0.5rem] tracking-widest text-signal border border-signal/20">
                  EVENT OVERLAY
                </span>
              </div>
              <div className="border-t border-signal/30 pt-2 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[0.5625rem] text-paper tracking-[0.14em] font-medium">
                    SAMPLE EVENT // 2026
                  </p>
                  <p className="font-mono text-[0.5rem] text-mute">
                    FRAME // CUSTOM BRANDING
                  </p>
                </div>
                <div className="font-mono text-[0.5rem] text-paper-dim uppercase">
                  BRANDED FRAME OVERLAY
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 05: Deliver (Fixed Guest Handoff / QR Composition) */}
          <div
            className={`absolute inset-0 z-25 flex items-center justify-center p-3 sm:p-5 ${transitionClass}`}
            style={{
              opacity: step === 4 ? 1 : 0,
              pointerEvents: step === 4 ? "auto" : "none",
              transform: step === 4 ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-line-strong bg-ink/95 p-2.5 sm:p-3.5 shadow-2xl backdrop-blur-md w-full max-w-[21rem] sm:max-w-[26rem] md:max-w-[28.5rem]">
              {/* Left Visuals: Scaled-down Smartphone + Compact QR Code side-by-side */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                {/* Scaled-down Smartphone Bezel (~18% smaller) */}
                <div className="relative aspect-[9/16] w-12 sm:w-14 md:w-15 rounded-xl border border-white/20 bg-black p-0.5 shadow-lg shrink-0 overflow-hidden flex flex-col justify-between">
                  <div className="relative size-full rounded-[0.55rem] overflow-hidden bg-[#18120d] flex flex-col justify-between p-0.5">
                    {hasEventImage && photoboothStoryMedia.baseEventImageSrc ? (
                      <Image
                        src={photoboothStoryMedia.baseEventImageSrc}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <svg viewBox="0 0 100 160" className="absolute inset-0 size-full" aria-hidden="true">
                          <circle cx="50" cy="60" r="40" fill="#f2a65a" fillOpacity="0.25" />
                          <circle cx="35" cy="85" r="12" fill="#2d241d" />
                          <circle cx="65" cy="85" r="11" fill="#362920" />
                          <path d="M 15 160 C 15 115, 30 100, 50 100 C 70 100, 85 115, 85 160 Z" fill="#181514" />
                        </svg>
                      </>
                    )}
                    {/* Dynamic sheen on smartphone glass */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[0.55rem] z-25">
                      <div className={`size-full bg-gradient-to-r from-transparent via-white/15 to-transparent ${isReducedMotion ? "" : "anim-sheen"}`} />
                    </div>
                    {/* Mini Phone Dynamic Island / Dot */}
                    <div className="relative z-20 flex justify-center">
                      <span className="size-0.5 sm:size-1 rounded-full bg-paper/50" />
                    </div>
                    <div className="relative z-20 font-mono text-[0.3125rem] sm:text-[0.375rem] text-signal text-center uppercase tracking-wider bg-black/60 rounded py-0.5">
                      Saved
                    </div>
                  </div>
                </div>

                {/* Reduced-size QR Code (~20–25% smaller) */}
                <div className="rounded-lg bg-paper p-1.5 sm:p-2 shadow shrink-0">
                  <div className="grid grid-cols-9 gap-[1px] sm:gap-[1.5px]">
                    {QR_BITS.join("").split("").map((b, i) => (
                      <span
                        key={i}
                        className={`size-1 sm:size-1.25 rounded-[0.5px] ${
                          b === "1" ? "bg-ink" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Explanatory Copy in stable, readable column width (Zero Clipping) */}
              <div className="flex-1 min-w-0 flex flex-col justify-center space-y-0.5 sm:space-y-1">
                <div className="inline-flex items-center gap-1 rounded-full bg-signal-soft px-1.5 py-0.5 font-mono text-[0.4375rem] sm:text-[0.5rem] tracking-wider text-signal uppercase w-fit">
                  <span className="size-1 rounded-full bg-signal" />
                  Instant Handoff
                </div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-paper">
                  Scan. Save. Share.
                </h4>
                <p className="text-[0.5625rem] sm:text-[0.6875rem] leading-snug sm:leading-relaxed text-mute">
                  Direct phone retrieval. Guests scan on screen to save high-res media straight to their device.
                </p>
              </div>
            </div>
          </div>

          {/* CHAPTER 06: Print (Tactile Physical Keepsake Print Card with Rich Photo Plate) */}
          <div
            className={`absolute inset-0 z-25 flex items-center justify-center p-3 sm:p-4 ${transitionClass}`}
            style={{
              opacity: step === 5 ? 1 : 0,
              pointerEvents: step === 5 ? "auto" : "none",
              transform:
                step === 5
                  ? "scale(1) rotate(-1.5deg) translateY(-2px)"
                  : "scale(0.88) rotate(0deg) translateY(12px)",
            }}
          >
            <div className="relative aspect-[3/2] w-64 sm:w-80 md:w-88 rounded-lg bg-[#faf8f5] p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.25)] text-ink overflow-hidden">
              {/* Gloss sheen line across print */}
              <div className="absolute inset-0 pointer-events-none rounded-lg z-20 overflow-hidden">
                <div className={`size-full bg-gradient-to-r from-transparent via-white/30 to-transparent ${isReducedMotion ? "" : "anim-sheen"}`} />
              </div>

              <div className="size-full border border-black/10 p-2 flex flex-col justify-between">
                {/* Embedded Rich Guest Photo Artwork */}
                <div className="aspect-[16/9] w-full rounded bg-[#1c1611] overflow-hidden relative border border-black/10 flex items-center justify-center">
                  {hasEventImage && photoboothStoryMedia.baseEventImageSrc ? (
                    <div className="relative size-full">
                      <Image
                        src={photoboothStoryMedia.baseEventImageSrc}
                        alt={photoboothStoryMedia.alt}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {/* Branded print watermark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-2 z-10">
                        <span className="font-mono text-[0.4375rem] tracking-[0.14em] text-signal uppercase font-semibold">
                          PACIFIC HORIZON LABS
                        </span>
                        <span className="font-mono text-[0.4375rem] sm:text-[0.5rem] tracking-[0.14em] text-paper uppercase">
                          GUEST MEMORY // 2026 EDITION
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" aria-hidden="true">
                        {/* Background venue glow */}
                        <radialGradient id={`${gradientId}-print-glow`} cx="50%" cy="40%" r="70%">
                          <stop offset="0%" stopColor="#3d2c1c" />
                          <stop offset="60%" stopColor="#1e1814" />
                          <stop offset="100%" stopColor="#0d0b0a" />
                        </radialGradient>
                        <rect width="400" height="225" fill={`url(#${gradientId}-print-glow)`} />
                        {/* Warm Bokeh Circles */}
                        <circle cx="80" cy="50" r="14" fill="#f5cd9e" opacity="0.2" />
                        <circle cx="320" cy="60" r="16" fill="#f5cd9e" opacity="0.25" />
                        <circle cx="200" cy="40" r="20" fill="#f2a65a" opacity="0.15" />
                        {/* Guest Silhouettes */}
                        <g transform="translate(200 225)">
                          <g transform="translate(-40 0)">
                            <ellipse cx="0" cy="-90" rx="22" ry="28" fill="#2d221a" stroke="#f2a65a" strokeWidth="1" strokeOpacity="0.4" />
                            <path d="M -50 20 C -50 -35, -25 -55, 0 -55 C 25 -55, 50 -35, 50 20 Z" fill="#1b1612" />
                          </g>
                          <g transform="translate(40 0)">
                            <ellipse cx="0" cy="-90" rx="21" ry="27" fill="#2a1f18" stroke="#f2a65a" strokeWidth="1" strokeOpacity="0.4" />
                            <path d="M -48 20 C -48 -35, -25 -55, 0 -55 C 25 -55, 48 -35, 48 20 Z" fill="#1a1411" />
                          </g>
                        </g>
                        {/* Frame Typography */}
                        <text x="20" y="24" fontFamily="var(--font-mono), monospace" fontSize="6.5" letterSpacing="1.2" fill="#f2a65a" fontWeight="600">
                          PACIFIC HORIZON LABS // SAMPLE EVENT
                        </text>
                      </svg>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 z-10">
                        <span className="font-mono text-[0.4375rem] sm:text-[0.5rem] tracking-[0.14em] text-paper uppercase">
                          GUEST MEMORY // 2026 EDITION
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Print Card Footer */}
                <div className="pt-2 flex items-center justify-between font-mono text-[0.4375rem] sm:text-[0.5rem] text-ink/75">
                  <span className="font-semibold tracking-wider">EVENT KEEPSAKE // PHYSICAL PRINT</span>
                  <span className="text-signal font-bold">PRINT READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Device Controls (Modes: Photo / Video / Boomerang) */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-2.5 pt-6 sm:p-4 sm:pt-8">
            <div className="flex gap-0.5 rounded-full bg-black/60 p-0.5 font-mono text-[0.5rem] tracking-[0.12em] uppercase backdrop-blur border border-white/5 sm:gap-1 sm:p-1 sm:text-[0.625rem]">
              <span
                className={`rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 transition-colors duration-200 ${
                  step <= 2
                    ? "bg-paper text-ink font-semibold"
                    : "text-paper-dim"
                }`}
              >
                Photo
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-paper-dim">Video</span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-paper-dim">Boomerang</span>
            </div>

            {/* Capture Trigger Button */}
            <div
              className={`flex size-7 sm:size-11 items-center justify-center rounded-full border-2 transition-transform duration-300 ${
                step === 2
                  ? "scale-90 border-signal bg-signal/20"
                  : "border-paper/90"
              }`}
            >
              <span
                className={`size-4 sm:size-7 rounded-full transition-colors duration-300 ${
                  step === 2 ? "bg-signal" : "bg-paper"
                }`}
              />
            </div>

            <span className="font-mono text-[0.5rem] sm:text-[0.5625rem] tracking-[0.12em] text-paper-dim uppercase hidden sm:block">
              {step <= 2 ? "Live Camera Loop" : step === 3 ? "Frame Overlay" : step === 4 ? "Digital Delivery" : "Physical Print"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
