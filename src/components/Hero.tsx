"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/i18n/LangProvider";
import { siteConfig } from "@/lib/site";

const POSTER_SRC = "/videos/hero-poster.jpg";

const COPY = {
  en: {
    brand: "Invitation Studio",
    title: "Invitation websites that feel like the day itself.",
    lead: "Browse invitation websites, photos, and films, then make them yours or let us craft a custom site with your couple logo and story.",
    templates: "View templates",
    custom: "Custom services",
  },
  ar: {
    brand: "استوديو الدعوات",
    title: "مواقع دعوات فيها إحساس يومكم المميز.",
    lead: "اتفرجوا على مواقع الدعوات والصور والفيديوهات وخلّوها بتاعتكم، أو سيبونا نعملكم موقع مخصوص بلوجو وقصة تشبهكم.",
    templates: "اتفرج على التصميمات",
    custom: "تصميم مخصوص",
  },
} as const;

export default function Hero() {
  const t = COPY[useLang()];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) video.load();

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", tryPlay);
    window.addEventListener("touchstart", tryPlay, {
      once: true,
      passive: true,
    });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  const reveal = () => {
    const video = videoRef.current;
    if (!video || video.paused || video.currentTime < 0.2) return;
    setPlaying(true);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={reveal}
        onTimeUpdate={reveal}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/22 to-ink/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,color-mix(in_srgb,var(--ink)_28%,transparent)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <p className="animate-fade-up font-display text-4xl leading-[0.95] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
          {t.brand}
        </p>
        <h1 className="animate-fade-up delay-1 mt-5 max-w-xl font-display text-2xl leading-snug text-white/95 sm:text-3xl md:text-4xl">
          <span className="sr-only">{siteConfig.name}. </span>
          {t.title}
        </h1>
        <p className="animate-fade-up delay-2 mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          {t.lead}
        </p>
        <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#templates"
            className="bg-white px-6 py-3 text-sm tracking-wide text-ink transition hover:bg-ivory"
          >
            {t.templates}
          </a>
          <a
            href={siteConfig.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/50 px-6 py-3 text-sm tracking-wide text-white transition hover:bg-white/10"
          >
            {t.custom}
          </a>
        </div>
      </div>
    </section>
  );
}
