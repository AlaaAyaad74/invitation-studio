"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { LuShare2 } from "react-icons/lu";
import ShareModal from "@/components/ShareModal";
import type { InvitationVideo } from "@/data/videos";

type VideoCardProps = {
  video: InvitationVideo;
  index?: number;
  highlighted?: boolean;
  register: (id: string, element: HTMLVideoElement | null) => void;
  onPlay: (id: string) => void;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.14-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function videoSharePath(id: string) {
  return `/videos?film=${encodeURIComponent(id)}`;
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 5h3.5v14H6.5zM14 5h3.5v14H14z" />
    </svg>
  );
}

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
  const [shareOpen, setShareOpen] = useState(false);

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
      className="video-card photo-reveal"
      style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as CSSProperties}
    >
      <div className="video-frame">
        {shouldLoad ? (
          <video
            ref={setVideoNode}
            style={{ opacity: ready ? 1 : 0 }}
            src={`${video.src}#t=0.001`}
            playsInline
            preload="metadata"
            aria-label={video.title}
            onLoadedData={() => {
              const node = videoRef.current;
              if (node) revealFrame(node);
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
            onEnded={() => setPlaying(false)}
          />
        ) : null}
        {ready ? null : <div aria-hidden className="image-skeleton" />}
        {playing ? (
          <button
            type="button"
            aria-label={`Pause ${video.title}`}
            onClick={pause}
            className="video-play video-play-pause"
          >
            <span className="video-play-icon">
              <PauseIcon />
            </span>
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Play ${video.title}`}
            onClick={play}
            className="video-play"
          >
            <span className="video-play-icon">
              <PlayIcon />
            </span>
          </button>
        )}
        <button
          type="button"
          aria-label={`Share ${video.title}`}
          aria-haspopup="dialog"
          aria-expanded={shareOpen}
          onClick={(event) => {
            event.stopPropagation();
            setShareOpen(true);
          }}
          style={{
            top: 10,
            right: 10,
            width: 36,
            height: 36,
            backgroundColor: "#fff",
            cursor: "pointer",
            zIndex: 20,
          }}
          className="absolute inline-flex items-center justify-center rounded-full text-ink shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)]"
        >
          <LuShare2 className="h-4 w-4" strokeWidth={2.2} />
        </button>
        {shareOpen
          ? createPortal(
              <ShareModal
                title={video.title}
                path={videoSharePath(video.id)}
                message={`${video.title} invitation film`}
                onClose={() => setShareOpen(false)}
              />,
              document.body,
            )
          : null}
      </div>
      <figcaption>
        <p className="text-sm tracking-[0.2em] text-rose uppercase">Film</p>
        <p className="mt-1 font-display text-lg leading-tight text-ink sm:text-2xl">{video.title}</p>
      </figcaption>
    </figure>
  );
}
