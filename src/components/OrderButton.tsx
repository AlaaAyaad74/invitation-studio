"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { IconType } from "react-icons";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { LuCheck, LuCopy, LuSend, LuX } from "react-icons/lu";
import { useDialog } from "@/hooks/useDialog";
import {
  contactLinkProps,
  orderLabels,
  orderMessage,
  primaryContact,
  type OrderKind,
} from "@/lib/contact";
import { trackContact, type ContactChannel, type ContentCategory } from "@/lib/metaPixel";
import { siteConfig } from "@/lib/site";

/** Icon for the chat the button opens. */
export const channelIcons: Record<ContactChannel, IconType> = {
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
};

const channelNames: Record<ContactChannel, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  tiktok: "TikTok",
};

const categories: Record<OrderKind, ContentCategory> = {
  template: "template",
  video: "invitation_video",
  photo: "invitation_photo",
};

/** Copies text, with a fallback for in-app browsers (e.g. Instagram's). */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** Chat link carrying the message where the channel allows it. */
function chatHref(message: string) {
  // Instagram DM links cannot carry a message, so they open the plain chat.
  return primaryContact.withMessage ? primaryContact.withMessage(message) : primaryContact.href;
}

type OrderButtonProps = {
  kind: OrderKind;
  /** Template, video or photo name, as shown on the site. */
  name: string;
  /** Path that opens this item (sent in the message). */
  path: string;
  className: string;
  /** Show the chat icon before the default label. */
  withIcon?: boolean;
  children?: ReactNode;
};

/**
 * Order button for a template, video or photo. The message names the item and
 * links to it.
 *
 * - Channels that accept a typed-in message (WhatsApp) open straight away.
 * - Instagram links cannot pre-fill a DM, so a sheet offers the phone's share
 *   sheet: Instagram → Direct → our account, with the message already typed.
 *   Where sharing is unavailable (most computers) it falls back to copying the
 *   message and opening our chat to paste it.
 *
 * Meta Pixel Contact (with content_name / content_category) fires when the
 * visitor shares or opens the chat.
 */
export default function OrderButton({
  kind,
  name,
  path,
  className,
  withIcon = false,
  children,
}: OrderButtonProps) {
  const ChannelIcon = channelIcons[primaryContact.channel];
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const label = children ?? (
    <>
      {withIcon ? <ChannelIcon aria-hidden className="h-4 w-4 shrink-0" /> : null}
      {orderLabels[kind]}
    </>
  );

  const buildMessage = () =>
    orderMessage(kind, name, new URL(path, window.location.origin).toString());

  const trackingProps = {
    "data-meta-content-name": name,
    "data-meta-content-category": categories[kind],
  };

  if (primaryContact.withMessage) {
    return (
      <a
        {...contactLinkProps()}
        {...trackingProps}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.stopPropagation();
          event.currentTarget.href = chatHref(buildMessage());
        }}
        className={className}
      >
        {label}
      </a>
    );
  }

  const open = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const text = buildMessage();
    setMessage(text);
    setCopied(false);
    void copyText(text).then(setCopied);
  };

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {label}
      </button>
      {message
        ? createPortal(
            <OrderSheet
              message={message}
              copied={copied}
              trackingProps={trackingProps}
              onCopy={() => void copyText(message).then(setCopied)}
              onShare={() => trackContact(primaryContact.channel, name, categories[kind])}
              onClose={() => setMessage(null)}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function OrderSheet({
  message,
  copied,
  trackingProps,
  onCopy,
  onShare,
  onClose,
}: {
  message: string;
  copied: boolean;
  trackingProps: Record<string, string>;
  onCopy: () => void;
  onShare: () => void;
  onClose: () => void;
}) {
  useDialog({ Escape: onClose });
  const ChannelIcon = channelIcons[primaryContact.channel];
  const channel = channelNames[primaryContact.channel];
  // Phones only: computers can share too, but have no Instagram app to share
  // to. Safe to read here: the sheet only renders in the browser, after a tap.
  const [canShare] = useState(
    () =>
      typeof navigator.share === "function" &&
      window.matchMedia("(pointer: coarse)").matches,
  );

  const share = async () => {
    onShare();
    try {
      await navigator.share({ text: message });
    } catch {
      // Cancelled or blocked: the copy-and-open option below still works.
    }
  };

  const steps = canShare
    ? [
        <>Tap <b className="font-medium text-ink">Share to {channel}</b> below</>,
        <>Choose <b className="font-medium text-ink">{channel}</b>, then <b className="font-medium text-ink">Direct</b> (Chats)</>,
        <>Pick <b className="font-medium text-ink">@{siteConfig.instagram}</b> and send. Your message is already typed.</>,
      ]
    : [
        <>Tap <b className="font-medium text-ink">Open {channel} chat</b> below</>,
        <>Paste the message: <b className="font-medium text-ink">Ctrl+V</b>, or press and hold, then <b className="font-medium text-ink">Paste</b></>,
        <>Send. We reply with the details and price.</>,
      ];

  const chatLink = (primary: boolean) => (
    <a
      {...contactLinkProps()}
      {...trackingProps}
      href={chatHref(message)}
      onClick={(event) => {
        event.stopPropagation();
        onCopy();
      }}
      className={
        primary
          ? "shine-sweep mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sage-deep text-sm font-medium tracking-wide text-white transition hover:bg-sage"
          : "mt-3 flex w-full items-center justify-center gap-1.5 text-xs tracking-wide text-sage-deep underline-offset-4 hover:underline"
      }
    >
      <ChannelIcon aria-hidden className={primary ? "h-4 w-4" : "h-3.5 w-3.5"} />
      {primary ? `Open ${channel} chat` : `Or open our ${channel} chat and paste it`}
    </a>
  );

  return (
    <div
      className="fixed inset-0 z-[130] flex animate-fade-in items-end justify-center bg-ink/55 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-sheet-title"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-md animate-fade-up overflow-hidden bg-ivory px-5 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] sm:px-7 sm:pb-7"
        onClick={(event) => event.stopPropagation()}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose/60 via-gold to-sage/70"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-ivory-deep hover:text-ink"
        >
          <LuX className="h-5 w-5" />
        </button>

        <p className="text-xs tracking-[0.2em] text-rose uppercase">Your order</p>
        <h2 id="order-sheet-title" className="mt-1 font-display text-3xl leading-tight text-ink">
          Send it in 3 taps
        </h2>

        <ol className="mt-4 space-y-2.5">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm leading-snug text-ink-muted">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 font-display text-sm text-gold [font-variant-numeric:lining-nums]">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="relative mt-4 border border-gold/40 bg-white p-3.5 text-[13px] leading-relaxed whitespace-pre-line text-ink [overflow-wrap:anywhere]">
          {message}
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            {copied ? (
              <>
                <LuCheck aria-hidden className="h-3.5 w-3.5 text-sage" />
                Message copied
              </>
            ) : (
              "Your message"
            )}
          </span>
          <button
            type="button"
            onClick={onCopy}
            className="flex items-center gap-1 tracking-wide text-sage-deep underline-offset-4 hover:underline"
          >
            <LuCopy aria-hidden className="h-3.5 w-3.5" />
            {copied ? "Copy again" : "Copy"}
          </button>
        </div>

        {canShare ? (
          <>
            <button
              type="button"
              onClick={share}
              className="shine-sweep mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sage-deep text-sm font-medium tracking-wide text-white transition hover:bg-sage"
            >
              <LuSend aria-hidden className="h-4 w-4" />
              Share to {channel}
            </button>
            {chatLink(false)}
          </>
        ) : (
          chatLink(true)
        )}
      </div>
    </div>
  );
}
