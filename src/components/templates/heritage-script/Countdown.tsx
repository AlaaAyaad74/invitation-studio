"use client";

import FadeIn from "@/components/templates/heritage-script/FadeIn";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import styles from "./Countdown.module.css";

const UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type CountdownProps = {
  start: string;
  dateLabel: {
    weekday: string;
    day: string;
    month: string;
    year: string;
  };
};

export default function Countdown({ start, dateLabel }: CountdownProps) {
  const remaining = useRemainingTime(start);
  const dateLine = `${dateLabel.weekday}, ${dateLabel.day} ${dateLabel.month} ${dateLabel.year}`;

  return (
    <section className={styles.section} aria-label="Countdown to the wedding">
      <FadeIn>
        <p className={styles.label}>The countdown</p>
      </FadeIn>
      <FadeIn delay={180}>
        <p className={styles.script}>until we say I do</p>
      </FadeIn>
      <FadeIn delay={360}>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path
              d="M1 5c3.2-4.2 6.4-4.2 8 0 1.6-4.2 4.8-4.2 8 0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <span />
        </div>
      </FadeIn>

      {remaining?.done ? (
        <FadeIn delay={520}>
          <div className={styles.done}>
            <p className={styles.doneTitle}>Today</p>
            <p className={styles.doneCopy}>We are married</p>
          </div>
        </FadeIn>
      ) : (
        <>
          <FadeIn delay={520}>
            <p className={styles.days}>
              <span key={remaining?.days ?? "d"} className={`${styles.daysValue} ${styles.tick}`}>
                {remaining ? remaining.days : "—"}
              </span>
              <span className={styles.daysLabel}>Days to go</span>
            </p>
          </FadeIn>

          <div className={styles.row}>
            {UNITS.map((unit, index) => (
              <FadeIn key={unit.key} className={styles.unit} delay={700 + index * 140}>
                <span
                  key={remaining?.[unit.key] ?? unit.key}
                  className={`${styles.unitValue} ${styles.tick}`}
                >
                  {remaining ? pad(remaining[unit.key]) : "—"}
                </span>
                <span className={styles.unitLabel}>{unit.label}</span>
              </FadeIn>
            ))}
          </div>
        </>
      )}

      <FadeIn delay={1120}>
        <p className={styles.date}>{dateLine}</p>
      </FadeIn>
    </section>
  );
}
