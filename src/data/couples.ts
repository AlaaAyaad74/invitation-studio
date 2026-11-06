import type { BotanicalContent } from "@/data/botanical";

export type CoupleInvitation = BotanicalContent & {
  slug: string;
  calendarId: string;
  template: "botanical";
};

export const couples: CoupleInvitation[] = [];

export function getCouple(slug: string) {
  const decoded = decodeURIComponent(slug);
  return couples.find(
    (couple) => couple.slug === slug || couple.slug === decoded,
  );
}
