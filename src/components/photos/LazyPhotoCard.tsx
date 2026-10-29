"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import ShareModal from "@/components/ShareModal";
import { getPhotoSharePath, type InvitationPhoto } from "@/data/photos";
import { LuShare2 } from "react-icons/lu";

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[2/3]",
  "aspect-[3/5]",
] as const;

type LazyPhotoCardProps = {
  photo: InvitationPhoto;
  onClick: () => void;
  index?: number;
};

export default function LazyPhotoCard({
  photo,
  onClick,
  index = 0,
}: LazyPhotoCardProps) {
  const [shouldLoad, setShouldLoad] = useState(index < 6);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const aspect = ASPECTS[index % ASPECTS.length];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "120px" },
    );

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.revealed = "true";
        revealObserver.unobserve(node);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    loadObserver.observe(node);
    revealObserver.observe(node);
    return () => {
      loadObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="photo-reveal relative mb-3 w-full cursor-zoom-in break-inside-avoid overflow-hidden bg-ivory-deep"
      style={
        {
          "--reveal-delay": `${(index % 4) * 80}ms`,
        } as CSSProperties
      }
      onClick={onClick}
    >
      {isLoaded ? null : (
        <div aria-hidden className={`image-skeleton w-full ${aspect}`} />
      )}
      {shouldLoad ? (
        <Image
          src={photo.image}
          alt={`${photo.title} invitation photo`}
          width={900}
          height={1200}
          sizes="33vw"
          className={`w-full object-cover transition duration-300 hover:scale-105 ${
            isLoaded
              ? "relative h-auto opacity-100"
              : "absolute inset-0 h-full opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
      <button
        type="button"
        aria-label={`Share ${photo.title}`}
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
        }}
        className="absolute z-10 inline-flex items-center justify-center rounded-full text-ink shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)]"
      >
        <LuShare2 className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {shareOpen
        ? createPortal(
            <ShareModal
              title={photo.title}
              path={getPhotoSharePath(photo.id)}
              message={`${photo.title} invitation photo`}
              onClose={() => setShareOpen(false)}
            />,
            document.body,
          )
        : null}
    </div>
  );
}
