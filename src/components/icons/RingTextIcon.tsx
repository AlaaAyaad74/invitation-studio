import type { SVGProps } from "react";

type RingTextIconProps = SVGProps<SVGSVGElement> & {
  /** Id for the circle path the text follows; unique on the page. */
  pathId: string;
  text: string;
  /**
   * Stretch two copies of the text to close the ring exactly. Turn off for
   * Arabic: stretched letter spacing breaks the joins, so three copies run
   * round instead.
   */
  fit?: boolean;
};

/** Text written around a circle. */
export default function RingTextIcon({
  pathId,
  text,
  fit = true,
  ...props
}: RingTextIconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <defs>
        <path
          id={pathId}
          d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
        />
      </defs>
      <text>
        {fit ? (
          <textPath href={`#${pathId}`} textLength="512" lengthAdjust="spacing">
            {text}
            {text}
          </textPath>
        ) : (
          <textPath href={`#${pathId}`}>
            {text}
            {text}
            {text}
          </textPath>
        )}
      </text>
    </svg>
  );
}
