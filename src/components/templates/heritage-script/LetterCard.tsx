import { heritageInvitation as data } from "@/data/heritage-script";
import Image from "next/image";
import styles from "./LetterCard.module.css";

const DATE = `${data.dateLabel.weekday}, ${data.dateLabel.day} ${data.dateLabel.month} ${data.dateLabel.year}`;

export default function LetterCard() {
  return (
    <section className={styles.card} aria-label="Invitation">
      <p className={styles.srOnly}>
        {data.kicker} {data.honour} {data.couple.first} & {data.couple.second} {DATE}
      </p>
      <div className={styles.arch}>
        <Image
          src="/heritage script/funka.png"
          alt=""
          width={500}
          height={500}
          priority
          className={styles.bow}
        />
        <div className={styles.letter}>
          <div className={styles.group}>
            <p className={`${styles.small} ${styles.fade} ${styles.delay0}`} aria-hidden="true">
              {data.kicker}
            </p>
            <p className={`${styles.line} ${styles.fade} ${styles.delay1}`} aria-hidden="true">
              {data.honour}
            </p>
          </div>

          <div className={`${styles.group} ${styles.names}`}>
            <span
              className={`${styles.rule} ${styles.fade} ${styles.delay2}`}
              aria-hidden="true"
            >
              <span />
              <i />
              <span />
            </span>
            <p className={`${styles.name} ${styles.fade} ${styles.delay2}`} aria-hidden="true">
              {data.couple.first}
            </p>
            <p className={`${styles.amp} ${styles.fade} ${styles.delay3}`} aria-hidden="true">
              &
            </p>
            <p className={`${styles.name} ${styles.fade} ${styles.delay4}`} aria-hidden="true">
              {data.couple.second}
            </p>
            <span
              className={`${styles.rule} ${styles.fade} ${styles.delay5}`}
              aria-hidden="true"
            >
              <span />
              <i />
              <span />
            </span>
          </div>

          <p className={`${styles.line} ${styles.fade} ${styles.delay5}`} aria-hidden="true">
            {DATE}
          </p>
        </div>
        <div className={styles.lace} aria-hidden="true">
          <Image
            src="/heritage script/dantel.png"
            alt=""
            width={375}
            height={666}
            className={styles.laceImg}
          />
        </div>
      </div>
    </section>
  );
}
