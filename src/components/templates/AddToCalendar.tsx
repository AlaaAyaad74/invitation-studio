"use client";

import type { ReactNode } from "react";

type AddToCalendarProps = {
  template: string;
  href: string;
  className?: string;
  children: ReactNode;
};

function isIos() {
  const ua = navigator.userAgent;
  const iPadOs =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/i.test(ua) || iPadOs;
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export default function AddToCalendar({
  template,
  href,
  className,
  children,
}: AddToCalendarProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={(event) => {
        if (isIos()) {
          event.preventDefault();
          window.location.assign(`/calendar/${template}`);
          return;
        }

        if (isAndroid()) {
          event.preventDefault();
          window.location.assign(`/calendar/${template}?open=android`);
        }
      }}
    >
      {children}
    </a>
  );
}
