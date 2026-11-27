import type { Lang } from "@/lib/i18n";

/** Interface words shared by every invitation template. */
const copy = {
  en: {
    units: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    countdownLabel: "Countdown to the wedding",
    timeRemaining: "Time remaining",
    today: "Today",
    when: "When",
    where: "Where",
    attire: "Attire",
    dressCode: "Dress code",
    addToCalendar: "Add to calendar",
    openMap: "Open map",
    openLocation: "Open location",
    confirmWhatsApp: "Confirm on WhatsApp",
    photos: "Photos",
    couplePhotos: "Couple photos",
    openPhoto: (alt: string) => `Open photo: ${alt}`,
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    showPhoto: (n: number) => `Show photo ${n}`,
    close: "Close",
    scroll: "Scroll",
    scrollDown: "Scroll down",
    weddingDay: "Wedding day",
    and: (first: string, second: string) => `${first} and ${second}`,
  },
  ar: {
    units: {
      days: "أيام",
      hours: "ساعات",
      minutes: "دقايق",
      seconds: "ثواني",
    },
    countdownLabel: "العد التنازلي للفرح",
    timeRemaining: "الوقت الفاضل",
    today: "اليوم",
    when: "الميعاد",
    where: "المكان",
    attire: "اللبس",
    dressCode: "اللبس المطلوب",
    addToCalendar: "ضيف الميعاد للتقويم",
    openMap: "افتح الخريطة",
    openLocation: "افتح اللوكيشن",
    confirmWhatsApp: "أكد حضورك على واتساب",
    photos: "الصور",
    couplePhotos: "صور العروسين",
    openPhoto: (alt: string) => `افتح الصورة: ${alt}`,
    previousPhoto: "الصورة اللي قبلها",
    nextPhoto: "الصورة اللي بعدها",
    showPhoto: (n: number) => `اعرض الصورة ${n}`,
    close: "اقفل",
    scroll: "انزل تحت",
    scrollDown: "انزل تحت",
    weddingDay: "يوم الفرح",
    and: (first: string, second: string) => `${first} و${second}`,
  },
} as const;

export function templateCopy(lang: Lang) {
  return copy[lang];
}

/** Arabic count of days with the right noun form: يوم واحد، يومين، 3 أيام، 11 يوم. */
export function arabicDays(n: number) {
  if (n === 1) return "يوم واحد";
  if (n === 2) return "يومين";
  if (n >= 3 && n <= 10) return `${n} أيام`;
  return `${n} يوم`;
}

type DateLabel ={ weekday: string; day: string; month: string; year: string };

/** "Friday, 12 March 2027" / "الجمعة، 12 مارس 2027" */
export function fullDate(date: DateLabel, lang: Lang) {
  const comma = lang === "ar" ? "،" : ",";
  return `${date.weekday}${comma} ${date.day} ${date.month} ${date.year}`;
}
