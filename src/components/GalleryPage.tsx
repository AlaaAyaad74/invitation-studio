import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

type GalleryPageProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  ctaTitle: string;
  ctaBody: ReactNode;
  /** Service name sent with the Meta Pixel Lead event on the quote button. */
  leadService: string;
  /** Swaps which corner gets the rose glow and which the gold one. */
  glow?: "rose-first" | "gold-first";
  children: ReactNode;
};

/** Shared page frame for the /photos and /videos galleries. */
export default function GalleryPage({
  eyebrow,
  title,
  intro,
  ctaTitle,
  ctaBody,
  leadService,
  glow = "rose-first",
  children,
}: GalleryPageProps) {
  const rose = "bg-rose/10";
  const gold = "bg-gold/15";
  const [rightGlow, leftGlow] = glow === "rose-first" ? [rose, gold] : [gold, rose];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-14 sm:pt-36 sm:pb-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory-deep/70 via-ivory to-ivory" />
          <div className={`pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full ${rightGlow} blur-3xl`} />
          <div className={`pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full ${leftGlow} blur-3xl`} />

          <div className="relative mx-auto max-w-6xl px-3 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm tracking-[0.2em] text-rose uppercase">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-ink-muted">{intro}</p>
            </Reveal>

            <div className="mt-12">{children}</div>

            <Reveal className="mt-16 border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-display text-3xl text-ink">{ctaTitle}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                {ctaBody}
              </p>
              <a
                href={siteConfig.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-meta-lead={leadService}
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
