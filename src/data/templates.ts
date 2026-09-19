export type InvitationTemplate = {
  id: string;
  title: string;
  style: string;
  description: string;
  image: string;
  comingSoon: boolean;
};

export const templates: InvitationTemplate[] = [
  {
    id: "garden-vow",
    title: "Botanical",
    style: "Studio",
    description: "A new invitation template — ready for fresh content.",
    image: "/templates/botanical.webp",
    comingSoon: true,
  },
  {
    id: "midnight-silk",
    title: "Midnight Silk",
    style: "Elegant",
    description: "Deep tones and refined typography for evening receptions.",
    image: "/templates/midnight-silk.webp",
    comingSoon: true,
  },
  {
    id: "coastal-light",
    title: "Coastal Light",
    style: "Minimal",
    description: "Airy layouts inspired by seaside vows and soft horizons.",
    image: "/templates/coastal-light.webp",
    comingSoon: true,
  },
  {
    id: "heritage-script",
    title: "Heritage Script",
    style: "Classic",
    description: "Timeless calligraphy with formal suite details.",
    image: "/templates/heritage-script.webp",
    comingSoon: true,
  },
  {
    id: "desert-bloom",
    title: "Desert Bloom",
    style: "Modern",
    description: "Warm neutrals and bold geometry for contemporary couples.",
    image: "/templates/desert-bloom.webp",
    comingSoon: true,
  },
  {
    id: "atelier-rose",
    title: "Atelier Rose",
    style: "Romantic",
    description: "Blush accents and layered paper textures for intimate days.",
    image: "/templates/atelier-rose.webp",
    comingSoon: true,
  },
];

export const features = [
  {
    title: "Ready-to-personalize sites",
    description:
      "Every template ships as a full invitation website—RSVP, schedule, gallery, and map included.",
  },
  {
    title: "Mobile-first elegance",
    description:
      "Guests open a polished experience on any phone, with fast load times and clear navigation.",
  },
  {
    title: "Live RSVP tracking",
    description:
      "Collect meal choices, plus-ones, and attendance in one place you can share with your planner.",
  },
  {
    title: "Multilingual support",
    description:
      "Present your story in the languages your families speak, without rebuilding the design.",
  },
];

export const services = [
  {
    title: "Custom couple logo",
    description:
      "A monogram or wordmark designed around your names, used across the site, save-the-date, and print suite.",
  },
  {
    title: "Bespoke invitation site",
    description:
      "We craft a one-of-a-kind layout from your mood board, venue photos, and ceremony details.",
  },
  {
    title: "Photo & film gallery",
    description:
      "Curated engagement galleries and cinematic loops that feel like part of the invitation itself.",
  },
  {
    title: "Day-of digital suite",
    description:
      "Seating charts, timelines, and guest guides that match your invitation aesthetic.",
  },
];
