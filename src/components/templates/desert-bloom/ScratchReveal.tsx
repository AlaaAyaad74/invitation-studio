"use client";

import { desertBloomInvitation as data } from "@/data/desert-bloom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import InView from "./InView";
import shared from "./Invitation.module.css";
import { Bloom, Branch } from "./Ornaments";
import styles from "./ScratchReveal.module.css";

const BRUSH = 36;
const CLEAR_AT = 0.5;
const FOOT_RADIUS = 20;

const CONFETTI = Array.from({ length: 22 }, (_, index) => ({
  x: ((index * 37) % 100) - 50,
  rise: 90 + ((index * 53) % 80),
  spin: ((index * 71) % 360) - 180,
  delay: (index % 6) * 40,
  tone: index % 3,
}));

const TWINKLES = [
  { x: 18, y: 42, d: 0 },
  { x: 80, y: 30, d: 900 },
  { x: 70, y: 80, d: 1700 },
  { x: 26, y: 76, d: 2500 },
];

// Arch outline: half circle on top, rounded foot.
function archPath(
  ctx: CanvasRenderingContext2D,
  inset: number,
  width: number,
  height: number,
) {
  const left = inset;
  const right = width - inset;
  const bottom = height - inset;
  const radius = (right - left) / 2;
  const foot = Math.max(FOOT_RADIUS - inset, 4);
  const cx = width / 2;
  const cy = inset + radius;

  ctx.beginPath();
  ctx.moveTo(left, cy);
  ctx.arc(cx, cy, radius, Math.PI, 0);
  ctx.lineTo(right, bottom - foot);
  ctx.quadraticCurveTo(right, bottom, right - foot, bottom);
  ctx.lineTo(left + foot, bottom);
  ctx.quadraticCurveTo(left, bottom, left, bottom - foot);
  ctx.closePath();
}

function embossedBloom(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const petals = (dx: number, dy: number, color: string) => {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i += 1) {
      ctx.save();
      ctx.translate(x + dx, y + dy);
      ctx.rotate((Math.PI * 2 * i) / 5);
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.42, size * 0.28, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
  petals(0.8, 1, "rgba(90, 62, 28, 0.32)");
  petals(-0.6, -0.8, "rgba(255, 246, 222, 0.55)");
  petals(0, 0, "rgba(201, 165, 107, 0.9)");
  ctx.beginPath();
  ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 240, 205, 0.85)";
  ctx.fill();
}

function embossedText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, ink: string) {
  // Engraved: a thin light edge under the ink.
  ctx.fillStyle = "rgba(255, 246, 222, 0.7)";
  ctx.fillText(text, x, y + 1);
  ctx.fillStyle = ink;
  ctx.fillText(text, x, y);
}

