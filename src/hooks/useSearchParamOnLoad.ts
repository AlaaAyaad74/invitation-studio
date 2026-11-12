"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a query param in the browser only (null during prerender), so pages
 * that use it can stay static and fully prefetchable.
 */
export function useSearchParamOnLoad(name: string, enabled = true) {
  return useSyncExternalStore(
    noopSubscribe,
    () =>
      enabled ? new URLSearchParams(window.location.search).get(name) : null,
    () => null,
  );
}
