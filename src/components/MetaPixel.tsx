"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { templates } from "@/data/templates";
import {
  META_PIXEL_ID,
  getContactChannel,
  getGuestInvitation,
  isMetaPixelEnabled,
  trackContact,
  trackCustom,
  trackLead,
  trackPageView,
  trackViewContent,
} from "@/lib/metaPixel";

// Survives React StrictMode's double effect run and re-mounts, so each path
// change fires exactly one PageView. null = the first page, whose PageView the
// base code below already sent.
let lastPageViewPath: string | null = null;
let lastPageEventPath: string | null = null;

/** Template demo pages (/templates/<slug>) by path, for ViewContent. */
const templateByHref = new Map(
  templates.filter((t) => t.href).map((t) => [t.href as string, t.title]),
);

/** Events tied to opening a page: template previews and guest invitations. */
function trackPageEvents(pathname: string) {
  const guest = getGuestInvitation(pathname);
  if (guest) {
    trackCustom("InvitationGuestView", { template_name: guest.templateName });
    return;
  }
  const templateName = templateByHref.get(pathname.replace(/\/$/, ""));
  if (templateName) trackViewContent(templateName, "template");
}

/**
 * Contact / Lead on outbound links, through one delegated listener so the
 * (mostly server-rendered) components keep their markup unchanged.
 * A link gets Lead when it carries data-meta-lead="<service name>".
 */
function onDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>("a[href]");
  if (!link) return;

  const pathname = window.location.pathname;
  // Guest invitation pages: no sales events (trackEvent also enforces this).
  if (getGuestInvitation(pathname)) return;

  const channel = getContactChannel(link.href);
  // WhatsApp links on template demos are the sample couple's RSVP, not us.
  const isDemoRsvp = channel === "whatsapp" && pathname.startsWith("/templates/");
  if (channel && !isDemoRsvp) trackContact(channel);

  const leadService = link.dataset.metaLead;
  if (leadService) trackLead(leadService);
}

function MetaPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (lastPageViewPath === null) {
      lastPageViewPath = pathname;
    } else if (lastPageViewPath !== pathname) {
      lastPageViewPath = pathname;
      trackPageView();
    }

    if (lastPageEventPath !== pathname) {
      lastPageEventPath = pathname;
      trackPageEvents(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", onDocumentClick, { capture: true });
    return () => document.removeEventListener("click", onDocumentClick, { capture: true });
  }, []);

  return null;
}

/** Meta Pixel base code plus SPA tracking. Renders nothing without a pixel ID. */
export default function MetaPixel() {
  if (!isMetaPixelEnabled) return null;

  const pixelId = JSON.stringify(META_PIXEL_ID);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${pixelId});
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(META_PIXEL_ID)}&ev=PageView&noscript=1`}
        />
      </noscript>
      <MetaPixelTracker />
    </>
  );
}
