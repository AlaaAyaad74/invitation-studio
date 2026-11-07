"use client";

import RingTextIcon from "@/components/icons/RingTextIcon";
import type { DesertBloomInvitation } from "@/data/desert-bloom";
import { templateCopy } from "@/data/template-copy";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import type { CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import BloomIcon from "@/components/icons/BloomIcon";
import styles from "./Countdown.module.css";

const UNITS = ["hours", "minutes", "seconds"] as const;

const COPY = {
  en: {
    kicker: "Counting the days",
    daysToGo: "days to go",
    done: "The day has come. Thank you for blooming with us.",
  },
  ar: {
    kicker: "نعدّ الأيام",
    daysToGo: "يومًا متبقيًا",
    done: "حلّ اليوم المنتظر. شكرًا لأنكم أزهرتم معنا.",
  },
} as const;

export default function Countdown({ data }: { data: DesertBloomInvitation }) {
  const remaining = useRemainingTime(data.start);
  const { couple, dateLabel } = data;
  const ar = data.lang === "ar";
  const t = COPY[data.lang];
  const common = templateCopy(data.lang);
  const ringText = `${couple.first} & ${couple.second} · ${dateLabel.day} ${dateLabel.month} ${dateLabel.year} · `;

  return (
    <InView
      as="section"
      className={styles.section}
      aria-label={common.countdownLabel}
    >
      <p className={`${styles.kicker} ${motion.kickerIn}`}>{t.kicker}</p>

      <div className={styles.sun}>
        <RingTextIcon
          className={styles.ring}
          pathId="db-ring"
          text={ringText}
          fit={!ar}
        />
        <div className={styles.core}>
          <BloomIcon className={styles.bloom} />
          {remaining?.done ? (
            <span className={styles.doneTitle}>{common.today}</span>
          ) : (
            <>
              <span key={remaining?.days} className={styles.days}>
                {remaining ? remaining.days : "—"}
              </span>
              <span className={styles.daysLabel}>{t.daysToGo}</span>
            </>
          )}
        </div>
      </div>

      {remaining?.done ? (
        <p className={styles.doneCopy}>
          {t.done}
        </p>
      ) : (
        <div className={styles.row}>
          {UNITS.map((unit, index) => (
            <div
              key={unit}
              className={styles.arch}
              style={{ "--i": index } as CSSProperties}
            >
              <span className={styles.keystone} aria-hidden="true" />
              <span key={remaining?.[unit]} className={styles.value}>
                {remaining ? pad(remaining[unit]) : "--"}
              </span>
              <span className={styles.label}>{common.units[unit]}</span>
            </div>
          ))}
        </div>
      )}
    </InView>
  );
}
