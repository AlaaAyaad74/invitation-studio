"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./FadeIn.module.css";

type FadeInProps = {
  as?: "div" | "li" | "p" | "h2";
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeIn({
  as = "div",
  children,
  className,
  delay = 0,
}: FadeInProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [play, setPlay] = useState(false);
  const Tag = as;

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <Tag
      ref={setNode}
      className={[styles.fade, play ? styles.play : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ animationDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
