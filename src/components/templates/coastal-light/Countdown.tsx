"use client";

import Reveal from "@/components/Reveal";
import type { CoastalLightInvitation } from "@/data/coastal-light";
import { arabicDays, fullDate, templateCopy } from "@/data/template-copy";
import type { Lang } from "@/lib/i18n";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";
import { useEffect, useRef, useState } from "react";
import styles from "./Countdown.module.css";

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

type Unit = (typeof UNITS)[number];

function figures(remaining: ReturnType<typeof useRemainingTime>, key: Unit) {
  if (!remaining) return "—";
  return key === "days" ? String(remaining.days) : pad(remaining[key]);
}

function phrase(remaining: ReturnType<typeof useRemainingTime>, lang: Lang) {
  if (!remaining) return "";
  const days = remaining.days;
  if (lang === "ar") return `فاضل ${arabicDays(days)} على القاعة الرخامية`;
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

export default function Countdown({ data }: { data: CoastalLightInvitation }) {
  const remaining = useRemainingTime(data.start);
  const ar = data.lang === "ar";
  const common = templateCopy(data.lang);

  const dateLine = fullDate(data.dateLabel, data.lang);

  return (
    <section className={styles.section} aria-label={common.countdownLabel}>
      <Reveal>
        <p className={styles.index}>
          <span>01</span>
          {ar ? "فاضل" : "Remaining"}
        </p>
      </Reveal>

      {remaining?.done ? (
        <Reveal delayMs={90}>
          <p className={styles.today}>{common.today}</p>
        </Reveal>
      ) : (
        <div className={styles.board} role="group" aria-label={common.timeRemaining}>
          {UNITS.map((item, index) => {
            const value = figures(remaining, item);
            const label = common.units[item];
            return (
              <Reveal key={item} delayMs={40 + index * 70}>
                <div className={styles.card}>
                  <FlipFace value={value} />
                  <span className={styles.caption} aria-hidden="true">
                    {label}
                  </span>
                  <span className={styles.sr}>
                    {value} {label}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}

      <Reveal delayMs={80}>
        <p className={styles.phrase} aria-live="polite">
          {remaining?.done
            ? ar
              ? "جه اليوم اللي مستنيينه"
              : "The day is here"
            : phrase(remaining, data.lang)}
        </p>
      </Reveal>
      <Reveal delayMs={140}>
        <p className={styles.date}>{dateLine}</p>
      </Reveal>
    </section>
  );
}
