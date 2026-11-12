"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import type { InvitationVideo } from "@/data/videos";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";

type VideoModalProps = {
  video: InvitationVideo;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const roundButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:h-12 sm:w-12";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.14-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export default function VideoModal({
  video,
  onClose,
  onPrevious,
  onNext,
}: VideoModalProps) {
  const titleId = useId();
  const playerRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const swipe = useHorizontalSwipe(onNext, onPrevious);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  // Try to start the film with sound. Browsers block that on a fresh page
  // load (no tap yet), so the film then waits on the play button. The
  // gallery keys this modal by film, so each film starts with fresh state.
  useEffect(() => {
    void playerRef.current?.play().catch(() => {});
  }, []);

  function toggle() {
    const node = playerRef.current;
    if (!node) return;
    if (node.paused || node.ended) void node.play().catch(() => {});
    else node.pause();
  }

  const stop = (action: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    action();
  };

  const seek = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const node = playerRef.current;
    if (!node || !Number.isFinite(node.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    node.currentTime = ratio * node.duration;
    setProgress(ratio);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-ink/80 p-4 backdrop-blur-md sm:p-8"
      style={{ touchAction: "pan-y" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
      onTouchStart={swipe.onTouchStart}
      onTouchEnd={swipe.onTouchEnd}
      onClickCapture={swipe.onClickCapture}
    >
      <h2 id={titleId} className="sr-only">
        {video.title}
      </h2>

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={stop(onClose)}
          aria-label="Close"
          className={roundButton}
        >
          <LuX className="h-6 w-6" strokeWidth={2.6} />
        </button>
      </div>

      <figure
        className="flex flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[9/16] h-[min(68svh,700px)] max-w-full overflow-hidden rounded-2xl bg-ink">
          <video
            ref={playerRef}
            src={video.src}
            playsInline
            preload="auto"
            aria-label={video.title}
            onClick={toggle}
            onLoadedData={() => setReady(true)}
            onPlay={() => setPlaying(true)}
            onPlaying={() => setWaiting(false)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onWaiting={() => setWaiting(true)}
            onCanPlay={() => setWaiting(false)}
            onTimeUpdate={(event) => {
              const node = event.currentTarget;
              if (node.duration) setProgress(node.currentTime / node.duration);
            }}
            className={`h-full w-full cursor-pointer object-contain transition-opacity duration-500 ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />

          {ready ? null : (
            <div aria-hidden className="image-skeleton absolute inset-0" />
          )}

          {/* Small, quiet loader while buffering — never on top of the play button. */}
          {ready && waiting && playing ? (
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-3 h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          ) : null}

          {/* The play icon only shows while the film is paused. */}
          {playing ? null : (
            <button
              type="button"
              onClick={toggle}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center bg-ink/15"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/80 text-white shadow-[0_12px_24px_-10px_rgba(0,0,0,0.8)] transition hover:scale-105">
                <PlayIcon />
              </span>
            </button>
          )}

          <div
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={-1}
            onPointerDown={seek}
            className="absolute inset-x-0 bottom-0 h-5 cursor-pointer"
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
              <div
                className="h-full bg-gold"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <figcaption className="mt-3 text-center">
          <p className="text-xs tracking-[0.2em] text-ivory/70 uppercase">
            Film
          </p>
          <p className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl">
            {video.title}
          </p>
        </figcaption>
      </figure>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={stop(onPrevious)}
          aria-label="Previous film"
          className={roundButton}
        >
          <LuChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={stop(onNext)}
          aria-label="Next film"
          className={roundButton}
        >
          <LuChevronRight className="h-6 w-6" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
