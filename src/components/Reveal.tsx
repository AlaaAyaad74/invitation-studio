"use client";

import { useInView } from "@/hooks/useInView";
import { useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useInView(
    ref,
    () => {
      if (ref.current) ref.current.dataset.revealed = "true";
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px", once: true },
  );

  return (
    <div
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${delayMs}ms`, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
