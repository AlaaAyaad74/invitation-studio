import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import PhotosGallery from "@/components/photos/PhotosGallery";
import { photos } from "@/data/photos";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Invitation Photos",
  description:
    "Browse sample wedding and engagement invitation photos, then commission a card designed for your names, date, and details.",
  alternates: {
    canonical: "/photos",
  },
};

function readCardId(value: string | string[] | undefined) {
  return typeof value === "string" ? value : value?.[0];
}

export default async function PhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ card?: string | string[] }>;
}) {
  const { card } = await searchParams;
  const initialCardId = readCardId(card);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory-deep/70 via-ivory to-ivory" />
          <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm tracking-[0.2em] text-rose uppercase">
                Invitation photos
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                A still invitation, made for your story.
              </h1>
              <p className="mt-4 max-w-xl text-ink-muted">
                Choose a sample as a starting point. We rewrite the names, date,
                venue, and language so the card feels like yours—ready for
                WhatsApp, print, or a save-the-date.
              </p>
            </Reveal>

            <div className="mt-12">
              <PhotosGallery
                photos={photos}
                initialCardId={initialCardId}
                syncUrl
              />
            </div>

            <Reveal className="mt-16 border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-display text-3xl text-ink">
                Commission an invitation photo
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Send your names, date, venue, and a sample you love. Message us
                on Instagram and we will reply with a custom quote.
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
