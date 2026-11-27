import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl, type CoastalLightInvitation } from "@/data/coastal-light";
import { templateCopy } from "@/data/template-copy";

const styles = {
  section: "px-6 pt-[2.4rem] pb-6 text-center font-[family-name:var(--font-minimal-serif),Georgia,serif]",
  index: "m-0 flex items-baseline justify-center gap-[0.55rem] text-[1.35rem] font-normal tracking-[0] normal-case text-(--ink) [&_span]:tracking-[0.08em] [&_span]:text-(--seal-ink)",
  title: "mx-0 mt-[0.9rem] mb-0 text-[clamp(2.15rem,7.5vw,2.65rem)] leading-[1.15] font-medium",
  deadline: "mx-0 mt-[0.7rem] mb-0 text-[1.2rem] font-medium text-(--ink) italic",
  button: "mt-[1.35rem] flex items-center justify-center gap-[0.55rem] bg-(--seal) px-4 py-[0.95rem] text-[1.15rem] font-medium tracking-[0.01em] normal-case text-(--ink) no-underline hover:bg-(--seal-deep) focus-visible:bg-(--seal-deep) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--seal-ink)",
  icon: "h-4 w-4 fill-current",
};

const COPY = {
  en: { section: "RSVP", index: "Reply", title: "Will you come?" },
  ar: { section: "تأكيد الحضور", index: "الرد", title: "هتنوّرونا؟" },
} as const;

export default function Reply({ data }: { data: CoastalLightInvitation }) {
  const whatsappUrl = getWhatsAppUrl(data);
  const t = COPY[data.lang];
  return (
    <section className={styles.section} aria-label={t.section}>
      <p className={styles.index}>
        <span>05</span>
        {t.index}
      </p>
      <h2 className={styles.title}>{t.title}</h2>
      <p className={styles.deadline}>{data.rsvp.deadline}</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={styles.button}
      >
        <WhatsAppIcon className={styles.icon} />
        {templateCopy(data.lang).confirmWhatsApp}
      </a>
    </section>
  );
}
