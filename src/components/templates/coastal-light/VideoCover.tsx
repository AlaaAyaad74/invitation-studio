"use client";

import { coastalLightInvitation as data } from "@/data/coastal-light";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoCover.module.css";

const VIDEO_SRC = "/minimal/minimal-hero.mp4";
const POSTER_SRC = "/minimal/hero-poster.webp";

export default function VideoCover() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1600);
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

  return (
    <section
      className={styles.cover}
      data-ready={ready ? "true" : "false"}
      aria-label={`${data.couple.first} and ${data.couple.second}`}
    >
      <div className={styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
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
          className={videoOn ? styles.posterOff : styles.poster}
        />

        <div className={styles.copy}>
          <p className={`${styles.line} ${styles.d1}`}>{data.intro}</p>
          <h1 className={styles.names}>
            <span className={`${styles.name} ${styles.d2}`}>
              {data.couple.first}
            </span>
            <span className={`${styles.join} ${styles.d3}`}>
              <i aria-hidden="true" />
              <span>&amp;</span>
              <i aria-hidden="true" />
            </span>
            <span className={`${styles.name} ${styles.d4}`}>
              {data.couple.second}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
