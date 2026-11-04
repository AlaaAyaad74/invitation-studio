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

// Only real Safari hands a text/calendar response to the iOS Calendar app.
// Chrome/Firefox/Edge on iOS and in-app browsers (WhatsApp, Instagram,
// Facebook, Telegram, ...) silently ignore .ics files.
function isIosSafari() {
  const ua = navigator.userAgent;
  const otherBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|YaBrowser|DuckDuckGo|GSA\//i;
  const inAppBrowser =
    /FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|Snapchat|Twitter|TikTok|musical_ly|Telegram|LinkedInApp|Pinterest|MicroMessenger/i;
  return (
    /Safari\//i.test(ua) &&
    /Version\//i.test(ua) &&
    !otherBrowser.test(ua) &&
    !inAppBrowser.test(ua)
  );
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
          const icsPath = `/calendar/${template}.ics`;

          if (isIosSafari()) {
            window.location.href = `${window.location.origin}${icsPath}`;
            return;
          }

          // Other iOS browsers can't import .ics files, but iOS hands
          // webcal:// links to the Apple Calendar app (as a subscription).
          window.location.href = `webcal://${window.location.host}${icsPath}`;
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
