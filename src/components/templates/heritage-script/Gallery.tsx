"use client";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import Reveal from "@/components/Reveal";
import { heritageInvitation as data } from "@/data/heritage-script";
import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

type Photo = (typeof data.gallery)[number];

export default function Gallery() {
  const [active, setActive] = useState<Photo | null>(null);

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  return (
    <section className={styles.section} aria-label="Photos">
      <div className={styles.intro}>
        <FadeIn>
          <p className={styles.label}>Our gallery</p>
        </FadeIn>
        <FadeIn delay={220}>
          <p className={styles.script}>
            {data.couple.first} & {data.couple.second}
          </p>
        </FadeIn>
        <FadeIn delay={420}>
          <div className={styles.ornament} aria-hidden="true">
            <span />
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
              <path
                d="M1 5c3.2-4.2 6.4-4.2 8 0 1.6-4.2 4.8-4.2 8 0"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span />
          </div>
        </FadeIn>
        <FadeIn delay={620}>
          <p className={styles.hint}>A few stills from the evening</p>
        </FadeIn>
      </div>

      <div className={styles.masonry}>
        {data.gallery.map((photo, index) => (
          <Reveal key={photo.src} className={styles.cell} delayMs={80 + index * 90}>
            <button
              type="button"
              className={styles.item}
              aria-label={`Open photo: ${photo.alt}`}
              onClick={() => setActive(photo)}
            >
              <ImageWithSkeleton
                native
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                wrapperClassName="w-full"
                skeletonClassName="min-h-48"
              />
              <span className={styles.credit}>
                {data.couple.first} & {data.couple.second}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
        >
          <ImageWithSkeleton
            native
            src={active.src}
            alt={active.alt}
            wrapperClassName="flex max-h-[88svh] justify-center"
            skeletonClassName="min-h-64 w-full max-w-[920px] rounded-[0.75rem]"
          />
        </div>
      ) : null}
    </section>
  );
}
