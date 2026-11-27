"use client";

import { useEffect, useId, useRef, type MouseEvent } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { useLang } from "@/components/i18n/LangProvider";
import type { InvitationVideo } from "@/data/videos";

const COPY = {
  en: { close: "Close", previous: "Previous film", next: "Next film", film: "Film" },
  ar: { close: "اقفل", previous: "الفيديو اللي قبله", next: "الفيديو اللي بعده", film: "فيديو" },
} as const;

type VideoModalProps = {
  video: InvitationVideo;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const roundButton =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:h-12 sm:w-12";

export default function VideoModal({
  video,
  onClose,
  onPrevious,
  onNext,
}: VideoModalProps) {
  const titleId = useId();
  const playerRef = useRef<HTMLVideoElement>(null);
  const lang = useLang();
  const t = COPY[lang];
  const title = lang === "ar" ? video.titleAr : video.title;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  // Start the film with sound. Browsers block that on a fresh page load
  // (no tap yet), so the film then waits on its own play control.
  useEffect(() => {
    void playerRef.current?.play().catch(() => {});
  }, [video.id]);

  const stop = (action: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    action();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-ink/80 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <h2 id={titleId} className="sr-only">
        {title}
      </h2>

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={stop(onClose)}
          aria-label={t.close}
          className={roundButton}
        >
          <LuX className="h-6 w-6" strokeWidth={2.6} />
        </button>
      </div>

      <button
        type="button"
        onClick={stop(onPrevious)}
        aria-label={t.previous}
        className={`${roundButton} absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:inline-flex`}
      >
        <LuChevronLeft className="h-6 w-6" strokeWidth={2.4} />
      </button>

      <button
        type="button"
        onClick={stop(onNext)}
        aria-label={t.next}
        className={`${roundButton} absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:inline-flex`}
      >
        <LuChevronRight className="h-6 w-6" strokeWidth={2.4} />
      </button>

      <figure
        className="flex flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <video
          key={video.id}
          ref={playerRef}
          src={video.src}
          controls
          playsInline
          preload="auto"
          aria-label={title}
          className="aspect-[9/16] h-[min(72svh,720px)] w-auto max-w-full rounded-2xl bg-ink object-contain"
        />
        <figcaption className="mt-3 text-center">
          <p className="text-xs tracking-[0.2em] text-ivory/70 uppercase">
            {t.film}
          </p>
          <p className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl">
            {title}
          </p>
        </figcaption>
      </figure>

      {/* On phones the arrows sit under the film, clear of its controls. */}
      <div className="flex gap-4 md:hidden" dir="ltr">
        <button
          type="button"
          onClick={stop(onPrevious)}
          aria-label={t.previous}
          className={roundButton}
        >
          <LuChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={stop(onNext)}
          aria-label={t.next}
          className={roundButton}
        >
          <LuChevronRight className="h-6 w-6" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
