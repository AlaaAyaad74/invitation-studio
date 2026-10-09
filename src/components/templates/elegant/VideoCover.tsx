"use client";

import { useEffect, useRef, useState } from "react";
import { elegantInvitation as data } from "@/data/elegant";

const VIDEO_SRC = "/elegant/elegant_hero_video.mp4";
const POSTER_SRC = "/elegant/hero-poster.webp";

const PETALS = [
  { className: "left-[18%]", delay: "0.4s", duration: "8.5s" },
  {
    className: "left-[62%] h-[0.62rem] w-[0.42rem]",
    delay: "2.4s",
    duration: "10s",
  },
  { className: "left-[78%]", delay: "4.1s", duration: "9s" },
  {
    className: "left-[36%] h-[0.55rem] w-[0.38rem]",
    delay: "6s",
    duration: "11s",
  },
];

function cue(animation = "animate-e-rise", extra = "") {
  return [
    animation,
    "opacity-0",
    "[animation-play-state:paused]",
    "group-data-[ready=true]:[animation-play-state:running]",
    "motion-reduce:animate-none",
    "motion-reduce:opacity-100",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function VideoCover() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const start = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) start();
    else video.load();

    video.addEventListener("loadeddata", start);
    return () => video.removeEventListener("loadeddata", start);
  }, []);

  const when = `${data.dateLabel.weekday} · ${data.dateLabel.day} ${data.dateLabel.month}`;

  return (
    <section
      className="group relative flex h-svh max-h-[920px] items-center justify-center overflow-hidden bg-e-leaf text-e-white"
      data-ready={ready ? "true" : "false"}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={() => setReady(true)}
        onPlaying={() => setVideoOn(true)}
        onError={() => setVideoOn(false)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <img
        src={POSTER_SRC}
        alt=""
        fetchPriority="high"
        className={`pointer-events-none absolute inset-0 z-[1] size-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${videoOn ? "opacity-0" : "opacity-100"}`}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_42%_at_50%_40%,rgba(22,12,14,0.48),transparent_70%),linear-gradient(180deg,rgba(16,28,24,0.38)_0%,transparent_24%,transparent_62%,rgba(16,24,20,0.55)_100%)]" />

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
        {PETALS.map((petal) => (
          <span
            key={petal.delay}
            className={`absolute -top-[8%] h-[0.78rem] w-[0.55rem] animate-e-drift rounded-[80%_15%_70%_30%] bg-gradient-to-br from-[#ffe8ea] to-[#e7a0ab] opacity-0 ${petal.className}`}
            style={{ animationDelay: petal.delay, animationDuration: petal.duration }}
          />
        ))}
      </div>

      <div className="relative z-10 -mt-[14%] w-full px-[1.4rem] text-center">
        <p
          className={`${cue()} text-[0.68rem] tracking-[0.32em] text-e-white/85 uppercase`}
          style={{ animationDelay: "3s" }}
        >
          {data.intro}
        </p>
        <h1 className="mt-3.5 font-normal">
          <span
            className={`${cue("animate-e-bloom")} block font-pinyon text-[clamp(4.1rem,17vw,5.4rem)] leading-[0.82] text-e-white [text-shadow:0_10px_28px_rgba(20,10,12,0.35)]`}
            style={{ animationDelay: "3.35s" }}
          >
            {data.couple.first}
          </span>
          <span
            className={`${cue()} my-0.5 block font-bodoni text-[2rem] leading-none text-[#f0d7b0] italic`}
            style={{ animationDelay: "3.85s" }}
          >
            &amp;
          </span>
          <span
            className={`${cue("animate-e-bloom")} block font-pinyon text-[clamp(4.1rem,17vw,5.4rem)] leading-[0.82] text-e-white [text-shadow:0_10px_28px_rgba(20,10,12,0.35)]`}
            style={{ animationDelay: "4.15s" }}
          >
            {data.couple.second}
          </span>
        </h1>
        <p
          className={`${cue()} mx-auto mt-3.5 max-w-52 font-bodoni text-[1.2rem] leading-snug text-e-white/90 italic text-balance`}
          style={{ animationDelay: "4.7s" }}
        >
          {data.tagline}
        </p>
      </div>

      <p
        className={`${cue("animate-e-rise-center", "motion-reduce:-translate-x-1/2")} absolute bottom-[5.1rem] left-1/2 z-10 m-0 rounded-full border border-e-white/40 bg-[rgba(22,14,16,0.28)] px-4 py-2 text-[0.66rem] tracking-[0.26em] text-e-white uppercase backdrop-blur-sm`}
        style={{ animationDelay: "5.15s" }}
      >
        {when}
      </p>

      <div
        className={`${cue()} absolute inset-x-0 bottom-[2.85rem] z-10 flex justify-center`}
        style={{ animationDelay: "5.6s" }}
        aria-hidden="true"
      >
        <span className="block h-3 w-2 rounded-[80%_15%_70%_30%] bg-[#f6d5d8] shadow-[0_8px_16px_rgba(20,10,12,0.25)] group-data-[ready=true]:animate-e-bob" />
      </div>
    </section>
  );
}
