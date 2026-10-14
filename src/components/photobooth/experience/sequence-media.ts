import type { FrameSet } from "@/config/photobooth-experience";

/** Maps sequence progress (0–1) onto footage. */
export type MediaDriver = {
  seek: (progress: number) => void;
  destroy: () => void;
};

const frameUrl = (set: FrameSet, i: number) =>
  set.pattern.replace("{index}", String(set.startIndex + i).padStart(set.padLength, "0"));

/**
 * Draws a WebP frame sequence onto a canvas. Loads coarse-to-fine (every
 * 16th frame first, then the gaps) so scrubbing works before everything has
 * arrived; until a frame is loaded the nearest loaded one is shown.
 * Loading starts only when the canvas is near the viewport.
 */
export function createFramesDriver(canvas: HTMLCanvasElement, set: FrameSet): MediaDriver {
  const ctx = canvas.getContext("2d");
  const n = set.frameCount;
  const frames: (HTMLImageElement | undefined)[] = new Array(n);
  let current = 0;
  let drawn = -1;
  let raf = 0;
  let cancelled = false;

  canvas.width = set.width;
  canvas.height = set.height;

  const nearestLoaded = (i: number) => {
    for (let d = 0; d < n; d++) {
      if (frames[i - d]) return i - d;
      if (frames[i + d]) return i + d;
    }
    return -1;
  };

  const draw = () => {
    raf = 0;
    const i = nearestLoaded(current);
    if (i < 0 || i === drawn || !ctx) return;
    ctx.drawImage(frames[i]!, 0, 0, set.width, set.height);
    drawn = i;
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };

  const order: number[] = [];
  const queued = new Set<number>();
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (!queued.has(i)) {
        queued.add(i);
        order.push(i);
      }
    }
  }

  const loadNext = () => {
    const i = order.shift();
    if (i === undefined || cancelled) return;
    const img = new Image();
    img.decoding = "async";
    img.src = frameUrl(set, i);
    img
      .decode()
      .then(() => {
        if (cancelled) return;
        frames[i] = img;
        schedule();
      })
      .catch(() => {})
      .finally(loadNext);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      for (let k = 0; k < 6; k++) loadNext();
    },
    { rootMargin: "100% 0px" },
  );
  observer.observe(canvas);

  return {
    seek(p) {
      current = Math.round(Math.min(Math.max(p, 0), 1) * (n - 1));
      schedule();
    },
    destroy() {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
    },
  };
}

/**
 * Scrubs a video by setting currentTime. Only one seek is in flight at a
 * time; the latest requested position is applied when it finishes.
 * Requires a video encoded with a keyframe on every frame (see README).
 */
export function createVideoDriver(video: HTMLVideoElement, src: string): MediaDriver {
  let pending: number | null = null;
  let seeking = false;

  const apply = () => {
    if (pending === null || !video.duration) return;
    seeking = true;
    video.currentTime = pending * video.duration;
    pending = null;
  };
  const onSeeked = () => {
    seeking = false;
    apply();
  };
  const onMeta = () => apply();

  video.addEventListener("seeked", onSeeked);
  video.addEventListener("loadedmetadata", onMeta);
  video.preload = "auto";
  video.src = src;
  // iOS Safari will not paint seeked frames until the video has played once.
  video.play().then(() => video.pause()).catch(() => {});

  return {
    seek(p) {
      pending = Math.min(Math.max(p, 0), 1);
      if (!seeking) apply();
    },
    destroy() {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeAttribute("src");
      video.load();
    },
  };
}
