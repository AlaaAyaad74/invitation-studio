import type { SVGProps } from "react";

/** Fine line drawing of a domed palace with roses at its feet. */
export default function PalaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 92" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="db-palace-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2d6c2" />
          <stop offset="1" stopColor="#fffbf6" />
        </linearGradient>
        <linearGradient id="db-palace-ground" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9a56b" stopOpacity="0" />
          <stop offset="0.2" stopColor="#c9a56b" />
          <stop offset="0.8" stopColor="#c9a56b" />
          <stop offset="1" stopColor="#c9a56b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g
        stroke="var(--gold-soft)"
        strokeWidth="0.9"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="var(--surface)"
      >
        {/* Towers */}
        <path d="M40 86V48h8v38M192 86V48h8v38" />
        <path d="M38 58h12M190 58h12" />
        <path
          d="M40 48c0-5 1.8-8 4-10 2.2 2 4 5 4 10M192 48c0-5 1.8-8 4-10 2.2 2 4 5 4 10"
          fill="url(#db-palace-dome)"
        />
        <path d="M44 38v-4M196 38v-4" />
        <path d="M42.4 70v-4a1.6 1.6 0 0 1 3.2 0v4M194.4 70v-4a1.6 1.6 0 0 1 3.2 0v4" />

        {/* Wings */}
        <path d="M56 86V66h34v20M150 86V66h34v20" />
        <path d="M54 66h38M148 66h38" />
        <path
          d="M64 66c0-5.5 4-8.5 9-11 5 2.5 9 5.5 9 11M158 66c0-5.5 4-8.5 9-11 5 2.5 9 5.5 9 11"
          fill="url(#db-palace-dome)"
        />
        <path d="M73 55v-3.5M167 55v-3.5" />
        <path d="M61 82v-7a3 3 0 0 1 6 0v7M70 82v-7a3 3 0 0 1 6 0v7M79 82v-7a3 3 0 0 1 6 0v7" />
        <path d="M155 82v-7a3 3 0 0 1 6 0v7M164 82v-7a3 3 0 0 1 6 0v7M173 82v-7a3 3 0 0 1 6 0v7" />

        {/* Main hall and dome */}
        <path d="M90 86V56h60v30" />
        <path d="M88 56h64" />
        <path d="M100 56v-5h40v5" />
        <path
          d="M101 51c0-15 10-22 19-30 9 8 19 15 19 30"
          fill="url(#db-palace-dome)"
          stroke="var(--gold)"
        />
        <path d="M120 21v-8" stroke="var(--gold)" />
        <circle cx="120" cy="10.5" r="2.3" stroke="var(--gold)" />
        <path d="M111 86V73a9 9 0 0 1 18 0v13" stroke="var(--gold)" />
        <path d="M96 70v-5a2.5 2.5 0 0 1 5 0v5M139 70v-5a2.5 2.5 0 0 1 5 0v5" />
      </g>

      {/* Ground */}
      <path d="M8 86h224" stroke="url(#db-palace-ground)" strokeWidth="1" />
      <path
        d="M86 89.5h68"
        stroke="var(--gold-soft)"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Roses */}
      <g fill="var(--sage)" opacity="0.75">
        <ellipse
          cx="22"
          cy="83"
          rx="4"
          ry="1.6"
          transform="rotate(-30 22 83)"
        />
        <ellipse cx="33" cy="82" rx="4" ry="1.6" transform="rotate(25 33 82)" />
        <ellipse
          cx="218"
          cy="83"
          rx="4"
          ry="1.6"
          transform="rotate(30 218 83)"
        />
        <ellipse
          cx="207"
          cy="82"
          rx="4"
          ry="1.6"
          transform="rotate(-25 207 82)"
        />
      </g>
      <g fill="var(--peach)">
        <circle cx="27" cy="80" r="3.4" />
        <circle cx="213" cy="80" r="3.4" />
        <circle cx="20" cy="85" r="2.2" />
        <circle cx="220" cy="85" r="2.2" />
      </g>
      <g fill="var(--rose)" opacity="0.5">
        <circle cx="27" cy="80" r="1.2" />
        <circle cx="213" cy="80" r="1.2" />
      </g>
    </svg>
  );
}
