import { useId } from "react";

type SceneProps = {
  className?: string;
};

/**
 * WEDDING SCENE PLATE
 * Elegant, warm, romantic, soft-light atmosphere.
 * Champagne tones, botanical arch silhouette, fairy light bokeh, and custom monogram.
 */
export function WeddingSceneArtwork({ className = "" }: SceneProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 640 400"
      className={`size-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#2c2218" />
          <stop offset="45%" stopColor="#1a1512" />
          <stop offset="100%" stopColor="#0b0a09" />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2a65a" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#f2a65a" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#f2a65a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5cd9e" />
          <stop offset="50%" stopColor="#e29f5b" />
          <stop offset="100%" stopColor="#ba7638" />
        </linearGradient>
      </defs>

      {/* Atmospheric Background */}
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <circle cx="320" cy="180" r="220" fill={`url(#${id}-glow)`} />

      {/* Floating Fairy Light Bokeh Spheres */}
      <g fill="#f5cd9e" opacity="0.35">
        <circle cx="120" cy="90" r="14" opacity="0.2" />
        <circle cx="160" cy="140" r="8" opacity="0.4" />
        <circle cx="210" cy="70" r="18" opacity="0.15" />
        <circle cx="480" cy="110" r="16" opacity="0.25" />
        <circle cx="530" cy="160" r="10" opacity="0.35" />
        <circle cx="450" cy="65" r="22" opacity="0.15" />
        <circle cx="280" cy="100" r="6" opacity="0.45" />
        <circle cx="360" cy="90" r="8" opacity="0.3" />
      </g>

      {/* Botanical Floral Arch Silhouette Over Canopy */}
      <g stroke="#e29f5b" strokeOpacity="0.3" strokeWidth="1.2" fill="none">
        <path d="M 60 40 Q 320 -10 580 40" />
        <path d="M 90 60 Q 320 15 550 60" strokeOpacity="0.18" />
      </g>
      <g fill="#e29f5b" fillOpacity="0.25">
        {[
          [100, 48], [140, 42], [180, 36], [240, 30], [300, 26],
          [340, 26], [400, 32], [460, 40], [500, 48], [540, 56],
        ].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3" transform={`rotate(${i * 12} ${cx} ${cy})`} />
        ))}
      </g>

      {/* Celebratory Couple Silhouettes */}
      <g transform="translate(320 400)">
        {/* Person Left */}
        <g transform="translate(-55 0)">
          <ellipse cx="0" cy="-175" rx="36" ry="46" fill="#1e1814" />
          {/* Hair / Head subtle warm rim light */}
          <ellipse cx="0" cy="-175" rx="36" ry="46" fill="none" stroke="#f2a65a" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M -80 30 C -80 -70, -45 -110, 0 -110 C 45 -110, 80 -70, 80 30 Z" fill="#14110f" />
        </g>
        {/* Person Right */}
        <g transform="translate(55 0)">
          <ellipse cx="0" cy="-175" rx="34" ry="44" fill="#221b16" />
          <ellipse cx="0" cy="-175" rx="34" ry="44" fill="none" stroke="#f2a65a" strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M -75 30 C -75 -65, -40 -105, 0 -105 C 40 -105, 75 -65, 75 30 Z" fill="#171310" />
        </g>
      </g>

      {/* Elegant Wedding Frame Overlay */}
      <rect
        x="30"
        y="25"
        width="580"
        height="350"
        rx="12"
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <rect
        x="36"
        y="31"
        width="568"
        height="338"
        rx="8"
        fill="none"
        stroke="#f2a65a"
        strokeWidth="0.5"
        strokeOpacity="0.25"
      />

      {/* Header Monogram & Typography */}
      <g fill="#eceae4">
        <text
          x="320"
          y="75"
          textAnchor="middle"
          fontFamily="var(--font-sans), serif"
          fontSize="13"
          letterSpacing="4"
          fontWeight="400"
          fill="#f5cd9e"
        >
          EMILY &amp; LIAM
        </text>
        <text
          x="320"
          y="92"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="7"
          letterSpacing="2.5"
          fill="#b4b5b3"
        >
          OCTOBER 2026 · PRIVATE ESTATE
        </text>
      </g>

      {/* Footer Keepsake Note */}
      <g fill="#b4b5b3" fontFamily="var(--font-mono), monospace" fontSize="7" letterSpacing="1.5">
        <text x="50" y="352">WEDDING SUITE // KEEPSAKE PRINT</text>
        <text x="590" y="352" textAnchor="end" fill="#f2a65a">TOUCHLESS QR READY</text>
      </g>
    </svg>
  );
}

