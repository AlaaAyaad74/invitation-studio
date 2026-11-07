"use client";

import type { DesertBloomInvitation } from "@/data/desert-bloom";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import { useRef, useState, type CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import styles from "./Gallery.module.css";

const TOSS_MS = 520;

const COPY = {
  en: {
    kicker: "Our moments",
    title: "Little blooms",
    help: "Tap or swipe the photo",
    photo: (n: number, total: number, alt: string) =>
      `Photo ${n} of ${total}: ${alt}. Next photo`,
  },
  ar: {
    kicker: "لحظاتنا",
    title: "أزهار صغيرة",
    help: "اضغط على الصورة أو اسحبها",
    photo: (n: number, total: number, alt: string) =>
      `الصورة ${n} من ${total}: ${alt}. الصورة التالية`,
  },
} as const;

export default function Gallery({ data }: { data: DesertBloomInvitation }) {
  const photos = data.gallery;
  const t = COPY[data.lang];
  const [order, setOrder] = useState(() => photos.map((_, index) => index));
  const [tossing, setTossing] = useState<"left" | "right" | null>(null);
  const busy = useRef(false);
  const [played, setPlayed] = useState(false);

  const toss = (direction: "left" | "right") => {
    if (busy.current) return;
    busy.current = true;
    setPlayed(true);
    setTossing(direction);
    window.setTimeout(() => {
      setOrder((current) => [...current.slice(1), current[0]]);
      setTossing(null);
      busy.current = false;
    }, TOSS_MS);
  };

  const swipe = useHorizontalSwipe(
    () => toss("left"),
    () => toss("right"),
  );

  const top = order[0];

  return (
    <InView as="section" className={styles.section} aria-label={t.kicker}>
      <p className={`${styles.kicker} ${motion.kickerIn}`}>{t.kicker}</p>
      <h2 className={`${styles.title} ${motion.writeIn}`}>{t.title}</h2>

      <div
        className={styles.stack}
        data-played={played ? "true" : "false"}
        {...swipe}
      >
        {order
          .slice(0, 4)
          .reverse()
          .map((photoIndex) => {
            const depth = order.indexOf(photoIndex);
            const photo = photos[photoIndex];
            const isTop = depth === 0;
            return (
              <button
                key={photo.src}
                type="button"
                className={styles.photo}
                data-depth={depth}
                data-toss={isTop && tossing ? tossing : undefined}
                style={{ zIndex: 10 - depth } as CSSProperties}
                onClick={() => isTop && toss("right")}
                tabIndex={isTop ? 0 : -1}
                aria-hidden={!isTop}
                aria-label={
                  isTop
                    ? t.photo(photoIndex + 1, photos.length, photo.alt)
                    : undefined
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt="" loading="lazy" draggable={false} />
              </button>
            );
          })}
      </div>

      <div className={styles.meta} dir="ltr">
        <span className={styles.counter}>
          {String(top + 1).padStart(2, "0")} /{" "}
          {String(photos.length).padStart(2, "0")}
        </span>
        <span className={styles.help} dir="auto">{t.help}</span>
      </div>
    </InView>
  );
}
