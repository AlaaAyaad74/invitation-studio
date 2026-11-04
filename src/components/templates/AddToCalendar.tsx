"use client";

import type { ReactNode } from "react";
import { androidCalendarUrl, eventFromGoogleUrl } from "@/lib/calendar";

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

// In-app browsers that block calendar files and app links (intent://,
// x-safari-https://) on both iOS and Android.
function isBlockingInAppBrowser() {
  return /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|TikTok|musical_ly|Snapchat|Line\//i.test(
    navigator.userAgent,
  );
}

// Only real Safari hands a text/calendar response to the iOS Calendar app.
// Chrome/Firefox/Edge on iOS and in-app browsers silently ignore .ics files.
function isIosSafari() {
  const ua = navigator.userAgent;
  const otherBrowser =
    /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|YaBrowser|DuckDuckGo|GSA\//i;
  const inAppBrowser =
    /FBAN|FBAV|FB_IAB|Instagram|WhatsApp|Line\/|Snapchat|Twitter|TikTok|musical_ly|Telegram|LinkedInApp|Pinterest|MicroMessenger/i;
  return (
    /Safari\//i.test(ua) &&
    /Version\//i.test(ua) &&
    !otherBrowser.test(ua) &&
    !inAppBrowser.test(ua)
  );
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
        // Instagram/Facebook/... block calendar links: jump straight to
        // Chrome on Android, which opens the "new event" form.
        if (isAndroid() && isBlockingInAppBrowser()) {
          event.preventDefault();
          const { protocol, host } = window.location;
          const scheme = protocol.replace(":", "");
          const chromeIntent = `intent://${host}/calendar/${template}?open=android-page#Intent;scheme=${scheme};action=android.intent.action.VIEW;package=com.android.chrome;end`;

          // 1. Open the calendar "new event" form straight from the app.
          const calendarEvent = eventFromGoogleUrl(template, href);
          if (!calendarEvent) {
            window.location.href = chromeIntent;
            return;
          }

          let left = false;
          const onHide = () => {
            left = true;
          };
          document.addEventListener("visibilitychange", onHide);
          window.addEventListener("pagehide", onHide);
          window.addEventListener("blur", onHide);
          window.location.href = androidCalendarUrl(calendarEvent, false);

          // 2. Still here: the app blocked it. Open Chrome on the calendar
          //    page, which opens the form (or shows a one-tap button).
          window.setTimeout(() => {
            document.removeEventListener("visibilitychange", onHide);
            window.removeEventListener("pagehide", onHide);
            window.removeEventListener("blur", onHide);
            if (!left && document.visibilityState === "visible") {
              window.location.href = chromeIntent;
            }
          }, 1200);
          return;
        }

        if (isIos()) {
          event.preventDefault();
          const icsUrl = `${window.location.origin}/calendar/${template}.ics`;

          // Safari shows the prefilled event card (names, date, location)
          // with an "Add to Calendar" button.
          if (isIosSafari()) {
            window.location.href = icsUrl;
            return;
          }

          // Chrome / in-app browsers (Instagram, ...) can't show that card:
          // open the .ics URL directly in Safari (x-safari-https://).
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
