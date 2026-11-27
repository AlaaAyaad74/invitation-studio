import { eventFromInvite, googleCalendarUrl } from "@/lib/calendar";
import type { Lang, Localized } from "@/lib/i18n";

export const heritageInvitation = {
  lang: "en",
  calendarId: "heritage-script",
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

export type HeritageInvitation = Localized<typeof heritageInvitation>;

export const heritageInvitationAr: HeritageInvitation = {
  lang: "ar",
  calendarId: "heritage-script-ar",
  couple: {
    first: "أحمد",
    second: "منة",
  },
  kicker: "بمباركة عائلتيهما",
  honour: "يتشرفان بدعوتكم لحضور",
  closing: "حفل زفافهما",
  dateLabel: {
    weekday: "السبت",
    day: "12",
    month: "سبتمبر",
    year: "2027",
  },
  start: heritageInvitation.start,
  end: heritageInvitation.end,
  timeLabel: "الساعة السادسة مساءً",
  venue: {
    name: "القاعة الكبرى",
    city: "القاهرة",
    address: "القاهرة، مصر",
    mapUrl: heritageInvitation.venue.mapUrl,
  },
  attire: "زي سهرة رسمي",
  music: heritageInvitation.music,
  gallery: [
    { src: "/heritage-script/couple/1.webp", alt: "أحمد يقبّل جبين منة في صورة قريبة" },
    { src: "/heritage-script/couple/2.webp", alt: "منة تستند إلى أحمد في صورة قريبة" },
    { src: "/heritage-script/couple/3.webp", alt: "أحمد ومنة جبينًا إلى جبين" },
    { src: "/heritage-script/couple/4.webp", alt: "أحمد يحتضن منة بجوار النافذة" },
    { src: "/heritage-script/couple/5.webp", alt: "منة على ظهر أحمد بجوار النافذة" },
    { src: "/heritage-script/couple/6.webp", alt: "أحمد ومنة يرقصان تحت العوارض الخشبية" },
    { src: "/heritage-script/couple/7.webp", alt: "أحمد ومنة يضحكان معًا تحت العوارض الخشبية" },
    { src: "/heritage-script/couple/8.webp", alt: "أحمد ومنة يجلسان معًا بجانب الجدار" },
  ],
};

export const heritageInvitations: Record<Lang, HeritageInvitation> = {
  en: heritageInvitation,
  ar: heritageInvitationAr,
};

export function heritageEvent(data: HeritageInvitation) {
  return eventFromInvite(data.calendarId, {
    lang: data.lang,
    couple: data.couple,
    intro: data.kicker,
    tagline: data.honour,
    start: data.start,
    end: data.end,
    venue: data.venue,
  });
}

export function getCalendarUrl(data: HeritageInvitation) {
  return googleCalendarUrl(heritageEvent(data));
}
