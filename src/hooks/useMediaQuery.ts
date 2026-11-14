import { useSyncExternalStore } from "react";

/**
 * Live result of a CSS media query. The server (and first client render)
 * uses `serverValue`, then it updates to the real match after hydration.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
