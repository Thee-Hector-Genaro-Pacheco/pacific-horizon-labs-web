/**
 * Generated artwork for /photobooth (theme concept art and the QR stand-in).
 * Every color comes from the --pb-* variables in photobooth.css. Swap these
 * out by adding real media in src/config/photobooth-experience.ts.
 *
 * SVG gradient ids must be unique per instance (a gradient defined inside a
 * hidden SVG stops rendering everywhere), so each component takes `idPrefix`.
 */

const stop = (offset: string, color: string, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: color, stopOpacity: opacity }} />
);

/** Deterministic pseudo-random numbers so server and client markup match. */
function seeded(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/* ------------------------------------------------------------------------ */
/* Theme concept art                                                        */
/* ------------------------------------------------------------------------ */

export function ThemeArt({ themeId, idPrefix }: { themeId: string; idPrefix: string }) {
  const gid = `${idPrefix}-g`;
  const v = (n: number, k: string) => `var(--pb-theme-${n}${k})`;
  const sky = (n: number, flip = false) => (
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        {stop("0", v(n, flip ? "b" : "a"))}
        {stop("1", v(n, flip ? "a" : "b"))}
      </linearGradient>
    </defs>
  );
  const bg = <rect width="300" height="400" fill={`url(#${gid})`} />;
  const rand = seeded(themeId.length * 7);

  let body;
  switch (themeId) {
    case "golden-hour":
      body = (
        <>
          {sky(1)}
          {bg}
          <circle cx="150" cy="210" r="46" fill={v(1, "a")} />
          <rect y="232" width="300" height="168" fill={v(1, "c")} />
          <g stroke={v(1, "a")} strokeOpacity="0.35" strokeWidth="2">
            {[250, 270, 295, 325].map((y) => (
              <line key={y} x1={110 - (y - 232)} y1={y} x2={190 + (y - 232)} y2={y} />
            ))}
          </g>
          <g fill={v(1, "c")}>
            <rect x="0" y="196" width="230" height="8" />
            {[20, 60, 100, 140, 180, 220].map((x) => (
              <rect key={x} x={x} y="204" width="5" height="40" />
            ))}
          </g>
        </>
      );
      break;
    case "kelp-forest":
      body = (
        <>
          {sky(2)}
          {bg}
          <g fill="white" fillOpacity="0.06">
            <polygon points="60,0 110,0 200,400 120,400" />
            <polygon points="180,0 210,0 280,400 230,400" />
          </g>
          <g fill="none" stroke={v(2, "c")} strokeWidth="9" strokeLinecap="round" opacity="0.85">
            {[30, 90, 150, 210, 265].map((x, i) => (
              <path key={x} d={`M${x} 400C${x + 20} ${330 - i * 8} ${x - 20} ${250} ${x + 8} ${150 + i * 14}S${x - 10} ${60} ${x + 4} ${30 + i * 10}`} />
            ))}
          </g>
        </>
      );
      break;
    case "desert-night":
      body = (
        <>
          {sky(3, true)}
          <rect width="300" height="400" fill={v(3, "b")} />
          <rect width="300" height="400" fill={`url(#${gid})`} opacity="0.8" />
          <g fill="white">
            {Array.from({ length: 50 }, (_, i) => (
              <circle key={i} cx={rand() * 300} cy={rand() * 250} r={rand() * 1.4 + 0.3} opacity={0.4 + rand() * 0.6} />
            ))}
          </g>
          <path d="M0 300C70 260 120 270 180 300S270 280 300 270V400H0Z" fill={v(3, "c")} opacity="0.55" />
          <path d="M0 340C90 310 160 330 220 350S280 345 300 335V400H0Z" fill={v(3, "c")} />
        </>
      );
      break;
    case "paper-studio":
      body = (
        <>
          {sky(4)}
          {bg}
          <path d="M0 280C80 300 220 300 300 280V400H0Z" fill={v(4, "b")} />
          <ellipse cx="150" cy="150" rx="120" ry="140" fill="white" opacity="0.25" />
          <ellipse cx="150" cy="330" rx="90" ry="12" fill={v(4, "c")} opacity="0.5" />
        </>
      );
      break;
    case "night-grid":
      body = (
        <>
          {sky(5, true)}
          {bg}
          <line x1="0" y1="200" x2="300" y2="200" stroke={v(5, "c")} strokeWidth="2" />
          <g stroke={v(5, "c")} strokeOpacity="0.5" strokeWidth="1.2">
            {[-300, -180, -90, -30, 30, 90, 180, 300, 450].map((dx) => (
              <line key={dx} x1="150" y1="200" x2={150 + dx * 1.6} y2="400" />
            ))}
            {[206, 216, 232, 256, 290, 340].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} />
            ))}
          </g>
          <path d="M90 200A60 60 0 0 1 210 200Z" fill={v(5, "c")} opacity="0.35" />
        </>
      );
      break;
    default:
      body = (
        <>
          {sky(6, true)}
          {bg}
          <path d="M60 400V170A90 90 0 0 1 240 170V400" fill="none" stroke={v(6, "a")} strokeWidth="34" />
          <g>
            {Array.from({ length: 34 }, (_, i) => {
              const t = rand() * Math.PI;
              const r = 90 + (rand() - 0.5) * 30;
              const onArch = i < 22;
              const cx = onArch ? 150 - Math.cos(t) * r : (i % 2 ? 60 : 240) + (rand() - 0.5) * 30;
              const cy = onArch ? 170 - Math.sin(t) * r : 180 + rand() * 210;
              return (
                <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 9 : 13} fill={i % 3 === 0 ? v(6, "c") : v(6, "a")} opacity={i % 3 === 0 ? 0.9 : 0.8} />
              );
            })}
          </g>
        </>
      );
  }

  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {body}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* QR placeholder: QR-shaped, deliberately not scannable                    */
/* ------------------------------------------------------------------------ */

export function PlaceholderQr() {
  const n = 25;
  const rand = seeded(42);
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  let d = finder(0, 0) + finder(n - 7, 0) + finder(0, n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inFinder(x, y) && rand() > 0.52) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} fillRule="evenodd" shapeRendering="crispEdges" role="img" aria-label="Placeholder QR code">
      <path d={d} fill="currentColor" />
    </svg>
  );
}
