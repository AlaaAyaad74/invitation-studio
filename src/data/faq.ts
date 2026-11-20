export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * FAQ shown on the home page (and sent to Google as FAQPage data).
 * Edit freely. Lines marked TODO are placeholders: confirm before relying on them.
 */
export const faq: FaqItem[] = [
  {
    question: "How does the invitation reach my guests?",
    answer:
      "Your invitation is a private link. Send it to your guests on WhatsApp, Instagram, or anywhere else. It opens straight away on any phone, with no app to install.",
  },
  {
    question: "Can I make changes after I receive it?",
    // TODO: confirm how many edits are free and whether any cost extra.
    answer:
      "Yes. If the time, venue, or any detail changes, message us and we update it for you. The link stays the same.",
  },
  {
    question: "How do guests RSVP, and how do I see who is coming?",
    // TODO: confirm this matches how RSVP works in every template.
    answer:
      "Each invitation has an RSVP button. When a guest taps it, you receive a ready-made message with their name and party size, so you always know who is coming.",
  },
  {
    question: "How long does it take?",
    // TODO: confirm how long custom designs take.
    answer:
      "Template invitations are ready within 24 to 48 hours of receiving your details. Custom designs take longer, depending on what you need.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Prices start from 50 EGP and vary by the type of invitation. Message us on Instagram with what you need and we will send you a quote.",
  },
  {
    question: "How do I pay?",
    // TODO: confirm the payment methods you accept.
    answer:
      "Payment is by InstaPay or Vodafone Cash transfer. We start working once the payment is confirmed.",
  },
  {
    question: "Can the invitation be in Arabic?",
    answer:
      "Of course. Your invitation can be fully in Arabic, in English, or in both.",
  },
];
