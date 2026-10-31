import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const heritageInvitation = {
  couple: {
    first: "Ahmed",
    second: "Menna",
  },
  kicker: "Together with their families",
  honour: "request the honour of your presence",
  closing: "at the celebration of their marriage",
  dateLabel: {
    weekday: "Saturday",
    day: "12",
    month: "September",
    year: "2027",
  },
  start: "2027-09-12T18:00:00+03:00",
  end: "2027-09-13T00:00:00+03:00",
  timeLabel: "Six o'clock in the evening",
  venue: {
    name: "The Grand Ballroom",
    city: "Cairo",
    address: "Cairo, Egypt",
    mapUrl: "https://maps.google.com/?q=The+Grand+Ballroom+Cairo",
  },
  attire: "Black tie",
  music: "/voices/heritage-script-voice.mp3",
  gallery: [
    {
      src: "/heritage-script/couple/1.webp",
      alt: "Ahmed kisses Menna's temple in a close portrait",
    },
    {
      src: "/heritage-script/couple/2.webp",
      alt: "Menna rests against Ahmed in a close portrait",
    },
    {
      src: "/heritage-script/couple/3.webp",
      alt: "Ahmed and Menna stand forehead to forehead",
    },
    {
      src: "/heritage-script/couple/4.webp",
      alt: "Ahmed holds Menna by the window",
    },
    {
      src: "/heritage-script/couple/5.webp",
      alt: "Menna rides on Ahmed's back beside the window",
    },
    {
      src: "/heritage-script/couple/6.webp",
      alt: "Ahmed and Menna dance beneath the beams",
    },
    {
      src: "/heritage-script/couple/7.webp",
      alt: "Ahmed and Menna laugh together beneath the beams",
    },
    {
      src: "/heritage-script/couple/8.webp",
      alt: "Ahmed and Menna sit together against the wall",
    },
  ],
} as const;

export type HeritageInvitation = typeof heritageInvitation;

export function getCalendarUrl() {
  const { couple, kicker, honour, start, end, venue } = heritageInvitation;
  return googleCalendarUrl(
    eventFromInvite("heritage-script", {
      couple,
      intro: kicker,
      tagline: honour,
      start,
      end,
      venue,
    }),
  );
}
