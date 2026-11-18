"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Rose } from "./Paper";
import Reveal from "./Reveal";
import styles from "./Deck.module.css";
import ui from "./ui.module.css";

type Icon = (typeof data.moments)[number]["icon"];

const ICONS: Record<Icon, string> = {
  glass: "M9 3h6l-.6 6.2a2.4 2.4 0 0 1-4.8 0zM12 11.5V20M8.5 20.5h7",
  rings: "M9 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM15 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10 6.5l2-2.5 2 2.5-2 1.5z",
  candle: "M9 10h6v10.5H9zM12 10V8M12 7.5c-1.4-1.2-1.2-2.8 0-4.5 1.2 1.7 1.4 3.3 0 4.5zM7 20.5h10",
  music: "M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z",
};

const FLING = 90;
const LEAVE_MS = 380;

export default function Deck() {
  const moments = data.moments;
  const count = moments.length;
  const [top, setTop] = useState(0);
  const [dx, setDx] = useState(0);
  const [leaving, setLeaving] = useState<-1 | 1 | 0>(0);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);

  const go = (direction: -1 | 1) => {
    if (leaving) return;
    setLeaving(direction);
    navigator.vibrate?.(8);
    window.setTimeout(() => {
      setTop((current) => (current + 1) % count);
      setLeaving(0);
      setDx(0);
    }, LEAVE_MS);
  };

  const back = () => {
    if (leaving) return;
    setTop((current) => (current - 1 + count) % count);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (leaving) return;
    start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = start.current;
    if (!origin || origin.id !== event.pointerId) return;
    const moveX = event.clientX - origin.x;
    const moveY = event.clientY - origin.y;
    // Let vertical scrolls through; capture only sideways drags.
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      if (Math.abs(moveX) < 8 || Math.abs(moveX) < Math.abs(moveY)) return;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDx(moveX);
  };

  const onPointerEnd = () => {
    if (!start.current) return;
    start.current = null;
    if (Math.abs(dx) > FLING) go(dx > 0 ? 1 : -1);
    else setDx(0);
  };

  return (
    <Reveal as="section" className={`${ui.section} ${styles.section}`} aria-label="The day">
      <p className={`${ui.kicker} ${ui.rise}`}>The day</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Card by card
      </h2>

      <div
        className={`${styles.deck} ${ui.rise}`}
        style={{ "--d": "260ms" } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        aria-roledescription="carousel"
      >
        {moments.map((moment, index) => {
          const depth = (index - top + count) % count;
          const isTop = depth === 0;
          const style = {
            "--depth": depth,
            "--tilt": `${(index % 2 ? 1 : -1) * (depth === 0 ? 0 : 2 + depth)}deg`,
            zIndex: count - depth,
            ...(isTop
              ? {
                  "--dx": `${leaving ? leaving * 520 : dx}px`,
                  "--rot": `${(leaving ? leaving * 520 : dx) / 18}deg`,
                }
              : null),
          } as CSSProperties;

          return (
            <article
              key={moment.time}
              className={styles.card}
              style={style}
              data-top={isTop ? "true" : "false"}
              data-dragging={isTop && dx !== 0 && !leaving ? "true" : "false"}
              data-leaving={isTop && leaving ? "true" : "false"}
              aria-hidden={!isTop}
              aria-label={`${index + 1} of ${count}`}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d={ICONS[moment.icon]} />
              </svg>
              <p className={styles.time}>{moment.time}</p>
              <h3 className={styles.title}>{moment.title}</h3>
              <p className={styles.detail}>{moment.detail}</p>
              <Rose className={styles.cornerRose} tone={index % 2 ? "peach" : "blush"} />
            </article>
          );
        })}
      </div>

      <div className={`${styles.controls} ${ui.rise}`} style={{ "--d": "380ms" } as CSSProperties}>
        <button type="button" className={styles.arrow} onClick={back} aria-label="Previous moment">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <span className={styles.dots} aria-live="polite">
          <span className="sr-only">
            Moment {top + 1} of {count}: {moments[top].title}
          </span>
          {moments.map((moment, index) => (
            <i key={moment.time} data-on={index === top ? "true" : "false"} />
          ))}
        </span>
        <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next moment">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <p className={styles.hint}>swipe the cards</p>
    </Reveal>
  );
}
