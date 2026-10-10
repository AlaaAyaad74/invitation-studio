import type { BotanicalContent } from "@/data/botanical";

export type CoupleInvitation = BotanicalContent & {
  slug: string;
  calendarId: string;
  template: "botanical";
};

const MAP_URL =
  "https://maps.google.com/?cid=2554926514639857002&entry=gps&g_st=aw";

export const couples: CoupleInvitation[] = [
  {
    slug: "ahmed&manar",
    calendarId: "ahmed-manar",
    template: "botanical",
    couple: {
      first: "Ahmed",
      second: "Manar",
    },
    hideHeroYear: true,
    intro: "Together with their families",
    tagline: "invite you to celebrate their wedding",
    start: "2026-11-06T21:00:00+02:00",
    end: "2026-11-07T00:00:00+02:00",
    dateLabel: {
      weekday: "Friday",
      day: "6",
      month: "November",
      year: "2026",
    },
    timeLabel: "Nine o'clock in the evening",
    music: "/voices/botanical-voice.mp3",
    venue: {
      name: "ROSABIANCA Village",
      mapUrl: MAP_URL,
    },
    galleryHint: "A few moments together",
    gallery: [
      {
        src: "/couples/ahmed-manar/1.webp",
        alt: "Ahmed and Manar dancing in a hallway",
      },
      {
        src: "/couples/ahmed-manar/2.webp",
        alt: "Ahmed and Manar standing together in the garden",
      },
      {
        src: "/couples/ahmed-manar/3.webp",
        alt: "Ahmed and Manar at an evening gathering",
      },
      {
        src: "/couples/ahmed-manar/4.webp",
        alt: "Ahmed and Manar holding hands in the garden",
      },
      {
        src: "/couples/ahmed-manar/5.webp",
        alt: "Ahmed and Manar smiling together",
      },
      {
        src: "/couples/ahmed-manar/6.webp",
        alt: "Ahmed and Manar outside at night",
      },
      {
        src: "/couples/ahmed-manar/7.webp",
        alt: "A close portrait of Ahmed and Manar",
      },
    ],
  },
];

export function getCouple(slug: string) {
  const decoded = decodeURIComponent(slug);
  return couples.find(
    (couple) => couple.slug === slug || couple.slug === decoded,
  );
}
