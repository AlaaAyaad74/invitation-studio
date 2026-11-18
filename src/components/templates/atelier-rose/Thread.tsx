"use client";

import { useEffect, useRef } from "react";
import { Rose } from "./Paper";
import styles from "./Thread.module.css";

/** A silk thread down the edge of the page; a rosebud travels along it as you scroll. */
export default function Thread({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      node.style.setProperty("--sp", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  return (
    <div ref={ref} className={styles.thread} data-active={active ? "true" : "false"} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.fill} />
      <span className={styles.bead}>
        <Rose className={styles.rose} tone="blush" />
      </span>
    </div>
  );
}
