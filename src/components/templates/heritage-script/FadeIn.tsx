"use client";

import { useInView } from "@/hooks/useInView";
import {
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
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
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const Tag = as as ElementType;

  useInView(ref, () => setPlay(true), { threshold: 0.2, once: true });

  return (
    <Tag
      ref={ref}
      className={[styles.fade, play ? styles.play : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ animationDelay: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
