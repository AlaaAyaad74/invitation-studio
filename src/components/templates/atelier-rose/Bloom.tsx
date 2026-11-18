"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import styles from "./Bloom.module.css";
import ui from "./ui.module.css";

// Rings from the bud outwards. `start` is the hold progress (0..1) at which
// a ring begins to open.
const RINGS = [
  { r: 15, w: 10, n: 4, rot: 45, start: 0, fill: "#d99a92" },
  { r: 25, w: 15, n: 5, rot: 12, start: 0.2, fill: "#e6b0a7" },
  { r: 36, w: 21, n: 6, rot: 30, start: 0.42, fill: "#efc4bb" },
  { r: 47, w: 26, n: 7, rot: 0, start: 0.64, fill: "#f6d8d0" },
];

const HOLD_MS = 1700;
const CIRCLE = 2 * Math.PI * 46;

const BURST = Array.from({ length: 18 }, (_, index) => {
  const angle = (index / 18) * Math.PI * 2;
  const distance = 110 + ((index * 41) % 60);
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance),
    spin: ((index * 97) % 320) - 160,
    delay: (index % 4) * 40,
    tone: index % 3,
  };
});

function petal(r: number, w: number) {
  const base = -r * 0.1;
  return `M0,${base} C${w * 1.15},${-r * 0.3} ${w},${-r * 1.08} 0,${-r} C${-w},${-r * 1.08} ${-w * 1.15},${-r * 0.3} 0,${base}Z`;
}

/** Press and hold the bud: it opens ring by ring, then reveals the dress code. */
export default function Bloom() {
  const { dressCode } = data;
  const [progress, setProgress] = useState(0);
  const [bloomed, setBloomed] = useState(false);
  const holding = useRef(false);
  const value = useRef(0);
  const frame = useRef(0);
  const last = useRef(0);
  const ringsPassed = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const finish = () => {
    holding.current = false;
    value.current = 1;
    setProgress(1);
    setBloomed(true);
    navigator.vibrate?.([20, 40, 30]);
  };

  // Grows while held, wilts back slowly when released early.
  const tick = (now: number) => {
    const dt = last.current ? now - last.current : 16;
    last.current = now;
    const step = dt / HOLD_MS;
    value.current = holding.current
      ? Math.min(1, value.current + step)
      : Math.max(0, value.current - step * 1.6);

    const passed = RINGS.filter((ring) => value.current > ring.start + 0.05).length;
    if (passed > ringsPassed.current) navigator.vibrate?.(6);
    ringsPassed.current = passed;

    setProgress(value.current);
    if (value.current >= 1) {
      finish();
      return;
    }
    if (holding.current || value.current > 0) {
      frame.current = requestAnimationFrame(tick);
    } else {
      frame.current = 0;
    }
  };

  const start = () => {
    if (bloomed) return;
    holding.current = true;
    if (!frame.current) {
      last.current = 0;
      frame.current = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    holding.current = false;
  };

  return (
    <Reveal as="section" className={`${ui.section} ${ui.scallop} ${styles.section}`} aria-label="Dress code">
      <p className={`${ui.kicker} ${ui.rise}`}>What to wear</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Let it bloom
      </h2>
      <p className={`${ui.lead} ${ui.rise}`} style={{ "--d": "220ms" } as CSSProperties}>
        {bloomed ? "Our garden palette, made for you." : "Press and hold the rosebud until it opens."}
      </p>

      <div className={styles.stage} data-bloomed={bloomed ? "true" : "false"}>
        <button
          type="button"
          className={styles.bud}
          style={{ "--p": progress } as CSSProperties}
          aria-label={bloomed ? "The rose is open" : "Press and hold to open the rose"}
          disabled={bloomed}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            start();
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
          onContextMenu={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              finish();
            }
          }}
        >
          <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" className={styles.ringTrack} />
            <circle
              cx="50"
              cy="50"
              r="46"
              className={styles.ringFill}
              strokeDasharray={CIRCLE}
              strokeDashoffset={CIRCLE * (1 - progress)}
            />
          </svg>

          <svg className={styles.rose} viewBox="-52 -52 104 104" aria-hidden="true">
            {[...RINGS].reverse().map((ring) => (
              <g
                key={ring.r}
                className={styles.petals}
                style={{ "--start": ring.start } as CSSProperties}
                fill={ring.fill}
                filter="url(#ar-lift)"
              >
                {Array.from({ length: ring.n }, (_, index) => (
                  <path
                    key={index}
                    d={petal(ring.r, ring.w)}
                    transform={`rotate(${ring.rot + (360 / ring.n) * index})`}
                    stroke="#b8746f"
                    strokeOpacity="0.3"
                    strokeWidth="0.6"
                  />
                ))}
              </g>
            ))}
            <path
              d="M-6,1 a6,6 0 1,1 12,0 a4,4 0 1,1 -8,0 a2,2 0 1,1 4,0"
              fill="none"
              stroke="#a85f5d"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>

          {!bloomed ? <span className={styles.press}>hold</span> : null}
        </button>

        <span className={styles.burst} aria-hidden="true">
          {BURST.map((piece, index) => (
            <i
              key={index}
              data-tone={piece.tone}
              style={
                {
                  "--x": `${piece.x}px`,
                  "--y": `${piece.y}px`,
                  "--spin": `${piece.spin}deg`,
                  "--delay": `${piece.delay}ms`,
                } as CSSProperties
              }
            />
          ))}
        </span>
      </div>

      <div className={styles.card} data-bloomed={bloomed ? "true" : "false"} aria-live="polite">
        {bloomed ? (
          <>
            <p className={styles.cardTitle}>{dressCode.title}</p>
            <ul className={styles.swatches}>
              {dressCode.palette.map((swatch, index) => (
                <li key={swatch.name} style={{ "--i": index } as CSSProperties}>
                  <span className={styles.swatch} style={{ background: swatch.color }} />
                  <span className={styles.swatchName}>{swatch.name}</span>
                </li>
              ))}
            </ul>
            <p className={styles.cardNote}>{dressCode.note}</p>
          </>
        ) : null}
      </div>
    </Reveal>
  );
}
