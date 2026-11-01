import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const customCouples = [
  {
    slug: "omar&salma",
    calendarId: "omar-salma",
    template: "heritage-script" as const,
    couple: {
      first: "Omar",
      second: "Salma",
    },
    kicker: "Together with their families",
    honour: "request the honour of your presence",
    closing: "at the celebration of their marriage",
    dateLabel: {
      weekday: "Thursday",
      day: "5",
      month: "November",
      year: "2026",
    },
    start: "2026-11-05T18:00:00+02:00",
    end: "2026-11-06T00:00:00+02:00",
    timeLabel: "Six o'clock in the evening",
    venue: {
      name: "Palestine Montaza Hotel",
      city: "Alexandria",
      address: "Alexandria, Egypt",
      mapUrl:
        "https://www.google.com/maps/place/Palestine+Montaza+Hotel/@31.2883843,30.018137,17z/data=!3m1!4b1!4m9!3m8!1s0x14f5d061fc11582d:0x12657103d509ea6c!5m2!4m1!1i2!8m2!3d31.2883843!4d30.018137!16s%2Fg%2F1th8451c?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",
    },
    attire: "Black tie",
    music: "/voices/omar-salma-voice.mp3",
    cover: {
      video: "/couples/omar-salma/cover.mp4",
      poster: "/couples/omar-salma/cover-poster.webp",
      alt: "Omar and Salma wedding invitation",
    },
    gateQr: {
      src: "/couples/omar-salma/gate-qr.webp",
      alt: "QR code for gate entry",
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
