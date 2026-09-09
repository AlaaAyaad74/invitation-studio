import { features } from "@/data/templates";

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-sage-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--gold)_28%,transparent),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,color-mix(in_srgb,var(--rose)_18%,transparent),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm tracking-[0.2em] text-rose-soft uppercase">
            Our features
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
            Everything guests need, beautifully arranged.
          </h2>
          <p className="mt-4 max-w-lg text-white/75">
            Templates are more than pretty pages—they help you invite, inform,
            and celebrate without the spreadsheet chaos.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="border-t border-white/15 pt-6"
            >
              <span className="font-display text-4xl text-gold/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl text-white">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
