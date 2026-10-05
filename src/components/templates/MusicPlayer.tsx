"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

type MusicPlayerProps = {
  src: string;
  label?: string;
};

const UNLOCK_EVENTS = ["touchend", "click", "keydown"] as const;

export default function MusicPlayer({
  src,
  label = "Invitation music",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let starting = false;

    const tryPlay = () => {
      if (userPaused.current || !audio.paused || starting) return;
      starting = true;
      audio.play().then(
        () => {
          starting = false;
          if (!audio.paused) setPlaying(true);
        },
        () => {
          starting = false;
          setPlaying(false);
        },
      );
    };

    const unlock = (event: Event) => {
      const target = event.target;
      if (target instanceof Node && buttonRef.current?.contains(target)) return;
      tryPlay();
    };

    const onPlaying = () => {
      if (!userPaused.current) setPlaying(true);
    };

    const onPause = () => setPlaying(false);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", tryPlay);
    document.addEventListener("WeixinJSBridgeReady", tryPlay);

    for (const eventName of UNLOCK_EVENTS) {
      window.addEventListener(eventName, unlock, true);
    }

    tryPlay();

    return () => {
      audio.pause();
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", tryPlay);
      document.removeEventListener("WeixinJSBridgeReady", tryPlay);
      for (const eventName of UNLOCK_EVENTS) {
        window.removeEventListener(eventName, unlock, true);
      }
    };
  }, [src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPaused.current = false;
      audio.play().catch(() => setPlaying(false));
      return;
    }

    userPaused.current = true;
    audio.pause();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        autoPlay
        preload="auto"
        playsInline
      />
      <button
        ref={buttonRef}
        type="button"
        className={styles.control}
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        aria-pressed={playing}
      >
        <span className={styles.glyph}>
          <PlayIcon active={!playing} />
          <PauseIcon active={playing} />
        </span>
      </button>
    </>
  );
}

function PlayIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={styles.icon}
      data-active={active ? "true" : "false"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}

function PauseIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={styles.icon}
      data-active={active ? "true" : "false"}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="14" y="3" width="5" height="18" rx="1" />
      <rect x="5" y="3" width="5" height="18" rx="1" />
    </svg>
  );
}
