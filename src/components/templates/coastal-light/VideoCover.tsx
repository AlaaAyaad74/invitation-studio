"use client";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { coastalLightInvitation as data } from "@/data/coastal-light";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoCover.module.css";

const VIDEO_SRC = "/minimal/minimal-hero.mp4";
const POSTER_SRC = "/minimal/hero-poster.webp";
const REVEAL_AFTER_MS = 7000;
const BLOOM_AT_SECONDS = 3;

const LEAF_COUNT = 22;

type LeafFlight = {
  small: boolean;
  delay: string;
  duration: string;
  fromX: string;
  fromY: string;
  midX: string;
  midY: string;
  toX: string;
  toY: string;
  spinFrom: string;
  spinMid: string;
  spinTo: string;
};

function rollFlights(): LeafFlight[] {
  return Array.from({ length: LEAF_COUNT }, () => {
    const small = Math.random() < 0.4;
    const delay = `${(Math.random() * 3.2).toFixed(2)}s`;
    const duration = `${(18 + Math.random() * 8).toFixed(2)}s`;
    const spinFrom = Math.round(Math.random() * 24 - 12);
    const turn = (Math.random() < 0.5 ? -1 : 1) * (36 + Math.random() * 48);
    const spinMid = Math.round(spinFrom + turn * 0.45);
    const spinTo = Math.round(spinFrom + turn);
    const lane = 10 + Math.random() * 80;
    const drift = Math.random() * 16 - 8;
    const bow = Math.random() * 14 - 7;
    const edge = Math.floor(Math.random() * 4);
    const flight = {
      small,
      delay,
      duration,
      spinFrom: `${spinFrom}deg`,
      spinMid: `${spinMid}deg`,
      spinTo: `${spinTo}deg`,
      fromX: "0%",
      fromY: "0%",
      midX: "50%",
      midY: "50%",
      toX: "0%",
      toY: "0%",
    };

    if (edge === 0) {
      flight.fromX = `${lane.toFixed(1)}%`;
      flight.fromY = "-18%";
      flight.midX = `${(lane + bow).toFixed(1)}%`;
      flight.midY = `${(38 + Math.random() * 24).toFixed(1)}%`;
      flight.toX = `${(lane + drift).toFixed(1)}%`;
      flight.toY = "118%";
    } else if (edge === 1) {
      flight.fromX = "118%";
      flight.fromY = `${lane.toFixed(1)}%`;
      flight.midX = `${(40 + Math.random() * 20).toFixed(1)}%`;
      flight.midY = `${(lane + bow).toFixed(1)}%`;
      flight.toX = "-20%";
      flight.toY = `${(lane + drift).toFixed(1)}%`;
    } else if (edge === 2) {
      flight.fromX = `${lane.toFixed(1)}%`;
      flight.fromY = "118%";
      flight.midX = `${(lane + bow).toFixed(1)}%`;
      flight.midY = `${(38 + Math.random() * 24).toFixed(1)}%`;
      flight.toX = `${(lane + drift).toFixed(1)}%`;
      flight.toY = "-18%";
    } else {
      flight.fromX = "-20%";
      flight.fromY = `${lane.toFixed(1)}%`;
      flight.midX = `${(40 + Math.random() * 20).toFixed(1)}%`;
      flight.midY = `${(lane + bow).toFixed(1)}%`;
      flight.toX = "118%";
      flight.toY = `${(lane + drift).toFixed(1)}%`;
    }

    return flight;
  });
}

export default function VideoCover() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealId = useRef<number | null>(null);
  const coverRef = useRef<HTMLElement>(null);
  const openedRef = useRef(false);
  const warmedRef = useRef(false);
  const passedOpening = useRef(false);
  const bloomedRef = useRef(false);
  const [opened, setOpened] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [blooming, setBlooming] = useState(false);
  const [leaves, setLeaves] = useState<LeafFlight[]>([]);

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
    passedOpening.current = false;
    bloomedRef.current = false;
    setLeaves([]);
    setBlooming(false);
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

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !openedRef.current || bloomedRef.current) return;
    // A warm-up play can report the end of the file before the seek back to
    // the sealed frame. Wait until this opening has actually passed the start.
    if (video.currentTime < BLOOM_AT_SECONDS) {
      passedOpening.current = true;
      return;
    }
    if (!passedOpening.current) return;
    bloomedRef.current = true;
    setLeaves(rollFlights());
    setBlooming(true);
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
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setFinished(true)}
        />
        <ImageWithSkeleton
          native
          cover
          src={POSTER_SRC}
          alt=""
          fetchPriority="high"
          className="size-full object-cover"
          wrapperClassName={`absolute inset-0 z-[1] transition-opacity duration-[450ms] ease-out ${
            videoOn ? "opacity-0" : "opacity-100"
          }`}
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
          {blooming ? (
            <div className={styles.flora} aria-hidden="true">
              {leaves.map((leaf, index) => (
                <span
                  key={index}
                  className={`${styles.piece} ${styles.leaf} ${styles.rose}${leaf.small ? ` ${styles.small}` : ""}`}
                  style={{
                    animationDelay: leaf.delay,
                    animationDuration: leaf.duration,
                    ["--from-x" as string]: leaf.fromX,
                    ["--from-y" as string]: leaf.fromY,
                    ["--mid-x" as string]: leaf.midX,
                    ["--mid-y" as string]: leaf.midY,
                    ["--to-x" as string]: leaf.toX,
                    ["--to-y" as string]: leaf.toY,
                    ["--spin-from" as string]: leaf.spinFrom,
                    ["--spin-mid" as string]: leaf.spinMid,
                    ["--spin-to" as string]: leaf.spinTo,
                  }}
                />
              ))}
            </div>
          ) : null}
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
