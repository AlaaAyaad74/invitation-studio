"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof navigator !== "undefined" && "webdriver" in navigator && navigator.webdriver) {
      return;
    }

    void fetch("/api/visits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    });
  }, [pathname]);

  return null;
}
