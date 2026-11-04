"use client";

import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

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

// Try to reopen the current invitation page in the system browser.
function openInSystemBrowser() {
  const { protocol, host, pathname, search, hash } = window.location;
  if (isAndroid()) {
    const scheme = protocol.replace(":", "");
    window.location.href = `intent://${host}${pathname}${search}${hash}#Intent;scheme=${scheme};action=android.intent.action.VIEW;package=com.android.chrome;end`;
  } else if (isIos()) {
    window.location.href = `x-safari-${window.location.href}`;
  }
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    input.remove();
    return ok;
  }
}

function InAppBrowserHint({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 999,
    border: "1px solid #1f1f1f",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 16,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          color: "#1f1f1f",
          borderRadius: 20,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          textAlign: "center",
        }}
      >
        <strong style={{ fontSize: 18 }}>Open in your browser</strong>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#555" }}>
          This app&apos;s browser can&apos;t save calendar events. Tap{" "}
          <b>⋯</b> at the top right and choose{" "}
          <b>Open in external browser</b>, then tap{" "}
          <b>Add to calendar</b> again.
        </p>
        <button
          type="button"
          onClick={openInSystemBrowser}
          style={{ ...buttonStyle, background: "#1f1f1f", color: "#fff" }}
        >
          Open in browser
        </button>
        <button
          type="button"
          onClick={async () => setCopied(await copyText(window.location.href))}
          style={{ ...buttonStyle, background: "#fff", color: "#1f1f1f" }}
        >
          {copied ? "Link copied ✓" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            ...buttonStyle,
            border: "none",
            background: "transparent",
            color: "#777",
            fontWeight: 500,
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function AddToCalendar({
  template,
  href,
  className,
  children,
}: AddToCalendarProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={(event) => {
          if (isBlockingInAppBrowser()) {
            event.preventDefault();
            setShowHint(true);
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

            // Chrome / other in-app browsers can't show that card: hand the
            // same .ics URL to Safari (x-safari-https:// / x-safari-http://).
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
      {showHint && <InAppBrowserHint onClose={() => setShowHint(false)} />}
    </>
  );
}
