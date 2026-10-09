export const elegantInvitation = {
  couple: {
    first: "Amira",
    second: "Karim",
  },
  initials: "A&K",
  intro: "Together with their families",
  tagline: "to their wedding day",
  verse: "Two names. One garden. An evening made of light.",
  start: "2027-06-18T17:00:00+03:00",
  end: "2027-06-19T00:00:00+03:00",
  dateLabel: {
    weekday: "Friday",
    day: "18",
    month: "June",
    year: "2027",
  },
  timeLabel: "Five o'clock in the afternoon",
  music: "/voices/elegant-voice.mp3",
  venue: {
    name: "The Rose Pavilion",
    address: "Al-Azhar Park, Cairo",
    mapUrl: "https://maps.google.com/?q=Al+Azhar+Park+Cairo",
  },
  moments: [
    {
      label: "Ceremony",
      time: "Five o'clock",
      detail: "Vows beneath the rose arch",
    },
    {
      label: "Celebration",
      time: "Half past seven",
      detail: "Dinner in the pavilion, under the lights",
    },
    {
      label: "Attire",
      time: "Garden formal",
      detail: "Blush, ivory, and soft green",
    },
  ],
  gallery: [
    {
      src: "/elegant/gallery/01-meadow.jpg",
      alt: "Amira and Karim in a lupine meadow at golden hour",
    },
    {
      src: "/elegant/gallery/02-field.jpg",
      alt: "A quiet moment together in the field",
    },
    {
      src: "/elegant/gallery/03-walk.jpg",
      alt: "Walking through the blooming meadow",
    },
    {
      src: "/elegant/gallery/04-standing.jpg",
      alt: "Standing close in the tall grass",
    },
    {
      src: "/elegant/gallery/05-portrait.jpg",
      alt: "A still portrait in the meadow",
    },
    {
      src: "/elegant/gallery/06-together.jpg",
      alt: "Together among the lupines",
    },
  ],
  rsvp: {
    whatsapp: "201000000000",
    message:
      "Hello! I would love to confirm my attendance to Amira & Karim's wedding.",
    deadline: "Kindly reply before 1 May 2027",
  },
} as const;

export type ElegantInvitation = typeof elegantInvitation;

function toCalendarStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function getCalendarUrl(data: ElegantInvitation) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${data.couple.first} & ${data.couple.second} — Wedding`,
    dates: `${toCalendarStamp(data.start)}/${toCalendarStamp(data.end)}`,
    location: `${data.venue.name}, ${data.venue.address}`,
    details: `${data.intro} ${data.tagline}.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getWhatsAppUrl(data: ElegantInvitation) {
  return `https://wa.me/${data.rsvp.whatsapp}?text=${encodeURIComponent(data.rsvp.message)}`;
}
