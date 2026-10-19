"use client";

import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data } from "@/data/coastal-light";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import { useState } from "react";
import styles from "./Countdown.module.css";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

type Unit = (typeof UNITS)[number]["key"];

function figures(remaining: ReturnType<typeof useRemainingTime>, key: Unit) {
  if (!remaining) return "—";
  return key === "days" ? String(remaining.days) : pad(remaining[key]);
}

function phrase(remaining: ReturnType<typeof useRemainingTime>, unit: Unit) {
  if (!remaining) return "";
  if (unit === "days") {
    const days = remaining.days;
    return `${days} ${days === 1 ? "morning" : "mornings"} until the marble court`;
  }
  if (unit === "hours") {
    const hours = remaining.hours;
    if (hours === 0) return "This hour has just begun";
    return `${hours} ${hours === 1 ? "hour" : "hours"} still in this day`;
  }
  if (unit === "minutes") {
    const minutes = remaining.minutes;
    if (minutes === 0) return "The hour has just turned";
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} until the hour turns`;
  }
  return "Every second, a little closer";
}

function Figures({ value }: { value: string }) {
  return (
    <span className={styles.figures}>
      {value.split("").map((char, index) => (
        <span key={`${index}-${char}`} className={styles.figure}>
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Countdown() {
  const remaining = useRemainingTime(data.start);
  const [unit, setUnit] = useState<Unit>("days");
  const dateLine = `${data.dateLabel.weekday}, ${data.dateLabel.day} ${data.dateLabel.month} ${data.dateLabel.year}`;
  const status = `${data.dateLabel.weekday.slice(0, 3)} ${data.dateLabel.day} ${data.dateLabel.month.slice(0, 3)}`;

  return (
    <section className={styles.section} aria-label="Countdown to the wedding">
      <Reveal>
        <p className={styles.index}>
          <span>01</span>
          Remaining
        </p>
      </Reveal>

      {remaining?.done ? (
        <Reveal delayMs={90}>
          <p className={styles.today}>Today</p>
        </Reveal>
      ) : (
        <Reveal delayMs={90}>
          <div className={styles.watch}>
            <span className={styles.side} aria-hidden="true" />
            <div className={styles.screen}>
              <p className={styles.status}>
                <i className={styles.live} aria-hidden="true" />
                {status}
              </p>

              <div className={styles.readout} role="group" aria-label="Time remaining">
                {UNITS.map((item, index) => (
                  <span key={item.key} className={styles.slot}>
                    {index > 1 ? (
                      <span className={styles.colon} aria-hidden="true">
                        :
                      </span>
                    ) : null}
                    <button
                      type="button"
                      className={item.key === unit ? styles.unitOn : styles.unit}
                      aria-pressed={item.key === unit}
                      onClick={() => setUnit(item.key)}
                    >
                      <Figures value={figures(remaining, item.key)} />
                      <span className={styles.caption}>{item.label}</span>
                    </button>
                  </span>
                ))}
              </div>

              <div className={styles.track} aria-hidden="true">
                <i style={{ width: `${((remaining?.seconds ?? 0) / 60) * 100}%` }} />
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delayMs={160}>
        <p className={styles.phrase} aria-live="polite">
          {remaining?.done ? "The day is here" : phrase(remaining, unit)}
        </p>
        <p className={styles.date}>{dateLine}</p>
      </Reveal>
    </section>
  );
}
