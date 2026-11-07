"use client";

import WaveOrnamentIcon from "@/components/icons/WaveOrnamentIcon";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import { fullDate, templateCopy } from "@/data/template-copy";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import type { Lang } from "@/lib/i18n";
import styles from "./Countdown.module.css";

const UNITS = ["hours", "minutes", "seconds"] as const;

const COPY = {
  en: {
    label: "The countdown",
    script: "until we say I do",
    done: "We are married",
    daysToGo: "Days to go",
  },
  ar: {
    label: "العد التنازلي",
    script: "حتى نقول تمت",
    done: "لقد تزوجنا",
    daysToGo: "يومًا متبقيًا",
  },
} as const;

type CountdownProps = {
  start: string;
  dateLabel: {
    weekday: string;
    day: string;
    month: string;
    year: string;
  };
  lang?: Lang;
};

export default function Countdown({
  start,
  dateLabel,
  lang = "en",
}: CountdownProps) {
  const remaining = useRemainingTime(start);
  const dateLine = fullDate(dateLabel, lang);
  const t = COPY[lang];
  const common = templateCopy(lang);

  return (
    <section className={styles.section} aria-label={common.countdownLabel}>
      <FadeIn>
        <p className={styles.label}>{t.label}</p>
      </FadeIn>
      <FadeIn delay={180}>
        <p className={styles.script}>{t.script}</p>
      </FadeIn>
      <FadeIn delay={360}>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <WaveOrnamentIcon />
          <span />
        </div>
      </FadeIn>

      {remaining?.done ? (
        <FadeIn delay={520}>
          <div className={styles.done}>
            <p className={styles.doneTitle}>{common.today}</p>
            <p className={styles.doneCopy}>{t.done}</p>
          </div>
        </FadeIn>
      ) : (
        <>
          <FadeIn delay={520}>
            <p className={styles.days}>
              <span
                key={remaining?.days ?? "d"}
                className={`${styles.daysValue} ${styles.tick}`}
              >
                {remaining ? remaining.days : "—"}
              </span>
              <span className={styles.daysLabel}>{t.daysToGo}</span>
            </p>
          </FadeIn>

          <div className={styles.row}>
            {UNITS.map((unit, index) => (
              <FadeIn
                key={unit}
                className={styles.unit}
                delay={700 + index * 140}
              >
                <span
                  key={remaining?.[unit] ?? unit}
                  className={`${styles.unitValue} ${styles.tick}`}
                >
                  {remaining ? pad(remaining[unit]) : "—"}
                </span>
                <span className={styles.unitLabel}>{common.units[unit]}</span>
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
