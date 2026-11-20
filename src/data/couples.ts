import type { BotanicalContent } from "@/data/botanical";

export type CoupleInvitation = BotanicalContent & {
  slug: string;
  calendarId: string;
  template: "botanical";
  /** Paid option: hide the "Made with ♡ by Invitation Studio" line. */
  hideBranding?: boolean;
};

export const couples: CoupleInvitation[] = [];

export function getCouple(slug: string) {
  const decoded = decodeURIComponent(slug);
  return couples.find(
    (couple) => couple.slug === slug || couple.slug === decoded,
  );
}
