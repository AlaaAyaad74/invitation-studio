import StarIcon from "@/components/icons/StarIcon";
import { Amiri } from "next/font/google";
import Reveal from "@/components/Reveal";
import ReviewProof from "@/components/ReviewProof";
import { reviews } from "@/data/reviews";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { getLang } from "@/lib/i18n-server";

const COPY = {
  en: {
    kicker: "Reviews",
    title: "Kind words from our couples.",
    lead: "Real messages sent to us after the invitation went out, shared with love, exactly as they arrived.",
    everyCouple: "From every couple",
    rated: "Rated 5 out of 5",
    sentOn: { WhatsApp: "Sent on WhatsApp", Instagram: "Sent on Instagram" },
  },
  ar: {
    kicker: "آراء العملاء",
    title: "كلام حلو من عرساننا.",
    lead: "رسايل حقيقية وصلتنا بعد ما الدعوة اتبعتت، منشورة بحب وزي ما وصلتنا بالظبط.",
    everyCouple: "من كل العرسان",
    rated: "تقييم 5 من 5",
    sentOn: { WhatsApp: "اتبعتت على واتساب", Instagram: "اتبعتت على إنستجرام" },
  },
} as const;

const arabic = Amiri({
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
});

function Stars({ className = "h-3.5 w-3.5", label }: { className?: string; label: string }) {
  return (
    <span className="flex gap-0.5 text-gold" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function initials(couple: string) {
  return couple
    .split(/&| و/)
    .map((name) => name.trim()[0])
    .join("&");
}

export default async function Reviews() {
  const lang = await getLang();
  const t = COPY[lang];

  return (
    <section id="reviews" className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory-deep/60 to-ivory" />
      <div className="texture-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-3 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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

          <Reveal delayMs={120} className="shrink-0">
            <div className="inline-flex items-center gap-4 border border-ivory-deep bg-white/70 px-5 py-4 backdrop-blur-sm">
              <span className="font-display text-5xl leading-none text-ink">5.0</span>
              <span className="space-y-1.5">
                <Stars className="h-4 w-4" label={t.rated} />
                <span className="block text-xs tracking-[0.14em] text-ink-muted uppercase">
                  {t.everyCouple}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Swipe on phones, three equal cards from md up. */}
        <div className="-mx-3 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {reviews.map((review, index) => {
            const isWhatsApp = review.platform === "WhatsApp";
            const PlatformIcon = isWhatsApp ? FaWhatsapp : FaInstagram;
            const couple = lang === "ar" ? review.coupleAr : review.couple;

            return (
              <Reveal
                key={review.id}
                delayMs={index * 90}
                className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto"
              >
                <figure className="relative flex h-full flex-col overflow-hidden bg-white p-6 shadow-[0_24px_50px_-32px_color-mix(in_srgb,var(--ink)_55%,transparent)] transition duration-500 hover:-translate-y-1 sm:p-7">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose/60 via-gold to-sage/70" />

                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="font-display text-7xl leading-[0.6] text-gold/50"
                    >
                      &ldquo;
                    </span>
                    <Stars label={t.rated} />
                  </div>

                  <blockquote
                    lang="ar"
                    dir="rtl"
                    className={`${arabic.className} mt-5 flex-1 text-right text-2xl leading-[1.7] text-ink`}
                  >
                    {review.quote}
                  </blockquote>

                  <div className="mt-6">
                    <ReviewProof couple={couple} shots={review.shots} />
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ivory-deep pt-5">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ivory font-display text-base text-ink"
                    >
                      {initials(couple)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-tight text-ink sm:text-2xl">
                        {couple}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
                        <PlatformIcon
                          aria-hidden
                          className={`h-3.5 w-3.5 ${isWhatsApp ? "text-[#25d366]" : "text-[#e1306c]"}`}
                        />
                        {t.sentOn[review.platform]}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
