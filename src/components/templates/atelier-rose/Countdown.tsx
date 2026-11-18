"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import { useState, type CSSProperties } from "react";
import { Rose } from "./Paper";
import Reveal from "./Reveal";
import styles from "./Countdown.module.css";
import ui from "./ui.module.css";

function Half({ side, value }: { side: "top" | "bottom"; value: string }) {
  return (
    <span className={`${styles.half} ${styles[side]}`}>
      <b>{value}</b>
    </span>
  );
}

/** Paper split-flap: the old leaf folds down over the new value. */
function Flap({ value, label }: { value: string; label: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }
  const flipping = previous !== current;

  return (
    <div className={styles.unit}>
      <div className={styles.flap} data-wide={value.length > 2 ? "true" : "false"}>
        <Half side="top" value={current} />
        <Half side="bottom" value={current} />
        {flipping ? (
          <>
            {/* Old lower half, until the new leaf lands on it. */}
            <span key={`${current}-stale`} className={styles.stale}>
              <Half side="bottom" value={previous} />
            </span>
            <span key={`${current}-down`} className={styles.leafDown}>
              <Half side="top" value={previous} />
            </span>
            <span key={`${current}-up`} className={styles.leafUp}>
              <Half side="bottom" value={current} />
            </span>
          </>
        ) : null}
        <span className={styles.hinge} aria-hidden="true" />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function Countdown() {
  const remaining = useRemainingTime(data.start);
  const { dateLabel } = data;

  const units = [
    { label: "Days", value: remaining ? String(remaining.days).padStart(2, "0") : "--" },
    { label: "Hours", value: remaining ? pad(remaining.hours) : "--" },
    { label: "Minutes", value: remaining ? pad(remaining.minutes) : "--" },
    { label: "Seconds", value: remaining ? pad(remaining.seconds) : "--" },
  ];

  return (
    <Reveal as="section" className={`${ui.section} ${ui.scallop} ${styles.section}`} aria-label="Countdown to the wedding">
      <p className={`${ui.kicker} ${ui.rise}`}>Save the date</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Until we say yes
      </h2>

      {/* Stitched date tag. */}
      <div className={styles.tag}>
        <Rose className={styles.tagRose} tone="peach" />
        <span className={styles.tagWeekday}>{dateLabel.weekday}</span>
        <span className={styles.tagDay}>{dateLabel.day}</span>
        <span className={styles.tagMonth}>
          {dateLabel.month} · {dateLabel.year}
        </span>
        <span className={styles.tagTime}>at {data.timeShort}</span>
      </div>

      {remaining?.done ? (
        <p className={`${ui.lead} ${ui.rise}`}>Today is the day. Thank you for being part of our story.</p>
      ) : (
        <div
          className={`${styles.row} ${ui.rise}`}
          style={{ "--d": "380ms" } as CSSProperties}
          role="timer"
          aria-live="off"
        >
          {units.map((unit) => (
            <Flap key={unit.label} value={unit.value} label={unit.label} />
          ))}
        </div>
      )}
    </Reveal>
  );
}
