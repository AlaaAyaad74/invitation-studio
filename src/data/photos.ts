export type PhotoKind = "wedding" | "engagement";
export type PhotoSpan = "normal" | "tall" | "wide" | "hero";

export type InvitationPhoto = {
  id: string;
  title: string;
  style: string;
  description: string;
  image: string;
  kind: PhotoKind;
  arabic: boolean;
  span: PhotoSpan;
};

export const photos: InvitationPhoto[] = [
  {
    id: "khutubah-garden",
    title: "Khutubah Garden",
    style: "Engagement",
    description: "A garden aisle and arch for a khutubah announcement.",
    image: "/photos/khutubah-garden.webp",
    kind: "engagement",
    arabic: true,
    span: "tall",
  },
  {
    id: "sage-bouquet",
    title: "Sage Bouquet",
    style: "Garden",
    description: "White blossoms and a tied bouquet on a sage wash.",
    image: "/photos/sage-bouquet.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "ivory-arch",
    title: "Ivory Arch",
    style: "Classic",
    description: "An arched gold frame with ivory magnolias and airy type.",
    image: "/photos/ivory-arch.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "vintage-rose",
    title: "Vintage Rose",
    style: "Traditional",
    description: "Dusty roses and a bilingual blessing for a wedding day.",
    image: "/photos/vintage-rose.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "terracotta-hibiscus",
    title: "Terracotta Hibiscus",
    style: "Heritage",
    description: "A terracotta arch and hibiscus for a save-the-date.",
    image: "/photos/terracotta-hibiscus.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "nikkah-gazebo",
    title: "Nikkah Gazebo",
    style: "Traditional",
    description: "A couple illustration and floral gazebo for a nikkah day.",
    image: "/photos/nikkah-gazebo.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "walima-crimson",
    title: "Walima Crimson",
    style: "Formal",
    description: "Crimson roses around a pointed arch for a walima.",
    image: "/photos/walima-crimson.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "lace-keepsake",
    title: "Lace Keepsake",
    style: "Formal",
    description: "Black-and-white lace pinned like a keepsake.",
    image: "/photos/lace-keepsake.webp",
    kind: "wedding",
    arabic: false,
    span: "normal",
  },
  {
    id: "meadow-table",
    title: "Meadow Table",
    style: "Romantic",
    description: "A blush meadow and sweetheart chairs for the reception.",
    image: "/photos/meadow-table.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "palace-promise",
    title: "Palace Promise",
    style: "Grand",
    description: "A palace courtyard and bougainvillea for a baraat suite.",
    image: "/photos/palace-promise.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "garden-commitment",
    title: "Garden Commitment",
    style: "Garden",
    description: "A pavilion and urns for a quiet garden commitment.",
    image: "/photos/garden-commitment.webp",
    kind: "engagement",
    arabic: false,
    span: "tall",
  },
  {
    id: "lemon-vine",
    title: "Lemon Vine",
    style: "Airy",
    description: "Citrus vines and a tiny monogram on cream paper.",
    image: "/photos/lemon-vine.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "sage-naskh",
    title: "Sage Naskh",
    style: "Arabic",
    description: "A sage arch, wildflowers, and Arabic names in gold.",
    image: "/photos/sage-naskh.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "floral-canopy",
    title: "Floral Canopy",
    style: "Arabic",
    description: "A blooming canopy and Arabic script for a garden zawaj.",
    image: "/photos/floral-canopy.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "blush-peony",
    title: "Blush Peony",
    style: "Arabic",
    description: "Watercolor peonies and Arabic names in a blush palette.",
    image: "/photos/blush-peony.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "peach-lantern",
    title: "Peach Lantern",
    style: "Festive",
    description: "Hanging lanterns and peach florals for a morning ceremony.",
    image: "/photos/peach-lantern.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "wine-lantern",
    title: "Wine Lantern",
    style: "Festive",
    description: "Wine florals and lanterns on a deep burgundy ground.",
    image: "/photos/wine-lantern.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "lotus-blue",
    title: "Lotus Blue",
    style: "Garden",
    description: "A sky-blue arch framed with pink lotus blooms.",
    image: "/photos/lotus-blue.webp",
    kind: "wedding",
    arabic: false,
    span: "tall",
  },
  {
    id: "dove-oval",
    title: "Dove Oval",
    style: "Arabic",
    description: "Doves and line-drawn blooms around an Arabic oval.",
    image: "/photos/dove-oval.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "henna-night",
    title: "Henna Night",
    style: "Celebration",
    description: "Hennaed hands and a burgundy arch for laylat henna.",
    image: "/photos/henna-night.webp",
    kind: "wedding",
    arabic: true,
    span: "tall",
  },
  {
    id: "palace-arabic",
    title: "Palace Arabic",
    style: "Grand",
    description: "A palace lawn framed by an arch, set entirely in Arabic.",
    image: "/photos/palace-arabic.webp",
    kind: "wedding",
    arabic: true,
    span: "hero",
  },
  {
    id: "palace-blessing",
    title: "Palace Blessing",
    style: "Grand",
    description:
      "A bilingual palace card with a Quranic blessing above the names.",
    image: "/photos/palace-blessing.webp",
    kind: "wedding",
    arabic: true,
    span: "hero",
  },
];

export const photoFilters = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "engagement", label: "Engagement" },
  { id: "arabic", label: "Arabic" },
] as const;

export type PhotoFilterId = (typeof photoFilters)[number]["id"];

export function filterPhotos(
  items: InvitationPhoto[],
  filter: PhotoFilterId,
): InvitationPhoto[] {
  if (filter === "arabic") return items.filter((photo) => photo.arabic);
  if (filter === "all") return items;
  return items.filter((photo) => photo.kind === filter);
}

export function getPhotoById(id: string | null | undefined) {
  if (!id) return undefined;
  return photos.find((photo) => photo.id === id);
}

export function getPhotoSharePath(id: string) {
  return `/photos?card=${encodeURIComponent(id)}`;
}
