"use client";

import { useEffect } from "react";

/**
 * Deterrent only: blocks the right-click menu and the usual DevTools / view
 * source shortcuts in production. It cannot truly stop DevTools (browser
 * menu, view-source:, or disabling JS all bypass it) — real protection is
 * keeping secrets on the server.
 */
export default function DevtoolsGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const isEditable = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA");

    const onContextMenu = (event: MouseEvent) => {
      // Keep copy/paste menus working in form fields.
      if (!isEditable(event.target)) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const mod = event.ctrlKey || event.metaKey;
      const blocked =
        key === "f12" ||
        // Ctrl/Cmd+Shift+I/J/C (Chrome, Edge, Firefox)
        (mod && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        // Cmd+Option+I/J/C (macOS)
        (event.metaKey && event.altKey && ["i", "j", "c"].includes(key)) ||
        // View source
        (mod && key === "u");
      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return null;
}
