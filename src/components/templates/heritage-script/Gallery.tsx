"use client";

import WaveOrnamentIcon from "@/components/icons/WaveOrnamentIcon";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import Reveal from "@/components/Reveal";
import type { HeritageInvitation } from "@/data/heritage-script";
import { templateCopy } from "@/data/template-copy";
import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";

type Photo = HeritageInvitation["gallery"][number];

export default function Gallery({ data }: { data: HeritageInvitation }) {
  const [active, setActive] = useState<Photo | null>(null);
  const common = templateCopy(data.lang);
  const ar = data.lang === "ar";
  const pair = data.gallery.length <= 2;

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
    <section className={styles.section} aria-label={common.photos}>
      <div className={styles.intro}>
        <FadeIn>
          <p className={styles.label}>{ar ? "صورنا" : "Our gallery"}</p>
        </FadeIn>
        <FadeIn delay={220}>
          <p className={styles.script}>
            {data.couple.first} & {data.couple.second}
          </p>
        </FadeIn>
        <FadeIn delay={420}>
          <div className={styles.ornament} aria-hidden="true">
            <span />
            <WaveOrnamentIcon />
            <span />
          </div>
        </FadeIn>
        <FadeIn delay={620}>
          <p className={styles.hint}>
            {ar ? "صور من اللحظات المميزة" : "Photos from our special moments"}
          </p>
        </FadeIn>
      </div>

      {/* Two photos or fewer: one row, same height, widths from each ratio. */}
      <div className={`${styles.masonry} ${pair ? styles.pair : ""}`}>
        {data.gallery.map((photo, index) => (
          <Reveal
            key={photo.src}
            className={styles.cell}
            style={pair ? { flex: `${photo.ratio ?? 4 / 5} 1 0%` } : undefined}
            delayMs={80 + index * 90}
          >
            <button
              type="button"
              className={styles.item}
              style={pair ? { aspectRatio: photo.ratio ?? 4 / 5 } : undefined}
              aria-label={common.openPhoto(photo.alt)}
              onClick={() => setActive(photo)}
            >
              {pair ? (
                // Fills its tile, cropped to cover around `focus`.
                <ImageWithSkeleton
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 480px) 300px, 60vw"
                  className="object-cover"
                  style={{ objectPosition: photo.focus ?? "50% 50%" }}
                />
              ) : (
                <ImageWithSkeleton
                  // Optimized; width/height only seed the ratio, h-auto keeps
                  // each photo's natural shape.
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 480px) 480px, 100vw"
                  className="h-auto w-full"
                  wrapperClassName="w-full"
                  skeletonClassName="min-h-48"
                />
              )}
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
