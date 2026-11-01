"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./ArabicTyping.module.css";

const DEFAULT_LINES = [
  "ومن بين كثيرٍ من الطرق",
  "شاء الله أن يلتقي قلبان",
  "وأن تبدأ بينهما حكايةٌ",
  "عنوانها المودّة",
  "وفصولها السكينة",
];

export type ArabicTypingProps = {
  lines?: string[];
  /** Average ms per grapheme while typing. */
  charMs?: number;
  /** Extra pause after finishing a line. */
  lineGap?: number;
  /** Delay before the first character. */
  startDelay?: number;
  fontSize?: string;
  lineHeight?: number;
  fontWeight?: number;
  wordSpacing?: string;
  color?: string;
  fontFamily?: string;
  /** When false, waits for `active` before typing. */
  active?: boolean;
  /** Fires once, after the last line has finished. */
  onComplete?: () => void;
};

function segmentGraphemes(text: string): string[] {
  try {
    const Segmenter = (
      Intl as typeof Intl & {
        Segmenter?: new (
          locales?: string,
          options?: { granularity: "grapheme" },
        ) => { segment: (input: string) => Iterable<{ segment: string }> };
      }
    ).Segmenter;
    if (Segmenter) {
      return Array.from(
        new Segmenter("ar", { granularity: "grapheme" }).segment(text),
        ({ segment }) => segment,
      );
    }
  } catch {
    /* fall through */
  }
  return Array.from(text);
}

function stepDelay(char: string, charMs: number) {
  if (/\s/.test(char)) return charMs * 1.45;
  if (/[،,.!؟:]/.test(char)) return charMs * 1.9;
  return charMs * (0.82 + Math.random() * 0.36);
}

/**
 * Types Arabic line-by-line by clipping the fully-shaped line.
 * That keeps letter joins stable and prevents mid-word wrapping jumps.
 */
export default function ArabicTyping({
  lines = DEFAULT_LINES,
  charMs = 110,
  lineGap = 700,
  startDelay = 400,
  fontSize = "clamp(1.55rem, 5.8vw, 2.45rem)",
  lineHeight = 1.95,
  fontWeight = 400,
  wordSpacing = "0.22em",
  color = "#fffaf3",
  fontFamily = "var(--font-amiri), 'Times New Roman', serif",
  active = true,
  onComplete,
}: ArabicTypingProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const label = useMemo(() => lines.join(" "), [lines]);
  const graphemeLines = useMemo(
    () => lines.map((line) => segmentGraphemes(line)),
    [lines],
  );

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const speed = reduced ? Math.max(charMs * 0.7, 70) : charMs;
    const gap = reduced ? Math.max(lineGap * 0.7, 420) : lineGap;
    const delay = reduced ? Math.max(startDelay * 0.7, 280) : startDelay;

    let cancelled = false;
    let timer = 0;
    let currentLine = 0;
    let currentChar = 0;

    setLineIndex(0);
    setCharIndex(0);
    setDone(false);

    const schedule = (ms: number, fn: () => void) => {
      timer = window.setTimeout(fn, ms);
    };

    const typeNext = () => {
      if (cancelled) return;

      const graphemes = graphemeLines[currentLine] ?? [];
      if (currentChar < graphemes.length) {
        currentChar += 1;
        setLineIndex(currentLine);
        setCharIndex(currentChar);
        const justTyped = graphemes[currentChar - 1] ?? "";
        schedule(stepDelay(justTyped, speed), typeNext);
        return;
      }

      if (currentLine < graphemeLines.length - 1) {
        schedule(gap, () => {
          if (cancelled) return;
          currentLine += 1;
          currentChar = 0;
          setLineIndex(currentLine);
          setCharIndex(0);
          typeNext();
        });
        return;
      }

      setDone(true);
      onCompleteRef.current?.();
    };

    schedule(delay, typeNext);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, charMs, graphemeLines, lineGap, startDelay]);

  return (
    <div
      className={styles.root}
      dir="rtl"
      lang="ar"
      aria-label={label}
      style={{
        fontFamily,
        fontSize,
        lineHeight,
        color,
        fontWeight,
        wordSpacing,
        letterSpacing: "0.02em",
      }}
    >
      {lines.map((line, index) => {
        const total = graphemeLines[index]?.length || 1;
        let progress = 0;
        if (index < lineIndex) progress = 1;
        else if (index === lineIndex) progress = charIndex / total;

        const showCaret = active && !done && index === lineIndex && progress > 0;
        // RTL: hide from the left, reveal from the right.
        const unrevealed = `${((1 - progress) * 100).toFixed(3)}%`;

        return (
          <p className={styles.line} key={`${index}-${line}`} aria-hidden="true">
            <span className={styles.inner}>
              <span className={styles.sizer}>{line}</span>
              <span
                className={styles.typed}
                style={{ "--unrevealed": unrevealed } as CSSProperties}
              >
                {line}
              </span>
              {showCaret ? (
                <span
                  className={styles.caret}
                  style={
                    {
                      insetInlineStart: `calc(${(progress * 100).toFixed(3)}% - 0.04em)`,
                    } as CSSProperties
                  }
                />
              ) : null}
            </span>
          </p>
        );
      })}
    </div>
  );
}
