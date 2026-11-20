import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import PhotosPreview from "@/components/photos/PhotosPreview";
// import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import TemplatesGrid from "@/components/TemplatesGrid";
import TrustStrip from "@/components/TrustStrip";
import VideosPreview from "@/components/videos/VideosPreview";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <TemplatesGrid />
        <VideosPreview />
        <PhotosPreview />
        <Reviews />
        <Features />
        {/* <Pricing /> */}
        {/* test */}
        <Services />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
