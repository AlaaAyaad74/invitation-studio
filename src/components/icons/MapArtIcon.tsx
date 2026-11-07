import type { SVGProps } from "react";

type MapArtIconProps = SVGProps<SVGSVGElement> & {
  /** Class for the dashed route line (to animate it). */
  routeClassName?: string;
  /** Class for the pulse behind the pin. */
  pingClassName?: string;
};

/** Little illustrated map with a dashed route to a pin. */
export default function MapArtIcon({
  routeClassName,
  pingClassName,
  ...props
}: MapArtIconProps) {
  return (
    <svg viewBox="0 0 300 120" fill="none" aria-hidden="true" {...props}>
      <rect width="300" height="120" fill="var(--bg-alt)" />
      <path
        d="M0 84c60-10 90 14 150 2s100-30 150-18v52H0z"
        fill="color-mix(in srgb, var(--sage) 14%, transparent)"
      />
      <g stroke="var(--surface)" strokeWidth="7" strokeLinecap="round">
        <path d="M-10 40c80 10 130-20 320 4" />
        <path d="M70 -10c10 50-6 90 10 140" />
        <path d="M230 -10c-16 60 10 80-6 140" />
      </g>
      <g stroke="var(--line)" strokeWidth="2">
        <path d="M0 100h300M120 0v120" />
      </g>
      <path
        className={routeClassName}
        d="M30 104c30-6 40-30 50-52s60-14 100-10 40-4 52-6"
        stroke="var(--rose)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <circle
        cx="30"
        cy="104"
        r="4"
        fill="var(--surface)"
        stroke="var(--rose)"
        strokeWidth="2"
      />
      <g transform="translate(232 36)">
        <circle className={pingClassName} r="10" fill="var(--gold-soft)" />
        <path
          d="M0 4s-11-9.5-11-18a11 11 0 1 1 22 0c0 8.5-11 18-11 18Z"
          fill="var(--gold)"
          transform="translate(0 -6)"
        />
        <circle cx="0" cy="-20" r="4" fill="var(--surface)" />
      </g>
    </svg>
  );
}
