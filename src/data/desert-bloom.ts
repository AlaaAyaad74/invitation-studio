import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import { whatsappUrl } from "@/lib/whatsapp";

export const desertBloomInvitation = {
  couple: {
    first: "Ali",
    second: "Hoda",
  },
  intro: "Together with their families",
  tagline: "invite you to bloom with them",
  welcome:
    "Like a rose that opens in the desert sun, our story found its season. Come and celebrate it with us.",
  start: "2027-06-12T19:00:00+03:00",
  end: "2027-06-13T01:00:00+03:00",
  dateLabel: {
    weekday: "Saturday",
    day: "12",
    month: "June",
    year: "2027",
  },
  timeLabel: "Seven o'clock in the evening",
  timeShort: "7:00 PM",
  hero: {
    video: "/desert-bloom/desert-bloom-hero.mp4",
    poster: "/desert-bloom/desert-bloom-poster.webp",
    // The card is fully shown here; the clip fades to black after it.
    holdAt: 23.4,
  },
  music: "/desert-bloom/desert-bloom-voice.mp3",
  venue: {
    name: "The Rose Garden Palace",
    city: "Cairo, Egypt",
    address: "Cairo, Egypt",
    mapUrl: "https://maps.google.com/?q=The+Rose+Garden+Palace+Cairo",
  },
  moments: [
    {
      time: "7:00 PM",
      title: "Golden hour welcome",
      detail: "Rose lemonade in the courtyard",
    },
    {
      time: "7:45 PM",
      title: "The zaffa",
      detail: "Drums, roses, and the grand entrance",
    },
    {
      time: "8:30 PM",
      title: "Dinner under the stars",
      detail: "A long table among the lanterns",
    },
    {
      time: "10:00 PM",
      title: "First dance & cake",
      detail: "Then the dance floor is yours",
    },
  ],
  gallery: [
    { src: "/elegant/gallery/01-meadow.jpg", alt: "The couple standing together in a meadow" },
    { src: "/elegant/gallery/02-field.jpg", alt: "A quiet moment together in the field" },
    { src: "/elegant/gallery/03-walk.jpg", alt: "Walking through the blooming meadow" },
    { src: "/elegant/gallery/04-standing.jpg", alt: "Standing close in the tall grass" },
    { src: "/elegant/gallery/05-portrait.jpg", alt: "A still portrait in the meadow" },
  ],
  rsvp: {
    whatsapp: "201000000000",
    message: "Hello! I would love to confirm my attendance to Ali & Hoda's wedding.",
    wish: "Ali & Hoda, wishing you a lifetime of love and blooming days!",
    deadline: "Kindly reply before 15 May 2027",
  },
} as const;

export type DesertBloomInvitation = typeof desertBloomInvitation;

export const desertBloomEvent = eventFromInvite("desert-bloom", desertBloomInvitation);

export function getCalendarUrl() {
  return googleCalendarUrl(desertBloomEvent);
}

export function rsvpUrl(text: string) {
  return whatsappUrl(desertBloomInvitation.rsvp.whatsapp, text);
}
