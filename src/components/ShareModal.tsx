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

type ShareTarget = {
  id: string;
  label: string;
  color: string;
  background?: string;
  icon: IconType;
  buildHref: (url: string, text: string) => string;
  copyFirst?: boolean;
};

const shareTargets: ShareTarget[] = [
  {
    id: "facebook",
    label: "Facebook",
    color: "#00c6ff",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    icon: FaFacebookF,
    buildHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    label: "X",
    color: "#000000",
    icon: FaXTwitter,
    buildHref: (url, text) =>
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#833ab4",
    background: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    icon: FaInstagram,
    buildHref: () => "https://www.instagram.com/",
    copyFirst: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25D366",
    icon: FaWhatsapp,
    buildHref: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#2AABEE",
    icon: FaTelegram,
    buildHref: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
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
            return (
              <a
                key={target.id}
                href={target.buildHref(url, shareText)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${target.label}`}
                title={target.label}
                onClick={
                  target.copyFirst
                    ? () => {
                        void copyLink().then((ok) => {
                          if (ok) setHint("Link copied. Paste it into Instagram.");
                        });
                      }
                    : undefined
                }
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
