"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import ShareButton from "@/components/ShareButton";
import { getPhotoSharePath, type InvitationPhoto } from "@/data/photos";

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
      className="photo-reveal relative mb-2 sm:mb-3 w-full cursor-zoom-in break-inside-avoid overflow-hidden bg-ivory-deep"
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
          sizes="(min-width: 640px) 33vw, 50vw"
          // First row is on screen at load: fetch it right away.
          loading={index < 4 ? "eager" : "lazy"}
          fetchPriority={index < 2 ? "high" : "auto"}
          className={`w-full object-cover transition duration-300 hover:scale-105 ${
            isLoaded
              ? "relative h-auto opacity-100"
              : "absolute inset-0 h-full opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
      {photo.isNew ? (
        <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 bg-rose px-2 py-1 text-[10px] tracking-[0.16em] text-white uppercase shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)]">
          New
        </span>
      ) : null}
      <ShareButton
        title={photo.title}
        path={getPhotoSharePath(photo.id)}
        message={`${photo.title} invitation photo`}
      />
    </div>
  );
}
