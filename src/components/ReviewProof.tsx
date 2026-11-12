"use client";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import type { ReviewShot } from "@/data/reviews";
import { useDialog } from "@/hooks/useDialog";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LuX, LuZoomIn } from "react-icons/lu";

type ReviewProofProps = {
  couple: string;
  shots: ReviewShot[];
};

/** The original message screenshots; tap to read them full size. */
export default function ReviewProof({ couple, shots }: ReviewProofProps) {
  const [open, setOpen] = useState(false);

  useDialog({ Escape: () => setOpen(false) }, open);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Read the original message from ${couple}`}
        className="group/proof relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-ivory-deep bg-ivory text-left"
      >
        <span className="block max-h-40 space-y-1 overflow-hidden">
          {shots.map((shot) => (
            <ImageWithSkeleton
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 640px) 85vw, 360px"
              className="h-auto w-full"
              style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
            />
          ))}
        </span>
        {/* Fade the bottom so taller screenshots read as "more inside". */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/95 to-transparent" />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] tracking-wide text-ink shadow-[0_6px_14px_-8px_rgba(0,0,0,0.5)] transition group-hover/proof:bg-white">
          <LuZoomIn className="h-3.5 w-3.5" strokeWidth={2.2} />
          View message
        </span>
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Message from ${couple}`}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md sm:p-8"
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-ivory sm:right-6 sm:top-6"
              >
                <LuX className="h-6 w-6" strokeWidth={2.6} />
              </button>
              <div
                className="max-h-[85svh] w-full max-w-xl space-y-3 overflow-y-auto"
                onClick={(event) => event.stopPropagation()}
              >
                {shots.map((shot) => (
                  <ImageWithSkeleton
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 92vw, 576px"
                    className="h-auto w-full"
                    wrapperClassName="overflow-hidden rounded-2xl"
                    style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                  />
                ))}
                <p className="pt-1 text-center font-display text-2xl text-white">
                  {couple}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
