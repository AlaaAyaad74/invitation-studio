import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

const plans = [
  {
    title: "Digital invitation website",
    description:
      "A full invitation site your guests open from one link, written for your day.",
    details: [
      "Your names, date, venue, and the story you want told.",
      "Schedule, photo gallery, map, and a place for guests to reply.",
      "Built from a template you choose, then adjusted to your wording.",
    ],
    price: 250,
    was: 400,
  },
  {
    title: "Invitation video",
    description:
      "A short film that carries the invitation, ready to forward in a chat.",
    details: [
      "Choose a sample film and we set your names and date into it.",
      "Made to send on WhatsApp and share with family who cannot attend.",
      "One finished video, with your wording in place.",
    ],
    price: 150,
    was: 200,
  },
  {
    title: "Invitation photo",
    description:
      "A still card you can send, print, or keep as a save-the-date.",
    details: [
      "Choose a sample card and we place your names and details on it.",
      "Suited to WhatsApp, a printed invitation, or a social post.",
      "One finished photo, ready to share the same day.",
    ],
    price: 50,
  },
] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory-deep/40 to-ivory" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-rose uppercase">Pricing</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Clear prices for the piece you need.
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            Choose a website, a film, or a still card. Message us on Instagram
            with the sample you love and we will start your order.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.title} delayMs={index * 90}>
              <article className="flex h-full flex-col border border-ink/10 bg-white p-6 shadow-[0_22px_50px_-34px_color-mix(in_srgb,var(--ink)_70%,transparent)] sm:p-7">
                <h3 className="font-display text-3xl leading-tight text-ink">
                  {plan.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {plan.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.details.map((detail) => (
                    <li key={detail} className="text-sm leading-relaxed text-ink-muted">
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto flex items-end gap-3 pt-8">
                  {"was" in plan ? (
                    <span className="mb-1 text-sm text-ink-muted line-through">
                      <span className="sr-only">Was </span>
                      {plan.was} EGP
                    </span>
                  ) : null}
                  <span className="font-display text-5xl leading-none text-ink">
                    {"was" in plan ? <span className="sr-only">, now </span> : null}
                    {plan.price}
                  </span>
                  <span className="mb-1 text-sm tracking-wide text-ink-muted">EGP</span>
                </p>
                <a
                  href={siteConfig.instagramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit bg-sage-deep px-5 py-3 text-sm tracking-wide text-white transition hover:bg-sage"
                >
                  Order on Instagram
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
