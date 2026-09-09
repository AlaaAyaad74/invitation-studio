import { services } from "@/data/templates";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm tracking-[0.2em] text-rose uppercase">
              Custom services
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Made for your names, your story, your day.
            </h2>
            <p className="mt-4 max-w-xl text-ink-muted">
              Beyond templates, our studio designs couple logos, bespoke
              invitation sites, and day-of digital pieces that feel unmistakably
              yours.
            </p>
          </div>

          <div className="animate-soft-float border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm sm:p-8">
            <p className="font-display text-3xl text-ink">Couple logo studio</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Start with a monogram, crest, or wordmark—then carry it through
              your invitation site, envelopes, and thank-you notes.
            </p>
            <a
              href="mailto:hello@vowcraft.studio"
              className="mt-6 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
            >
              Request a custom quote
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="border-l-2 border-rose/40 bg-white/50 py-5 pl-5 pr-4 transition hover:bg-white"
            >
              <h3 className="font-display text-2xl text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
