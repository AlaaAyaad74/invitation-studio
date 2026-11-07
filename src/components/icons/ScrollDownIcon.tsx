import type { SVGProps } from "react";

/** Two stacked chevrons pointing down. */
export default function ScrollDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 6.5 12 12.5 18 6.5" />
      <path d="M6 14.5 12 20.5 18 14.5" />
    </svg>
  );
}
