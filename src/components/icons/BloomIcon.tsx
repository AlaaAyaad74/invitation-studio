import type { SVGProps } from "react";

/** Five-petal rose with a gold heart. */
export default function BloomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
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
