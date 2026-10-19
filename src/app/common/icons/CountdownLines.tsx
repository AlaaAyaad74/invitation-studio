"use client";

import { useEffect, useRef } from "react";

const RAYS = [-42, -28, -14, 0, 14, 28, 42];
const LENGTH = 140;

export default function CountdownLines({
  className = "h-full w-full",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;

    const animations = [
      ...node.querySelectorAll("animate"),
    ] as SVGAnimateElement[];

    const start = () => {
      animations.forEach((animation, index) => {
        animation.beginElementAt(Math.abs(index - 3) * 0.2);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        start();
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 120"
      preserveAspectRatio="xMidYMin slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id="e-ray-fade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="120"
        >
          <stop offset="0%" stopColor="#d4b483" stopOpacity="0.55" />
          <stop offset="80%" stopColor="#d4b483" stopOpacity="0" />
        </linearGradient>
      </defs>
      {RAYS.map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="0"
          x2={100 + Math.sin((deg * Math.PI) / 180) * LENGTH}
          y2={Math.cos((deg * Math.PI) / 180) * LENGTH}
          stroke="url(#e-ray-fade)"
          strokeWidth="0.6"
          strokeDasharray={LENGTH}
          strokeDashoffset={LENGTH}
        >
          <animate
            attributeName="stroke-dashoffset"
            values={`${LENGTH};0`}
            keyTimes="0;1"
            dur="8s"
            begin="indefinite"
            repeatCount="1"
            fill="freeze"
            calcMode="spline"
            keySplines="0.45 0 0.55 1"
          />
        </line>
      ))}
    </svg>
  );
}
