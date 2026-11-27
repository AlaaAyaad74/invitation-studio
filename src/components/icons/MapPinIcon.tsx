import type { SVGProps } from "react";

export default function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M12 20.5s5.5-4.7 5.5-9.2a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.2 5.5 9.2Z" />
      <circle cx="12" cy="11.2" r="1.7" />
    </svg>
  );
}
