import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import VideosGallery from "@/components/videos/VideosGallery";
import { videos } from "@/data/videos";
import { siteConfig } from "@/lib/site";

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
  const highlightId = readFilmId(film);
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
                Invitation videos
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                A moving invitation, ready to share.
              </h1>
              <p className="mt-4 max-w-xl text-ink-muted">
                Press play on any film. Starting another pauses the one that
                was running, so only one video plays at a time.
              </p>
            </Reveal>

            <div className="mt-12">
              <VideosGallery videos={videos} highlightId={highlightId} />
            </div>

            <Reveal className="mt-16 border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-display text-3xl text-ink">
                Commission an invitation film
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Send your names, date, and a sample you love. Message us on
                Instagram and we will reply with a custom quote.
              </p>
              <a
                href={siteConfig.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
              >
                Request a custom quote
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
