import Image from "next/image";
import Reveal from "@/components/Reveal";
import { templates } from "@/data/templates";

export default function TemplatesGrid() {
  return (
    <section id="templates" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory via-ivory-deep/60 to-ivory" />
      <div className="texture-grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-rose uppercase">
            Templates
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Invitation sites ready for your names.
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            Each design is a complete wedding website—choose a look, personalize
            the details, and share a link your guests will love.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <Reveal key={template.id} delayMs={index * 90}>
              <article className="h-full overflow-hidden bg-white shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--ink)_45%,transparent)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                  <Image
                    src={template.image}
                    alt={`${template.title} invitation template`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 text-xs tracking-[0.18em] text-white/90 uppercase">
                    {template.style}
                  </span>
                  {template.comingSoon ? (
                    <span className="absolute right-4 top-4 bg-white/95 px-3 py-1.5 text-[11px] tracking-[0.16em] text-ink uppercase">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="font-display text-2xl text-ink">
                    {template.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {template.description}
                  </p>
                  <span className="inline-flex pt-2 text-sm tracking-wide text-ink-muted uppercase">
                    {template.comingSoon
                      ? "Coming soon"
                      : "Preview & personalize"}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
