"use client";

import LazyPhotoCard from "@/components/photos/LazyPhotoCard";
import PhotoModal from "@/components/photos/PhotoModal";
import PhotosFilters from "@/components/photos/PhotosFilters";
import {
  filterPhotos,
  getPhotoById,
  getPhotoSharePath,
  type InvitationPhoto,
  type PhotoFilterId,
} from "@/data/photos";
import { useCallback, useState } from "react";

type PhotosGalleryProps = {
  photos: InvitationPhoto[];
  showFilters?: boolean;
  initialCardId?: string;
  syncUrl?: boolean;
};

export default function PhotosGallery({
  photos,
  showFilters = true,
  initialCardId,
  syncUrl = false,
}: PhotosGalleryProps) {
  const [filter, setFilter] = useState<PhotoFilterId>("all");
  const [activeId, setActiveId] = useState<string | null>(
    getPhotoById(initialCardId)?.id ?? null,
  );

  const visible = showFilters ? filterPhotos(photos, filter) : photos;
  const active = getPhotoById(activeId) ?? null;

  const setCard = useCallback(
    (id: string | null) => {
      setActiveId(id);
      if (!syncUrl) return;
      window.history.replaceState(
        null,
        "",
        id ? getPhotoSharePath(id) : "/photos",
      );
    },
    [syncUrl],
  );

  const close = useCallback(() => setCard(null), [setCard]);
  const showPrevious = useCallback(() => {
    if (visible.length === 0 || !activeId) return;
    const index = visible.findIndex((photo) => photo.id === activeId);
    const from = index < 0 ? 0 : index;
    setCard(visible[(from - 1 + visible.length) % visible.length].id);
  }, [activeId, setCard, visible]);
  const showNext = useCallback(() => {
    if (visible.length === 0) return;
    const index = visible.findIndex((photo) => photo.id === activeId);
    const from = index < 0 ? -1 : index;
    setCard(visible[(from + 1) % visible.length].id);
  }, [activeId, setCard, visible]);

  return (
    <>
      {showFilters ? (
        <PhotosFilters value={filter} onChange={setFilter} />
      ) : null}

      <div
        className={`photo-grid mx-auto max-w-7xl gap-3 space-y-4 py-4 ${showFilters ? "mt-6" : ""}`}
      >
        {visible.map((photo, index) => (
          <LazyPhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            onClick={() => setCard(photo.id)}
          />
        ))}
      </div>

      {active ? (
        <PhotoModal
          photo={active}
          onClose={close}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
    </>
  );
}
