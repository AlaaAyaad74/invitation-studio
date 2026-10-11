"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

type MusicPlayerProps = {
  src: string;
  label?: string;
};

const GESTURE_EVENTS = [
  "pointerdown",
  "mousedown",
  "touchstart",
  "touchend",
  "click",
  "keydown",
] as const;

const SCROLL_EVENTS = ["scroll", "wheel"] as const;

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

    let ignore = false;
    let started = false;
    let userTried = false;

    const markPlaying = () => {
      if (ignore || audio.paused) return;
      started = true;
      setPlaying(true);
    };

    const playFromUser = () => {
      if (ignore || userPaused.current || userTried) return;
      if (!audio.paused) {
        markPlaying();
        return;
      }
      userTried = true;
      audio.play().then(
        () => {
          if (!audio.paused) markPlaying();
          else userTried = false;
        },
        () => {
          userTried = false;
          if (!ignore && audio.paused) setPlaying(false);
        },
      );
    };

    const tryAuto = () => {
      if (ignore || userPaused.current || started || userTried || !audio.paused) return;
      audio.play().then(markPlaying, () => {
        if (ignore || started || userTried || !audio.paused) return;
        audio.load();
      });
    };

    const unlock = (event: Event) => {
      const target = event.target;
      if (target instanceof Node && buttonRef.current?.contains(target)) return;
      playFromUser();
    };

    const onPlaying = () => {
      if (ignore || userPaused.current) return;
      started = true;
      setPlaying(true);
    };

    const onPause = () => {
      if (!ignore) setPlaying(false);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") tryAuto();
    };

    const startIfStillPaused = () => {
      if (!audio.paused) markPlaying();
      else tryAuto();
    };

    let scrollTried = false;
    const onScroll = () => {
      if (scrollTried) return;
      scrollTried = true;
      playFromUser();
    };

    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", tryAuto);
    document.addEventListener("WeixinJSBridgeReady", tryAuto);

    const scrollTargets: EventTarget[] = [window, document];
    if (document.documentElement) scrollTargets.push(document.documentElement);
    if (document.body) scrollTargets.push(document.body);
    if (document.scrollingElement) scrollTargets.push(document.scrollingElement);

    for (const eventName of GESTURE_EVENTS) {
      document.addEventListener(eventName, unlock, {
        capture: true,
        passive: true,
      });
    }

    for (const target of scrollTargets) {
      for (const eventName of SCROLL_EVENTS) {
        target.addEventListener(eventName, onScroll, {
          capture: true,
          passive: true,
        });
      }
    }

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startIfStillPaused();
    } else {
      audio.addEventListener("canplay", startIfStillPaused, { once: true });
    }

    return () => {
      ignore = true;
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", startIfStillPaused);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", tryAuto);
      document.removeEventListener("WeixinJSBridgeReady", tryAuto);
      for (const eventName of GESTURE_EVENTS) {
        document.removeEventListener(eventName, unlock, true);
      }

      for (const target of scrollTargets) {
        for (const eventName of SCROLL_EVENTS) {
          target.removeEventListener(eventName, onScroll, true);
        }
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
