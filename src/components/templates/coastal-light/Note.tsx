import Reveal from "@/components/Reveal";
import type { CoastalLightInvitation } from "@/data/coastal-light";
import styles from "./Note.module.css";

export default function Note({ data }: { data: CoastalLightInvitation }) {
  const label = data.lang === "ar" ? "كلمة مننا" : "A note";
  return (
    <section className={styles.section} aria-label={label}>
      <Reveal>
        <p className={styles.index}>
          <span>03</span>
          {label}
        </p>
      </Reveal>
      <Reveal delayMs={90}>
        <p className={styles.line}>{data.note}</p>
      </Reveal>
    </section>
  );
}
