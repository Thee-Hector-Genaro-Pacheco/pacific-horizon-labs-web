/**
 * Hero artwork: a sun rising over an instrument-style horizon with a
 * perspective floor. Pure SVG, decorative only.
 */
const W = 1440;
const H = 560;
const HORIZON = 400;
const CX = W / 2;

const floorRays = Array.from({ length: 25 }, (_, i) => -1 + (i * 2) / 24);
const floorRows = [12, 28, 50, 80, 120, 160];
const ticks = Array.from({ length: 61 }, (_, i) => i * 24);

export function HorizonGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="hz-glow" cx="50%" cy={HORIZON / H} r="55%" fx="50%" fy={HORIZON / H}>
          <stop offset="0%" stopColor="#f2a65a" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#f2a65a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#f2a65a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hz-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2a65a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f2a65a" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="hz-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eceae4" stopOpacity="0" />
          <stop offset="50%" stopColor="#eceae4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#eceae4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hz-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eceae4" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#eceae4" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hz-sky">
          <rect x="0" y="0" width={W} height={HORIZON} />
        </clipPath>
        <clipPath id="hz-ground">
          <rect x="0" y={HORIZON} width={W} height={H - HORIZON} />
        </clipPath>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#hz-glow)" className="anim-breathe" />

      <g clipPath="url(#hz-sky)">
        <g className="anim-sun" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={CX} cy={HORIZON + 40} r="250" fill="url(#hz-sun)" />
          <circle cx={CX} cy={HORIZON + 40} r="250" fill="none" stroke="#f2a65a" strokeOpacity="0.9" strokeWidth="1.25" />
          <circle cx={CX} cy={HORIZON + 40} r="196" fill="none" stroke="#f2a65a" strokeOpacity="0.4" />
          <circle cx={CX} cy={HORIZON + 40} r="142" fill="none" stroke="#f2a65a" strokeOpacity="0.22" />
          <circle cx={CX} cy={HORIZON + 40} r="330" fill="none" stroke="#eceae4" strokeOpacity="0.08" strokeDasharray="2 8" />
        </g>
      </g>

      <g clipPath="url(#hz-ground)" stroke="url(#hz-floor)" strokeWidth="1">
        {floorRays.map((t) => (
          <line key={t} x1={CX} y1={HORIZON} x2={CX + t * W * 1.2} y2={H} />
        ))}
        {floorRows.map((y) => (
          <line key={y} x1="0" y1={HORIZON + y} x2={W} y2={HORIZON + y} />
        ))}
      </g>

      <g stroke="#eceae4" strokeOpacity="0.28">
        {ticks.map((x, i) => (
          <line key={x} x1={x} y1={HORIZON - (i % 5 === 0 ? 10 : 5)} x2={x} y2={HORIZON} />
        ))}
      </g>
      <g
        fill="#8b8f96"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="10"
        letterSpacing="1.5"
        textAnchor="middle"
      >
        {ticks
          .filter((_, i) => i % 10 === 0)
          .map((x) => (
            <text key={x} x={x} y={HORIZON - 18}>
              {String(Math.round((x / W) * 180)).padStart(3, "0")}
            </text>
          ))}
      </g>

      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="url(#hz-line)" strokeWidth="1.25" />
    </svg>
  );
}
