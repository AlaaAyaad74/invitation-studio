import { LuPlus } from "react-icons/lu";
import Reveal from "@/components/Reveal";
import { faq } from "@/data/faq";
import { contactLinkProps, primaryContact } from "@/lib/contact";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * FAQ accordion (native <details>, no JS). From md: two columns, a sticky
 * intro with the contact card on the left, the questions on the right.
 */
export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory-deep/50 to-ivory" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-3 sm:px-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="text-sm tracking-[0.2em] text-rose uppercase">FAQ</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-balance text-ink sm:text-5xl">
              Questions couples ask us.
            </h2>
            <p className="mt-4 max-w-md text-ink-muted">
              Everything about how your invitation is made, shared, and
              answered by your guests.
            </p>
          </Reveal>

          <Reveal delayMs={120} className="mt-8 hidden md:block">
            <div className="relative border border-ivory-deep bg-white/70 p-6 backdrop-blur-sm lg:p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose/60 via-gold to-sage/70"
              />
              <p className="font-display text-3xl text-ink">Still wondering?</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Send us your date and the look you love, and we will answer
                within the day.
              </p>
              <a
                {...contactLinkProps()}
                className="mt-6 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
              >
                {primaryContact.label}
              </a>
            </div>
          </Reveal>
        </div>

        <div>
          <div className="border-t border-ink/10">
            {faq.map((item, index) => (
              <details
                key={item.question}
                className="group border-b border-ink/10 transition-colors duration-300 open:bg-white/60"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-3 py-4 text-base font-medium text-ink transition-colors hover:text-sage-deep sm:px-4 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span className="w-7 shrink-0 font-display text-xl text-gold/80 [font-variant-numeric:lining-nums]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{item.question}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-gold transition duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-white">
                    <LuPlus aria-hidden className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pr-4 pb-5 pl-14 text-sm leading-relaxed text-ink-muted sm:pr-16 sm:pl-[3.75rem] sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          {/* Phones: the contact button sits under the questions. */}
          <a
            {...contactLinkProps()}
            className="mt-8 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage md:hidden"
          >
            {primaryContact.label}
          </a>
        </div>
      </div>
    </section>
  );
}
