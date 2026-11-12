import type { SVGProps } from "react";

/** Solid pause bars used on the video cards. */
export default function PauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.5 5h3.5v14H6.5zM14 5h3.5v14H14z" />
    </svg>
  );
}
