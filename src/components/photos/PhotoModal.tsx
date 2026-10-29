"use client";

import { useEffect, useId } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import type { InvitationPhoto } from "@/data/photos";

type PhotoModalProps = {
  photo: InvitationPhoto;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PhotoModal({
  photo,
  onClose,
  onPrevious,
  onNext,
}: PhotoModalProps) {
  const titleId = useId();
  const swipe = useHorizontalSwipe(onNext, onPrevious);

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

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md sm:p-8"
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
        {photo.title}
      </h2>

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory"
        >
          <LuX className="h-6 w-6" strokeWidth={2.6} />
        </button>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous card"
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:left-6 sm:h-12 sm:w-12 md:flex"
      >
        <LuChevronLeft className="h-6 w-6" strokeWidth={2.4} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next card"
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:right-6 sm:h-12 sm:w-12 md:flex"
      >
        <LuChevronRight className="h-6 w-6" strokeWidth={2.4} />
      </button>

      <div
        className="flex max-h-[min(62svh,560px)] w-full max-w-sm items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <ImageWithSkeleton
          src={photo.image}
          alt={`${photo.title} invitation photo`}
          width={900}
          height={1200}
          sizes="(max-width: 768px) 80vw, 384px"
          className="rounded-2xl object-contain"
          wrapperClassName="flex max-h-[min(62svh,560px)] items-center justify-center"
          skeletonClassName="rounded-2xl min-h-[min(40svh,360px)]"
          style={{
            width: "auto",
            height: "auto",
            maxHeight: "min(62svh, 560px)",
            maxWidth: "100%",
          }}
          priority
        />
      </div>
    </div>
  );
}
