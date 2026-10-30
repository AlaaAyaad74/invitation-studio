"use client";

import VideoCard from "@/components/videos/VideoCard";
import type { InvitationVideo } from "@/data/videos";
import { useCallback, useRef } from "react";

type VideosGalleryProps = {
  videos: InvitationVideo[];
  highlightId?: string;
};

export default function VideosGallery({ videos, highlightId }: VideosGalleryProps) {
  const players = useRef(new Map<string, HTMLVideoElement>());

  const register = useCallback((id: string, element: HTMLVideoElement | null) => {
    if (element) players.current.set(id, element);
    else players.current.delete(id);
  }, []);

  const handlePlay = useCallback((id: string) => {
    for (const [otherId, element] of players.current) {
      if (otherId !== id) element.pause();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
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
  );
}
