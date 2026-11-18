"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./Petals.module.css";

const DRIFT = Array.from({ length: 9 }, (_, index) => ({
  left: (index * 23 + 7) % 100,
  delay: index * 2.3,
  duration: 13 + (index % 4) * 3,
  size: 0.55 + (index % 3) * 0.2,
  tone: index % 3,
}));

const COLORS = ["#ecc3ba", "#f6d5bf", "#e2afa6", "#b9945f"];

/** Petals drifting down the page, plus a little burst wherever you tap. */
export default function Petals({ active }: { active: boolean }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onTap = (event: PointerEvent) => {
      const host = layer.current;
      const target = event.target as Element | null;
      if (!host || target?.closest("input, textarea, select, label")) return;
      if (host.childElementCount > 48) return;

      for (let i = 0; i < 7; i += 1) {
        const petal = document.createElement("i");
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.6;
        const distance = 28 + Math.random() * 34;
        petal.className = styles.spark;
        petal.style.cssText = [
          `left:${event.clientX}px`,
          `top:${event.clientY}px`,
          `--x:${Math.cos(angle) * distance}px`,
          `--y:${Math.sin(angle) * distance - 10}px`,
          `--r:${Math.round(Math.random() * 360)}deg`,
          `background:${COLORS[i % COLORS.length]}`,
        ].join(";");
        petal.addEventListener("animationend", () => petal.remove(), { once: true });
        host.appendChild(petal);
      }
    };

    document.addEventListener("pointerdown", onTap, { passive: true });
    return () => document.removeEventListener("pointerdown", onTap);
  }, [active]);

  return (
    <>
      <div className={styles.drift} data-active={active ? "true" : "false"} aria-hidden="true">
        {DRIFT.map((petal, index) => (
          <i
            key={index}
            data-tone={petal.tone}
            style={
              {
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                "--s": petal.size,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div ref={layer} className={styles.taps} aria-hidden="true" />
    </>
  );
}
