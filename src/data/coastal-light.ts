import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const coastalLightInvitation = {
  couple: {
    first: "Hana",
    second: "Yusuf",
  },
  intro: "Together with their families",
  tagline: "request the pleasure of your company",
  note: "Nothing extra. Just the day, and you.",
  start: "2027-10-09T16:00:00+03:00",
  end: "2027-10-10T00:00:00+03:00",
  dateLabel: {
    weekday: "Saturday",
    day: "9",
    month: "October",
    year: "2027",
  },
  timeLabel: "Four o'clock in the afternoon",
  venue: {
    name: "The Marble Court",
    address: "Garden City, Cairo",
    mapUrl: "https://maps.google.com/?q=Garden+City+Cairo",
  },
  dressCode: "Ivory, stone, and soft blue",
  gallery: [
    {
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "Hana and Yusuf standing together in a lupine meadow",
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
      alt: "Together among the lupines",
    },
  ],
  moments: [
    {
      label: "Ceremony",
      time: "Four o'clock",
      detail: "Vows in the court",
    },
    {
      label: "Dinner",
      time: "Seven o'clock",
      detail: "A long table after dark",
    },
  ],
  rsvp: {
    whatsapp: "201000000000",
    message:
      "Hello! I would love to confirm my attendance to Hana & Yusuf's wedding.",
    deadline: "Kindly reply before 1 September 2027",
  },
} as const;

export type CoastalLightInvitation = typeof coastalLightInvitation;

export function getCalendarUrl(data: CoastalLightInvitation) {
  return googleCalendarUrl(eventFromInvite("coastal-light", data));
}

export function getWhatsAppUrl(data: CoastalLightInvitation) {
  return `https://wa.me/${data.rsvp.whatsapp}?text=${encodeURIComponent(data.rsvp.message)}`;
}
