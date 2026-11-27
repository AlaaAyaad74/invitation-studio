import type { SVGProps } from "react";

/** Small double wave set between two rules. */
export default function WaveOrnamentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" {...props}>
      <path d="M1 5c3.2-4.2 6.4-4.2 8 0 1.6-4.2 4.8-4.2 8 0" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
