import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PhotosPreview from "@/components/photos/PhotosPreview";
import Pricing from "@/components/Pricing";
import VideosPreview from "@/components/videos/VideosPreview";
import Services from "@/components/Services";
import TemplatesGrid from "@/components/TemplatesGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TemplatesGrid />
        <VideosPreview />
        <PhotosPreview />
        <Features />
        <Pricing />
        <Services />
      </main>
      <Footer />
    </>
  );
}
