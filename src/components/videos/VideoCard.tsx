"use client";

import PauseIcon from "@/app/common/icons/PauseIcon";
import PlayIcon from "@/app/common/icons/PlayIcon";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import ShareButton from "@/components/ShareButton";
import type { InvitationVideo } from "@/data/videos";
import { videoSharePath } from "@/lib/video-share";

type VideoCardProps = {
  video: InvitationVideo;
  index?: number;
  highlighted?: boolean;
  register: (id: string, element: HTMLVideoElement | null) => void;
  onPlay: (id: string) => void;
};

const styles = {
  card: "photo-reveal mb-2 border border-ink/10 bg-[#fff] p-0 shadow-[0_22px_50px_-30px_color-mix(in_srgb,var(--ink)_70%,transparent)] sm:mb-8",
  frame: "relative overflow-hidden bg-ivory-deep",
  video: "video-no-controls absolute inset-0 h-full w-full bg-ink object-cover",
  skeleton: "image-skeleton absolute inset-0 h-full w-full",
  poster: "absolute inset-0 h-full w-full object-cover",
  play: "group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-ink/18",
  pause: "group absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent",
  icon: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-ink/82 text-[#fff] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-[ease] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-none [&_svg]:h-[0.9rem] [&_svg]:w-[0.9rem] [&_svg]:fill-current",
  // Only real hover shows the pause icon: a tap on a phone leaves :hover
  // stuck, which kept the icon on top of a playing film.
  pauseIcon: "opacity-0 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 [&_svg]:ml-0",
  caption: "px-[0.6rem] pt-[0.55rem] pb-[0.7rem] sm:px-4 sm:pt-[0.9rem] sm:pb-4",
};

export default function VideoCard({
  video,
  index = 0,
  highlighted = false,
  register,
  onPlay,
}: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pendingPlay = useRef(false);
  const userStarted = useRef(false);
  const warming = useRef(false);
  const framed = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(index < 3 || highlighted);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Poster stays over the film until playback actually begins.
  const [started, setStarted] = useState(false);

  const setVideoNode = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      register(video.id, node);
      if (node && node.readyState >= HTMLMediaElement.HAVE_METADATA) {
        setReady(true);
      }
      if (node && pendingPlay.current) {
        pendingPlay.current = false;
        void node.play();
      }
    },
    [register, video.id],
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "240px" },
    );

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.dataset.revealed = "true";
        revealObserver.unobserve(node);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    if (!shouldLoad) loadObserver.observe(node);
    revealObserver.observe(node);
    if (highlighted) node.scrollIntoView({ block: "center" });

    return () => {
      loadObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [highlighted, shouldLoad]);

  const revealFrame = (node: HTMLVideoElement) => {
    if (framed.current || warming.current || pendingPlay.current || !node.paused) return;
    warming.current = true;
    node.muted = true;

    const finish = () => {
      if (userStarted.current) {
        warming.current = false;
        framed.current = true;
        setReady(true);
        return;
      }
      node.pause();
      node.muted = false;
      framed.current = true;
      warming.current = false;
      setReady(true);
    };

    const seekToPicture = () => {
      if (userStarted.current) {
        finish();
        return;
      }
      const target = Number.isFinite(node.duration)
        ? Math.min(0.35, Math.max(0.12, node.duration * 0.02))
        : 0.2;
      let timeout = 0;
      const onSeeked = () => {
        window.clearTimeout(timeout);
        node.removeEventListener("seeked", onSeeked);
        finish();
      };
      timeout = window.setTimeout(() => {
        node.removeEventListener("seeked", onSeeked);
        finish();
      }, 800);
      node.addEventListener("seeked", onSeeked);
      try {
        node.currentTime = target;
      } catch {
        window.clearTimeout(timeout);
        node.removeEventListener("seeked", onSeeked);
        finish();
      }
    };

    const attempt = node.play();
    if (!attempt) {
      seekToPicture();
      return;
    }
    attempt.then(seekToPicture).catch(() => {
      try {
        node.currentTime = 0.2;
      } catch {
        /* the play button still starts the film */
      }
      node.muted = false;
      warming.current = false;
      framed.current = true;
      setReady(true);
    });
  };

  const play = () => {
    userStarted.current = true;
    const node = videoRef.current;
    if (!node) {
      pendingPlay.current = true;
      setShouldLoad(true);
      return;
    }
    node.muted = false;
    void node.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  return (
    <figure
      ref={containerRef}
      className={styles.card}
      style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as CSSProperties}
    >
      <div className={styles.frame} style={{ aspectRatio: video.aspect }}>
        {shouldLoad ? (
          <video
            ref={setVideoNode}
            className={styles.video}
            style={{ opacity: ready ? 1 : 0 }}
            src={`${video.src}#t=0.001`}
            playsInline
            // With a poster the card needs no frame, so nothing downloads until play.
            preload={video.poster ? "none" : "metadata"}
            aria-label={video.title}
            onLoadedData={() => {
              const node = videoRef.current;
              if (node && !video.poster) revealFrame(node);
              else setReady(true);
            }}
            onPlay={() => {
              if (warming.current) return;
              setPlaying(true);
              onPlay(video.id);
            }}
            onPause={() => {
              if (warming.current) return;
              setPlaying(false);
            }}
            onPlaying={() => {
              if (!warming.current) setStarted(true);
            }}
            onEnded={() => setPlaying(false)}
          />
        ) : null}
        {ready ? null : <div aria-hidden className={styles.skeleton} />}
        {video.poster && !started ? (
          // eslint-disable-next-line @next/next/no-img-element -- small pre-sized still; next/image adds nothing here
          <img
            src={video.poster}
            alt=""
            aria-hidden
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className={styles.poster}
          />
        ) : null}
        {playing ? (
          <button
            type="button"
            aria-label={`Pause ${video.title}`}
            onClick={pause}
            className={styles.pause}
          >
            <span className={`${styles.icon} ${styles.pauseIcon}`}>
              <PauseIcon />
            </span>
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Play ${video.title}`}
            onClick={play}
            className={styles.play}
          >
            <span className={styles.icon}>
              <PlayIcon />
            </span>
          </button>
        )}
        <ShareButton
          title={video.title}
          path={videoSharePath(video.id)}
          message={`${video.title} invitation film`}
          zIndex={20}
        />
      </div>
      <figcaption className={styles.caption}>
        <p className="text-sm tracking-[0.2em] text-rose uppercase">Film</p>
        <p className="mt-1 font-display text-lg leading-tight text-ink sm:text-2xl">{video.title}</p>
      </figcaption>
    </figure>
  );
}
