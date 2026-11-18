"use client";

import { useInView } from "@/hooks/useInView";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  /** How far above the bottom of the screen the element must reach. */
  offset?: string;
  /** Keep data-in="true" after the first reveal instead of replaying. */
  once?: boolean;
  style?: CSSProperties;
  "aria-label"?: string;
};

// Sets data-in="true" while the element is on screen. Children animate from
// CSS with `[data-in="true"] .x` selectors (see ui.module.css).
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  offset = "18%",
  once = false,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useInView(
    ref,
    (inView) => {
      if (ref.current) ref.current.dataset.in = inView ? "true" : "false";
    },
    { rootMargin: `0px 0px -${offset} 0px`, once },
  );

  return (
    <Tag {...rest} ref={ref} className={className} style={style} data-in="false">
      {children}
    </Tag>
  );
}
