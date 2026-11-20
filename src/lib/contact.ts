/**
 * Where every order / contact button on the site sends people.
 *
 * To move all buttons to WhatsApp later: fill in `whatsappContact` below,
 * uncomment it, and set `primaryContact = whatsappContact`. The Meta Pixel
 * picks the channel up from the link itself, so tracking keeps working.
 */
import type { ContactChannel } from "@/lib/metaPixel";
// import { whatsappUrl } from "@/lib/whatsapp";

export type ContactOption = {
  channel: ContactChannel;
  href: string;
  /** Short call to action for general contact buttons. */
  label: string;
};

export const instagramContact: ContactOption = {
  channel: "instagram",
  // Web DM link (not ig.me): logged-out visitors get Instagram's login page,
  // which returns them to this chat after signing in.
  href: "https://www.instagram.com/m/invitation.studio0/",
  label: "Message us on Instagram",
};

// export const whatsappContact: ContactOption = {
//   channel: "whatsapp",
//   // Number in international format, no "+" or spaces (Egypt: 20...).
//   href: whatsappUrl("20XXXXXXXXXX", "أهلاً، عايز أعرف تفاصيل دعوات الفرح"),
//   label: "Chat with us on WhatsApp",
// };

/** The channel every order / contact button uses. */
export const primaryContact: ContactOption = instagramContact;

/** Button labels used by the order / contact buttons. */
export const ctaLabels = {
  startCustom: "Start custom",
  customServices: "Custom services",
  requestQuote: "Request a custom quote",
} as const;

/** Starting price, shown as one line (no pricing table). */
export const startingPriceAmount = "50";
export const startingPriceCurrency = "EGP";
export const startingPrice = `Prices start from ${startingPriceAmount} ${startingPriceCurrency}`;

/**
 * Props for an <a> that opens the contact chat in a new tab.
 * `data-meta-cta` tells the Meta Pixel this is one of our own contact links
 * (never a couple's RSVP link inside a template demo).
 */
export function contactLinkProps(contact: ContactOption = primaryContact) {
  return {
    href: contact.href,
    target: "_blank",
    rel: "noopener noreferrer",
    "data-meta-cta": "",
  } as const;
}