/**
 * CORPORATE EVENT SCENE PLATE
 * Clean, branded, upscale, keynote/networking feel.
 * Midnight slate, stage spotlight cones, geometric keynote lines, and sponsor layout.
 */
export function CorporateSceneArtwork({ className = "" }: SceneProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 640 400"
      className={`size-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#131c26" />
          <stop offset="55%" stopColor="#0d121a" />
          <stop offset="100%" stopColor="#07090d" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fb3c4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8fb3c4" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Background Studio Fill */}
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />

      {/* Architectural Summit Stage Beams */}
      <polygon points="180,0 260,0 380,400 240,400" fill={`url(#${id}-beam)`} />
      <polygon points="460,0 520,0 580,400 480,400" fill={`url(#${id}-beam)`} opacity="0.6" />

      {/* Geometric Keynote Lines & Backdrop Grid */}
      <g stroke="#8fb3c4" strokeOpacity="0.08" strokeWidth="1">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`ch-${i}`} x1="40" y1={80 + i * 35} x2="600" y2={80 + i * 35} />
        ))}
        <path d="M 120 180 L 220 100 L 420 100 L 520 180" fill="none" strokeOpacity="0.2" />
      </g>

      {/* Professional Attendees Silhouettes */}
      <g transform="translate(320 400)">
        {/* Executive 1 */}
        <g transform="translate(-70 0)">
          <ellipse cx="0" cy="-180" rx="35" ry="46" fill="#18202c" />
          <ellipse cx="0" cy="-180" rx="35" ry="46" fill="none" stroke="#8fb3c4" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M -85 30 C -85 -60, -45 -110, 0 -110 C 45 -110, 85 -60, 85 30 Z" fill="#121822" />
          {/* Subtle lapel line */}
          <path d="M -15 -85 L 0 -20 L 15 -85" stroke="#8fb3c4" strokeWidth="1" strokeOpacity="0.3" fill="none" />
        </g>
        {/* Executive 2 */}
        <g transform="translate(70 0)">
          <ellipse cx="0" cy="-180" rx="35" ry="46" fill="#1a2330" />
          <ellipse cx="0" cy="-180" rx="35" ry="46" fill="none" stroke="#8fb3c4" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M -85 30 C -85 -60, -45 -110, 0 -110 C 45 -110, 85 -60, 85 30 Z" fill="#141a24" />
        </g>
      </g>

      {/* Frame Border */}
      <rect
        x="30"
        y="25"
        width="580"
        height="350"
        rx="10"
        fill="none"
        stroke="#8fb3c4"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Corporate Co-Brand Header */}
      <g fill="#eceae4">
        <text
          x="50"
          y="65"
          fontFamily="var(--font-mono), monospace"
          fontSize="11"
          letterSpacing="2.5"
          fontWeight="600"
          fill="#8fb3c4"
        >
          PACIFIC SUMMIT // 2026
        </text>
        <text
          x="50"
          y="80"
          fontFamily="var(--font-mono), monospace"
          fontSize="7"
          letterSpacing="1.8"
          fill="#b4b5b3"
        >
          ANNUAL LEADERSHIP SYMPOSIUM · SF METRO
        </text>
      </g>

      {/* Top Right Executive Sponsor Badge */}
      <g transform="translate(520 54)">
        <rect x="-60" y="0" width="120" height="20" rx="4" fill="#8fb3c4" fillOpacity="0.12" stroke="#8fb3c4" strokeWidth="0.8" strokeOpacity="0.35" />
        <text x="0" y="13" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="6.5" letterSpacing="1.2" fill="#8fb3c4" fontWeight="600">
          SPONSOR SUITE
        </text>
      </g>

      {/* Footer Metadata */}
      <g fill="#b4b5b3" fontFamily="var(--font-mono), monospace" fontSize="7" letterSpacing="1.5">
        <text x="50" y="355">THROUGHPUT // HIGH VOLUME QUEUE</text>
        <text x="590" y="355" textAnchor="end" fill="#8fb3c4">DIRECT QR HANDOFF</text>
      </g>
    </svg>
  );
}

