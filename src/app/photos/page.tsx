import type { Metadata } from "next";
import GalleryPage from "@/components/GalleryPage";
import PhotosGallery from "@/components/photos/PhotosGallery";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Invitation Photos",
  description:
    "Browse sample wedding and engagement invitation photos, then commission a card designed for your names, date, and details.",
  alternates: {
    canonical: "/photos",
  },
};

export default function PhotosPage() {
  return (
    <GalleryPage
      eyebrow="Invitation photos"
      title="A still invitation, made for your story."
      intro="Choose a sample as a starting point. We rewrite the names, date, venue, and language so the card feels like yours, ready for WhatsApp, print, or a save-the-date."
      ctaTitle="Commission an invitation photo"
      ctaBody="Send your names, date, venue, and a sample you love. Message us on Instagram and we will reply with a custom quote."
    >
      <PhotosGallery photos={photos} syncUrl />
    </GalleryPage>
  );
}
