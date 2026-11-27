import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { rsvpUrl, type DesertBloomInvitation } from "@/data/desert-bloom";
import type { CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import ui from "./ui.module.css";
import BloomIcon from "@/components/icons/BloomIcon";
import styles from "./Rsvp.module.css";

const COPY = {
  en: {
    section: "Reply",
    kicker: "Kindly reply",
    title: "Will you bloom with us?",
    confirm: "Confirm attendance",
    wish: "Send a wish",
    address: "To our dearest guest",
  },
  ar: {
    section: "الرد",
    kicker: "مستنيين ردكم",
    title: "هتنوّرونا؟",
    confirm: "أكد حضورك",
    wish: "ابعت أمنية حلوة",
    address: "لضيفنا الغالي",
  },
} as const;

export default function Rsvp({ data }: { data: DesertBloomInvitation }) {
  const { rsvp, couple } = data;
  const t = COPY[data.lang];

  return (
    <section className={styles.rsvp} aria-label={t.section}>
      <InView className={styles.scene} threshold={0.35}>
        {/* Inside of the envelope. */}
        <span className={styles.back} aria-hidden="true" />

        <div className={styles.letter}>
          <span className={styles.stamp} aria-hidden="true">
            <BloomIcon className={styles.stampBloom} />
            <span>
              {couple.first[0]}&amp;{couple.second[0]}
            </span>
          </span>

          <p
            className={`${ui.kicker} ${motion.kickerIn}`}
            style={{ "--kd": "1.7s" } as CSSProperties}
          >
            {t.kicker}
          </p>
          <h2
            className={`${styles.title} ${motion.writeIn}`}
            style={{ "--wd": "1.9s" } as CSSProperties}
          >
            {t.title}
          </h2>
          <p className={styles.deadline}>{rsvp.deadline}</p>

          <div className={styles.actions}>
            <a
              href={rsvpUrl(data, rsvp.message)}
              target="_blank"
              rel="noreferrer"
              className={ui.primary}
            >
              <WhatsAppIcon className={`${ui.icon} ${ui.iconFill}`} />
              {t.confirm}
            </a>
            <a
              href={rsvpUrl(data, rsvp.wish)}
              target="_blank"
              rel="noreferrer"
              className={ui.secondary}
            >
              {t.wish}
            </a>
          </div>
        </div>

        {/* Front pocket the letter slides out of. */}
        <span className={styles.pocket} aria-hidden="true">
          <span className={styles.address}>{t.address}</span>
        </span>

        <span className={styles.flap} aria-hidden="true">
          <span className={styles.seal}>
            <BloomIcon className={styles.sealBloom} />
          </span>
        </span>
      </InView>
    </section>
  );
}
