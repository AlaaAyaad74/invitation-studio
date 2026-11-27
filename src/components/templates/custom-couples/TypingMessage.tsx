"use client";

import InkFlourishIcon from "@/components/icons/InkFlourishIcon";
import { useEffect, useRef, useState } from "react";
import ArabicTyping from "@/components/templates/custom-couples/ArabicTyping";
import styles from "./TypingMessage.module.css";

/** Matches the last flourish keyframe in TypingMessage.module.css. */
const FLOURISH_DRAW_MS = 2520;
const TEXT_LEAD_MS = 180;
const BOTTOM_PAUSE_MS = 320;

function Flourish({
  className,
  draw,
}: {
  className?: string;
  draw: boolean;
}) {
  return (
    <div
      className={`${styles.flourish} ${draw ? styles.draw : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <InkFlourishIcon className={styles.flourishSvg} classes={styles} />
    </div>
  );
}

function isSectionInView(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight * 0.9 && rect.bottom > viewHeight * 0.1;
}

export default function TypingMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottomTimer = useRef(0);
  const [started, setStarted] = useState(false);
  const [textOn, setTextOn] = useState(false);
  const [bottomOn, setBottomOn] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || started) return;

    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setStarted(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        start();
        observer.disconnect();
      },
      { threshold: [0, 0.12, 0.25] },
    );
    observer.observe(section);

    const check = () => {
      if (isSectionInView(section)) start();
    };

    check();
    const raf = window.requestAnimationFrame(check);
    const poll = window.setInterval(check, 180);
    window.addEventListener("scroll", check, { passive: true, capture: true });
    window.addEventListener("resize", check);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearInterval(poll);
      window.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => setTextOn(true),
      reduced ? 0 : FLOURISH_DRAW_MS,
    );
    return () => window.clearTimeout(timer);
  }, [started]);

  useEffect(() => () => window.clearTimeout(bottomTimer.current), []);

  const handleTyped = () => {
    window.clearTimeout(bottomTimer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bottomTimer.current = window.setTimeout(
      () => setBottomOn(true),
      reduced ? 0 : BOTTOM_PAUSE_MS,
    );
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Arabic invitation message"
    >
      <Flourish draw={started} />
      <div className={styles.message}>
        <ArabicTyping
          active={textOn}
          startDelay={TEXT_LEAD_MS}
          onComplete={handleTyped}
        />
      </div>
      <Flourish className={styles.flourishBottom} draw={bottomOn} />
    </section>
  );
}