/**
 * PRIVATE PARTY SCENE PLATE
 * Energetic, nightlife, fun, colorful.
 * Neon amber and magenta rims, animated group silhouettes, party flare sparkles.
 */
export function PrivatePartySceneArtwork({ className = "" }: SceneProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 640 400"
      className={`size-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="85%">
          <stop offset="0%" stopColor="#281424" />
          <stop offset="50%" stopColor="#170d18" />
          <stop offset="100%" stopColor="#0a060b" />
        </radialGradient>
        <radialGradient id={`${id}-flare`} cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#f2a65a" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#e05697" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e05697" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Fill */}
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <circle cx="320" cy="160" r="240" fill={`url(#${id}-flare)`} />

      {/* Dynamic Confetti & Bokeh Sparkles */}
      <g fill="#f2a65a" opacity="0.6">
        {[
          [80, 100], [140, 60], [210, 120], [270, 70], [370, 50],
          [440, 95], [510, 60], [570, 110], [180, 160], [470, 150],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 3 : 2} fill={i % 3 === 0 ? "#e05697" : "#f2a65a"} />
        ))}
      </g>

      {/* Three Energetic Guest Silhouettes */}
      <g transform="translate(320 400)">
        {/* Guest 1 (Left - arms up / gesture) */}
        <g transform="translate(-110 0)">
          <ellipse cx="0" cy="-175" rx="32" ry="42" fill="#201320" />
          <ellipse cx="0" cy="-175" rx="32" ry="42" fill="none" stroke="#e05697" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M -70 30 C -70 -60, -35 -100, 0 -100 C 35 -100, 70 -60, 70 30 Z" fill="#150d16" />
        </g>
        {/* Guest 2 (Center - smiling) */}
        <g transform="translate(0 0)">
          <ellipse cx="0" cy="-185" rx="36" ry="46" fill="#29182a" />
          <ellipse cx="0" cy="-185" rx="36" ry="46" fill="none" stroke="#f2a65a" strokeWidth="2" strokeOpacity="0.75" />
          <path d="M -80 30 C -80 -65, -40 -105, 0 -105 C 40 -105, 80 -65, 80 30 Z" fill="#1c111e" />
        </g>
        {/* Guest 3 (Right) */}
        <g transform="translate(110 0)">
          <ellipse cx="0" cy="-175" rx="32" ry="42" fill="#201320" />
          <ellipse cx="0" cy="-175" rx="32" ry="42" fill="none" stroke="#f2a65a" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M -70 30 C -70 -60, -35 -100, 0 -100 C 35 -100, 70 -60, 70 30 Z" fill="#150d16" />
        </g>
      </g>

      {/* Neon Edge Frame */}
      <rect
        x="30"
        y="25"
        width="580"
        height="350"
        rx="14"
        fill="none"
        stroke="#e05697"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <rect
        x="34"
        y="29"
        width="572"
        height="342"
        rx="10"
        fill="none"
        stroke="#f2a65a"
        strokeWidth="0.75"
        strokeOpacity="0.3"
      />

      {/* Typography */}
      <g fill="#eceae4">
        <text
          x="320"
          y="70"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="13"
          letterSpacing="4"
          fontWeight="600"
          fill="#f2a65a"
        >
          CELEBRATION 2026
        </text>
        <text
          x="320"
          y="88"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="7"
          letterSpacing="2"
          fill="#b4b5b3"
        >
          NEON NIGHTS // MILESTONE ROOFTOP
        </text>
      </g>

      {/* Footer Metadata */}
      <g fill="#b4b5b3" fontFamily="var(--font-mono), monospace" fontSize="7" letterSpacing="1.5">
        <text x="50" y="355">MODES // BOOMERANG &amp; VIDEO</text>
        <text x="590" y="355" textAnchor="end" fill="#f2a65a">INSTANT PHONE DELIVERY</text>
      </g>
    </svg>
  );
}

