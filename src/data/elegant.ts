import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import type { Lang, Localized } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export const elegantInvitation = {
  lang: "en",
  calendarId: "elegant",
  couple: {
    first: "Karim",
    second: "Amira",
  },
  initials: "K&A",
  intro: "Together with their families",
  tagline: "to their wedding day",
  verse: "Two names. One garden. An evening made of light.",
  start: "2027-06-18T17:00:00+03:00",
  end: "2027-06-19T00:00:00+03:00",
  dateLabel: {
    weekday: "Friday",
    day: "18",
    month: "June",
    year: "2027",
  },
  timeLabel: "Five o'clock in the afternoon",
  music: "/voices/elegant-voice.mp3",
  venue: {
    name: "The Rose Pavilion",
    address: "Al-Azhar Park, Cairo",
    mapUrl: "https://maps.google.com/?q=Al+Azhar+Park+Cairo",
  },
  moments: [
    {
      kind: "ceremony",
      label: "Ceremony",
      time: "Five o'clock",
      detail: "Vows beneath the rose arch",
    },
    {
      kind: "celebration",
      label: "Celebration",
      time: "Half past seven",
      detail: "Dinner in the pavilion, under the lights",
    },
    {
      kind: "attire",
      label: "Attire",
      time: "Garden formal",
      detail: "Blush, ivory, and soft green",
    },
  ],
  gallery: [
    {
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "Karim and Amira in a lupine meadow at golden hour",
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
  rsvp: {
    whatsapp: "201000000000",
    message:
      "Hello! I would love to confirm my attendance to Karim & Amira's wedding.",
    deadline: "Kindly reply before 1 May 2027",
  },
} as const;

export type ElegantInvitation = Localized<typeof elegantInvitation>;

export const elegantInvitationAr: ElegantInvitation = {
  lang: "ar",
  calendarId: "elegant-ar",
  couple: {
    first: "كريم",
    second: "أميرة",
  },
  initials: "ك&أ",
  intro: "بمباركة عائلتيهما",
  tagline: "يدعوانكم إلى يوم زفافهما",
  verse: "اسمين. حديقة واحدة. وأمسية من نور.",
  start: elegantInvitation.start,
  end: elegantInvitation.end,
  dateLabel: {
    weekday: "الجمعة",
    day: "18",
    month: "يونيو",
    year: "2027",
  },
  timeLabel: "الساعة الخامسة عصرًا",
  music: elegantInvitation.music,
  venue: {
    name: "جناح الورود",
    address: "حديقة الأزهر، القاهرة",
    mapUrl: elegantInvitation.venue.mapUrl,
  },
  moments: [
    {
      kind: "ceremony",
      label: "المراسم",
      time: "الخامسة عصرًا",
      detail: "تبادل العهود تحت قوس الورود",
    },
    {
      kind: "celebration",
      label: "الاحتفال",
      time: "السابعة والنصف مساءً",
      detail: "عشاء في الجناح تحت الأضواء",
    },
    {
      kind: "attire",
      label: "اللباس",
      time: "رسمي للحديقة",
      detail: "وردي، عاجي، وأخضر هادئ",
    },
  ],
  gallery: [
    {
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "كريم وأميرة في مرج من الترمس وقت الغروب",
    },
    { src: "/elegant/gallery/02-field.jpg", alt: "لحظة هادئة معًا في الحقل" },
    { src: "/elegant/gallery/03-walk.jpg", alt: "نزهة بين أزهار المرج" },
    {
      src: "/elegant/gallery/04-standing.jpg",
      alt: "وقفة قريبة بين العشب الطويل",
    },
    { src: "/elegant/gallery/05-portrait.jpg", alt: "صورة هادئة في المرج" },
    { src: "/elegant/gallery/06-together.jpg", alt: "معًا بين أزهار الترمس" },
  ],
  rsvp: {
    whatsapp: elegantInvitation.rsvp.whatsapp,
    message: "مرحبًا! يسعدني تأكيد حضوري حفل زفاف كريم وأميرة.",
    deadline: "يُرجى تأكيد الحضور قبل 1 مايو 2027",
  },
};

export const elegantInvitations: Record<Lang, ElegantInvitation> = {
  en: elegantInvitation,
  ar: elegantInvitationAr,
};

export function getCalendarUrl(data: ElegantInvitation) {
  return googleCalendarUrl(eventFromInvite(data.calendarId, data));
}

export function getWhatsAppUrl(data: ElegantInvitation) {
  return whatsappUrl(data.rsvp.whatsapp, data.rsvp.message);
}
