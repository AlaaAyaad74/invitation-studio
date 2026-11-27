import Reveal from "@/components/Reveal";
import VideosGallery from "@/components/videos/VideosGallery";
import { videos } from "@/data/videos";
import { getLang } from "@/lib/i18n-server";
import Link from "next/link";

const COPY = {
  en: {
    kicker: "Invitation videos",
    title: "Films that carry the feeling of the day.",
    lead: "Short invitation films for WhatsApp and social. Each one stays paused until you press play, and only one plays at a time.",
    all: "Browse all invitation videos",
  },
  ar: {
    kicker: "فيديوهات الدعوات",
    title: "فيديوهات فيها إحساس اليوم اللي مستنيينه.",
    lead: "فيديو دعوة قصير يفرّح ضيوفكم من أول ثانية، بأساميكم وتاريخكم، وجاهز للواتساب والسوشيال ميديا.",
    all: "شوف كل فيديوهات الدعوات",
  },
} as const;

const previewVideos = videos.slice(0, 6);

export default async function VideosPreview() {
  const t = COPY[await getLang()];
  return (
    <section id="videos" className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-white/40 to-ivory" />
      <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-8 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-3 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-rose uppercase">
            {t.kicker}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            {t.lead}
          </p>
        </Reveal>

        <div className="mt-12">
          <VideosGallery videos={previewVideos} />
        </div>

        <Reveal className="mt-10">
          <Link
            href="/videos"
            className="inline-flex bg-sage-deep px-6 py-3 text-sm tracking-wide text-white transition hover:bg-sage"
          >
            {t.all}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
