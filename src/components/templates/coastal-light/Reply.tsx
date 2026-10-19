import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data, getWhatsAppUrl } from "@/data/coastal-light";
import styles from "./Reply.module.css";

const whatsappUrl = getWhatsAppUrl(data);

export default function Reply() {
  return (
    <section className={styles.section} aria-label="RSVP">
      <Reveal>
        <p className={styles.index}>
          <span>04</span>
          Reply
        </p>
      </Reveal>
      <Reveal delayMs={90}>
        <h2 className={styles.title}>Will you come?</h2>
        <p className={styles.deadline}>{data.rsvp.deadline}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.button}
        >
          <WhatsAppIcon className={styles.icon} />
          Confirm on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