/**
 * SCHOOL / UNIVERSITY SCENE PLATE
 * Celebratory, campus/formal/graduation energy.
 * Midnight blue, formal commencement gold, classic crest, and continuous throughput.
 */
export function SchoolSceneArtwork({ className = "" }: SceneProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 640 400"
      className={`size-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="35%" r="85%">
          <stop offset="0%" stopColor="#141a2e" />
          <stop offset="50%" stopColor="#0d111f" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
      </defs>

      {/* Background Fill */}
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />

      {/* Architectural Arched Pavilion Background Hairlines */}
      <g stroke="#eceae4" strokeOpacity="0.08" strokeWidth="1" fill="none">
        <path d="M 220 400 V 160 Q 320 60 420 160 V 400" />
        <path d="M 120 400 V 210 Q 320 80 520 210 V 400" strokeOpacity="0.05" />
      </g>

      {/* Celebratory Student Silhouettes with Caps & Gowns */}
      <g transform="translate(320 400)">
        {/* Student 1 */}
        <g transform="translate(-65 0)">
          <ellipse cx="0" cy="-180" rx="34" ry="44" fill="#1b2135" />
          <ellipse cx="0" cy="-180" rx="34" ry="44" fill="none" stroke="#eceae4" strokeWidth="1.5" strokeOpacity="0.4" />
          {/* Mortarboard cap outline */}
          <polygon points="0,-235 -38,-220 0,-205 38,-220" fill="#101524" stroke="#eceae4" strokeWidth="1.2" strokeOpacity="0.6" />
          <path d="M -80 30 C -80 -60, -45 -105, 0 -105 C 45 -105, 80 -60, 80 30 Z" fill="#121624" />
        </g>
        {/* Student 2 */}
        <g transform="translate(65 0)">
          <ellipse cx="0" cy="-180" rx="34" ry="44" fill="#1f263d" />
          <ellipse cx="0" cy="-180" rx="34" ry="44" fill="none" stroke="#f2a65a" strokeWidth="1.5" strokeOpacity="0.45" />
          <polygon points="0,-235 -38,-220 0,-205 38,-220" fill="#101524" stroke="#f2a65a" strokeWidth="1.2" strokeOpacity="0.6" />
          <path d="M -80 30 C -80 -60, -45 -105, 0 -105 C 45 -105, 80 -60, 80 30 Z" fill="#121624" />
        </g>
      </g>

      {/* Frame Border */}
      <rect
        x="30"
        y="25"
        width="580"
        height="350"
        rx="10"
        fill="none"
        stroke="#eceae4"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* Typography & Crest */}
      <g fill="#eceae4">
        <text
          x="320"
          y="68"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="12"
          letterSpacing="3"
          fontWeight="600"
        >
          COMMENCEMENT GALA
        </text>
        <text
          x="320"
          y="84"
          textAnchor="middle"
          fontFamily="var(--font-mono), monospace"
          fontSize="7"
          letterSpacing="2"
          fill="#b4b5b3"
        >
          CLASS OF 2026 // GRAND PAVILION FORMAL
        </text>
      </g>

      {/* Footer Metadata */}
      <g fill="#b4b5b3" fontFamily="var(--font-mono), monospace" fontSize="7" letterSpacing="1.5">
        <text x="50" y="355">FORMAT // 4x6 KEEPSAKE PRINT</text>
        <text x="590" y="355" textAnchor="end" fill="#eceae4">RAPID QUEUE PASS</text>
      </g>
    </svg>
  );
}

/**
 * BRAND ACTIVATION SCENE PLATE
 * Experiential retail / launch / marketing campaign aesthetic.
 * Ultra-dark industrial base, sharp architectural neon, modern luxury retail ambiance.
 */
export function BrandActivationSceneArtwork({ className = "" }: SceneProps) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 640 400"
      className={`size-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="30%" r="90%">
          <stop offset="0%" stopColor="#221b14" />
          <stop offset="60%" stopColor="#12100d" />
          <stop offset="100%" stopColor="#080706" />
        </radialGradient>
      </defs>

      {/* Background Fill */}
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />

      {/* Sleek Retail Pedestal Light Rays */}
      <polygon points="260,0 380,0 460,400 180,400" fill="#f2a65a" fillOpacity="0.04" />
      <g stroke="#f2a65a" strokeOpacity="0.15" strokeWidth="0.8">
        <line x1="260" y1="0" x2="180" y2="400" />
        <line x1="380" y1="0" x2="460" y2="400" />
      </g>

      {/* Modern Installation Grid */}
      <g stroke="#eceae4" strokeOpacity="0.04" strokeWidth="0.8">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 70 + 40} y1="0" x2={i * 70 + 40} y2="400" />
        ))}
      </g>

      {/* High-Fashion Guest Silhouette with Bespoke AR Treatment */}
      <g transform="translate(320 400)">
        <g transform="translate(0 0)">
          <ellipse cx="0" cy="-185" rx="38" ry="50" fill="#241d17" />
          <ellipse cx="0" cy="-185" rx="38" ry="50" fill="none" stroke="#f2a65a" strokeWidth="2" strokeOpacity="0.75" />
          {/* Bespoke campaign geometric visor / AR lens outline */}
          <path d="M -30 -192 Q 0 -202 30 -192 L 26 -178 Q 0 -188 -26 -178 Z" fill="#f2a65a" fillOpacity="0.4" stroke="#f2a65a" strokeWidth="1" />
          <path d="M -90 30 C -90 -65, -45 -110, 0 -110 C 45 -110, 90 -65, 90 30 Z" fill="#17120e" />
        </g>
      </g>

      {/* Frame Border */}
      <rect
        x="30"
        y="25"
        width="580"
        height="350"
        rx="8"
        fill="none"
        stroke="#f2a65a"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />

      {/* Modern Fashion/Retail Campaign Typography */}
      <g fill="#eceae4">
        <text
          x="50"
          y="68"
          fontFamily="var(--font-mono), monospace"
          fontSize="11"
          letterSpacing="3"
          fontWeight="600"
          fill="#f2a65a"
        >
          PRODUCT LAUNCH // ZERO
        </text>
        <text
          x="50"
          y="83"
          fontFamily="var(--font-mono), monospace"
          fontSize="7"
          letterSpacing="1.8"
          fill="#b4b5b3"
        >
          EXPERIENTIAL CAMPAIGN · FLAGSHIP GALLERY
        </text>
      </g>

      {/* Campaign Badge */}
      <g transform="translate(520 56)">
        <rect x="-55" y="0" width="110" height="20" rx="3" fill="#f2a65a" fillOpacity="0.15" stroke="#f2a65a" strokeWidth="0.8" strokeOpacity="0.4" />
        <text x="0" y="13" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="6.5" letterSpacing="1.2" fill="#f2a65a" fontWeight="600">
          CAMPAIGN LENS
        </text>
      </g>

      {/* Footer Metadata */}
      <g fill="#b4b5b3" fontFamily="var(--font-mono), monospace" fontSize="7" letterSpacing="1.5">
        <text x="50" y="355">ACTIVATION // BESPOKE AR FUNNEL</text>
        <text x="590" y="355" textAnchor="end" fill="#f2a65a">DYNAMIC CAMPAIGN QR</text>
      </g>
    </svg>
  );
}

/**
 * Renderer for any gallery category scene artwork
 */
export function GallerySceneArtwork({
  categoryId,
  className = "",
}: {
  categoryId: string;
  className?: string;
}) {
  switch (categoryId) {
    case "wedding":
      return <WeddingSceneArtwork className={className} />;
    case "corporate":
      return <CorporateSceneArtwork className={className} />;
    case "private-party":
      return <PrivatePartySceneArtwork className={className} />;
    case "school":
      return <SchoolSceneArtwork className={className} />;
    case "brand-activation":
      return <BrandActivationSceneArtwork className={className} />;
    default:
      return <WeddingSceneArtwork className={className} />;
  }
}
