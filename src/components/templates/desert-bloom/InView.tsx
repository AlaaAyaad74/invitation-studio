"use client";

import { useInView } from "@/hooks/useInView";
import {
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type InViewProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  /** How far above the bottom of the screen the element must reach. */
  offset?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  [data: `data-${string}`]: string | undefined;
};

// Sets data-in="true" while the element is in view (back to "false" once it
// leaves). Children animate from CSS with `[data-in="true"] ...` selectors
// and the --d delay var.
export default function InView({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  threshold = 0,
  offset = "25%",
  style,
  ...rest
}: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  // Play once the element has scrolled past the bottom `offset` of the
  // screen; reset once it is fully off screen so it replays next time.
  useInView(
    ref,
    (inView) => {
      if (ref.current) ref.current.dataset.in = inView ? "true" : "false";
    },
    { threshold, rootMargin: `0px 0px -${offset} 0px` },
  );

  return (
    <Tag
      {...rest}
      ref={ref}
      className={className}
      data-in="false"
      style={{ "--d": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
