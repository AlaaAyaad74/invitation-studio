"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { InvitationPhoto } from "@/data/photos";

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
    </div>
  );
}
