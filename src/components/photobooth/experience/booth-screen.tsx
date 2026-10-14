import type { CSSProperties, ReactNode } from "react";
import { boothSequence, type BeatId } from "@/config/photobooth-experience";
import { PlaceholderQr } from "./placeholder-art";

/**
 * The sequence photo (or the footage poster) as two stacked layers: the lower
 * one racks out of focus during the countdown, the upper one stays sharp
 * inside `focusMask` so the guests hold focus.
 */
function ScreenPhoto({ lazy }: { lazy: boolean }) {
  const m = boothSequence.media;
  const src = m.kind === "image" ? m.src : m.poster;
  const width = m.kind === "frames" ? m.desktop.width : m.width;
  const height = m.kind === "frames" ? m.desktop.height : m.height;
  const srcSet = m.kind === "image" && m.mobileSrc ? `${m.mobileSrc} 800w, ${m.src} ${m.width}w` : undefined;
  const img = (className: string, style?: CSSProperties) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes="(max-width: 767px) 92vw, 60vw"
      alt=""
      width={width}
      height={height}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
      className={`pb-layer pb-media ${className}`}
      style={style}
    />
  );
  return (
    <>
      {img("pb-rack")}
      {img("", { maskImage: boothSequence.focusMask, WebkitMaskImage: boothSequence.focusMask })}
    </>
  );
}

/**
 * The iPad screen. Layers are stacked in capture order and targeted by the
 * scroll timeline in booth-sequence.tsx through their data-* attributes.
 *
 * Pass `beat` to render a static end state of one beat (reduced motion).
 * Without it, the screen renders every layer in the idle state and the
 * timeline animates from there.
 */
export function BoothScreen({
  beat,
  media,
}: {
  beat?: BeatId;
  /** Footage element (canvas or video). Defaults to the generated scene. */
  media?: ReactNode;
}) {
  const show = (...beats: BeatId[]) => beat === undefined || beats.includes(beat);
  const { drawInterface, faces, faceBrackets, resultPhoto } = boothSequence;
  const lazy = beat !== undefined;

  return (
    <div className="pb-screen" data-beat={beat ?? "idle"}>
      {media ?? <ScreenPhoto lazy={lazy} />}

      {drawInterface && (
        <>
          <div className="pb-layer pb-dimmer" data-dimmer />
          <span className="pb-chip pb-chip-live">Live · Front</span>

          {show("lock", "countdown") && !faceBrackets && (
            <div className="pb-viewfinder" data-bracket>
              <span className="pb-corner" />
              <span className="pb-corner" />
              <span className="pb-corner" />
              <span className="pb-corner" />
              <span className="pb-crosshair" />
            </div>
          )}

          {show("lock", "countdown") && faceBrackets && (
            <>
              {faces.map((f, i) => (
                <div
                  key={i}
                  className="pb-bracket"
                  data-bracket
                  style={{ "--x": f.x, "--y": f.y, "--w": f.w, "--h": f.h } as CSSProperties}
                >
                  <span className="pb-corner" />
                  <span className="pb-corner" />
                  <span className="pb-corner" />
                  <span className="pb-corner" />
                </div>
              ))}
            </>
          )}

          {show("idle") && (
            <div className="pb-layer pb-welcome" data-welcome>
              <span className="pb-welcome-kicker">Photo booth</span>
              <span className="pb-welcome-name">Ready when you are</span>
              <span className="pb-welcome-sub">Step into frame and start the camera.</span>
              <span className="pb-touch">Continue</span>
            </div>
          )}

          {show("countdown") && (
            <div className="pb-layer pb-count">
              <div className="pb-count-glow" data-ring />
              {[5, 4, 3, 2, 1].map((n) => (
                <span key={n} className={`pb-num pb-num-${n}`} data-num>
                  {n}
                </span>
              ))}
            </div>
          )}

          {show("result") && (
            <>
              <div className="pb-layer pb-photo" data-photo>
                {resultPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultPhoto} alt="" width={1440} height={1080} className="pb-layer pb-media" loading="lazy" decoding="async" />
                ) : (
                  <ScreenPhoto lazy />
                )}
              </div>
              <div className="pb-qr" data-qr>
                <div className="pb-qr-code">
                  <PlaceholderQr />
                </div>
                <p className="pb-qr-kicker">Your media is ready</p>
                <p className="pb-qr-line">Scan to download</p>
              </div>
            </>
          )}

          {show("capture") && (
            <>
              <div className="pb-layer pb-flash" data-flash>
                <span className="pb-flash-ch" />
                <span className="pb-flash-ch" />
                <span className="pb-flash-ch" />
              </div>
              <svg
                className="pb-layer pb-shutter"
                viewBox="-400 -300 800 600"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <path
                    key={i}
                    className="pb-blade"
                    style={{ "--i": i } as CSSProperties}
                    d="M0 -1000H1000V1000H0Z"
                  />
                ))}
              </svg>
            </>
          )}
        </>
      )}

      {boothSequence.illustrative && (
        <span className="pb-chip pb-chip-placeholder">Illustrative image</span>
      )}
    </div>
  );
}
