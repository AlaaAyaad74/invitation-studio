import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Reveal from "@/components/Reveal";
import ShareTemplateButton from "@/components/templates/ShareTemplateButton";
import { templates } from "@/data/templates";
import Link from "next/link";

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

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {templates.map((template, index) => {
            const card = (
              <>
                <div className="template-frame relative overflow-hidden bg-ivory-deep">
                  <ImageWithSkeleton
                    src={template.image}
                    alt={`${template.title} invitation template`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                    wrapperClassName="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.16em] text-white/90 uppercase sm:bottom-4 sm:left-4 sm:text-xs sm:tracking-[0.18em]">
                    {template.style}
                  </span>
                  {template.comingSoon ? (
                    <span className="absolute right-2 top-2 bg-white/95 px-2 py-1 text-[9px] tracking-[0.14em] text-ink uppercase sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <div className="space-y-1 p-3 sm:space-y-2 sm:p-5">
                  <h3 className="font-display text-lg leading-tight text-ink sm:text-2xl">
                    {template.title}
                  </h3>
                  <p className="hidden text-sm leading-relaxed text-ink-muted sm:block">
                    {template.description}
                  </p>
                  <span className="hidden pt-2 text-sm tracking-wide text-ink-muted uppercase transition group-hover:text-ink sm:inline-flex">
                    {template.comingSoon
                      ? "Coming soon"
                      : "Preview & personalize"}
                  </span>
                </div>
              </>
            );

            return (
              <Reveal key={template.id} delayMs={index * 90}>
                <article className="group relative h-full overflow-hidden bg-white shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--ink)_45%,transparent)]">
                  {template.href ? (
                    <Link
                      href={template.href}
                      className="block h-full outline-offset-4"
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                  {template.href && !template.comingSoon ? (
                    <ShareTemplateButton
                      title={template.title}
                      path={template.href}
                    />
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
