import type { SVGProps } from "react";

type ClipPathDefsProps = SVGProps<SVGSVGElement> & {
  /** Shapes in objectBoundingBox units (0–1), used as `url(#id)`. */
  clips: readonly { id: string; d: string }[];
};

/** Invisible SVG that only defines clip-path shapes for other elements. */
export default function ClipPathDefs({ clips, ...props }: ClipPathDefsProps) {
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        {clips.map((clip) => (
          <clipPath key={clip.id} id={clip.id} clipPathUnits="objectBoundingBox">
            <path d={clip.d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}
