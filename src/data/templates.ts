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
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
    comingSoon: true,
  },
  {
    id: "midnight-silk",
    title: "Midnight Silk",
    style: "Elegant",
    description: "Deep tones and refined typography for evening receptions.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
    comingSoon: true,
  },
  {
    id: "coastal-light",
    title: "Coastal Light",
    style: "Minimal",
    description: "Airy layouts inspired by seaside vows and soft horizons.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    comingSoon: true,
  },
  {
    id: "heritage-script",
    title: "Heritage Script",
    style: "Classic",
    description: "Timeless calligraphy with formal suite details.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
    comingSoon: true,
  },
  {
    id: "desert-bloom",
    title: "Desert Bloom",
    style: "Modern",
    description: "Warm neutrals and bold geometry for contemporary couples.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    comingSoon: true,
  },
  {
    id: "atelier-rose",
    title: "Atelier Rose",
    style: "Romantic",
    description: "Blush accents and layered paper textures for intimate days.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
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
