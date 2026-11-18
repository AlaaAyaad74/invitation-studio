import type { CSSProperties } from "react";

/* Cut-paper ornaments shared by every Atelier Rose section. They reference
   the filters in <PaperDefs />, which the invitation renders once. */

const TONES = {
  blush: ["#e2afa6", "#ecc3ba", "#f3d3cb", "#f8e2dc", "#c98a85"],
  peach: ["#e9b394", "#f1c4a8", "#f6d5bf", "#fae4d4", "#d4916f"],
  ivory: ["#e6dacd", "#efe6dc", "#f6efe8", "#fdf9f4", "#cdbba8"],
} as const;

export type RoseTone = keyof typeof TONES;

// One cupped petal pointing up, `r` long and about `w` wide.
function petal(r: number, w: number) {
  const base = -r * 0.12;
  return `M0,${base} C${w * 1.15},${-r * 0.3} ${w},${-r * 1.08} 0,${-r} C${-w},${-r * 1.08} ${-w * 1.15},${-r * 0.3} 0,${base}Z`;
}

const RINGS = [
  { r: 47, w: 26, n: 6, rot: 0 },
  { r: 37, w: 22, n: 6, rot: 30 },
  { r: 27, w: 17, n: 5, rot: 14 },
  { r: 17, w: 11, n: 4, rot: 45 },
];

type OrnamentProps = { className?: string; style?: CSSProperties };

/** A layered paper rose: four rings of petals, each casting a shadow. */
export function Rose({
  className,
  style,
  tone = "blush",
}: OrnamentProps & { tone?: RoseTone }) {
  const colors = TONES[tone];
  return (
    <svg
      className={className}
      style={style}
      viewBox="-52 -52 104 104"
      aria-hidden="true"
    >
      {RINGS.map((ring, depth) => (
        <g key={depth} filter="url(#ar-lift)" fill={colors[depth]}>
          {Array.from({ length: ring.n }, (_, index) => (
            <path
              key={index}
              d={petal(ring.r, ring.w)}
              transform={`rotate(${ring.rot + (360 / ring.n) * index})`}
              stroke={colors[4]}
              strokeOpacity="0.28"
              strokeWidth="0.6"
            />
          ))}
        </g>
      ))}
      <path
        d="M-7,1 a7,7 0 1,1 14,0 a5,5 0 1,1 -10,0 a3,3 0 1,1 6,0"
        fill="none"
        stroke={colors[4]}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Almond leaf with a centre vein, pointing right. */
export function Leaf({ className, style }: OrnamentProps) {
  return (
    <svg className={className} style={style} viewBox="0 -14 48 28" aria-hidden="true">
      <g filter="url(#ar-lift)">
        <path d="M1,0 C12,-12 32,-13 47,0 C32,13 12,12 1,0Z" fill="var(--sage)" />
      </g>
      <path
        d="M3,0 C18,-1 32,-1 44,0 M16,0 l7,-5 M26,0 l7,-5 M16,0 l7,5 M26,0 l7,5"
        fill="none"
        stroke="var(--sage-deep)"
        strokeOpacity="0.55"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A curved stem with five leaves. */
export function Sprig({ className, style }: OrnamentProps) {
  const leaves = [
    { x: 14, y: 70, r: -150 },
    { x: 26, y: 54, r: -20 },
    { x: 30, y: 40, r: -160 },
    { x: 44, y: 26, r: -30 },
    { x: 52, y: 10, r: -70 },
  ];
  return (
    <svg className={className} style={style} viewBox="0 0 80 90" aria-hidden="true">
      <path
        d="M6,88 C18,66 30,44 54,8"
        fill="none"
        stroke="var(--sage-deep)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {leaves.map((leaf, index) => (
        <g
          key={index}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(0.42)`}
          filter="url(#ar-lift)"
        >
          <path d="M1,0 C12,-12 32,-13 47,0 C32,13 12,12 1,0Z" fill="var(--sage)" />
        </g>
      ))}
    </svg>
  );
}

/** Satin bow with two tails, drawn around (0,0). */
export function Bow({ className, style }: OrnamentProps) {
  return (
    <svg className={className} style={style} viewBox="-60 -34 120 96" aria-hidden="true">
      <defs>
        <linearGradient id="ar-satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9b7ad" />
          <stop offset="0.45" stopColor="#c98680" />
          <stop offset="0.6" stopColor="#f0cbc3" />
          <stop offset="1" stopColor="#b26f6c" />
        </linearGradient>
      </defs>
      <g filter="url(#ar-lift)" fill="url(#ar-satin)">
        {/* Tails. */}
        <path d="M-4,4 C-10,22 -20,40 -30,58 L-20,54 L-14,62 C-6,42 0,24 4,8Z" />
        <path d="M4,4 C10,22 20,40 30,58 L20,54 L14,62 C6,42 0,24 -4,8Z" />
        {/* Loops. */}
        <path d="M-2,0 C-20,-30 -58,-30 -54,-4 C-50,18 -18,12 -2,2Z" />
        <path d="M2,0 C20,-30 58,-30 54,-4 C50,18 18,12 2,2Z" />
        {/* Knot. */}
        <rect x="-9" y="-9" width="18" height="17" rx="6" />
      </g>
      <path
        d="M-44,-10 C-34,-18 -20,-12 -10,-3 M44,-10 C34,-18 20,-12 10,-3"
        fill="none"
        stroke="#fff4ef"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Shared SVG filters: a soft cast shadow that makes shapes read as paper. */
export function PaperDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ar-lift" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.4" floodColor="#5a2e33" floodOpacity="0.22" />
        </filter>
      </defs>
    </svg>
  );
}
