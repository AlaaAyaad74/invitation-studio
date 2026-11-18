"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Bow, Rose, Sprig } from "./Paper";
import styles from "./Opening.module.css";

type Phase = "closed" | "untying" | "opening" | "open";

const PULL_TO_UNTIE = 46;
const MAX_PULL = 90;

const PETALS = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2 + (index % 3) * 0.3;
  const distance = 90 + ((index * 37) % 70);
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance - 30),
    spin: ((index * 83) % 300) - 150,
    delay: (index % 5) * 35,
    tone: index % 3,
  };
});

type OrientationPermission = {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Card face, drawn full width; each door shows one half of it. */
function Face() {
  const { couple, dateLabel } = data;
  return (
    <div className={styles.face}>
      <Rose className={`${styles.cornerRose} ${styles.roseA}`} tone="blush" />
      <Rose className={`${styles.cornerRose} ${styles.roseB}`} tone="peach" />
      <Sprig className={`${styles.sprig} ${styles.sprigA}`} />
      <Rose className={`${styles.cornerRose} ${styles.roseC}`} tone="ivory" />
      <Sprig className={`${styles.sprig} ${styles.sprigB}`} />

      <p className={styles.atelier}>An invitation</p>
      <p className={styles.to}>to our dearest guest</p>

      <div className={styles.monogram}>
        <span className={styles.initial}>{couple.first[0]}</span>
        <span className={styles.amp}>&amp;</span>
        <span className={styles.initial}>{couple.second[0]}</span>
      </div>

      <p className={styles.date}>
        {dateLabel.day} · {dateLabel.month} · {dateLabel.year}
      </p>
    </div>
  );
}

export default function Opening({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [pull, setPull] = useState(0);
  const drag = useRef<{ y: number; moved: boolean } | null>(null);
  const onOpenRef = useRef(onOpen);
  useEffect(() => {
    onOpenRef.current = onOpen;
  });

  // Hold the page still (and at the top) until the doors are open.
  useEffect(() => {
    if (phase === "open") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    const previousBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      document.body.style.overflow = previousBody;
    };
  }, [phase]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const untie = () => {
    if (phase !== "closed") return;
    setPull(0);
    setPhase("untying");
    navigator.vibrate?.([12, 50, 20]);

    // iOS asks once, inside a tap, before tilt events reach the hero.
    const orientation = (
      typeof DeviceOrientationEvent === "undefined" ? undefined : DeviceOrientationEvent
    ) as OrientationPermission | undefined;
    orientation?.requestPermission?.().catch(() => {});

    const fast = reducedMotion();
    window.setTimeout(
      () => {
        setPhase("opening");
        onOpenRef.current();
      },
      fast ? 80 : 760,
    );
    window.setTimeout(() => setPhase("open"), fast ? 400 : 2300);
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (phase !== "closed") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { y: event.clientY, moved: false };
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const dy = event.clientY - drag.current.y;
    if (Math.abs(dy) > 6) drag.current.moved = true;
    setPull(Math.max(0, Math.min(MAX_PULL, dy)));
    if (dy > PULL_TO_UNTIE + 30) {
      drag.current = null;
      untie();
    }
  };

  const onPointerUp = () => {
    const current = drag.current;
    drag.current = null;
    if (!current) return;
    // A tap, or a pull far enough, unties the bow; a short tug springs back.
    if (!current.moved || pull >= PULL_TO_UNTIE) untie();
    else setPull(0);
  };

  if (phase === "open") return null;

  return (
    <div
      className={styles.overlay}
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label="Invitation, tied with a ribbon"
    >
      <div className={styles.scene}>
        <div className={`${styles.door} ${styles.left}`}>
          <Face />
        </div>
        <div className={`${styles.door} ${styles.right}`}>
          <Face />
        </div>

        <span className={styles.band} data-side="left" aria-hidden="true" />
        <span className={styles.band} data-side="right" aria-hidden="true" />

        <button
          type="button"
          className={styles.knot}
          style={{ "--pull": `${pull}px` } as CSSProperties}
          data-dragging={pull > 0 ? "true" : "false"}
          aria-label="Untie the ribbon to open the invitation"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setPull(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              untie();
            }
          }}
        >
          <Bow className={styles.bow} />
        </button>

        <p className={styles.hint} aria-hidden="true">
          <span>Pull the ribbon</span>
          <svg viewBox="0 0 12 20" className={styles.hintArrow}>
            <path d="M6 1v17M1 13l5 5 5-5" />
          </svg>
        </p>

        <span className={styles.burst} aria-hidden="true">
          {PETALS.map((petal, index) => (
            <i
              key={index}
              data-tone={petal.tone}
              style={
                {
                  "--x": `${petal.x}px`,
                  "--y": `${petal.y}px`,
                  "--spin": `${petal.spin}deg`,
                  "--delay": `${petal.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </div>
    </div>
  );
}
