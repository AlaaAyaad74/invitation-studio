import Link from "next/link";
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
}: {
  className: string;
  guest?: GuestBranding;
}) {
  if (guest) {
    if (guest.hidden) return null;
    const params = new URLSearchParams({
      utm_source: "invitation",
      utm_medium: "guest",
      utm_campaign: guest.campaign,
    });
    return (
      <footer className={className}>
        <Link
          href={`/?${params.toString()}`}
          className="opacity-70 transition-opacity hover:opacity-100"
        >
          Made with ♡ by Invitation Studio
        </Link>
      </footer>
    );
  }

  return (
    <footer className={className}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 underline decoration-current/50 underline-offset-4 transition-opacity hover:opacity-70 hover:decoration-current"
      >
        Crafted with Invitation Studio
        <svg
          viewBox="0 0 24 24"
          className="h-[1.1em] w-[1.1em] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </footer>
  );
}
