import type { SVGProps } from "react";

/** Two curved lines for a frame corner. */
export default function CornerFlourishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true" {...props}>
      <path d="M3 21C3 12 12 3 21 3" />
      <path d="M7 21c0-6.2 6.3-13 14-14" opacity="0.55" />
    </svg>
  );
}
