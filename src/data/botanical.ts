import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";

export const botanicalInvitation = {
  couple: {
    first: "Layla",
    second: "Adam",
  },
  intro: "Together with their families",
  tagline: "invite you to celebrate their wedding",
  start: "2027-03-12T18:00:00+02:00",
  end: "2027-03-13T00:00:00+02:00",
  dateLabel: {
    weekday: "Friday",
    day: "12",
    month: "March",
    year: "2027",
  },
  timeLabel: "Six o'clock in the evening",
  venue: {
    name: "The Garden House",
    address: "New Cairo, Egypt",
    mapUrl: "https://maps.google.com/?q=The+Garden+House+New+Cairo",
  },
  dressCode: "Formal attire in soft neutrals",
  music: "/voices/botanical-voice.mp3",
  rsvp: {
    whatsapp: "201000000000",
    message:
      "Hello! I would love to confirm my attendance to Layla & Adam's wedding.",
    deadline: "Kindly reply before 1 February 2027",
  },
  gallery: [
    {
      src: "/botanical/gallery/01-meadow.jpg",
      alt: "Layla and Adam in a lupine meadow at golden hour",
    },
    {
      src: "/botanical/gallery/02-field.jpg",
      alt: "A quiet moment together in the field",
    },
    {
      src: "/botanical/gallery/03-walk.jpg",
      alt: "Walking through the blooming meadow",
    },
    {
      src: "/botanical/gallery/04-standing.jpg",
      alt: "Standing close in the tall grass",
    },
    {
      src: "/botanical/gallery/05-portrait.jpg",
      alt: "A still portrait in the meadow",
    },
    {
      src: "/botanical/gallery/06-together.jpg",
      alt: "Together among the lupines",
    },
  ],
} as const;

export type BotanicalContent = {
  couple: { first: string; second: string };
  intro: string;
  tagline: string;
  start: string;
  end: string;
  dateLabel: {
    weekday: string;
    day: string;
    month: string;
    year: string;
  };
  timeLabel: string;
  venue: { name: string; address?: string; mapUrl: string };
  dressCode?: string;
  music?: string;
  rsvp?: {
    whatsapp: string;
    message: string;
    deadline: string;
  };
  gallery: readonly { src: string; alt: string }[];
  galleryHint?: string;
  calendarId?: string;
  hideHeroYear?: boolean;
};

export function capitalName(name: string) {
  const word = name.trim();
  if (!word) return word;
  return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
}

export type BotanicalInvitation = typeof botanicalInvitation;

export function getCalendarUrl(data: BotanicalContent, id = "botanical") {
  return googleCalendarUrl(eventFromInvite(id, data));
}

export function getWhatsAppUrl(rsvp: { whatsapp: string; message: string }) {
  return `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(rsvp.message)}`;
}
