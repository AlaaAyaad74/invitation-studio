"use client";

import { useEffect, useRef } from "react";
import styles from "./Cover.module.css";

type CoverProps = {
  video: string;
  poster: string;
  alt: string;
};

export default function Cover({ video, poster, alt }: CoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;

    let started = false;
    const start = () => {
      if (started || node.ended) return;
      started = true;
      node.play().catch(() => {
        started = false;
      });
    };

    if (node.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) start();
    node.addEventListener("canplay", start);

    return () => node.removeEventListener("canplay", start);
  }, [video]);

  return (
    <section className={styles.cover} aria-label={alt}>
      <video
        ref={videoRef}
        className={styles.video}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        width={1080}
        height={1350}
      >
        <source src={video} type="video/mp4" />
      </video>
    </section>
  );
}
