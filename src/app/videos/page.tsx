import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import VideosGallery from "@/components/videos/VideosGallery";
import { videos } from "@/data/videos";
import { getLang } from "@/lib/i18n-server";

const COPY = {
  en: {
    kicker: "Invitation videos",
    title: "A moving invitation, ready to share.",
    lead: "Press play on any film. Starting another pauses the one that was running, so only one video plays at a time.",
    ctaTitle: "Commission an invitation film",
    ctaLead: "Send your names, date, and a sample you love. Message us on Instagram and we will reply with a custom quote.",
    quote: "Request a custom quote",
  },
  ar: {
    kicker: "فيديوهات الدعوات",
    title: "دعوة متحركة فيها روح، وجاهزة تتبعت.",
    lead: "فيديوهات دعوة قصيرة بأساميكم وتفاصيل يومكم، جاهزة تتبعت على الواتساب وتتنزل ستوري. اتفرجوا على النماذج واختاروا اللي يشبهكم.",
    ctaTitle: "يلا نعمل فيديو دعوتكم",
    ctaLead: "ابعتولنا أساميكم والتاريخ والتصميم اللي عجبكم على إنستجرام، وهنرد عليكم بسعر مخصوص ليكم.",
    quote: "اعرف السعر",
  },
} as const;

export const metadata: Metadata = {
  title: "Invitation Videos",
  description:
    "Watch sample wedding invitation films. Each video stays paused until you play it, and only one plays at a time.",
  alternates: {
    canonical: "/videos",
  },
};

export default async function VideosPage() {
  const t = COPY[await getLang()];
  return (
    <GalleryPage
      eyebrow={t.kicker}
      title={t.title}
      intro={t.lead}
      ctaTitle={t.ctaTitle}
      ctaBody={t.ctaLead}
      quoteLabel={t.quote}
      leadService="Invitation video"
      glow="gold-first"
    >
      <VideosGallery videos={videos} syncUrl />
    </GalleryPage>
  );
}
