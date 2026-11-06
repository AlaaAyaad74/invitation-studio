"use client";

import {
  useEffect,
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Play once the element has scrolled past the bottom quarter of the
    // screen, so the animation runs where the guest is looking.
    const enter = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) node.dataset.in = "true";
      },
      { threshold, rootMargin: `0px 0px -${offset} 0px` },
    );

    // Reset only when it is fully off screen, so it plays again next time
    // the guest scrolls back to it (and the reset is never seen).
    const leave = new IntersectionObserver(([entry]) => {
      if (entry && !entry.isIntersecting) node.dataset.in = "false";
    });

    enter.observe(node);
    leave.observe(node);
    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, [threshold, offset]);

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
