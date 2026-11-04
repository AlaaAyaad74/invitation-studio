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
          const icsUrl = `${window.location.origin}/calendar/${template}.ics`;

          // Safari shows the prefilled event card (names, date, location)
          // with an "Add to Calendar" button.
          if (isIosSafari()) {
            window.location.href = icsUrl;
            return;
          }

          // Chrome / in-app browsers can't show that card: hand the same
          // .ics URL to Safari (x-safari-https:// / x-safari-http://).
          window.location.href = `x-safari-${icsUrl}`;
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
