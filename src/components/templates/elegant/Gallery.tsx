"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { elegantInvitation as data } from "@/data/elegant";

const SHAPE =
  "M0.463 0.02C0.529 0.028 0.596 0.066 0.653 0.096C0.710 0.126 0.758 0.160 0.805 0.200C0.853 0.240 0.900 0.280 0.930 0.332C0.960 0.384 0.988 0.450 0.988 0.510C0.988 0.570 0.960 0.636 0.928 0.686C0.896 0.736 0.840 0.774 0.792 0.808C0.744 0.842 0.694 0.866 0.640 0.892C0.586 0.918 0.530 0.952 0.466 0.966C0.402 0.980 0.320 0.992 0.256 0.978C0.192 0.964 0.124 0.914 0.084 0.864C0.044 0.814 0.024 0.744 0.016 0.686C0.008 0.628 0.012 0.568 0.016 0.512C0.020 0.456 0.028 0.404 0.046 0.350C0.064 0.296 0.088 0.244 0.122 0.194C0.156 0.144 0.200 0.082 0.256 0.052C0.312 0.022 0.396 0.012 0.463 0.02Z";

const SHAPE_RATIO = "134 / 144";

export default function Gallery() {
  const photos = data.gallery;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const photo = photos[index];

  function step(delta: number) {
    setIndex((current) => (current + delta + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, photos.length]);

  return (
    <section className="px-[1.15rem] pt-2 pb-8" aria-label="Photos">
      <Reveal className="text-center">
        <p className="text-[0.68rem] tracking-[0.34em] text-e-rose uppercase">
          In pictures
        </p>
        <h2 className="mt-2 font-pinyon text-[clamp(2.6rem,11vw,3.3rem)] leading-none font-normal text-e-ink">
          {data.couple.first} & {data.couple.second}
        </h2>
        <p className="mx-auto mt-3 max-w-64 font-bodoni text-[1.15rem] text-e-muted italic">
          Moments along the path
        </p>
      </Reveal>

      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          <clipPath id="elegant-shape" clipPathUnits="objectBoundingBox">
            <path d={SHAPE} />
          </clipPath>
        </defs>
      </svg>

      <Reveal className="mt-7">
        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Couple photos"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {photos.map((item, itemIndex) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Open photo: ${item.alt}`}
                  aria-current={itemIndex === index ? "true" : undefined}
                  onClick={() => {
                    setIndex(itemIndex);
                    setOpen(true);
                  }}
                  className="relative block min-w-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-e-leaf"
                  style={{
                    flex: "0 0 100%",
                    aspectRatio: SHAPE_RATIO,
                    clipPath: "url(#elegant-shape)",
                  }}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <FrameButton
            label="Previous photo"
            className="top-1/2 left-3 -translate-y-1/2 border-e-white/80 bg-e-white/85 text-e-leaf"
            onClick={() => step(-1)}
          />
          <FrameButton
            label="Next photo"
            className="top-1/2 right-3 -translate-y-1/2 border-e-white/80 bg-e-white/85 text-e-leaf"
            onClick={() => step(1)}
            flip
          />

          <div className="mt-4 flex items-center justify-center gap-2">
            {photos.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Show photo ${itemIndex + 1}`}
                onClick={() => setIndex(itemIndex)}
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: itemIndex === index ? "#c45c6c" : "rgba(196, 92, 108, 0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex animate-fade-in items-center justify-center bg-[#10211c] p-5 motion-reduce:animate-none"
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full border border-e-white/40 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] text-e-white uppercase"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <FrameButton
            label="Previous photo"
            className="top-1/2 left-3 -translate-y-1/2 border-e-white/50 bg-e-leaf/35 text-e-white"
            onClick={() => step(-1)}
          />
          <figure
            className="m-0 max-w-[min(100%,28rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              key={photo.src}
              className="mx-auto w-[min(100%,22rem)] animate-fade-up motion-reduce:animate-none"
              style={{ aspectRatio: SHAPE_RATIO, clipPath: "url(#elegant-shape)" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="size-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center font-pinyon text-3xl text-e-white">
              {data.couple.first} & {data.couple.second}
            </figcaption>
          </figure>
          <FrameButton
            label="Next photo"
            className="top-1/2 right-3 -translate-y-1/2 border-e-white/50 bg-e-leaf/35 text-e-white"
            onClick={() => step(1)}
            flip
          />
        </div>
      ) : null}
    </section>
  );
}

function FrameButton({
  label,
  className,
  onClick,
  flip = false,
}: {
  label: string;
  className: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute z-10 grid size-9 place-items-center rounded-full border backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-leaf ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-4 ${flip ? "rotate-180" : ""}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14.5 6.5 9 12l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
