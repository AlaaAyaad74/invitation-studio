"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuCheck, LuCopy, LuLink, LuX } from "react-icons/lu";

type ShareModalProps = {
  title: string;
  path: string;
  message?: string;
  onClose: () => void;
};

type Platform = "android" | "ios" | "desktop";

type ShareTarget = {
  id: string;
  label: string;
  color: string;
  background?: string;
  icon: IconType;
  webHref: (url: string, text: string) => string;
  appHref: (url: string, text: string, platform: "android" | "ios") => string;
  nativeShare?: boolean;
};

function getPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return "desktop";
}

function androidIntent(scheme: string, path: string, packageName: string) {
  return `intent://${path}#Intent;scheme=${scheme};package=${packageName};end`;
}

function messageWithLink(text: string, url: string) {
  return `${text} ${url}`;
}

const shareTargets: ShareTarget[] = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#00c6ff",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    icon: FaFacebookF,
    webHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    appHref: (url, _text, platform) => {
      const sharer = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      const path = `facewebmodal/f?href=${encodeURIComponent(sharer)}`;
      if (platform === "android") {
        return androidIntent("fb", path, "com.facebook.katana");
      }
      return `fb://${path}`;
    },
  },
  {
    id: "x",
    label: "X",
    color: "#000000",
    icon: FaXTwitter,
    webHref: (url, text) =>
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    appHref: (url, text, platform) => {
      const message = encodeURIComponent(messageWithLink(text, url));
      if (platform === "android") {
        return androidIntent("twitter", `post?message=${message}`, "com.twitter.android");
      }
      return `twitter://post?message=${message}`;
    },
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#833ab4",
    background: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    icon: FaInstagram,
    nativeShare: true,
    webHref: () => "https://www.instagram.com/direct/inbox/",
    appHref: () => "instagram://direct-inbox",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    icon: FaWhatsapp,
    webHref: (url, text) => {
      const message = encodeURIComponent(messageWithLink(text, url));
      return getPlatform() === "desktop"
        ? `https://web.whatsapp.com/send?text=${message}`
        : `whatsapp://send?text=${message}`;
    },
    appHref: (url, text, platform) => {
      const message = encodeURIComponent(messageWithLink(text, url));
      if (platform === "android") {
        return androidIntent("whatsapp", `send?text=${message}`, "com.whatsapp");
      }
      return `whatsapp://send?text=${message}`;
    },
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#2AABEE",
    icon: FaTelegram,
    webHref: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    appHref: (url, text, platform) => {
      const path = `msg_url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      if (platform === "android") {
        return androidIntent("tg", path, "org.telegram.messenger");
      }
      return `tg://${path}`;
    },
  },
];

export default function ShareModal({
  title,
  path,
  message,
  onClose,
}: ShareModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState("");
  const url = `${window.location.origin}${path}`;
  const shareText = message ?? `${title} wedding invitation`;
  const platform = getPlatform();

  const copyLink = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        copyWithTextarea(url);
      }
    } catch {
      try {
        copyWithTextarea(url);
      } catch {
        return false;
      }
    }

    setCopied(true);
    setHint("");
    return true;
  }, [url]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight"
      ) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown, true);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm"
      style={{ zIndex: 90 }}
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_80px_-24px_rgba(42,38,35,0.45)] sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ivory-deep pb-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-ink">
              Share
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{title}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-muted transition hover:bg-ivory hover:text-ink"
          >
            <LuX className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <p className="mt-5 text-sm text-ink-muted">Share this link via</p>
        <div className="mt-4 flex items-center justify-between">
          {shareTargets.map((target) => {
            const Icon = target.icon;
            const href =
              platform === "desktop"
                ? target.webHref(url, shareText)
                : target.appHref(url, shareText, platform);
            const useNativeShare = Boolean(target.nativeShare && platform !== "desktop");
            return (
              <a
                key={target.id}
                href={href}
                target={platform === "desktop" && !useNativeShare ? "_blank" : undefined}
                rel={platform === "desktop" && !useNativeShare ? "noopener noreferrer" : undefined}
                aria-label={`Share on ${target.label}`}
                title={target.label}
                onClick={(event) => {
                  if (useNativeShare) {
                    event.preventDefault();
                    void openInstagramDirect(shareText, url, () => {
                      setHint(
                        "Link copied. Paste it into an Instagram direct message.",
                      );
                    });
                    return;
                  }

                  if (platform === "desktop") return;

                  event.preventDefault();
                  openNativeApp(href);
                }}
                style={{
                  backgroundColor: target.color,
                  backgroundImage: target.background,
                  color: "#fff",
                  borderColor: target.background ? "transparent" : target.color,
                  borderWidth: target.background ? 0 : undefined,
                  width: 44,
                  height: 44,
                }}
                className="inline-flex shrink-0 items-center justify-center rounded-full border-2 transition hover:scale-105"
              >
                <Icon
                  className="h-5 w-5"
                  style={{ width: 20, height: 20 }}
                  aria-hidden
                />
              </a>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? "Link copied" : hint}
        </p>
        {hint ? <p className="mt-4 text-sm text-sage-deep">{hint}</p> : null}

        <p className="mt-5 text-sm text-ink-muted">Or copy link</p>
        <div
          className="mt-3 flex items-center gap-2 border border-ivory-deep"
          style={{
            height: 48,
            borderRadius: 9999,
            paddingLeft: 16,
            paddingRight: 6,
          }}
        >
          <LuLink className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          <input
            readOnly
            value={url}
            aria-label="Share link"
            onFocus={(event) => event.currentTarget.select()}
            className="min-w-0 flex-1 truncate border-0 bg-transparent p-0 text-sm leading-5 text-ink-muted outline-none"
          />
          <button
            type="button"
            onClick={() => {
              void copyLink();
            }}
            aria-label={copied ? "Link copied" : "Copy link"}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9999,
              cursor: "pointer",
            }}
            className={`inline-flex shrink-0 items-center justify-center transition ${
              copied ? "bg-sage-deep text-white" : "text-ink hover:bg-ivory"
            }`}
          >
            {copied ? (
              <LuCheck className="h-4 w-4" strokeWidth={2.4} />
            ) : (
              <LuCopy className="h-4 w-4" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function openNativeApp(href: string) {
  window.location.assign(href);
}

async function openInstagramDirect(
  title: string,
  url: string,
  onStay: () => void,
) {
  const text = messageWithLink(title, url);

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      copyWithTextarea(url);
    }
  } catch {
    try {
      copyWithTextarea(url);
    } catch {
      /* paste is still possible from the dialog field */
    }
  }

  onStay();
}

function copyWithTextarea(text: string) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Could not copy");
}
