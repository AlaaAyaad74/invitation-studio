import type { CSSProperties } from "react";
import styles from "./Petals.module.css";

// Fixed values (not Math.random) so server and client markup match.
const PETALS = [
  { x: 6, size: 14, dur: 15, delay: -2, sway: 38, tone: 0 },
  { x: 18, size: 10, dur: 19, delay: -11, sway: -30, tone: 1 },
  { x: 31, size: 16, dur: 17, delay: -6, sway: 44, tone: 2 },
  { x: 44, size: 9, dur: 21, delay: -15, sway: -26, tone: 0 },
  { x: 57, size: 13, dur: 16, delay: -9, sway: 34, tone: 1 },
  { x: 69, size: 11, dur: 20, delay: -3, sway: -40, tone: 2 },
  { x: 80, size: 15, dur: 18, delay: -13, sway: 30, tone: 0 },
  { x: 91, size: 10, dur: 22, delay: -7, sway: -34, tone: 1 },
];

export default function Petals() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {PETALS.map((petal, index) => (
        <span
          key={index}
          className={styles.fall}
          style={
            {
              "--x": `${petal.x}%`,
              "--dur": `${petal.dur}s`,
              "--delay": `${petal.delay}s`,
              "--sway": `${petal.sway}px`,
            } as CSSProperties
          }
        >
          <i
            className={styles.petal}
            data-tone={petal.tone}
            style={{ width: petal.size, height: petal.size * 1.25 }}
          />
        </span>
      ))}
    </div>
  );
}
