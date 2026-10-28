"use client";

import { photoFilters, type PhotoFilterId } from "@/data/photos";

type PhotosFiltersProps = {
  value: PhotoFilterId;
  onChange: (value: PhotoFilterId) => void;
};

export default function PhotosFilters({ value, onChange }: PhotosFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter invitation photos"
    >
      {photoFilters.map((item) => {
        const selected = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item.id)}
            className={`px-4 py-2 text-sm tracking-wide transition ${
              selected
                ? "bg-sage-deep text-white"
                : "bg-white text-ink-muted hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
