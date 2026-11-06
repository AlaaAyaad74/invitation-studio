import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import { desertBloomInvitation as data, whatsappUrl } from "@/data/desert-bloom";
import type { CSSProperties } from "react";
import InView from "./InView";
import shared from "./Invitation.module.css";
import { Bloom } from "./Ornaments";
import styles from "./Rsvp.module.css";

export default function Rsvp() {
  const { rsvp, couple } = data;

  return (
    <section className={styles.rsvp} aria-label="Reply">
      <InView className={styles.scene} threshold={0.35}>
        {/* Inside of the envelope. */}
        <span className={styles.back} aria-hidden="true" />

        <div className={styles.letter}>
          <span className={styles.stamp} aria-hidden="true">
            <Bloom className={styles.stampBloom} />
            <span>{couple.first[0]}&amp;{couple.second[0]}</span>
          </span>

          <p className={`${shared.kicker} ${shared.kickerIn}`} style={{ "--kd": "1.7s" } as CSSProperties}>
            Kindly reply
          </p>
          <h2 className={`${styles.title} ${shared.writeIn}`} style={{ "--wd": "1.9s" } as CSSProperties}>
            Will you bloom with us?
          </h2>
          <p className={styles.deadline}>{rsvp.deadline}</p>

          <div className={styles.actions}>
            <a
              href={whatsappUrl(rsvp.message)}
              target="_blank"
              rel="noreferrer"
              className={shared.primary}
            >
              <WhatsAppIcon className={`${shared.icon} ${shared.iconFill}`} />
              Confirm attendance
            </a>
            <a
              href={whatsappUrl(rsvp.wish)}
              target="_blank"
              rel="noreferrer"
              className={shared.secondary}
            >
              Send a wish
            </a>
          </div>
        </div>

        {/* Front pocket the letter slides out of. */}
        <span className={styles.pocket} aria-hidden="true">
          <span className={styles.address}>To our dearest guest</span>
        </span>

        <span className={styles.flap} aria-hidden="true">
          <span className={styles.seal}>
            <Bloom className={styles.sealBloom} />
          </span>
        </span>
      </InView>
    </section>
  );
}
