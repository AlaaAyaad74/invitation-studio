import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import type { Lang, Localized } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export const desertBloomInvitation = {
  lang: "en",
  calendarId: "desert-bloom",
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

export type DesertBloomInvitation = Localized<typeof desertBloomInvitation>;

export const desertBloomInvitationAr: DesertBloomInvitation = {
  lang: "ar",
  calendarId: "desert-bloom-ar",
  couple: {
    first: "علي",
    second: "هدى",
  },
  intro: "بمباركة عائلتيهما",
  tagline: "مستنيينكم تفرحوا معاهم",
  welcome:
    "كوردةٍ تتفتح تحت شمس الصحراء، وجدت قصتنا موسمها. تعالوا احتفلوا بيها معانا.",
  start: desertBloomInvitation.start,
  end: desertBloomInvitation.end,
  dateLabel: {
    weekday: "السبت",
    day: "12",
    month: "يونيو",
    year: "2027",
  },
  timeLabel: "الساعة السابعة مساءً",
  timeShort: "7:00 مساءً",
  hero: {
    ...desertBloomInvitation.hero,
    video: "/desert-bloom/save-the-date-arabic-5MB.mp4",
  },
  music: desertBloomInvitation.music,
  venue: {
    name: "قصر حديقة الورود",
    city: "القاهرة، مصر",
    address: "القاهرة، مصر",
    mapUrl: desertBloomInvitation.venue.mapUrl,
  },
  moments: [
    {
      time: "7:00 مساءً",
      title: "استقبال الساعة الذهبية",
      detail: "ليموناضة الورد في الفناء",
    },
    {
      time: "7:45 مساءً",
      title: "الزفة",
      detail: "طبول وورود ودخلة العروسين",
    },
    {
      time: "8:30 مساءً",
      title: "عشاء تحت النجوم",
      detail: "مائدة طويلة بين الفوانيس",
    },
    {
      time: "10:00 مساءً",
      title: "الرقصة الأولى والحلويات",
      detail: "وبعدها الساحة كلها ليكم",
    },
  ],
  gallery: [
    { src: "/elegant/gallery/01-meadow.jpg", alt: "العروسان معًا في مرج" },
    { src: "/elegant/gallery/02-field.jpg", alt: "لحظة هادئة معًا في الحقل" },
    { src: "/elegant/gallery/03-walk.jpg", alt: "نزهة بين أزهار المرج" },
    { src: "/elegant/gallery/04-standing.jpg", alt: "وقفة قريبة بين العشب الطويل" },
    { src: "/elegant/gallery/05-portrait.jpg", alt: "صورة هادئة في المرج" },
  ],
  rsvp: {
    whatsapp: desertBloomInvitation.rsvp.whatsapp,
    message: "أهلًا! أكيد هحضر فرح علي وهدى، ألف مبروك!",
    wish: "علي وهدى، ألف مبروك! ربنا يتمملكم على خير ويسعدكم دايمًا.",
    deadline: "ياريت تأكدوا حضوركم قبل 15 مايو 2027",
  },
};

export const desertBloomInvitations: Record<Lang, DesertBloomInvitation> = {
  en: desertBloomInvitation,
  ar: desertBloomInvitationAr,
};

export function desertBloomEvent(data: DesertBloomInvitation) {
  return eventFromInvite(data.calendarId, data);
}

export function getCalendarUrl(data: DesertBloomInvitation) {
  return googleCalendarUrl(desertBloomEvent(data));
}

export function rsvpUrl(data: DesertBloomInvitation, text: string) {
  return whatsappUrl(data.rsvp.whatsapp, text);
}
