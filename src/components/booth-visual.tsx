/**
 * Stylized illustration of the photo booth's iPad interface:
 * live camera view, face tracking, capture modes, and QR delivery.
 * Illustrative only; not a screenshot.
 */

// Fixed 9x9 pattern that reads as a QR code without encoding anything.
const QR = [
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

function Person({ x, scale = 1 }: { x: number; scale?: number }) {
  return (
    <g transform={`translate(${x} 0) scale(${scale})`}>
      <ellipse cx="0" cy="-150" rx="44" ry="54" fill="url(#bv-skin)" />
      <path d="M-110 40 C -110 -40, -60 -80, 0 -80 C 60 -80, 110 -40, 110 40 Z" fill="url(#bv-body)" />
    </g>
  );
}

function FaceBox({ x, y, size, label }: { x: number; y: number; size: number; label: string }) {
  const c = size * 0.22;
  const d = `M${x} ${y + c}V${y}H${x + c} M${x + size - c} ${y}H${x + size}V${y + c} M${x + size} ${y + size - c}V${y + size}H${x + size - c} M${x + c} ${y + size}H${x}V${y + size - c}`;
  return (
    <g>
      <path d={d} fill="none" stroke="#f2a65a" strokeWidth="2" />
      <text
        x={x}
        y={y - 8}
        fill="#f2a65a"
        fontFamily="var(--font-mono), monospace"
        fontSize="10"
        letterSpacing="1.2"
      >
        {label}
      </text>
    </g>
  );
}

export function BoothVisual({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of the photo booth interface on iPad, showing a live camera view with two tracked faces, capture mode selector, and a QR code for digital delivery."
      className={`relative ${className}`}
    >
      {/* Device frame */}
      <div className="relative rounded-[2rem] border border-line-strong bg-[#050607] p-2.5 shadow-[0_40px_120px_-40px_rgb(242_166_90/0.25)] sm:p-3.5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-ink-raised">
          <svg viewBox="0 0 800 600" className="absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <radialGradient id="bv-bg" cx="50%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#262019" />
                <stop offset="60%" stopColor="#121316" />
                <stop offset="100%" stopColor="#0a0b0d" />
              </radialGradient>
              <linearGradient id="bv-skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a3632" />
                <stop offset="100%" stopColor="#2a2724" />
              </linearGradient>
              <linearGradient id="bv-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#24272c" />
                <stop offset="100%" stopColor="#15171a" />
              </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#bv-bg)" />
            {/* Backdrop lines */}
            <g stroke="#eceae4" strokeOpacity="0.05">
              {Array.from({ length: 12 }, (_, i) => (
                <line key={i} x1={i * 72} y1="0" x2={i * 72} y2="600" />
              ))}
            </g>
            <g transform="translate(0 600)">
              <Person x={290} />
              <Person x={520} scale={0.92} />
            </g>
            <FaceBox x={232} y={378} size={116} label="FACE 01" />
            <FaceBox x={466} y={390} size={108} label="FACE 02" />
            {/* AR mesh hints */}
            <g fill="#f2a65a" fillOpacity="0.7">
              {[
                [262, 430], [290, 418], [318, 430], [276, 456], [304, 456], [290, 478],
                [494, 440], [520, 428], [546, 440], [507, 464], [533, 464], [520, 484],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" />
              ))}
            </g>
          </svg>

          {/* Scanline */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="anim-scan h-1/3 w-full bg-gradient-to-b from-transparent via-signal/[0.06] to-transparent" />
          </div>

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-5">
            <span className="flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[0.5rem] tracking-[0.14em] text-paper-dim uppercase backdrop-blur sm:text-[0.625rem]">
              <span className="anim-blink size-1.5 rounded-full bg-signal" />
              Live · AR
            </span>
            <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[0.5rem] tracking-[0.14em] text-paper-dim uppercase backdrop-blur sm:text-[0.625rem]">
              Event frame · Custom
            </span>
          </div>

          {/* QR tile */}
          <div className="absolute top-12 right-3 rounded-lg bg-paper p-1.5 sm:top-16 sm:right-5 sm:p-2">
            <div className="grid grid-cols-9 gap-px">
              {QR.join("").split("").map((bit, i) => (
                <span key={i} className={`size-1 sm:size-1.5 ${bit === "1" ? "bg-ink" : "bg-transparent"}`} />
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 sm:p-5 sm:pt-14">
            <div className="flex gap-0.5 rounded-full bg-black/50 p-0.5 font-mono text-[0.5rem] tracking-[0.12em] uppercase backdrop-blur sm:gap-1 sm:p-1 sm:text-[0.625rem]">
              <span className="rounded-full bg-paper px-2 py-1 text-ink sm:px-3">Photo</span>
              <span className="px-2 py-1 text-paper-dim sm:px-3">Video</span>
              <span className="px-2 py-1 text-paper-dim sm:px-3">Boomerang</span>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-paper/90 sm:size-14">
              <span className="size-6 rounded-full bg-paper sm:size-10" />
            </span>
            <span className="hidden font-mono text-[0.625rem] tracking-[0.12em] text-paper-dim uppercase sm:block">
              Print · Save · QR
            </span>
          </div>
        </div>
      </div>
      {/* Camera dot */}
      <span aria-hidden="true" className="absolute top-1/2 left-1 hidden size-1.5 -translate-y-1/2 rounded-full bg-paper/20 sm:block" />
    </div>
  );
}
