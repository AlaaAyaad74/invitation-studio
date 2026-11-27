import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getServices } from "@/data/templates";
import { getLang } from "@/lib/i18n-server";
import { siteConfig } from "@/lib/site";

const COPY = {
  en: {
    kicker: "Custom services",
    title: "Made for your names, your story, your day.",
    lead: "Beyond templates, our studio designs invitation photos, films, couple logos, bespoke invitation sites, and day-of digital pieces that feel unmistakably yours.",
    logoTitle: "Couple logo studio",
    logoLead: "Start with a monogram, crest, or wordmark—then carry it through your invitation site, envelopes, and thank-you notes.",
    quote: "Request a custom quote",
    samples: "Browse samples",
  },
  ar: {
    kicker: "تصميم مخصوص",
    title: "معمولة مخصوص لأساميكم وقصتكم ويومكم.",
    lead: "غير التصميمات الجاهزة، بنعمل صور وفيديوهات دعوات، ولوجوهات للعرسان، ومواقع دعوات مخصوصة، وكل التفاصيل الديجيتال ليوم الفرح بشكل يشبهكم بالظبط.",
    logoTitle: "لوجو العرسان",
    logoLead: "ابدأوا بالحروف الأولى أو لوجو أو توقيع مميز، وإحنا نحطه في موقع الدعوة والظروف وكروت الشكر.",
    quote: "اعرف السعر",
    samples: "شوف النماذج",
  },
} as const;

export default async function Services() {
  const lang = await getLang();
  const t = COPY[lang];
  const services = getServices(lang);
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <p className="text-sm tracking-[0.2em] text-rose uppercase">
              {t.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 max-w-xl text-ink-muted">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="animate-soft-float border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
              <p className="font-display text-3xl text-ink">{t.logoTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {t.logoLead}
              </p>
              <a
                href={siteConfig.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
              >
                {t.quote}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delayMs={index * 90}>
              <article className="h-full border-s-2 border-rose/40 bg-white/50 py-5 ps-5 pe-4 transition hover:bg-white">
                <h3 className="font-display text-2xl text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                {"href" in service && service.href ? (
                  <Link
                    href={service.href}
                    className="mt-3 inline-flex text-sm tracking-wide text-sage-deep underline-offset-4 hover:underline"
                  >
                    {t.samples}
                  </Link>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
