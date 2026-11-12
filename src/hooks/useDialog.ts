"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

type KeyHandlers = Partial<Record<string, (event: KeyboardEvent) => void>>;

/**
 * Shared behaviour for full-screen overlays: locks page scroll while active
 * and routes key presses (by `event.key`) to the given handlers. Handlers may
 * change every render; the listener always calls the latest ones.
 */
export function useDialog(keys: KeyHandlers, active = true) {
  const keysRef = useRef(keys);
  useLayoutEffect(() => {
    keysRef.current = keys;
  });

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key]?.(event);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);
}
