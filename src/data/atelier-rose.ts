import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import { whatsappUrl } from "@/lib/whatsapp";

export const atelierRoseInvitation = {
  couple: {
    first: "Layla",
    second: "Nour",
  },
  intro: "Together with their families",
  tagline: "request the pleasure of your company",
  welcome:
    "Some stories are written in ink, ours was cut from paper, petal by petal, layer by layer. We kept the last page blank for you. Come and fill it with us.",
  signs: {
    first: { word: "Forever", note: "The bride, who still keeps every letter." },
    second: { word: "Always", note: "The groom, who wrote every single one." },
  },
  start: "2027-05-22T18:30:00+03:00",
  end: "2027-05-23T00:30:00+03:00",
  dateLabel: {
    weekday: "Saturday",
    day: "22",
    month: "May",
    year: "2027",
  },
  timeShort: "6:30 PM",
  music: "/voices/elegant-voice.mp3",
  cover: "/templates/atelier-rose.webp",
  venue: {
    name: "The Orangery Garden",
    city: "Zamalek, Cairo",
    address: "Zamalek, Cairo, Egypt",
    mapUrl: "https://maps.google.com/?q=Zamalek+Cairo",
  },
  moments: [
    {
      time: "6:30 PM",
      title: "Welcome in the garden",
      detail: "Rose spritz, soft strings and first hellos.",
      icon: "glass",
    },
    {
      time: "7:15 PM",
      title: "The vows",
      detail: "Two chairs, one arch, and a promise.",
      icon: "rings",
    },
    {
      time: "8:30 PM",
      title: "Supper by candlelight",
      detail: "A long table dressed in blush and greenery.",
      icon: "candle",
    },
    {
      time: "10:00 PM",
      title: "First dance & cake",
      detail: "Then the floor belongs to you.",
      icon: "music",
    },
  ],
  dressCode: {
    title: "Garden pastels",
    note: "Blush, sage, ivory and a touch of gold. Kindly leave the white to the bride.",
    palette: [
      { name: "Blush", color: "#f0cfc6" },
      { name: "Peach", color: "#f3c7ab" },
      { name: "Sage", color: "#a9b99c" },
      { name: "Ivory", color: "#f6efe4" },
      { name: "Gold", color: "#c9a46a" },
    ],
  },
  gallery: [
    { src: "/elegant/gallery/01-meadow.jpg", alt: "The couple standing together in a meadow", caption: "where it began" },
    { src: "/elegant/gallery/02-field.jpg", alt: "A quiet moment together in the field", caption: "slow afternoons" },
    { src: "/elegant/gallery/03-walk.jpg", alt: "Walking through the blooming meadow", caption: "walking home" },
    { src: "/elegant/gallery/04-standing.jpg", alt: "Standing close in the tall grass", caption: "just us" },
    { src: "/elegant/gallery/05-portrait.jpg", alt: "A still portrait in the meadow", caption: "yes, always" },
  ],

  rsvp: {
    whatsapp: "201000000000",
    deadline: "Kindly reply before 1 May 2027",
  },
} as const;

export type AtelierRoseInvitation = typeof atelierRoseInvitation;

export const atelierRoseEvent = eventFromInvite("atelier-rose", atelierRoseInvitation);

export function getCalendarUrl() {
  return googleCalendarUrl(atelierRoseEvent);
}

export function rsvpUrl(text: string) {
  return whatsappUrl(atelierRoseInvitation.rsvp.whatsapp, text);
}
