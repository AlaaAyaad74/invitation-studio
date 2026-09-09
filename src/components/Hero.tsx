export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/22 to-ink/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,color-mix(in_srgb,var(--ink)_28%,transparent)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <p className="animate-fade-up font-display text-4xl leading-[0.95] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
          Invitation Studio
        </p>
        <h1 className="animate-fade-up delay-1 mt-5 max-w-xl font-display text-2xl leading-snug text-white/95 sm:text-3xl md:text-4xl">
          Invitation websites that feel like the day itself.
        </h1>
        <p className="animate-fade-up delay-2 mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          Browse wedding invitation templates, then make them yours—or let us
          craft a custom site with your couple logo and story.
        </p>
        <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#templates"
            className="bg-white px-6 py-3 text-sm tracking-wide text-ink transition hover:bg-ivory"
          >
            View templates
          </a>
          <a
            href="#services"
            className="border border-white/50 px-6 py-3 text-sm tracking-wide text-white transition hover:bg-white/10"
          >
            Custom services
          </a>
        </div>
      </div>
    </section>
  );
}
