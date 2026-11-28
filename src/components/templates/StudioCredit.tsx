"use client";

import ArrowUpRightIcon from "@/components/icons/ArrowUpRightIcon";
import { useLang } from "@/components/i18n/LangProvider";
import type { Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

/** Set on customers' live invitations (not on the template demos). */
export type GuestBranding = {
  /** utm_campaign value: the couple's slug. */
  campaign: string;
  /** Paid option: remove the "Made with" line entirely. */
  hidden?: boolean;
};

export default function StudioCredit({
  className,
  guest,
  lang,
}: {
  className: string;
  guest?: GuestBranding;
  /** The invitation's own language, when it can differ from the site's. */
  lang?: Lang;
}) {
  const siteLang = useLang();
  const ar = (lang ?? siteLang) === "ar";

  if (guest) {
    if (guest.hidden) return null;
    const params = new URLSearchParams({
      utm_source: "invitation",
      utm_medium: "guest",
      utm_campaign: guest.campaign,
    });
    return (
      <footer className={className}>
        <a
          // Guests land on our Instagram; the UTM tags name the couple's page.
          href={`${siteConfig.instagramUrl}?${params.toString()}`}
          target="_blank"
          rel="noreferrer"
          // Reads as a link: underline and an arrow, like the demos' credit.
          className={`inline-flex items-center gap-1.5 underline decoration-current/50 opacity-80 transition-opacity hover:opacity-100 hover:decoration-current ${
            ar
              ? "text-[1.3em] leading-relaxed tracking-normal normal-case underline-offset-[0.55em]"
              : "underline-offset-4"
          }`}
        >
          {ar ? "اتعملت بحب ♡ في استوديو الدعوات" : "Made with ♡ by Invitation Studio"}
          <ArrowUpRightIcon className={`h-[1.1em] w-[1.1em] shrink-0 ${ar ? "-scale-x-100" : ""}`} />
        </a>
      </footer>
    );
  }

  return (
    <footer className={className}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-1.5 underline decoration-current/50 transition-opacity hover:opacity-70 hover:decoration-current ${
          // Arabic letters must join: no tracking or caps from the template,
          // a larger size, and the underline clear of the dots below.
          ar
            ? "text-[1.3em] leading-relaxed tracking-normal normal-case underline-offset-[0.55em]"
            : "underline-offset-4"
        }`}
      >
        {ar ? "اتعملت بحب في استوديو الدعوات" : "Crafted with Invitation Studio"}
        <ArrowUpRightIcon className={`h-[1.1em] w-[1.1em] shrink-0 ${ar ? "-scale-x-100" : ""}`} />
      </a>
    </footer>
  );
}
