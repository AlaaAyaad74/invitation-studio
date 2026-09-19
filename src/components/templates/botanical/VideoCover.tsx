"use client";

import { useEffect, useState } from "react";
import { botanicalInvitation as data } from "@/data/botanical";
import styles from "./VideoCover.module.css";

const VIDEO_SRC = "/botanical/Botanical.mp4";

export default function VideoCover() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className={styles.cover} data-ready={ready ? "true" : "false"}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className={styles.wash} />

      <div className={styles.copy}>
        <p
          className={`${styles.line} ${styles.d1} text-[11px] tracking-[0.32em] text-ink-muted uppercase`}
        >
          {data.intro}
        </p>

        <h1 className={`${styles.names} ${styles.d2} mt-6 font-script text-[4.25rem] leading-[0.85] text-ink`}>
          {data.couple.first}
        </h1>
        <p
          className={`${styles.line} ${styles.d3} mt-2 font-display text-3xl italic text-gold`}
        >
          &amp;
        </p>
        <p className={`${styles.names} ${styles.d4} mt-1 font-script text-[4.25rem] leading-[0.85] text-ink`}>
          {data.couple.second}
        </p>

        <p
          className={`${styles.line} ${styles.d5} mt-7 font-display text-lg italic text-ink-muted`}
        >
          {data.tagline}
        </p>

        <span className={`${styles.rule} ${styles.d6}`} />

        <div className={`${styles.line} ${styles.d7} mt-5 font-display`}>
          <p className="text-[11px] tracking-[0.3em] text-ink-muted uppercase">
            {data.dateLabel.weekday}
          </p>
          <p className="mt-1 text-5xl leading-none">{data.dateLabel.day}</p>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-ink-muted uppercase">
            {data.dateLabel.month} {data.dateLabel.year}
          </p>
        </div>
      </div>

      <div
        className={`${styles.line} ${styles.d8} ${styles.scroll}`}
        aria-label="Scroll"
      >
        <svg
          className={styles.arrow}
          viewBox="0 0 24 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 6.5 12 12.5 18 6.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14.5 12 20.5 18 14.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
