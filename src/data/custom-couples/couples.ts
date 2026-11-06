import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const customCouples = [
  {
    slug: "ahmed&doaa",
    calendarId: "ahmed-doaa",
    template: "heritage-script" as const,
    couple: {
      first: "Ahmed",
      second: "Doaa",
    },
    kicker: "Together with their families",
    honour: "request the honour of your presence",
    closing: "at the celebration of their marriage",
    dateLabel: {
      weekday: "Saturday",
      day: "14",
      month: "November",
      year: "2026",
    },
    start: "2026-11-14T19:00:00+02:00",
    end: "2026-11-15T00:00:00+02:00",
    timeLabel: "Seven o'clock in the evening",
    venue: {
      name: "Lucinda Hall, Family Park",
      city: "New Cairo",
      address: "Family Park, Fifth Settlement, New Cairo, Egypt",
      // TODO: replace with exact Google Maps link
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Family+Park+Fifth+Settlement+New+Cairo",
    },
    attire: "Black tie",
    music: "/voices/omar-salma-voice.mp3",
    cover: {
      video: "/couples/ahmed-doaa/ahmed_doaa_wedding_card.mp4",
      poster: "/couples/ahmed-doaa/poster_video.webp",
      alt: "Ahmed and Doaa wedding invitation",
    },
  },
] as const;

export type CustomCouple = (typeof customCouples)[number];

export function getCalendarUrl(couple: CustomCouple) {
  return googleCalendarUrl(
    eventFromInvite(couple.calendarId, {
      couple: couple.couple,
      intro: couple.kicker,
      tagline: couple.honour,
      start: couple.start,
      end: couple.end,
      venue: couple.venue,
    }),
  );
}

export function getCouple(slug: string) {
  const decoded = decodeURIComponent(slug);
  return customCouples.find(
    (customCouple) =>
      customCouple.slug === slug || customCouple.slug === decoded,
  );
}
