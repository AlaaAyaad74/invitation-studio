"use client";

import VideoCard from "@/components/videos/VideoCard";
import VideoModal from "@/components/videos/VideoModal";
import type { InvitationVideo } from "@/data/videos";
import { videoSharePath } from "@/lib/video-share";
import { useSearchParamOnLoad } from "@/hooks/useSearchParamOnLoad";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCallback, useMemo, useRef, useState } from "react";

/** Card caption height, as a share of the card width. */
const CAPTION_SHARE = 0.22;

/**
 * Deals cards into columns in list order, each into the shortest column,
 * so the newest films stay on the top row while heights stay balanced.
 */
function toColumns(videos: InvitationVideo[], count: number) {
  const columns = Array.from({ length: count }, () => [] as { video: InvitationVideo; index: number }[]);
  const heights = new Array<number>(count).fill(0);
  videos.forEach((video, index) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push({ video, index });
    heights[shortest] += 1 / video.aspect + CAPTION_SHARE;
  });
  return columns;
}

type VideosGalleryProps = {
  videos: InvitationVideo[];
  /** Open ?film= on load and keep it in step with the open film. */
  syncUrl?: boolean;
};

export default function VideosGallery({
  videos,
  syncUrl = false,
}: VideosGalleryProps) {
  const players = useRef(new Map<string, HTMLVideoElement>());
  const columnCount = useMediaQuery("(min-width: 1024px)") ? 3 : 2;
  const columns = useMemo(
    () => toColumns(videos, columnCount),
    [videos, columnCount],
  );
  // ?film= is read in the browser so the page itself stays static.
  const filmParam = useSearchParamOnLoad("film", syncUrl);
  const highlightId = videos.some((video) => video.id === filmParam)
    ? filmParam
    : null;
  // undefined = nothing picked yet, so fall back to the film in the URL.
  const [pickedId, setActiveId] = useState<string | null | undefined>();
  const activeId = pickedId === undefined ? highlightId : pickedId;
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
      {/* Masonry: each card keeps its film's shape; cards fill left to right. */}
      <div className="flex items-start gap-2 sm:gap-8">
        {columns.map((column, c) => (
          <div key={c} className="flex min-w-0 flex-1 flex-col">
            {column.map(({ video, index }) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                highlighted={video.id === highlightId}
                register={register}
                onPlay={handlePlay}
              />
            ))}
          </div>
        ))}
      </div>

      {active ? (
        <VideoModal
          key={active.id}
          video={active}
          onClose={close}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}
