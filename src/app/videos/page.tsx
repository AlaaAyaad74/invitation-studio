import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import VideosGallery from "@/components/videos/VideosGallery";
import { videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Invitation Videos",
  description:
    "Watch sample wedding invitation films. Each video stays paused until you play it, and only one plays at a time.",
  alternates: {
    canonical: "/videos",
  },
};

export default function VideosPage() {
  return (
    <GalleryPage
      eyebrow="Invitation videos"
      title="A moving invitation, ready to share."
      intro="Press play on any film. Starting another pauses the one that was running, so only one video plays at a time."
      ctaTitle="Commission an invitation film"
      ctaBody="Send your names, date, and a sample you love. Message us on Instagram and we will reply with a custom quote."
      glow="gold-first"
    >
      <VideosGallery videos={videos} syncUrl />
    </GalleryPage>
  );
}
