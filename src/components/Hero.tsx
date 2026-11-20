"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { useDeferredVideo } from "@/hooks/useDeferredVideo";
import { contactLinkProps, ctaLabels, startingPrice } from "@/lib/contact";

const POSTER_SRC = "/videos/hero-poster.jpg";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The poster carries the hero until the page has loaded; on Save-Data or
  // slow connections the 7 MB film is skipped entirely.
  const loadVideo = useDeferredVideo({ skipOnSlowNetwork: true });

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
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });

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
        src={loadVideo ? "/videos/hero-video.mp4" : undefined}
        onPlaying={reveal}
        onTimeUpdate={reveal}
      />
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-16 pt-32 sm:px-8 sm:pb-24">
        <p className="animate-fade-up font-display text-4xl leading-[0.95] tracking-[0.04em] text-white sm:text-6xl md:text-7xl">
          Invitation Studio
        </p>
        <h1 className="animate-fade-up delay-1 mt-5 max-w-xl font-display text-2xl leading-snug text-white/95 sm:text-3xl md:text-4xl">
          <span className="sr-only">{siteConfig.name}. </span>
          Invitation websites that feel like the day itself.
        </h1>
        <p className="animate-fade-up delay-2 mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
          Browse invitation websites, photos, and films, then make them
          yours, or let us craft a custom site with your couple logo and story.
        </p>
        <div className="animate-fade-up delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#templates"
            className="bg-white px-6 py-3 text-sm tracking-wide text-ink transition hover:bg-ivory"
          >
            View templates
          </a>
          <a
            {...contactLinkProps()}
            className="border border-white/50 px-6 py-3 text-sm tracking-wide text-white transition hover:bg-white/10"
          >
            {ctaLabels.customServices}
          </a>
        </div>
        <p className="animate-fade-up delay-3 mt-4 text-sm tracking-wide text-white/85">
          {startingPrice}
        </p>
      </div>
    </section>
  );
}
