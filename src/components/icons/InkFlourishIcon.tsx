import type { SVGProps } from "react";

type InkFlourishIconProps = SVGProps<SVGSVGElement> & {
  /**
   * Animation classes for the strokes and marks, usually a CSS module with
   * ink, inkOuter, inkInner, inkVine, inkStem, mark, dot, leaf, petal, core
   * and jewel.
   */
  classes: Readonly<Record<string, string>>;
};

/** Mirrored ink vines with leaves and dots, drawn stroke by stroke. */
export default function InkFlourishIcon({ classes, ...props }: InkFlourishIconProps) {
  return (
    <svg viewBox="0 0 360 64" fill="none" aria-hidden="true" {...props}>
      <path
        className={`${classes.ink} ${classes.inkOuter}`}
        pathLength={1}
        d="M18 32c42-18 78-18 118 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        className={`${classes.ink} ${classes.inkOuter}`}
        pathLength={1}
        d="M342 32c-42-18-78-18-118 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        className={`${classes.ink} ${classes.inkInner}`}
        pathLength={1}
        d="M28 36c36-12 68-12 100 0"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        className={`${classes.ink} ${classes.inkInner}`}
        pathLength={1}
        d="M332 36c-36-12-68-12-100 0"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        className={`${classes.ink} ${classes.inkVine}`}
        pathLength={1}
        d="M34 32c22-16 44-18 68-8 10 4 18 4 28 0 8-3 14-3 20 1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        className={`${classes.ink} ${classes.inkVine}`}
        pathLength={1}
        d="M326 32c-22-16-44-18-68-8-10 4-18 4-28 0-8-3-14-3-20 1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        className={`${classes.ink} ${classes.inkStem}`}
        pathLength={1}
        d="M54 24c6-10 2-16-4-18M78 20c8-11 3-17-3-19M102 22c7-10 1-15-5-16"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        className={`${classes.ink} ${classes.inkStem}`}
        pathLength={1}
        d="M306 24c-6-10-2-16 4-18M282 20c-8-11-3-17 3-19M258 22c-7-10-1-15 5-16"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        className={`${classes.ink} ${classes.inkStem}`}
        pathLength={1}
        d="M62 38c5 9 0 15-6 17M86 40c7 10 1 16-5 18M110 38c6 9 0 14-5 15"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        className={`${classes.ink} ${classes.inkStem}`}
        pathLength={1}
        d="M298 38c-5 9 0 15 6 17M274 40c-7 10-1 16 5 18M250 38c-6 9 0 14 5 15"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.55"
      />
      <g className={`${classes.mark} ${classes.dot}`}>
        <circle cx="22" cy="32" r="1.6" fill="currentColor" opacity="0.55" />
      </g>
      <g className={`${classes.mark} ${classes.dot}`}>
        <circle cx="338" cy="32" r="1.6" fill="currentColor" opacity="0.55" />
      </g>
      <g className={`${classes.mark} ${classes.leaf}`}>
        <path
          d="M68 18c4.5-1.5 8 1.5 7 6-3.5 2.5-8.5 1-10-2.5 0-1.5 1.5-3 3-3.5Z"
          fill="currentColor"
          opacity="0.78"
        />
      </g>
      <g className={`${classes.mark} ${classes.leaf}`}>
        <path
          d="M96 16c4.8-1.2 8.2 2.2 6.8 6.4-3.8 2.2-9 .4-10.2-3.2-.2-1.6 1.2-3 3.4-3.2Z"
          fill="currentColor"
          opacity="0.7"
        />
      </g>
      <g className={`${classes.mark} ${classes.leaf}`}>
        <path
          d="M292 18c-4.5-1.5-8 1.5-7 6 3.5 2.5 8.5 1 10-2.5 0-1.5-1.5-3-3-3.5Z"
          fill="currentColor"
          opacity="0.78"
        />
      </g>
      <g className={`${classes.mark} ${classes.leaf}`}>
        <path
          d="M264 16c-4.8-1.2-8.2 2.2-6.8 6.4 3.8 2.2 9 .4 10.2-3.2.2-1.6-1.2-3-3.4-3.2Z"
          fill="currentColor"
          opacity="0.7"
        />
      </g>
      <g className={`${classes.mark} ${classes.petal}`}>
        <path
          d="M148 32c-7-2-11-7-11-12 5 1 9 5 11 12Z"
          fill="currentColor"
          opacity="0.72"
        />
      </g>
      <g className={`${classes.mark} ${classes.petal}`}>
        <path
          d="M148 32c-7 2-11 7-11 12 5-1 9-5 11-12Z"
          fill="currentColor"
          opacity="0.55"
        />
      </g>
      <g className={`${classes.mark} ${classes.petal}`}>
        <path
          d="M212 32c7-2 11-7 11-12-5 1-9 5-11 12Z"
          fill="currentColor"
          opacity="0.72"
        />
      </g>
      <g className={`${classes.mark} ${classes.petal}`}>
        <path
          d="M212 32c7 2 11 7 11 12-5-1-9-5-11-12Z"
          fill="currentColor"
          opacity="0.55"
        />
      </g>
      <g className={`${classes.mark} ${classes.jewel}`}>
        <path
          d="M156 32c8-14 20-20 24-20s16 6 24 20c-8 14-20 20-24 20s-16-6-24-20Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M164 32c5.5-9.5 12.5-13.5 16-13.5s10.5 4 16 13.5c-5.5 9.5-12.5 13.5-16 13.5s-10.5-4-16-13.5Z"
          fill="#5c0e1c"
          opacity="0.92"
        />
        <path
          d="M172 32c3-5.5 6.8-7.8 8-7.8s5 2.3 8 7.8c-3 5.5-6.8 7.8-8 7.8s-5-2.3-8-7.8Z"
          fill="currentColor"
          opacity="0.95"
        />
      </g>
      <g className={`${classes.mark} ${classes.core}`}>
        <circle cx="180" cy="32" r="2.15" fill="#5c0e1c" />
      </g>
    </svg>
  );
}