function paintFoil(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";

  const { width, height } = rect;
  ctx.save();
  archPath(ctx, 0, width, height);
  ctx.clip();

  // Base metal.
  const foil = ctx.createLinearGradient(0, 0, width, height);
  foil.addColorStop(0, "#b8925a");
  foil.addColorStop(0.22, "#e9d1a0");
  foil.addColorStop(0.42, "#c19a5f");
  foil.addColorStop(0.6, "#f3e2bb");
  foil.addColorStop(0.8, "#c7a166");
  foil.addColorStop(1, "#9c7a45");
  ctx.fillStyle = foil;
  ctx.fillRect(0, 0, width, height);

  // Soft light from the top of the arch.
  const glow = ctx.createRadialGradient(width / 2, height * 0.15, 0, width / 2, height * 0.15, width * 0.7);
  glow.addColorStop(0, "rgba(255, 247, 226, 0.55)");
  glow.addColorStop(1, "rgba(255, 247, 226, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Brushed-metal streaks.
  ctx.lineWidth = 1;
  for (let i = -height; i < width; i += 3) {
    ctx.strokeStyle = i % 9 === 0 ? "rgba(255, 248, 228, 0.12)" : "rgba(110, 80, 40, 0.05)";
    ctx.beginPath();
    ctx.moveTo(i, height);
    ctx.lineTo(i + height * 0.6, 0);
    ctx.stroke();
  }

  // Fine grain.
  for (let i = 0; i < (width * height) / 22; i += 1) {
    const x = (i * 97.13) % width;
    const y = (i * 57.71 + (i % 7) * 13) % height;
    ctx.fillStyle = i % 2 ? "rgba(255,248,230,0.2)" : "rgba(90,64,30,0.1)";
    ctx.fillRect(x, y, 1, 1);
  }

  // Double frame that follows the arch.
  ctx.strokeStyle = "rgba(255, 246, 225, 0.75)";
  ctx.lineWidth = 1;
  archPath(ctx, 9.5, width, height);
  ctx.stroke();
  ctx.strokeStyle = "rgba(120, 88, 42, 0.35)";
  ctx.setLineDash([2, 4]);
  archPath(ctx, 14.5, width, height);
  ctx.stroke();
  ctx.setLineDash([]);

  embossedBloom(ctx, width / 2, height * 0.24, Math.min(width, height) * 0.11);

  const style = getComputedStyle(canvas);
  const script = style.getPropertyValue("--font-db-script") || "cursive";
  const sans = style.getPropertyValue("--font-db-sans") || "sans-serif";
  const cy = height * 0.55;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${Math.round(width / 8.6)}px ${script}, cursive`;
  embossedText(ctx, "Scratch here", width / 2, cy, "rgba(62, 44, 28, 0.82)");

  // Divider with a diamond.
  const lineY = cy + 26;
  ctx.strokeStyle = "rgba(62, 44, 28, 0.35)";
  ctx.beginPath();
  ctx.moveTo(width / 2 - 46, lineY);
  ctx.lineTo(width / 2 - 8, lineY);
  ctx.moveTo(width / 2 + 8, lineY);
  ctx.lineTo(width / 2 + 46, lineY);
  ctx.stroke();
  ctx.save();
  ctx.translate(width / 2, lineY);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "rgba(62, 44, 28, 0.5)";
  ctx.fillRect(-2.5, -2.5, 5, 5);
  ctx.restore();

  ctx.font = `500 9.5px ${sans}, sans-serif`;
  embossedText(ctx, "T O   R E V E A L   T H E   D A T E", width / 2, lineY + 20, "rgba(62, 44, 28, 0.62)");

  ctx.restore();
}

export default function ScratchReveal() {
  const { dateLabel } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<HTMLSpanElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [touched, setTouched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    let size = "";
    const draw = () => {
      // Never repaint over a scratch in progress.
      if (moves.current > 0) return;
      const rect = canvas.getBoundingClientRect();
      const next = `${rect.width}x${rect.height}`;
      if (next === size) return;
      size = next;
      paintFoil(canvas);
    };
    const redrawFonts = () => {
      size = "";
      draw();
    };
    // Wait for the script font so the foil text is not drawn in a fallback.
    document.fonts?.ready.then(redrawFonts);
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [revealed]);

  const reveal = useCallback(() => {
    setProgress(1);
    setRevealed(true);
    navigator.vibrate?.([18, 40, 18]);
  }, []);

  const checkCleared = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;
    const { data: pixels } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 4 * 24) {
      total += 1;
      if (pixels[i] < 40) clear += 1;
    }
    if (!total) return;
    // The corners outside the arch are always clear; count only the foil.
    const ratio = clear / total;
    const outside = (canvas.width / canvas.height) * (0.5 - Math.PI / 8);
    const scratched = Math.max(0, (ratio - outside) / (1 - outside));
    setProgress(Math.min(1, scratched / CLEAR_AT));
    if (scratched >= CLEAR_AT) reveal();
  }, [reveal]);

  // Gold flecks that fall from the coin, straight in the DOM (no re-render).
  const dust = (x: number, y: number) => {
    const layer = dustRef.current;
    if (!layer || layer.childElementCount > 40) return;
    const fleck = document.createElement("i");
    const drift = ((moves.current * 37) % 40) - 20;
    fleck.style.cssText = `left:${x}px;top:${y}px;--dx:${drift}px;--s:${2 + (moves.current % 3)}px`;
    fleck.addEventListener("animationend", () => fleck.remove(), { once: true });
    layer.appendChild(fleck);
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx || revealed) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    const from = last.current ?? { x: x - 0.1, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
    moves.current += 1;
    if (moves.current % 2 === 0) dust(x, y);
    if (moves.current % 8 === 0) checkCleared();
  };

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  return (
    <InView as="section" className={styles.section} aria-label="The date">
      <p className={`${styles.kicker} ${shared.kickerIn}`}>Save the date</p>
      <h2 className={`${styles.title} ${shared.writeIn}`}>A little secret</h2>

      <div className={styles.stage} data-revealed={revealed ? "true" : "false"}>
        <span className={styles.halo} aria-hidden="true">
          <Bloom className={styles.haloBloom} />
        </span>

        <div className={styles.card}>
          <div className={styles.date}>
            <span className={styles.weekday}>{dateLabel.weekday}</span>
            <span className={styles.dayRow}>
              <span className={styles.month}>{dateLabel.month}</span>
              <span className={styles.day}>{dateLabel.day}</span>
              <span className={styles.month}>{dateLabel.year}</span>
            </span>
            <span className={styles.time}>at {data.timeShort}</span>
            <Branch className={styles.branch} />
          </div>

          <canvas
            ref={canvasRef}
            className={styles.foil}
            data-gone={revealed ? "true" : "false"}
            aria-hidden="true"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              last.current = null;
              if (!touched) {
                setTouched(true);
                navigator.vibrate?.(8);
              }
              const { x, y } = point(event);
              scratch(x, y);
            }}
            onPointerMove={(event) => {
              if (event.buttons === 0 && event.pointerType === "mouse") return;
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
              const { x, y } = point(event);
              scratch(x, y);
            }}
            onPointerUp={() => {
              last.current = null;
              checkCleared();
            }}
          />

          {revealed ? null : (
            <span className={styles.overlay} data-touched={touched ? "true" : "false"} aria-hidden="true">
              <span className={styles.shine} />
              {TWINKLES.map((star, index) => (
                <i
                  key={index}
                  className={styles.twinkle}
                  style={
                    {
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      animationDelay: `${star.d}ms`,
                    } as CSSProperties
                  }
                />
              ))}
              <span className={styles.coin}>
                <Bloom className={styles.coinBloom} />
              </span>
            </span>
          )}

          <span ref={dustRef} className={styles.dust} aria-hidden="true" />

          {revealed ? (
            <span className={styles.confetti} aria-hidden="true">
              {CONFETTI.map((piece, index) => (
                <i
                  key={index}
                  data-tone={piece.tone}
                  style={
                    {
                      "--x": `${piece.x * 2.6}px`,
                      "--rise": `${piece.rise}px`,
                      "--spin": `${piece.spin}deg`,
                      "--delay": `${piece.delay}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
          ) : null}
        </div>
      </div>

      {revealed ? (
        <p className={styles.after}>
          <Bloom className={styles.afterBloom} />
          We can&rsquo;t wait to celebrate with you
          <Bloom className={styles.afterBloom} />
        </p>
      ) : (
        <div className={styles.footer}>
          <span
            className={styles.progress}
            data-on={touched ? "true" : "false"}
            role="progressbar"
            aria-label="Scratched"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
          <button type="button" className={styles.skip} onClick={reveal}>
            or tap to reveal
          </button>
        </div>
      )}
    </InView>
  );
}
