import { useId, type SVGProps } from "react";

/** Square crop from the middle of the Union Jack. */
export default function UkFlagIcon(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  return (
    <svg viewBox="15 0 30 30" aria-hidden="true" {...props}>
      <defs>
        <clipPath id={`${id}t`}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath={`url(#${id}t)`}
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
