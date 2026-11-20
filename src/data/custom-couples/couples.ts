import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

/** One bespoke couple invitation, served at /custom-templates/<slug>. */
export type CustomCouple = {
  /** URL segment, e.g. "omar&salma". */
  slug: string;
  /** Id for /calendar/<calendarId>. */
  calendarId: string;
  template: "heritage-script";
  /** Paid option: hide the "Made with ♡ by Invitation Studio" line. */
  hideBranding?: boolean;
  couple: { first: string; second: string };
  kicker: string;
  honour: string;
  closing: string;
  dateLabel: { weekday: string; day: string; month: string; year: string };
  /** ISO date-time with offset, e.g. "2026-11-14T19:00:00+02:00". */
  start: string;
  end: string;
  timeLabel: string;
  venue: { name: string; city: string; address: string; mapUrl: string };
  attire: string;
  /** Path under public/. */
  music: string;
  /** Paths under public/couples/<name>/. */
  cover: { video: string; poster: string; alt: string };
};

/** Add a couple here to publish their invitation page. */
export const customCouples: readonly CustomCouple[] = [];

export function customCoupleEvent(couple: CustomCouple) {
  return eventFromInvite(couple.calendarId, {
    couple: couple.couple,
    intro: couple.kicker,
    tagline: couple.honour,
    start: couple.start,
    end: couple.end,
    venue: couple.venue,
  });
}

export function getCalendarUrl(couple: CustomCouple) {
  return googleCalendarUrl(customCoupleEvent(couple));
}

export function getCouple(slug: string) {
  const decoded = decodeURIComponent(slug);
  return customCouples.find(
    (customCouple) =>
      customCouple.slug === slug || customCouple.slug === decoded,
  );
}
