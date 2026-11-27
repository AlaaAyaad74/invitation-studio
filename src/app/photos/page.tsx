import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import PhotosGallery from "@/components/photos/PhotosGallery";
import { photos } from "@/data/photos";
import { getLang } from "@/lib/i18n-server";

const COPY = {
  en: {
    kicker: "Invitation photos",
    title: "A still invitation, made for your story.",
    lead: "Choose a sample as a starting point. We rewrite the names, date, venue, and language so the card feels like yours, ready for WhatsApp, print, or a save-the-date.",
    ctaTitle: "Commission an invitation photo",
    ctaLead: "Send your names, date, venue, and a sample you love. Message us on Instagram and we will reply with a custom quote.",
    quote: "Request a custom quote",
  },
  ar: {
    kicker: "صور الدعوات",
    title: "دعوة بالصور، معمولة على قصتكم.",
    lead: "اختاروا التصميم اللي عاجبكم، وإحنا نغيّر الأسامي والتاريخ والمكان واللغة عشان الكارت يبقى بتاعكم؛ جاهز للواتساب أو الطباعة أو كارت «احفظوا الميعاد».",
    ctaTitle: "يلا نعمل صورة دعوتكم",
    ctaLead: "ابعتولنا أساميكم والتاريخ والمكان والتصميم اللي عجبكم على إنستجرام، وهنرد عليكم بسعر مخصوص ليكم.",
    quote: "اعرف السعر",
  },
} as const;

export const metadata: Metadata = {
  title: "Invitation Photos",
  description:
    "Browse sample wedding and engagement invitation photos, then commission a card designed for your names, date, and details.",
  alternates: {
    canonical: "/photos",
  },
};

export default async function PhotosPage() {
  const t = COPY[await getLang()];
  return (
    <GalleryPage
      eyebrow={t.kicker}
      title={t.title}
      intro={t.lead}
      ctaTitle={t.ctaTitle}
      leadService="Invitation photo"
      ctaBody={t.ctaLead}
      quoteLabel={t.quote}
    >
      <PhotosGallery photos={photos} syncUrl />
    </GalleryPage>
  );
}
