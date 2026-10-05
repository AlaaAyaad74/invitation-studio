"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

type MusicPlayerProps = {
  src: string;
  label?: string;
};

export default function MusicPlayer({
  src,
  label = "Invitation music",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const unlock = (event: Event) => {
      const target = event.target;
      if (target instanceof Node && buttonRef.current?.contains(target)) return;
      if (!audio.paused) return;
      audio.play().catch(() => setPlaying(false));
    };

    const onPlay = () => {
      setPlaying(true);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    audio.play().catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
      return;
    }

    audio.pause();
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop autoPlay preload="auto" />
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
