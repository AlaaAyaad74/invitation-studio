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
import { useSearchParamOnLoad } from "@/hooks/useSearchParamOnLoad";
import { useCallback, useState } from "react";

type PhotosGalleryProps = {
  photos: InvitationPhoto[];
  showFilters?: boolean;
  syncUrl?: boolean;
};

export default function PhotosGallery({
  photos,
  showFilters = true,
  syncUrl = false,
}: PhotosGalleryProps) {
  const [filter, setFilter] = useState<PhotoFilterId>("all");
  // ?card= is read in the browser so the page itself stays static.
  const cardParam = useSearchParamOnLoad("card", syncUrl);
  // undefined = nothing picked yet, so fall back to the card in the URL.
  const [pickedId, setActiveId] = useState<string | null | undefined>();
  const activeId =
    pickedId === undefined ? (getPhotoById(cardParam)?.id ?? null) : pickedId;

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
        className={`mx-auto max-w-7xl columns-2 gap-3 sm:columns-3 space-y-4 py-4 ${showFilters ? "mt-6" : ""}`}
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
