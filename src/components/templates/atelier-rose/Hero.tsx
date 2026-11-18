"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useEffect, useRef, type CSSProperties } from "react";
import { Leaf, Rose, Sprig } from "./Paper";
import styles from "./Hero.module.css";

// Scalloped hedge along the bottom of the arch window (viewBox 400 x 700).
function hedge(top: number, bump: number, step: number, phase = 0) {
  let d = `M0,700 V${top}`;
  for (let x = -phase; x < 400 + step; x += step) {
    d += ` Q${x + step / 2},${top - bump} ${x + step},${top}`;
  }
  return `${d} V700Z`;
}

const DUST = Array.from({ length: 14 }, (_, index) => ({
  x: 22 + ((index * 41) % 56),
  y: 26 + ((index * 29) % 44),
  size: 2 + (index % 3),
  delay: (index * 0.73) % 6,
  dur: 6 + (index % 4),
}));

// Two paper butterflies, each on its own looping flight path.
const BUTTERFLIES = [
  { path: "a", delay: 1.2, scale: 1, tone: "#efc4bb" },
  { path: "b", delay: 5.5, scale: 0.75, tone: "#f3d2bd" },
];

function Butterfly({ tone }: { tone: string }) {
  return (
    <svg className={styles.butterflySvg} viewBox="-30 -24 60 48" aria-hidden="true">
      <g className={styles.wingLeft} filter="url(#ar-lift)">
        <path d="M-1,-2 C-12,-22 -30,-20 -27,-6 C-25,3 -12,2 -1,0Z" fill={tone} />
        <path d="M-1,1 C-10,4 -22,10 -18,18 C-14,23 -5,13 -1,2Z" fill={tone} opacity="0.85" />
        <path d="M-4,-4 C-12,-14 -20,-14 -22,-8" fill="none" stroke="#c98a85" strokeWidth="0.7" />
      </g>
      <g className={styles.wingRight} filter="url(#ar-lift)">
        <path d="M1,-2 C12,-22 30,-20 27,-6 C25,3 12,2 1,0Z" fill={tone} />
        <path d="M1,1 C10,4 22,10 18,18 C14,23 5,13 1,2Z" fill={tone} opacity="0.85" />
        <path d="M4,-4 C12,-14 20,-14 22,-8" fill="none" stroke="#c98a85" strokeWidth="0.7" />
      </g>
      <path d="M0,-6 L0,12" stroke="#7a4a4c" strokeWidth="2" strokeLinecap="round" />
      <path d="M0,-6 C-2,-12 -5,-14 -7,-15 M0,-6 C2,-12 5,-14 7,-15" fill="none" stroke="#7a4a4c" strokeWidth="0.7" />
    </svg>
  );
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function Hero({ ready }: { ready: boolean }) {
  const { couple, dateLabel } = data;
  const rootRef = useRef<HTMLElement>(null);

  // Butterfly flight paths are sized from the hero's box.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      root.style.setProperty("--hw", `${Math.round(entry.contentRect.width)}px`);
      root.style.setProperty("--hh", `${Math.round(entry.contentRect.height)}px`);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Layers drift with the pointer (desktop), the phone's tilt, and scroll.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0, scroll: -1 };
    let frame = 0;
    let visible = true;

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onTilt = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      target.x = Math.max(-1, Math.min(1, event.gamma / 25));
      target.y = Math.max(-1, Math.min(1, (event.beta - 45) / 25));
    };

    const tick = () => {
      frame = 0;
      if (!visible) return;
      current.x = lerp(current.x, target.x, 0.08);
      current.y = lerp(current.y, target.y, 0.08);
      const scroll = window.scrollY;
      root.style.setProperty("--px", current.x.toFixed(3));
      root.style.setProperty("--py", current.y.toFixed(3));
      if (scroll !== current.scroll) {
        current.scroll = scroll;
        root.style.setProperty("--sy", `${Math.min(scroll, 1200)}`);
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    observer.observe(root);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  return (
    <header
      ref={rootRef}
      className={styles.hero}
      data-ready={ready ? "true" : "false"}
      aria-label={`${couple.first} and ${couple.second}`}
    >
      {/* 0: sky */}
      <div className={styles.layer} style={{ "--depth": 0.2, "--i": 0 } as CSSProperties}>
        <div className={styles.sky}>
          <span className={styles.sun} />
        </div>
      </div>

      {/* 1: back arch */}
      <div className={styles.layer} style={{ "--depth": 0.6, "--i": 1 } as CSSProperties}>
        <svg className={styles.cut} viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M-200,-100 H600 V800 H-200Z M96,700 V300 A104,104 0 0 1 304,300 V700Z"
            fill="var(--paper-2)"
            filter="url(#ar-lift)"
          />
          <path
            d="M108,700 V300 A92,92 0 0 1 292,300 V700"
            fill="none"
            stroke="var(--gold)"
            strokeOpacity="0.55"
            strokeDasharray="1 5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2: hedge inside the window */}
      <div className={styles.layer} style={{ "--depth": 1, "--i": 2 } as CSSProperties}>
        <svg className={styles.cut} viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d={hedge(612, 30, 44, 10)} fill="#b9c6ad" filter="url(#ar-lift)" />
          <path d={hedge(640, 26, 36)} fill="var(--sage)" filter="url(#ar-lift)" />
        </svg>
      </div>

      {/* Gold dust in the window. */}
      <div className={styles.dust} aria-hidden="true">
        {DUST.map((speck, index) => (
          <i
            key={index}
            style={
              {
                left: `${speck.x}%`,
                top: `${speck.y}%`,
                width: speck.size,
                height: speck.size,
                animationDelay: `${speck.delay}s`,
                animationDuration: `${speck.dur}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* 3: names */}
      <div className={`${styles.layer} ${styles.copyLayer}`} style={{ "--depth": 1.4, "--i": 3 } as CSSProperties}>
        <div className={styles.copy}>
          <p className={styles.intro}>{data.intro}</p>
          <h1 className={styles.names}>
            <span className={styles.name} style={{ "--w": 0 } as CSSProperties}>
              {couple.first}
            </span>
            <span className={styles.amp}>&amp;</span>
            <span className={styles.name} style={{ "--w": 1 } as CSSProperties}>
              {couple.second}
            </span>
          </h1>
          <p className={styles.tagline}>{data.tagline}</p>
          <p className={styles.date}>
            <span>{dateLabel.weekday}</span>
            <span className={styles.dateDay}>{dateLabel.day}</span>
            <span>
              {dateLabel.month} {dateLabel.year}
            </span>
          </p>
        </div>
      </div>

      {/* 4: front arch with roses on its shoulders */}
      <div className={styles.layer} style={{ "--depth": 2.2, "--i": 4 } as CSSProperties}>
        <svg className={styles.cut} viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M-200,-100 H600 V800 H-200Z M56,700 V268 A144,144 0 0 1 344,268 V700Z"
            fill="#f4e2dc"
            filter="url(#ar-lift)"
          />
          <path
            d="M68,700 V268 A132,132 0 0 1 332,268 V700"
            fill="none"
            stroke="var(--blush-deep)"
            strokeWidth="1"
          />
        </svg>
        <p className={styles.crest}>
          <span>{couple.first[0]}</span>
          <em>&amp;</em>
          <span>{couple.second[0]}</span>
        </p>
        <div className={styles.shoulder} data-side="left">
          <Sprig className={styles.shoulderSprig} />
          <Rose className={styles.shoulderRose} tone="blush" />
          <Rose className={styles.shoulderBud} tone="ivory" />
        </div>
        <div className={styles.shoulder} data-side="right">
          <Sprig className={styles.shoulderSprig} />
          <Rose className={styles.shoulderRose} tone="peach" />
          <Rose className={styles.shoulderBud} tone="blush" />
        </div>
      </div>

      {/* 5: foreground blooms */}
      <div className={styles.layer} style={{ "--depth": 3.2, "--i": 5 } as CSSProperties}>
        <div className={styles.front} data-side="left">
          <Leaf className={styles.frontLeaf} style={{ "--r": "-130deg" } as CSSProperties} />
          <Leaf className={styles.frontLeaf} style={{ "--r": "-60deg" } as CSSProperties} />
          <Rose className={styles.frontRose} tone="peach" />
          <Rose className={styles.frontRoseSmall} tone="blush" />
        </div>
        <div className={styles.front} data-side="right">
          <Leaf className={styles.frontLeaf} style={{ "--r": "-40deg" } as CSSProperties} />
          <Leaf className={styles.frontLeaf} style={{ "--r": "-120deg" } as CSSProperties} />
          <Rose className={styles.frontRose} tone="blush" />
          <Rose className={styles.frontRoseSmall} tone="ivory" />
        </div>
      </div>

      {BUTTERFLIES.map((butterfly) => (
        <span
          key={butterfly.path}
          className={styles.butterfly}
          data-path={butterfly.path}
          style={{ "--delay": `${butterfly.delay}s`, "--scale": butterfly.scale } as CSSProperties}
        >
          <Butterfly tone={butterfly.tone} />
        </span>
      ))}

      <a href="#ar-story" className={styles.cue}>
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </header>
  );
}
