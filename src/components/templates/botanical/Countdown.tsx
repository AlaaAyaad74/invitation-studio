"use client";

import { type BotanicalContent } from "@/data/botanical";
import Reveal from "@/components/Reveal";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import styles from "./Countdown.module.css";

const UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function Corner({ className }: { className: string }) {
  return (
    <span className={`${styles.corner} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 21C3 12 12 3 21 3" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 21c0-6.2 6.3-13 14-14"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}

export default function Countdown({ data }: { data: BotanicalContent }) {
  const remaining = useRemainingTime(data.start);

  const dateLine = `${data.dateLabel.weekday}, ${data.dateLabel.day} ${data.dateLabel.month} ${data.dateLabel.year}`;

  return (
    <section className={styles.section} aria-label="Countdown to the wedding">
      <div className={styles.glow} />
      <div className={styles.petal} />
      <div className={styles.petalTwo} />

      <Reveal className={styles.frame}>
        <Corner className={styles.tl} />
        <Corner className={styles.tr} />
        <Corner className={styles.bl} />
        <Corner className={styles.br} />

        <p className={styles.label}>The countdown</p>
        <p className={styles.script}>until we say I do</p>
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

        {remaining?.done ? (
          <div className={styles.done}>
            <p className={styles.doneTitle}>Today</p>
            <p className={styles.doneCopy}>We are married</p>
          </div>
        ) : (
          <>
            <p className={styles.days}>
              <span
                key={remaining?.days ?? "d"}
                className={`${styles.daysValue} ${styles.tick}`}
              >
                {remaining ? remaining.days : "—"}
              </span>
              <span className={styles.daysLabel}>Days to go</span>
            </p>

            <div className={styles.row}>
              {UNITS.map((unit) => (
                <div key={unit.key} className={styles.unit}>
                  <span
                    key={remaining?.[unit.key] ?? unit.key}
                    className={`${styles.unitValue} ${styles.tick}`}
                  >
                    {remaining ? pad(remaining[unit.key]) : "—"}
                  </span>
                  <span className={styles.unitLabel}>{unit.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <p className={styles.date}>{dateLine}</p>
      </Reveal>
    </section>
  );
}
