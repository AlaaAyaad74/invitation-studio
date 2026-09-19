"use client";

import { useEffect, useState } from "react";
import { botanicalInvitation as data } from "@/data/botanical";
import Reveal from "@/components/Reveal";
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
      <Reveal className={styles.intro}>
        <p className={styles.label}>Our gallery</p>
        <p className={styles.script}>
          {data.couple.first} & {data.couple.second}
        </p>
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
        <p className={styles.hint}>A few stills from the meadow</p>
      </Reveal>

      <div className={styles.masonry}>
        {data.gallery.map((photo, index) => (
          <Reveal
            key={photo.src}
            className={styles.cell}
            delayMs={80 + index * 90}
          >
            <button
              type="button"
              className={styles.item}
              onClick={() => setActive(photo)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
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
          <img src={active.src} alt={active.alt} />
        </div>
      ) : null}
    </section>
  );
}
