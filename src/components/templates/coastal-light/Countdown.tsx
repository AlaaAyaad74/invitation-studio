"use client";

import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data } from "@/data/coastal-light";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import { useEffect, useRef, useState } from "react";
import styles from "./Countdown.module.css";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type Unit = (typeof UNITS)[number]["key"];

function figures(remaining: ReturnType<typeof useRemainingTime>, key: Unit) {
  if (!remaining) return "—";
  return key === "days" ? String(remaining.days) : pad(remaining[key]);
}

function phrase(remaining: ReturnType<typeof useRemainingTime>) {
  if (!remaining) return "";
  const days = remaining.days;
  return `${days} ${days === 1 ? "morning" : "mornings"} until the marble court`;
}

function FlipFace({ value }: { value: string }) {
  const shown = useRef(value);
  const downRef = useRef<HTMLSpanElement>(null);
  const upRef = useRef<HTMLSpanElement>(null);
  const [front, setFront] = useState(value);
  const [back, setBack] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === shown.current) return;
    const from = shown.current;
    shown.current = value;
    if (from === "—" || value === "—") {
      setFront(value);
      setBack(value);
      setFlipping(false);
      return;
    }
    setBack(from);
    setFront(value);
    setFlipping(true);
  }, [value]);

  useEffect(() => {
    if (!flipping) return;
    const nodes = [downRef.current, upRef.current];
    for (const node of nodes) {
      if (!node) continue;
      node.style.animation = "none";
      void node.offsetWidth;
      node.style.removeProperty("animation");
    }
    const timeout = window.setTimeout(() => setFlipping(false), 750);
    return () => window.clearTimeout(timeout);
  }, [flipping, front]);

  return (
    <div className={styles.face} aria-hidden="true">
      <div className={styles.stage}>
        <span className={`${styles.leaf} ${styles.leafTop}`}>
          <span className={styles.clip}>
            <span className={styles.glyph}>{front}</span>
          </span>
        </span>
        <span className={`${styles.leaf} ${styles.leafBottom}`}>
          <span className={styles.clip}>
            <span className={`${styles.glyph} ${styles.glyphLow}`}>{flipping ? back : front}</span>
          </span>
        </span>
        <span className={styles.hinge} />
        {flipping ? (
          <>
            <span
              key={`down-${front}`}
              ref={downRef}
              className={`${styles.flap} ${styles.flapDown}`}
            >
              <span className={styles.clip}>
                <span className={styles.glyph}>{back}</span>
              </span>
            </span>
            <span
              key={`up-${front}`}
              ref={upRef}
              className={`${styles.flap} ${styles.flapUp}`}
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget || event.pseudoElement) return;
                if (!event.animationName.includes("unfold")) return;
                setFlipping(false);
              }}
            >
              <span className={styles.clip}>
                <span className={`${styles.glyph} ${styles.glyphLow}`}>{front}</span>
              </span>
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function Countdown() {
  const remaining = useRemainingTime(data.start);
  const dateLine = `${data.dateLabel.weekday}, ${data.dateLabel.day} ${data.dateLabel.month} ${data.dateLabel.year}`;

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
        <div className={styles.board} role="group" aria-label="Time remaining">
          {UNITS.map((item, index) => {
            const value = figures(remaining, item.key);
            return (
              <Reveal key={item.key} delayMs={40 + index * 70}>
                <div className={styles.card}>
                  <FlipFace value={value} />
                  <span className={styles.caption} aria-hidden="true">
                    {item.label}
                  </span>
                  <span className={styles.sr}>
                    {value} {item.label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}

      <Reveal delayMs={80}>
        <p className={styles.phrase} aria-live="polite">
          {remaining?.done ? "The day is here" : phrase(remaining)}
        </p>
      </Reveal>
      <Reveal delayMs={140}>
        <p className={styles.date}>{dateLine}</p>
      </Reveal>
    </section>
  );
}
