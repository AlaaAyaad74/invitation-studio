import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import VideosGallery from "@/components/videos/VideosGallery";
import { videos } from "@/data/videos";
import { getLang } from "@/lib/i18n-server";
import { siteConfig } from "@/lib/site";

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

function readFilmId(value: string | string[] | undefined) {
  return typeof value === "string" ? value : value?.[0];
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ film?: string | string[] }>;
}) {
  const { film } = await searchParams;
  const filmId = readFilmId(film);
  const t = COPY[await getLang()];
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory-deep/70 via-ivory to-ivory" />
          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm tracking-[0.2em] text-rose uppercase">
                {t.kicker}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {t.title}
              </h1>
              <p className="mt-4 max-w-xl text-ink-muted">
                {t.lead}
              </p>
            </Reveal>

            <div className="mt-12">
              <VideosGallery videos={videos} initialFilmId={filmId} syncUrl />
            </div>

            <Reveal className="mt-16 border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-display text-3xl text-ink">
                {t.ctaTitle}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                {t.ctaLead}
              </p>
              <a
                href={siteConfig.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
              >
                {t.quote}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
