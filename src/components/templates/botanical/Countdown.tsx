"use client";

import CornerFlourishIcon from "@/components/icons/CornerFlourishIcon";
import WaveOrnamentIcon from "@/components/icons/WaveOrnamentIcon";
import { type BotanicalContent } from "@/data/botanical";
import { fullDate, templateCopy } from "@/data/template-copy";
import Reveal from "@/components/Reveal";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
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
    script: "حتى يبدأ الاحتفال",
    done: "خلاص اتجوزنا!",
    daysToGo: "يوم فاضل",
  },
} as const;

function Corner({ className }: { className: string }) {
  return (
    <span className={`${styles.corner} ${className}`} aria-hidden="true">
      <CornerFlourishIcon />
    </span>
  );
}

export default function Countdown({ data }: { data: BotanicalContent }) {
  const remaining = useRemainingTime(data.start);
  const lang = data.lang ?? "en";
  const t = COPY[lang];
  const common = templateCopy(lang);

  const dateLine = fullDate(data.dateLabel, lang);

  return (
    <section className={styles.section} aria-label={common.countdownLabel}>
      <div className={styles.glow} />
      <div className={styles.petal} />
      <div className={styles.petalTwo} />

      <Reveal className={styles.frame}>
        <Corner className={styles.tl} />
        <Corner className={styles.tr} />
        <Corner className={styles.bl} />
        <Corner className={styles.br} />

        <p className={styles.label}>{t.label}</p>
        <p className={styles.script}>{t.script}</p>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <WaveOrnamentIcon />
          <span />
        </div>

        {remaining?.done ? (
          <div className={styles.done}>
            <p className={styles.doneTitle}>{common.today}</p>
            <p className={styles.doneCopy}>{t.done}</p>
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
              <span className={styles.daysLabel}>{t.daysToGo}</span>
            </p>

            <div className={styles.row}>
              {UNITS.map((unit) => (
                <div key={unit} className={styles.unit}>
                  <span
                    key={remaining?.[unit] ?? unit}
                    className={`${styles.unitValue} ${styles.tick}`}
                  >
                    {remaining ? pad(remaining[unit]) : "—"}
                  </span>
                  <span className={styles.unitLabel}>{common.units[unit]}</span>
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
