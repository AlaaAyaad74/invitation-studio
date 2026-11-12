export type ReviewShot = {
  src: string;
  width: number;
  height: number;
  /** What the message says, for screen readers and search. */
  alt: string;
};

export type Review = {
  id: string;
  couple: string;
  /** The line we pull out of their message, shown large on the card. */
  quote: string;
  /** Where the message came from. */
  platform: "WhatsApp" | "Instagram";
  shots: ReviewShot[];
};

export const reviews: Review[] = [
  {
    id: "omar-salma",
    couple: "Omar & Salma",
    quote: "تسلم إيدك بجد… جميل أوي أوي",
    platform: "Instagram",
    shots: [
      {
        src: "/reviews/omar-salma-1.webp",
        width: 1242,
        height: 444,
        alt: "Message from Omar & Salma: «تسلم ايدك بجد» and «جميل اوي اوي» with hearts.",
      },
      {
        src: "/reviews/omar-salma-2.webp",
        width: 1242,
        height: 276,
        alt: "Message from Omar & Salma: «انا اللي شكرا بجد عملتهولي في وقت قياسي».",
      },
    ],
  },
  {
    id: "ziad-samira",
    couple: "Ziad & Samira",
    quote: "عجبت الكل، محدش شافها غير وقال عليها إيه الواو ده",
    platform: "WhatsApp",
    shots: [
      {
        src: "/reviews/review-ziad-samira.webp",
        width: 1242,
        height: 670,
        alt: "Message from Ziad & Samira: «خطيرة اوي والله تسلميلي» and «عجبت الكل، محدش شافها غير وقال عليها إيه الواو ده».",
      },
    ],
  },
  {
    id: "ahmed-doaa",
    couple: "Ahmed & Doaa",
    quote: "شكرًا جدًا، تحفة ما شاء الله",
    platform: "WhatsApp",
    shots: [
      {
        src: "/reviews/review-ahmed-doaa.webp",
        width: 1242,
        height: 318,
        alt: "Message from Ahmed & Doaa: «شكرا جدا، تحفة ما شاء الله، شكرا» with hearts.",
      },
    ],
  },
];
