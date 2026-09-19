export const botanicalInvitation = {
  couple: {
    first: "Layla",
    second: "Adam",
  },
  intro: "Together with their families",
  tagline: "invite you to celebrate their wedding",
  start: "2027-03-12T18:00:00+02:00",
  end: "2027-03-13T00:00:00+02:00",
  dateLabel: {
    weekday: "Friday",
    day: "12",
    month: "March",
    year: "2027",
  },
  timeLabel: "Six o'clock in the evening",
  venue: {
    name: "The Garden House",
    address: "New Cairo, Egypt",
    mapUrl: "https://maps.google.com/?q=The+Garden+House+New+Cairo",
  },
  dressCode: "Formal attire in soft neutrals",
  rsvp: {
    whatsapp: "201000000000",
    message:
      "Hello! I would love to confirm my attendance to Layla & Adam's wedding.",
    deadline: "Kindly reply before 1 February 2027",
  },
  gallery: [
    {
      src: "/botanical/gallery/01-meadow.jpg",
      alt: "Layla and Adam in a lupine meadow at golden hour",
    },
    {
      src: "/botanical/gallery/02-field.jpg",
      alt: "A quiet moment together in the field",
    },
    {
      src: "/botanical/gallery/03-walk.jpg",
      alt: "Walking through the blooming meadow",
    },
    {
      src: "/botanical/gallery/04-standing.jpg",
      alt: "Standing close in the tall grass",
    },
    {
      src: "/botanical/gallery/05-portrait.jpg",
      alt: "A still portrait in the meadow",
    },
    {
      src: "/botanical/gallery/06-together.jpg",
      alt: "Together among the lupines",
    },
  ],
} as const;

export type BotanicalInvitation = typeof botanicalInvitation;

function toCalendarStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function getCalendarUrl(data: BotanicalInvitation) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${data.couple.first} & ${data.couple.second} — Wedding`,
    dates: `${toCalendarStamp(data.start)}/${toCalendarStamp(data.end)}`,
    location: `${data.venue.name}, ${data.venue.address}`,
    details: `${data.intro} ${data.tagline}.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getWhatsAppUrl(data: BotanicalInvitation) {
  return `https://wa.me/${data.rsvp.whatsapp}?text=${encodeURIComponent(data.rsvp.message)}`;
}
