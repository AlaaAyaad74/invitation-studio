/**
 * Meta Pixel (Facebook / Instagram) helpers.
 *
 * Every pixel call in the app goes through this module. All functions are
 * safe no-ops on the server, when NEXT_PUBLIC_META_PIXEL_ID is not set, or
 * when the pixel script is blocked (ad blockers, privacy browsers).
 */

type FbqParams = Record<string, string | number | boolean | undefined>;

type Fbq = {
  (command: "init", pixelId: string): void;
  (command: "track", event: StandardEvent, params?: FbqParams): void;
  (command: "trackCustom", event: string, params?: FbqParams): void;
  (command: string, ...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";

export const isMetaPixelEnabled = META_PIXEL_ID.length > 0;

export type StandardEvent = "PageView" | "ViewContent" | "Contact" | "Lead";

export type ContentCategory = "template" | "invitation_video" | "invitation_photo";

export type ContactChannel = "instagram" | "whatsapp" | "tiktok";

/** Sales events that must never fire on customers' live invitation pages. */
const SALES_EVENTS = new Set<StandardEvent>(["ViewContent", "Contact", "Lead"]);

/**
 * Guest-facing invitation sites that customers send to their wedding guests.
 * Returns the template name for the InvitationGuestView event, or null when
 * the path is a marketing page.
 */
export function getGuestInvitation(pathname: string): { templateName: string } | null {
  if (pathname.startsWith("/template/")) return { templateName: "Botanical" };
  if (pathname.startsWith("/custom-templates/")) {
    return { templateName: "Heritage Script (custom)" };
  }
  return null;
}

function isGuestPage() {
  return typeof window !== "undefined" && getGuestInvitation(window.location.pathname) !== null;
}

// The base code runs with strategy="afterInteractive", so an event fired
// during the first render pass can arrive before window.fbq exists. Such calls
// wait here and are flushed as soon as the base code has defined fbq.
const pending: Array<() => void> = [];
let flushTimer: number | undefined;
const FLUSH_INTERVAL_MS = 100;
const FLUSH_GIVE_UP_MS = 10_000;

function flushWhenReady(startedAt = Date.now()) {
  if (flushTimer !== undefined) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = undefined;
    if (typeof window.fbq === "function") {
      pending.splice(0).forEach((call) => call());
      return;
    }
    if (Date.now() - startedAt > FLUSH_GIVE_UP_MS) {
      // Pixel blocked or failed to load: drop the events quietly.
      pending.length = 0;
      return;
    }
    flushWhenReady(startedAt);
  }, FLUSH_INTERVAL_MS);
}

function call(run: (fbq: Fbq) => void) {
  if (typeof window === "undefined" || !isMetaPixelEnabled) return;
  try {
    if (typeof window.fbq === "function") {
      run(window.fbq);
      return;
    }
    pending.push(() => {
      if (typeof window.fbq === "function") run(window.fbq);
    });
    flushWhenReady();
  } catch {
    // Tracking must never break the page.
  }
}

/** Fires a standard Meta event (PageView, ViewContent, Contact, Lead). */
export function trackEvent(name: StandardEvent, params?: FbqParams) {
  if (SALES_EVENTS.has(name) && isGuestPage()) return;
  call((fbq) => (params ? fbq("track", name, params) : fbq("track", name)));
}

/** Fires a custom Meta event (e.g. VideoPlay, InvitationGuestView). */
export function trackCustom(name: string, params?: FbqParams) {
  call((fbq) => (params ? fbq("trackCustom", name, params) : fbq("trackCustom", name)));
}

export function trackPageView() {
  trackEvent("PageView");
}

export function trackViewContent(contentName: string, contentCategory: ContentCategory) {
  trackEvent("ViewContent", {
    content_name: contentName,
    content_category: contentCategory,
  });
}

export function trackContact(channel: ContactChannel) {
  trackEvent("Contact", { channel });
}

export function trackLead(serviceName: string) {
  trackEvent("Lead", { service_name: serviceName });
}

const playedVideos = new Set<string>();

/** Fires VideoPlay once per video per browser session. */
export function trackVideoPlay(videoId: string, videoName: string) {
  if (playedVideos.has(videoId)) return;
  playedVideos.add(videoId);

  const key = `meta-pixel:video-play:${videoId}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Storage blocked: the in-memory set above still limits it to once per page life.
  }

  trackCustom("VideoPlay", { video_name: videoName, video_id: videoId });
}

/** Maps an outbound link to the contact channel it opens, if any. */
export function getContactChannel(href: string): ContactChannel | null {
  let host: string;
  try {
    host = new URL(href, "https://invalid.local").hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (host === "ig.me" || host === "instagram.com" || host.endsWith(".instagram.com")) {
    return "instagram";
  }
  if (host === "wa.me" || host === "whatsapp.com" || host.endsWith(".whatsapp.com")) {
    return "whatsapp";
  }
  if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "tiktok";
  return null;
}
