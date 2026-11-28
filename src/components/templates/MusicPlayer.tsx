"use client";

import RoundPauseIcon from "@/components/icons/RoundPauseIcon";
import RoundPlayIcon from "@/components/icons/RoundPlayIcon";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/i18n/LangProvider";
import type { Lang } from "@/lib/i18n";

const styles = {
  control: [
    "group fixed right-[1.15rem] bottom-[max(1.15rem,env(safe-area-inset-bottom))] z-[90] grid h-12 w-12 cursor-pointer place-items-center rounded-full",
    "border border-[color-mix(in_srgb,var(--gold)_65%,transparent)] bg-[color-mix(in_srgb,#f6f0e6_90%,transparent)] text-(--ink)",
    "shadow-[0_12px_28px_-16px_rgba(42,38,35,0.6)] backdrop-blur-[8px] [transition:background_200ms_ease,color_200ms_ease]",
    "hover:bg-(--ink) hover:text-(--white) focus-visible:bg-(--ink) focus-visible:text-(--white) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--ink)",
  ].join(" "),
  glyph: "relative block h-[1.55rem] w-[1.55rem]",
  // The two icons cross-fade: the inactive one shrinks and tilts away.
  icon: [
    "absolute inset-0 m-0 block h-[1.55rem] w-[1.55rem] fill-black opacity-0 [transform:scale(0.72)_rotate(-12deg)]",
    "[transition:opacity_280ms_ease,transform_320ms_cubic-bezier(0.22,1,0.36,1),fill_200ms_ease] motion-reduce:[transition:none]",
    "data-[active=true]:opacity-100 data-[active=true]:[transform:scale(1)_rotate(0deg)]",
    "group-hover:fill-(--white) group-focus-visible:fill-(--white)",
  ].join(" "),
};

type MusicPlayerProps = {
  src: string;
  label?: string;
  /** The invitation's own language, when it can differ from the site's. */
  lang?: Lang;
};

// Phones grant permission to play sound on the end of a tap (pointerup /
// touchend / click), not on its start; listen to both so any tap counts.
const GESTURE_EVENTS = [
  "pointerdown",
  "pointerup",
  "mousedown",
  "touchstart",
  "touchend",
  "click",
  "keydown",
] as const;

const SCROLL_EVENTS = ["scroll", "wheel"] as const;

export default function MusicPlayer({ src, label, lang }: MusicPlayerProps) {
  const siteLang = useLang();
  const ar = (lang ?? siteLang) === "ar";
  const name = label ?? (ar ? "موسيقى الدعوة" : "Invitation music");
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
      // No "already trying" lock: phones only accept play() from the end of a
      // tap (touchend / click), and a lock set by the earlier touchstart
      // attempt would make us skip exactly that event.
      if (ignore || userPaused.current) return;
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
        // Blocked: buffer the track for the first tap, but only once. A
        // second load() would cancel a play() that a tap just started.
        if (
          audio.readyState === HTMLMediaElement.HAVE_NOTHING &&
          audio.networkState !== HTMLMediaElement.NETWORK_LOADING
        ) {
          audio.load();
        }
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
      // With preload="none" nothing fires "canplay" on its own. Try once now:
      // if autoplay is blocked, tryAuto calls load(), so the track is already
      // buffered when the guest's first tap or scroll calls play(). Before,
      // this only happened if "pageshow" fired after hydration, which it
      // often doesn't on slower pages.
      tryAuto();
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
        // Fetch the track only when playback starts, not with the page.
        preload="none"
        playsInline
      />
      <button
        ref={buttonRef}
        type="button"
        className={styles.control}
        onClick={toggle}
        aria-label={
          ar
            ? `${playing ? "وقّف" : "شغّل"} ${name}`
            : `${playing ? "Pause" : "Play"} ${name}`
        }
        aria-pressed={playing}
      >
        <span className={styles.glyph}>
          <RoundPlayIcon className={styles.icon} data-active={!playing ? "true" : "false"} />
          <RoundPauseIcon className={styles.icon} data-active={playing ? "true" : "false"} />
        </span>
      </button>
    </>
  );
}
