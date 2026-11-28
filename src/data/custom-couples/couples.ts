import { heritageEvent, type HeritageInvitation } from "@/data/heritage-script";
import { googleCalendarUrl } from "@/lib/calendar";

/**
 * One bespoke couple invitation, served at /custom-templates/<slug>.
 * Built on the Heritage Script template, in Arabic.
 */
export type CustomCouple = {
  /** URL segment, e.g. "omar&salma". */
  slug: string;
  template: "heritage-script";
  occasion: "wedding" | "engagement";
  /** Paid option: hide the "Made with ♡ by Invitation Studio" line. */
  hideBranding?: boolean;
  /** Names in Latin letters, for the browser tab and link previews. */
  latinNames: { first: string; second: string };
  /** Everything the template shows. Empty `attire` or `venue.city` is hidden. */
  invitation: HeritageInvitation;
};

/** Add a couple here to publish their invitation page. */
export const customCouples: readonly CustomCouple[] = [
  {
    slug: "abdelrahman&sogoud",
    template: "heritage-script",
    occasion: "engagement",
    latinNames: { first: "Abdelrahman", second: "Sogoud" },
    invitation: {
      lang: "ar",
      calendarId: "abdelrahman-sogoud",
      couple: { first: "عبدالرحمن", second: "سجود" },
      kicker: "بمباركة عائلتيهما",
      honour: "يتشرفان بدعوتكم لحضور حفل الخطوبة",
      closing: "حفل خطوبتهما",
      dateLabel: {
        weekday: "الجمعة",
        day: "11",
        month: "ديسمبر",
        year: "2026",
      },
      // TODO: confirm the time with the couple (7 PM assumed).
      start: "2026-12-11T19:00:00+02:00",
      end: "2026-12-11T23:00:00+02:00",
      timeLabel: "الساعة السابعة مساءً",
      venue: {
        name: "بانوراما سيتي",
        city: "",
        address: "",
        mapUrl: "https://maps.app.goo.gl/ZfMJu4GAXacGHtKY6",
      },
      attire: "",
      music: "/voices/abdelrahman-sogoud-voice.mp3",
      gallery: [
        {
          src: "/couples/abdelrahman&sogoud/1.webp",
          alt: "عبدالرحمن وسجود مع بوكيه الورد الأحمر",
          // Portrait photo, in its own shape.
          ratio: 3 / 4,
        },
        {
          src: "/couples/abdelrahman&sogoud/2.webp",
          alt: "سيلفي لعبدالرحمن وسجود جنب الورد",
          // Selfie: trimmed on the roses' side so both faces stay in.
          ratio: 4 / 3,
          focus: "25% 50%",
        },
      ],
    },
  },
];

export function customCoupleEvent(couple: CustomCouple) {
  const event = heritageEvent(couple.invitation);
  if (couple.occasion !== "engagement") return event;
  const { first, second } = couple.invitation.couple;
  return { ...event, title: `خطوبة ${first} و${second}` };
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
