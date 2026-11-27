import type { SVGProps } from "react";

/** Gold swash drawn under the couple's names. */
export default function WelcomeFlourishIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 30" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 18c30-14 54 8 82-2 14-5 18-12 22-12s8 7 22 12c28 10 52-12 82 2"
        stroke="var(--gold-soft)"
        strokeWidth="1.2"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  );
}
