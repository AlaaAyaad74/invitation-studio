import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const heritageInvitation = {
  couple: {
    first: "Helena",
    second: "Julian",
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
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "Helena and Julian in a meadow at golden hour",
    },
    {
      src: "/elegant/gallery/02-field.jpg",
      alt: "A quiet moment together in the field",
    },
    {
      src: "/elegant/gallery/03-walk.jpg",
      alt: "Walking through the blooming meadow",
    },
    {
      src: "/elegant/gallery/04-standing.jpg",
      alt: "Standing close in the tall grass",
    },
    {
      src: "/elegant/gallery/05-portrait.jpg",
      alt: "A still portrait in the meadow",
    },
    {
      src: "/elegant/gallery/06-together.jpg",
      alt: "Together among the flowers",
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
