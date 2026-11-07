import type { Lang } from "@/lib/i18n";

export type InvitationTemplate = {
  id: string;
  title: string;
  style: string;
  description: string;
  image: string;
  comingSoon: boolean;
  href?: string;
};

const templates: InvitationTemplate[] = [
  {
    id: "garden-vow",
    title: "Botanical",
    style: "Studio",
    description: "A new invitation template — ready for fresh content.",
    image: "/botanical/botanical-card-image.webp",
    comingSoon: false,
    href: "/templates/botanical",
  },
  {
    id: "elegant",
    title: "Elegant",
    style: "Elegant",
    description:
      "A rose arch and a garden path — an invitation that feels like stepping into the light.",
    image: "/elegant/elegant-card-image.webp",
    comingSoon: false,
    href: "/templates/elegant",
  },
  {
    id: "coastal-light",
    title: "Coastal Light",
    style: "Minimal",
    description: "Airy layouts inspired by seaside vows and soft horizons.",
    image: "/coastal-light/coastal-light-card-image.webp",
    comingSoon: false,
    href: "/templates/coastal-light",
  },
  {
    id: "heritage-script",
    title: "Heritage Script",
    style: "Classic",
    description:
      "A crimson formal suite — calligraphy, gold, and evening light.",
    image: "/heritage-script/heritage-script-card-image.webp",
    comingSoon: false,
    href: "/templates/heritage-script",
  },
  {
    id: "desert-bloom",
    title: "Desert Bloom",
    style: "Modern",
    description:
      "A lace envelope, a wax seal, and peach roses — break the seal to begin.",
    image: "/desert-bloom/desert-bloom-card-image.webp",
    comingSoon: false,
    href: "/templates/desert-bloom",
  },
  {
    id: "atelier-rose",
    title: "Atelier Rose",
    style: "Romantic",
    description: "Blush accents and layered paper textures for intimate days.",
    image: "/templates/atelier-rose.webp",
    comingSoon: true,
  },
];

const features = [
  {
    title: "Ready-to-personalize sites",
    description:
      "Every template ships as a full invitation website—RSVP, schedule, gallery, and map included.",
  },
  {
    title: "Mobile-first elegance",
    description:
      "Guests open a polished experience on any phone, with fast load times and clear navigation.",
  },
  {
    title: "Live RSVP tracking",
    description:
      "Collect meal choices, plus-ones, and attendance in one place you can share with your planner.",
  },
  {
    title: "Multilingual support",
    description:
      "Present your story in the languages your families speak, without rebuilding the design.",
  },
];

const services: { title: string; description: string; href?: string }[] = [
  {
    title: "Custom couple logo",
    description:
      "A monogram or wordmark designed around your names, used across the site, save-the-date, and print suite.",
  },
  {
    title: "Invitation photos",
    description:
      "Still invitation cards designed for WhatsApp, print, and social—personalized with your names, date, and details.",
    href: "/photos",
  },
  {
    title: "Bespoke invitation site",
    description:
      "We craft a one-of-a-kind layout from your mood board, venue photos, and ceremony details.",
  },
  {
    title: "Photo & film gallery",
    description:
      "Curated engagement galleries and cinematic loops that feel like part of the invitation itself.",
    href: "/videos",
  },
  {
    title: "Day-of digital suite",
    description:
      "Seating charts, timelines, and guest guides that match your invitation aesthetic.",
  },
];

const arabicTemplates: Record<string, Pick<InvitationTemplate, "title" | "style" | "description">> = {
  "garden-vow": {
    title: "بوتانيكال",
    style: "استوديو",
    description: "تصميم دعوة جديد، جاهز لمحتوى يحكي قصتكم.",
  },
  elegant: {
    title: "إليجانت",
    style: "أنيق",
    description: "قوس من الورود وممر في حديقة؛ دعوة تشبه الخطو نحو النور.",
  },
  "coastal-light": {
    title: "ضوء الساحل",
    style: "بسيط",
    description: "تصاميم خفيفة مستوحاة من عهود على شاطئ البحر وآفاق هادئة.",
  },
  "heritage-script": {
    title: "الخط التراثي",
    style: "كلاسيكي",
    description: "طقم رسمي بلون القرمز؛ خط عربي وذهب وضوء المساء.",
  },
  "desert-bloom": {
    title: "زهرة الصحراء",
    style: "عصري",
    description: "ظرف من الدانتيل وختم من الشمع وورود بلون الخوخ؛ اكسروا الختم لتبدأ الحكاية.",
  },
  "atelier-rose": {
    title: "أتيليه الورد",
    style: "رومانسي",
    description: "لمسات وردية وطبقات من الورق المزخرف لأيام حميمة.",
  },
};

const arabicFeatures = [
  {
    title: "مواقع جاهزة للتخصيص",
    description:
      "كل تصميم موقع دعوة متكامل، يشمل تأكيد الحضور والبرنامج ومعرض الصور والخريطة.",
  },
  {
    title: "أناقة على الجوال أولًا",
    description:
      "يفتح ضيوفكم تجربة راقية على أي هاتف، بتحميل سريع وتنقّل واضح.",
  },
  {
    title: "متابعة تأكيد الحضور مباشرة",
    description:
      "اجمعوا تأكيدات الحضور والمرافقين واختيارات الطعام في مكان واحد يمكنكم مشاركته مع منظّم الحفل.",
  },
  {
    title: "دعم عدة لغات",
    description:
      "اعرضوا قصتكم باللغات التي تتحدثها عائلاتكم، دون إعادة بناء التصميم.",
  },
];

const arabicServices = [
  {
    title: "شعار مخصص للعرسان",
    description:
      "حروف أولى أو توقيع مصمم حول أسمائكم، يُستخدم في الموقع وبطاقة حفظ الموعد وكل المطبوعات.",
  },
  {
    title: "صور الدعوات",
    description:
      "بطاقات دعوة مصممة للواتساب والطباعة ووسائل التواصل، مخصصة بأسمائكم وتاريخكم وتفاصيلكم.",
    href: "/photos",
  },
  {
    title: "موقع دعوة فريد",
    description:
      "نصمم تخطيطًا لا مثيل له من لوحة الإلهام وصور القاعة وتفاصيل الحفل.",
  },
  {
    title: "معرض الصور والفيديو",
    description:
      "معارض مختارة لصور الخطوبة ومقاطع سينمائية قصيرة تبدو جزءًا من الدعوة نفسها.",
    href: "/videos",
  },
  {
    title: "باقة يوم الزفاف الرقمية",
    description:
      "مخططات الجلوس وبرنامج الحفل وأدلة الضيوف بنفس روح تصميم دعوتكم.",
  },
];

export function getTemplates(lang: Lang): InvitationTemplate[] {
  if (lang === "en") return templates;
  return templates.map((template) => ({
    ...template,
    ...arabicTemplates[template.id],
  }));
}

export function getFeatures(lang: Lang) {
  return lang === "ar" ? arabicFeatures : features;
}

export function getServices(lang: Lang) {
  return lang === "ar" ? arabicServices : services;
}
