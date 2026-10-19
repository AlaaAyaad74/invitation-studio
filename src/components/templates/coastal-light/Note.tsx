import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data } from "@/data/coastal-light";
import styles from "./Note.module.css";

export default function Note() {
  return (
    <section className={styles.section} aria-label="A note">
      <Reveal>
        <p className={styles.index}>
          <span>03</span>
          A note
        </p>
      </Reveal>
      <Reveal delayMs={90}>
        <p className={styles.line}>{data.note}</p>
      </Reveal>
    </section>
  );
}
