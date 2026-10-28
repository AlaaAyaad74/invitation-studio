"use client";

import { useCallback, useEffect, useId, useState } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuShare2,
  LuX,
} from "react-icons/lu";
import { getPhotoSharePath, type InvitationPhoto } from "@/data/photos";

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
  const [copied, setCopied] = useState(false);

  const copyShareLink = useCallback(async () => {
    const shareUrl = `${window.location.origin}${getPhotoSharePath(photo.id)}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        copyWithTextarea(shareUrl);
      }
    } catch {
      try {
        copyWithTextarea(shareUrl);
      } catch {
        return;
      }
    }

    setCopied(true);
  }, [photo.id]);

  useEffect(() => {
    setCopied(false);
  }, [photo.id]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

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
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <h2 id={titleId} className="sr-only">
        {photo.title}
      </h2>

      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            void copyShareLink();
          }}
          aria-label={copied ? "Card link copied" : "Copy link to this card"}
          className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-medium shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition ${
            copied
              ? "bg-sage-deep text-white"
              : "bg-white text-ink hover:bg-ivory"
          }`}
        >
          {copied ? (
            <LuCheck className="h-5 w-5" strokeWidth={2.4} />
          ) : (
            <LuShare2 className="h-5 w-5" strokeWidth={2.4} />
          )}
          {copied ? "Copied" : "Share"}
        </button>
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
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:left-6 sm:h-12 sm:w-12"
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
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:right-6 sm:h-12 sm:w-12"
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

      <p className="sr-only" aria-live="polite">
        {copied ? "Card link copied" : ""}
      </p>
    </div>
  );
}

function copyWithTextarea(text: string) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Could not copy");
}
