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

/** Arabic copy, plus a card screenshot of the Arabic version where one exists. */
const arabicTemplates: Record<
  string,
  Pick<InvitationTemplate, "title" | "style" | "description"> & { image?: string }
> = {
  "garden-vow": {
    title: "بحيرة البجع",
    style: "حالم",
    description: "قوس أبيض على بحيرة هادية وبجعتين؛ دعوة رقيقة جاهزة تحكي قصتكم.",
    image: "/botanical/botanical-card-image-ar.webp",
  },
  elegant: {
    title: "قوس الورد",
    style: "راقي",
    description: "قوس ورد وممشى في جنينة؛ دعوة كأنكم ماشيين ناحية النور.",
    image: "/elegant/elegant-card-image-ar.webp",
  },
  "coastal-light": {
    title: "الظرف الأبيض",
    style: "بسيط",
    description: "ظرف أبيض بختم وردي وسط الورد؛ تصميم خفيف وهادي.",
    image: "/coastal-light/coastal-light-card-image-ar.webp",
  },
  "heritage-script": {
    title: "عنابي ملكي",
    style: "كلاسيكي",
    description: "فيونكة دانتيل على كارت عنابي؛ خط عربي وفخامة السهرة.",
    image: "/heritage-script/heritage-script-card-image-ar.webp",
  },
  "desert-bloom": {
    title: "ظرف الدانتيل",
    style: "عصري",
    description: "ظرف دانتيل وختم شمع وورد بلون الخوخ؛ اكسروا الختم وتبدأ الحكاية.",
    image: "/desert-bloom/desert-bloom-card-image-ar.webp",
  },
  "atelier-rose": {
    title: "لمسة روز",
    style: "رومانسي",
    description: "لمسات وردي وطبقات ورق منقوش لفرح دافي وقريب.",
  },
};

const arabicFeatures = [
  {
    title: "مواقع جاهزة تتظبط على ذوقكم",
    description:
      "كل تصميم موقع دعوة كامل، فيه تأكيد الحضور والبرنامج وصوركم والخريطة.",
  },
  {
    title: "شيك على الموبايل الأول",
    description:
      "ضيوفكم هيفتحوه بسهولة من أي موبايل، تحميل سريع وتنقل واضح.",
  },
  {
    title: "متابعة الحضور أول بأول",
    description:
      "اعرفوا مين جاي ومعاه كام واحد واختيارات الأكل، في مكان واحد تقدروا تشاركوه مع منظم الفرح.",
  },
  {
    title: "أكتر من لغة",
    description:
      "اعرضوا قصتكم باللغات اللي عيلتكم بتتكلمها، من غير ما نعيد التصميم من الأول.",
  },
];

const arabicServices = [
  {
    title: "لوجو مخصوص للعرسان",
    description:
      "حروفكم الأولى أو توقيع متصمم على أساميكم، ينفع في الموقع وكارت «احفظوا الميعاد» وكل المطبوعات.",
  },
  {
    title: "صور الدعوات",
    description:
      "كروت دعوة متصممة للواتساب والطباعة والسوشيال ميديا، بأساميكم وتاريخكم وتفاصيلكم.",
    href: "/photos",
  },
  {
    title: "موقع دعوة مخصوص ليكم",
    description:
      "بنصمم شكل مفيش زيه، من المود بورد وصور القاعة وتفاصيل الفرح.",
  },
  {
    title: "صور وفيديوهات",
    description:
      "صور الخطوبة وفيديوهات قصيرة سينمائية، كأنها جزء من الدعوة نفسها.",
    href: "/videos",
  },
  {
    title: "باقة يوم الفرح الديجيتال",
    description:
      "توزيع الترابيزات وبرنامج الفرح ودليل الضيوف، بنفس روح تصميم دعوتكم.",
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
