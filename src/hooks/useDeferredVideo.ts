"use client";

import { useEffect, useState } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const SLOW_CONNECTIONS = new Set(["slow-2g", "2g", "3g"]);

/**
 * True once the page has finished loading, so a cover video starts
 * downloading only after fonts, scripts and the poster are in.
 *
 * With `skipOnSlowNetwork`, it stays false when the browser reports Save-Data
 * or a 3G-or-slower connection: the poster is shown and the video never loads.
 * Use that only for decorative videos the page works without.
 */
export function useDeferredVideo({ skipOnSlowNetwork = false } = {}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (skipOnSlowNetwork) {
      const connection = (
        navigator as Navigator & { connection?: NetworkInformation }
      ).connection;
      if (
        connection?.saveData ||
        SLOW_CONNECTIONS.has(connection?.effectiveType ?? "")
      ) {
        return;
      }
    }

    const enable = () => setAllowed(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(enable, 0);
      return () => window.clearTimeout(id);
    }

    window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, [skipOnSlowNetwork]);

  return allowed;
}
