"use client";

import { useEffect, useRef, type RefObject } from "react";

type InViewOptions = {
  /** Visible fraction needed to count as "in" (IntersectionObserver threshold). */
  threshold?: number;
  /** Shrinks/grows the viewport used for the "in" check, e.g. "0px 0px -25% 0px". */
  rootMargin?: string;
  /**
   * true: report "in" once, then stop watching.
   * false: also report "out" once the element has fully left the screen,
   * so the caller can replay its animation next time.
   */
  once?: boolean;
};

/**
 * Calls `onChange(true)` when `ref`'s element scrolls into view and, unless
 * `once`, `onChange(false)` when it is completely off screen again.
 */
export function useInView(
  ref: RefObject<Element | null>,
  onChange: (inView: boolean) => void,
  { threshold = 0, rootMargin = "0px", once = false }: InViewOptions = {},
) {
  // Keep the latest callback without re-creating the observers.
  const callback = useRef(onChange);
  useEffect(() => {
    callback.current = onChange;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const enter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callback.current(true);
          if (once) enter.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    // Reset only when fully off screen, so the reset is never seen.
    const leave = once
      ? null
      : new IntersectionObserver(([entry]) => {
          if (entry && !entry.isIntersecting) callback.current(false);
        });

    enter.observe(node);
    leave?.observe(node);
    return () => {
      enter.disconnect();
      leave?.disconnect();
    };
  }, [ref, threshold, rootMargin, once]);
}
