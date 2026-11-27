/**
 * Where every order / contact button on the site sends people.
 *
 * To move all buttons to WhatsApp later: fill in `whatsappContact` below,
 * uncomment it, and set `primaryContact = whatsappContact`. The Meta Pixel
 * picks the channel up from the link itself, so tracking keeps working.
 */
import type { Lang } from "@/lib/i18n";
import type { ContactChannel } from "@/lib/metaPixel";
// import { whatsappUrl } from "@/lib/whatsapp";

export type ContactOption = {
  channel: ContactChannel;
  href: string;
  /** Short call to action for general contact buttons. */
  label: string;
  /**
   * Chat link with the message already typed in. Instagram DM links cannot
   * carry a message, so Instagram leaves this out and the order buttons copy
   * the message for the visitor to paste instead.
   */
  withMessage?: (text: string) => string;
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
//   withMessage: (text) => whatsappUrl("20XXXXXXXXXX", text),
// };

/** The channel every order / contact button uses. */
export const primaryContact: ContactOption = instagramContact;

/** What an order button orders: drives its label and the message sent. */
export type OrderKind = "template" | "video" | "photo";

/** Labels for the contact, order and price UI, per language. */
export const contactCopy = {
  en: {
    contactLabel: "Message us on Instagram",
    startCustom: "Start custom",
    customServices: "Custom services",
    requestQuote: "Request a custom quote",
    orderLabels: {
      template: "Order this template",
      video: "Order this video",
      photo: "Order this design",
    },
    order: "Order",
    pricesFrom: "Prices start from",
    from: "From",
    currency: "EGP",
  },
  ar: {
    contactLabel: "كلمونا على إنستجرام",
    startCustom: "اطلب دعوتك",
    customServices: "تصميم مخصوص",
    requestQuote: "اعرف السعر",
    orderLabels: {
      template: "اطلب التصميم ده",
      video: "اطلب الفيديو ده",
      photo: "اطلب التصميم ده",
    },
    order: "اطلب",
    pricesFrom: "الأسعار تبدأ من",
    from: "يبدأ من",
    currency: "جنيه",
  },
} as const satisfies Record<Lang, { orderLabels: Record<OrderKind, string> } & Record<string, unknown>>;

/** Button labels used by the order / contact buttons (English). */
export const ctaLabels = {
  startCustom: contactCopy.en.startCustom,
  customServices: contactCopy.en.customServices,
  requestQuote: contactCopy.en.requestQuote,
} as const;

export const orderLabels: Record<OrderKind, string> = contactCopy.en.orderLabels;

/** The message the visitor sends us from an order button. */
export function orderMessage(kind: OrderKind, name: string, url: string, lang: Lang = "en") {
  if (lang === "ar") {
    const item = {
      template: `تصميم الدعوة "${name}"`,
      video: `فيديو دعوة زي "${name}"`,
      photo: `صورة دعوة زي "${name}"`,
    }[kind];
    return `أهلًا استوديو الدعوات! حابين نطلب ${item}.\n${url}`;
  }
  const item = {
    template: `the "${name}" invitation template`,
    video: `an invitation video like "${name}"`,
    photo: `an invitation photo like "${name}"`,
  }[kind];
  return `Hi Invitation Studio! I'd like to order ${item}.\n${url}`;
}

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
