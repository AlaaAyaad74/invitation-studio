import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl, type CoastalLightInvitation } from "@/data/coastal-light";
import { templateCopy } from "@/data/template-copy";
import styles from "./Reply.module.css";

const COPY = {
  en: { section: "RSVP", index: "Reply", title: "Will you come?" },
  ar: { section: "تأكيد الحضور", index: "الرد", title: "هل ستأتون؟" },
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
