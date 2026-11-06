"use client";

import VideoCard from "@/components/videos/VideoCard";
import VideoModal from "@/components/videos/VideoModal";
import type { InvitationVideo } from "@/data/videos";
import { videoSharePath } from "@/lib/video-share";
import { useCallback, useRef, useState } from "react";

type VideosGalleryProps = {
  videos: InvitationVideo[];
  /** Film to open in the modal on first render (from ?film=). */
  initialFilmId?: string;
  /** Keep ?film= in the address bar in step with the open film. */
  syncUrl?: boolean;
};

export default function VideosGallery({
  videos,
  initialFilmId,
  syncUrl = false,
}: VideosGalleryProps) {
  const players = useRef(new Map<string, HTMLVideoElement>());
  const [activeId, setActiveId] = useState<string | null>(
    videos.some((video) => video.id === initialFilmId)
      ? (initialFilmId ?? null)
      : null,
  );
  const active = videos.find((video) => video.id === activeId) ?? null;

  const register = useCallback(
    (id: string, element: HTMLVideoElement | null) => {
      if (element) players.current.set(id, element);
      else players.current.delete(id);
    },
    [],
  );

  const handlePlay = useCallback((id: string) => {
    for (const [otherId, element] of players.current) {
      if (otherId !== id) element.pause();
    }
  }, []);

  const setFilm = useCallback(
    (id: string | null) => {
      // The modal plays on its own, so nothing in the grid keeps running.
      if (id) for (const element of players.current.values()) element.pause();
      setActiveId(id);
      if (!syncUrl) return;
      window.history.replaceState(null, "", id ? videoSharePath(id) : "/videos");
    },
    [syncUrl],
  );

  const close = useCallback(() => setFilm(null), [setFilm]);
  const step = useCallback(
    (by: number) => {
      if (videos.length === 0) return;
      const index = videos.findIndex((video) => video.id === activeId);
      const from = index < 0 ? 0 : index;
      setFilm(videos[(from + by + videos.length) % videos.length].id);
    },
    [activeId, setFilm, videos],
  );
  const showPrevious = useCallback(() => step(-1), [step]);
  const showNext = useCallback(() => step(1), [step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            highlighted={video.id === initialFilmId}
            register={register}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {active ? (
        <VideoModal
          video={active}
          onClose={close}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}
