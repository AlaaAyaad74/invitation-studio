import type { Lang } from "@/lib/i18n";

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

/** Arabic FAQ, same order as the English one. */
const faqAr: FaqItem[] = [
  {
    question: "الدعوة بتوصل لضيوفكم إزاي؟",
    answer:
      "الدعوة عبارة عن لينك خاص بيكم. ابعتوه لضيوفكم على الواتساب أو إنستجرام أو أي مكان، وبيفتح على طول من أي موبايل من غير ما يحتاجوا ينزلوا أي تطبيق.",
  },
  {
    question: "ينفع نعدّل حاجة بعد ما نستلمها؟",
    answer:
      "أكيد. لو الميعاد أو المكان أو أي تفصيلة اتغيرت، كلمونا وإحنا نعدلها لكم. واللينك بيفضل زي ما هو.",
  },
  {
    question: "الضيوف بيأكدوا حضورهم إزاي، ونعرف مين جاي منين؟",
    answer:
      "كل دعوة فيها زرار تأكيد الحضور. لما الضيف يدوس عليه، بتوصلكم رسالة جاهزة فيها اسمه وعددهم، فتعرفوا دايمًا مين جاي.",
  },
  {
    question: "الدعوة بتاخد وقت قد إيه؟",
    answer:
      "دعوات التصميمات الجاهزة بتخلص خلال 24 لـ 48 ساعة من وقت ما توصلنا تفاصيلكم. التصميمات المخصوصة بتاخد وقت أطول حسب طلبكم.",
  },
  {
    question: "التكلفة كام؟",
    answer:
      "الأسعار تبدأ من 50 جنيه وبتختلف حسب نوع الدعوة. ابعتولنا على إنستجرام اللي محتاجينه وهنبعتلكم السعر.",
  },
  {
    question: "الدفع بيكون إزاي؟",
    answer:
      "الدفع بيكون تحويل على إنستاباي أو فودافون كاش، وبنبدأ الشغل أول ما الدفع يتأكد.",
  },
  {
    question: "ينفع الدعوة تبقى بالعربي؟",
    answer: "طبعًا. الدعوة ممكن تبقى عربي بالكامل، أو إنجليزي، أو الاتنين مع بعض.",
  },
];

export function getFaq(lang: Lang): FaqItem[] {
  return lang === "ar" ? faqAr : faq;
}
