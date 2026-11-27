"use client";

import { useEffect, useId, useRef } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useDialog } from "@/hooks/useDialog";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import { trackViewContent } from "@/lib/metaPixel";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { useLang } from "@/components/i18n/LangProvider";
import OrderButton from "@/components/OrderButton";
import { getPhotoSharePath, photoTitle, type InvitationPhoto } from "@/data/photos";

const COPY = {
  en: {
    close: "Close",
    previous: "Previous card",
    next: "Next card",
    alt: (title: string) => `${title} invitation photo`,
  },
  ar: {
    close: "اقفل",
    previous: "الكارت اللي قبله",
    next: "الكارت اللي بعده",
    alt: (title: string) => `صورة دعوة ${title}`,
  },
} as const;

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
  const lang = useLang();
  const t = COPY[lang];
  const title = photoTitle(photo, lang);
  const swipe = useHorizontalSwipe(onNext, onPrevious);
  // One ViewContent per photo shown (prev/next reuse this modal); the ref
  // keeps StrictMode's second effect run from firing it twice.
  const lastTrackedPhoto = useRef<string | null>(null);

  useEffect(() => {
    if (lastTrackedPhoto.current === photo.id) return;
    lastTrackedPhoto.current = photo.id;
    trackViewContent(photo.title, "invitation_photo");
  }, [photo.id, photo.title]);

  useDialog({
    Escape: onClose,
    ArrowLeft: onPrevious,
    ArrowRight: onNext,
  });

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
        {title}
      </h2>

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label={t.close}
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
        aria-label={t.previous}
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
        aria-label={t.next}
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:right-6 sm:h-12 sm:w-12 md:flex"
      >
        <LuChevronRight className="h-6 w-6" strokeWidth={2.4} />
      </button>

      {/* Photo and its order button; clicks here keep the modal open. */}
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <div
          className="flex max-h-[min(62svh,560px)] w-full max-w-sm items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <ImageWithSkeleton
            src={photo.image}
            alt={t.alt(title)}
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
        <OrderButton
          kind="photo"
          name={photo.title}
          path={getPhotoSharePath(photo.id)}
          withIcon
            className="shine-sweep inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium tracking-wide whitespace-nowrap text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-white sm:h-12 sm:px-6"
        />
      </div>
    </div>
  );
}
