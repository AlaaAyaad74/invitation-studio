"use client";

import ReplayIcon from "@/components/icons/ReplayIcon";
import ScrollDownCompactIcon from "@/components/icons/ScrollDownCompactIcon";
import type { DesertBloomInvitation } from "@/data/desert-bloom";
import { templateCopy } from "@/data/template-copy";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./VideoCover.module.css";

type Phase = "sealed" | "opening" | "held";

const SPARKS = Array.from({ length: 14 }, (_, index) => ({
  angle: (360 / 14) * index,
  distance: 54 + (index % 3) * 18,
  size: 4 + (index % 4),
}));

const COPY = {
  en: {
    seal: "Break the seal to open the invitation",
    hint: "Tap the seal",
    hintSmall: "to open your invitation",
    replay: "Replay the opening",
    scroll: "Scroll to the invitation",
    discover: "Discover",
  },
  ar: {
    seal: "اكسر الختم لفتح الدعوة",
    hint: "المس الختم",
    hintSmall: "لتفتح دعوتك",
    replay: "إعادة مشهد الافتتاح",
    scroll: "انتقل إلى الدعوة",
    discover: "اكتشف",
  },
} as const;

export default function VideoCover({ data }: { data: DesertBloomInvitation }) {
  const { hero, couple } = data;
  const t = COPY[data.lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const phaseRef = useRef<Phase>("sealed");
  const warmedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("sealed");
  const [videoOn, setVideoOn] = useState(false);

  const go = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const paintFirstFrame = () => {
      if (phaseRef.current !== "sealed") return;
      try {
        video.currentTime = 0.001;
      } catch {
        /* metadata not seekable yet */
      }
    };

    // In-app browsers (Instagram) can leave <video> blank until a frame is
    // decoded: try a muted play/pause so the sealed frame is ready before tap.
    const warm = () => {
      if (phaseRef.current !== "sealed" || warmedRef.current) return;
      warmedRef.current = true;
      paintFirstFrame();
      video
        .play()
        ?.then(() => {
          if (phaseRef.current !== "sealed") return;
          video.pause();
          paintFirstFrame();
        })
        .catch(paintFirstFrame);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) warm();
    else if (video.networkState === HTMLMediaElement.NETWORK_EMPTY)
      video.load();

    video.addEventListener("loadedmetadata", warm);
    video.addEventListener("loadeddata", warm);
    return () => {
      video.removeEventListener("loadedmetadata", warm);
      video.removeEventListener("loadeddata", warm);
    };
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    go("opening");
    try {
      video.currentTime = 0.001;
    } catch {
      /* play() still starts once the gesture unlocks the element */
    }
    video.play().catch(() => go("sealed"));
  };

  const hold = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      if (video.currentTime < hero.holdAt) video.currentTime = hero.holdAt;
    }
    setVideoOn(true);
    go("held");
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || phaseRef.current !== "opening") return;
    // Stop on the finished card, before the clip fades to black.
    if (video.currentTime >= hero.holdAt) hold();
  };

  const scrollOn = () => {
    coverRef.current?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={coverRef}
      className={styles.cover}
      aria-label={templateCopy(data.lang).and(couple.first, couple.second)}
      data-phase={phase}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={hero.video}
        poster={hero.poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlaying={() => {
          if (phaseRef.current !== "sealed") setVideoOn(true);
        }}
        onTimeUpdate={onTimeUpdate}
        onEnded={hold}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.poster}
        alt=""
        fetchPriority="high"
        className={styles.poster}
        data-hidden={videoOn ? "true" : "false"}
      />

      <div className={styles.frameBox}>
        {phase === "sealed" ? (
          <>
            <button
              type="button"
              className={styles.seal}
              onClick={play}
              aria-label={t.seal}
            ></button>
            <p className={styles.hint} aria-hidden="true">
              <span className={styles.hintScript}>{t.hint}</span>
              <span className={styles.hintSmall}>{t.hintSmall}</span>
            </p>
          </>
        ) : null}

        {phase === "opening" ? (
          <>
            <span className={styles.burst} aria-hidden="true">
              {SPARKS.map((spark, index) => (
                <i
                  key={index}
                  style={
                    {
                      "--a": `${spark.angle}deg`,
                      "--r": `${spark.distance}px`,
                      "--s": `${spark.size}px`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          </>
        ) : null}
      </div>

      {phase === "held" ? (
        <div className={styles.after}>
          <button
            type="button"
            className={styles.replay}
            onClick={play}
            aria-label={t.replay}
          >
            <ReplayIcon />
          </button>
          <button
            type="button"
            className={styles.scroll}
            onClick={scrollOn}
            aria-label={t.scroll}
          >
            <span>{t.discover}</span>
            <ScrollDownCompactIcon />
          </button>
        </div>
      ) : null}
    </section>
  );
}
