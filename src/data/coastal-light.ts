import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import type { Lang, Localized } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export const coastalLightInvitation = {
  lang: "en",
  calendarId: "coastal-light",
  couple: {
    first: "Yousef",
    second: "Hana",
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
  music: "/minimal/minimal-voice.mp3",
  video: "/minimal/wedding-invite-enhanced-15s-5MB.mp4",
  venue: {
    name: "The Marble Court",
    address: "Garden City, Cairo",
    mapUrl: "https://maps.google.com/?q=Garden+City+Cairo",
  },
  dressCode: "Ivory, stone, and soft blue",
  gallery: [
    {
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "Yousef and Hana standing together in a lupine meadow",
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
      "Hello! I would love to confirm my attendance to Yousef & Hana's wedding.",
    deadline: "Kindly reply before 1 September 2027",
  },
} as const;

export type CoastalLightInvitation = Localized<typeof coastalLightInvitation>;

export const coastalLightInvitationAr: CoastalLightInvitation = {
  lang: "ar",
  calendarId: "coastal-light-ar",
  couple: {
    first: "يوسف",
    second: "هنا",
  },
  intro: "بمباركة عائلتيهما",
  tagline: "يتشرفان بدعوتكم لمشاركتهما فرحتهما",
  note: "كل اللي محتاجينه في اليوم ده… إنكم تكونوا معانا.",
  start: coastalLightInvitation.start,
  end: coastalLightInvitation.end,
  dateLabel: {
    weekday: "السبت",
    day: "9",
    month: "أكتوبر",
    year: "2027",
  },
  timeLabel: "الساعة الرابعة عصرًا",
  music: coastalLightInvitation.music,
  video: "/minimal/wedding-invite-arabic-15s-5MB.mp4",
  venue: {
    name: "القاعة الرخامية",
    address: "جاردن سيتي، القاهرة",
    mapUrl: coastalLightInvitation.venue.mapUrl,
  },
  dressCode: "عاجي، رمادي حجري، وأزرق هادئ",
  gallery: [
    { src: "/elegant/gallery/01-meadow.jpg", alt: "يوسف وهنا معًا في مرج من الترمس" },
    { src: "/elegant/gallery/02-field.jpg", alt: "لحظة هادئة معًا في الحقل" },
    { src: "/elegant/gallery/03-walk.jpg", alt: "نزهة بين أزهار المرج" },
    { src: "/elegant/gallery/04-standing.jpg", alt: "وقفة قريبة بين العشب الطويل" },
    { src: "/elegant/gallery/05-portrait.jpg", alt: "صورة هادئة في المرج" },
    { src: "/elegant/gallery/06-together.jpg", alt: "معًا بين أزهار الترمس" },
  ],
  moments: [
    {
      label: "عقد القران",
      time: "الرابعة عصرًا",
      detail: "تبادل العهود في الساحة",
    },
    {
      label: "العشاء",
      time: "السابعة مساءً",
      detail: "مائدة طويلة بعد الغروب",
    },
  ],
  rsvp: {
    whatsapp: coastalLightInvitation.rsvp.whatsapp,
    message: "أهلًا! أكيد هحضر فرح يوسف وهنا، ألف مبروك!",
    deadline: "ياريت تأكدوا حضوركم قبل 1 سبتمبر 2027",
  },
};

export const coastalLightInvitations: Record<Lang, CoastalLightInvitation> = {
  en: coastalLightInvitation,
  ar: coastalLightInvitationAr,
};

export function getCalendarUrl(data: CoastalLightInvitation) {
  return googleCalendarUrl(eventFromInvite(data.calendarId, data));
}

export function getWhatsAppUrl(data: CoastalLightInvitation) {
  return whatsappUrl(data.rsvp.whatsapp, data.rsvp.message);
}
