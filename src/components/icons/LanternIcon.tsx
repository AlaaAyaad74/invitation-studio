import type { SVGProps } from "react";

/** Hanging brass lantern with a chain and a rose tassel. */
export default function LanternIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 104" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="db-lantern-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6e2" />
          <stop offset="1" stopColor="#f3cf9f" />
        </linearGradient>
      </defs>
      {/* Chain */}
      <g stroke="var(--gold-soft)" strokeWidth="1">
        <ellipse cx="20" cy="4" rx="1.6" ry="2.6" />
        <ellipse cx="20" cy="10" rx="1.6" ry="2.6" />
        <ellipse cx="20" cy="16" rx="1.6" ry="2.6" />
        <ellipse cx="20" cy="22" rx="1.6" ry="2.6" />
      </g>
      <g stroke="var(--gold)" strokeWidth="1.1" strokeLinejoin="round">
        {/* Finial and cap */}
        <circle cx="20" cy="28" r="2.4" fill="var(--surface)" />
        <path d="M20 30.5v3" />
        <path
          d="M10.5 42c1.5-5.5 5-8.5 9.5-8.5s8 3 9.5 8.5z"
          fill="var(--gold-soft)"
        />
        <path d="M9 42h22v2.6H9z" fill="var(--gold)" />
        {/* Glass body with arched panels */}
        <path d="M11 44.6h18l-1.6 30H12.6z" fill="url(#db-lantern-glass)" />
        <path
          d="M15 72V52.5a2.6 2.6 0 0 1 5.2 0V72M19.8 72V52.5a2.6 2.6 0 0 1 5.2 0V72"
          stroke="var(--gold-soft)"
          strokeWidth="0.8"
        />
        {/* Base */}
        <path d="M11.6 74.6h16.8v2.6H11.6z" fill="var(--gold)" />
        <path d="M13.5 77.2h13L23 82.5h-6z" fill="var(--gold-soft)" />
      </g>
      {/* Tassel */}
      <path d="M20 82.5v5" stroke="var(--gold)" strokeWidth="1" />
      <circle cx="20" cy="89" r="1.8" fill="var(--gold)" />
      <path
        d="M18.6 90.5 18 98M20 90.8v8M21.4 90.5 22 98"
        stroke="var(--rose)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
