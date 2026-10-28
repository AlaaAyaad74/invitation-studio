import Link from "next/link";
import Reveal from "@/components/Reveal";
import PhotosGallery from "@/components/photos/PhotosGallery";
import { photos } from "@/data/photos";

const previewPhotos = photos.slice(0, 6);

export default function PhotosPreview() {
  return (
    <section id="photos" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory-deep/50 to-ivory" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-rose uppercase">
            Invitation photos
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Cards made to send, save, and share.
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            Beyond invitation websites, we design still invitation photos for
            WhatsApp, print, and social—personalized with your names and day.
          </p>
        </Reveal>

        <div className="mt-12">
          <PhotosGallery photos={previewPhotos} showFilters={false} />
        </div>

        <Reveal className="mt-10">
          <Link
            href="/photos"
            className="inline-flex bg-sage-deep px-6 py-3 text-sm tracking-wide text-white transition hover:bg-sage"
          >
            Browse all invitation photos
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
