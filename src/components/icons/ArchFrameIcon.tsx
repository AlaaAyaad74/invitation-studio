import type { SVGProps } from "react";

/** Double garden arch with a dot at each foot. */
export default function ArchFrameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" {...props}>
      <path
        d="M28 166 V78 C28 36 68 14 120 14 C172 14 212 36 212 78 V166"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M44 166 V82 C44 48 76 30 120 30 C164 30 196 48 196 82 V166"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <circle cx="28" cy="166" r="3" fill="currentColor" />
      <circle cx="212" cy="166" r="3" fill="currentColor" />
    </svg>
  );
}
