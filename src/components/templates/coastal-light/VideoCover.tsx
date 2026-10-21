"use client";

import { coastalLightInvitation as data } from "@/data/coastal-light";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoCover.module.css";

const VIDEO_SRC = "/minimal/minimal-hero.mp4";
const POSTER_SRC = "/minimal/hero-poster.webp";
const REVEAL_AFTER_MS = 7000;

export default function VideoCover() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealId = useRef<number | null>(null);
  const coverRef = useRef<HTMLElement>(null);
  const openedRef = useRef(false);
  const warmedRef = useRef(false);
  const [opened, setOpened] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const paintOpeningFrame = () => {
      if (openedRef.current) return;
      try {
        video.currentTime = 0.001;
      } catch {
        /* metadata is not seekable yet */
      }
    };

    // In-app browsers (Instagram) often leave <video> blank until a frame is
    // decoded. Load immediately, seek to the sealed envelope, and try a muted
    // play/pause so that frame is ready before tap. The poster covers any gap.
    const warm = () => {
      if (openedRef.current || warmedRef.current) return;
      warmedRef.current = true;
      paintOpeningFrame();

      const attempt = video.play();
      if (!attempt) return;
      attempt
        .then(() => {
          if (openedRef.current) return;
          video.pause();
          paintOpeningFrame();
        })
        .catch(() => {
          paintOpeningFrame();
        });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) warm();
    else if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load();

    video.addEventListener("loadedmetadata", warm);
    video.addEventListener("loadeddata", warm);

    return () => {
      video.removeEventListener("loadedmetadata", warm);
      video.removeEventListener("loadeddata", warm);
      if (revealId.current != null) window.clearTimeout(revealId.current);
    };
  }, []);

  const open = () => {
    const video = videoRef.current;
    if (!video || opened) return;
    openedRef.current = true;
    setOpened(true);
    try {
      video.currentTime = 0.001;
    } catch {
      /* play() still starts once the gesture unlocks the element */
    }
    video.play().catch(() => {
      openedRef.current = false;
      setOpened(false);
    });
  };

  const onPlaying = () => {
    if (!openedRef.current) return;
    setVideoOn(true);
    if (revealId.current != null) return;
    revealId.current = window.setTimeout(() => setRevealed(true), REVEAL_AFTER_MS);
  };

  const scrollOn = () => {
    const next = coverRef.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={coverRef}
      className={styles.cover}
      aria-label={`${data.couple.first} and ${data.couple.second}`}
    >
      <div
        className={styles.frame}
        data-revealed={revealed ? "true" : "false"}
      >
        <video
          ref={videoRef}
          className={styles.video}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={onPlaying}
          onEnded={() => setFinished(true)}
        />
        <img
          src={POSTER_SRC}
          alt=""
          fetchPriority="high"
          className={styles.still}
          data-hidden={videoOn ? "true" : "false"}
        />
        {opened ? null : (
          <button type="button" className={styles.seal} onClick={open}>
            <span>
              <em>Tap to open</em>
              <i aria-hidden="true" />
            </span>
          </button>
        )}

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
          <p className={`${styles.date} ${styles.d5}`}>
            <span>{data.dateLabel.weekday}</span>
            <span>
              {data.dateLabel.day} {data.dateLabel.month} {data.dateLabel.year}
            </span>
          </p>
        </div>

        {finished ? (
          <button
            type="button"
            className={styles.scroll}
            onClick={scrollOn}
            aria-label="Scroll down"
          >
            <svg viewBox="0 0 24 28" fill="none" aria-hidden="true">
              <path
                d="M6 6.5 12 12.5 18 6.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 14.5 12 20.5 18 14.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </section>
  );
}
