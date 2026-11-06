import type { CSSProperties } from "react";

export function Bloom({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="12"
            cy="7.2"
            rx="3.3"
            ry="4.6"
            opacity="0.82"
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="2.6" fill="var(--gold-soft)" />
    </svg>
  );
}

export function Branch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 28"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 14h62M114 14h62" stroke="var(--gold-soft)" strokeWidth="1" />
      <g fill="var(--sage)" opacity="0.75">
        <ellipse
          cx="38"
          cy="9.5"
          rx="5"
          ry="2.1"
          transform="rotate(-28 38 9.5)"
        />
        <ellipse
          cx="50"
          cy="18.5"
          rx="5"
          ry="2.1"
          transform="rotate(28 50 18.5)"
        />
        <ellipse
          cx="142"
          cy="9.5"
          rx="5"
          ry="2.1"
          transform="rotate(28 142 9.5)"
        />
        <ellipse
          cx="130"
          cy="18.5"
          rx="5"
          ry="2.1"
          transform="rotate(-28 130 18.5)"
        />
      </g>
      <g fill="var(--peach)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="90"
            cy="7.5"
            rx="4.4"
            ry="6.2"
            transform={`rotate(${angle} 90 14)`}
          />
        ))}
      </g>
      <circle cx="90" cy="14" r="3.2" fill="var(--gold-soft)" />
      <circle cx="74" cy="14" r="1.4" fill="var(--gold-soft)" />
      <circle cx="106" cy="14" r="1.4" fill="var(--gold-soft)" />
    </svg>
  );
}
