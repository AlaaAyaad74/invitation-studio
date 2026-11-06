"use client";

import { desertBloomInvitation as data } from "@/data/desert-bloom";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import type { CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import { Bloom } from "./Ornaments";
import styles from "./Countdown.module.css";

const UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function Countdown() {
  const remaining = useRemainingTime(data.start);
  const { couple, dateLabel } = data;
  const ringText = `${couple.first} & ${couple.second} · ${dateLabel.day} ${dateLabel.month} ${dateLabel.year} · `;

  return (
    <InView
      as="section"
      className={styles.section}
      aria-label="Countdown to the wedding"
    >
      <p className={`${styles.kicker} ${motion.kickerIn}`}>Counting the days</p>

      <div className={styles.sun}>
        <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path
              id="db-ring"
              d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
            />
          </defs>
          <text>
            <textPath href="#db-ring" textLength="512" lengthAdjust="spacing">
              {ringText}
              {ringText}
            </textPath>
          </text>
        </svg>
        <div className={styles.core}>
          <Bloom className={styles.bloom} />
          {remaining?.done ? (
            <span className={styles.doneTitle}>Today</span>
          ) : (
            <>
              <span key={remaining?.days} className={styles.days}>
                {remaining ? remaining.days : "—"}
              </span>
              <span className={styles.daysLabel}>days to go</span>
            </>
          )}
        </div>
      </div>

      {remaining?.done ? (
        <p className={styles.doneCopy}>
          The day has come. Thank you for blooming with us.
        </p>
      ) : (
        <div className={styles.row}>
          {UNITS.map((unit, index) => (
            <div
              key={unit.key}
              className={styles.arch}
              style={{ "--i": index } as CSSProperties}
            >
              <span className={styles.keystone} aria-hidden="true" />
              <span key={remaining?.[unit.key]} className={styles.value}>
                {remaining ? pad(remaining[unit.key]) : "--"}
              </span>
              <span className={styles.label}>{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </InView>
  );
}
