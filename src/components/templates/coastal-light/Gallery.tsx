"use client";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data } from "@/data/coastal-light";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Gallery.module.css";

type Photo = (typeof data.gallery)[number];

type Piece = {
  key: string;
  photo: Photo;
  w: number;
  h: number;
  x: number;
  y: number;
  z: number;
  shape: string;
  rest: number;
  fromX: string;
  fromY: string;
  fromRot: number;
  delay: string;
  duration: string;
  drift: string;
  dx: string;
  dy: string;
};

const [meadow, field, walk, standing, portrait, together] = data.gallery;

const SHAPES = {
  up: "M0.463 0.020C0.529 0.028 0.596 0.066 0.653 0.096C0.710 0.126 0.758 0.160 0.805 0.200C0.853 0.240 0.900 0.280 0.930 0.332C0.960 0.384 0.988 0.450 0.988 0.510C0.988 0.570 0.960 0.636 0.928 0.686C0.896 0.736 0.840 0.774 0.792 0.808C0.744 0.842 0.694 0.866 0.640 0.892C0.586 0.918 0.530 0.952 0.466 0.966C0.402 0.980 0.320 0.992 0.256 0.978C0.192 0.964 0.124 0.914 0.084 0.864C0.044 0.814 0.024 0.744 0.016 0.686C0.008 0.628 0.012 0.568 0.016 0.512C0.020 0.456 0.028 0.404 0.046 0.350C0.064 0.296 0.088 0.244 0.122 0.194C0.156 0.144 0.200 0.082 0.256 0.052C0.312 0.022 0.396 0.012 0.463 0.020Z",
  down: "M0.537 0.980C0.471 0.972 0.404 0.934 0.347 0.904C0.290 0.874 0.242 0.840 0.195 0.800C0.147 0.760 0.100 0.720 0.070 0.668C0.040 0.616 0.012 0.550 0.012 0.490C0.012 0.430 0.040 0.364 0.072 0.314C0.104 0.264 0.160 0.226 0.208 0.192C0.256 0.158 0.306 0.134 0.360 0.108C0.414 0.082 0.470 0.048 0.534 0.034C0.598 0.020 0.680 0.008 0.744 0.022C0.808 0.036 0.876 0.086 0.916 0.136C0.956 0.186 0.976 0.256 0.984 0.314C0.992 0.372 0.988 0.432 0.984 0.488C0.980 0.544 0.972 0.596 0.954 0.650C0.936 0.704 0.912 0.756 0.878 0.806C0.844 0.856 0.800 0.918 0.744 0.948C0.688 0.978 0.604 0.988 0.537 0.980Z",
  right: "M0.980 0.463C0.972 0.529 0.934 0.596 0.904 0.653C0.874 0.710 0.840 0.758 0.800 0.805C0.760 0.853 0.720 0.900 0.668 0.930C0.616 0.960 0.550 0.988 0.490 0.988C0.430 0.988 0.364 0.960 0.314 0.928C0.264 0.896 0.226 0.840 0.192 0.792C0.158 0.744 0.134 0.694 0.108 0.640C0.082 0.586 0.048 0.530 0.034 0.466C0.020 0.402 0.008 0.320 0.022 0.256C0.036 0.192 0.086 0.124 0.136 0.084C0.186 0.044 0.256 0.024 0.314 0.016C0.372 0.008 0.432 0.012 0.488 0.016C0.544 0.020 0.596 0.028 0.650 0.046C0.704 0.064 0.756 0.088 0.806 0.122C0.856 0.156 0.918 0.200 0.948 0.256C0.978 0.312 0.988 0.396 0.980 0.463Z",
  left: "M0.020 0.537C0.028 0.471 0.066 0.404 0.096 0.347C0.126 0.290 0.160 0.242 0.200 0.195C0.240 0.147 0.280 0.100 0.332 0.070C0.384 0.040 0.450 0.012 0.510 0.012C0.570 0.012 0.636 0.040 0.686 0.072C0.736 0.104 0.774 0.160 0.808 0.208C0.842 0.256 0.866 0.306 0.892 0.360C0.918 0.414 0.952 0.470 0.966 0.534C0.980 0.598 0.992 0.680 0.978 0.744C0.964 0.808 0.914 0.876 0.864 0.916C0.814 0.956 0.744 0.976 0.686 0.984C0.628 0.992 0.568 0.988 0.512 0.984C0.456 0.980 0.404 0.972 0.350 0.954C0.296 0.936 0.244 0.912 0.194 0.878C0.144 0.844 0.082 0.800 0.052 0.744C0.022 0.688 0.012 0.604 0.020 0.537Z",
  peak: "M0.537 0.020C0.471 0.028 0.404 0.066 0.347 0.096C0.290 0.126 0.242 0.160 0.195 0.200C0.147 0.240 0.100 0.280 0.070 0.332C0.040 0.384 0.012 0.450 0.012 0.510C0.012 0.570 0.040 0.636 0.072 0.686C0.104 0.736 0.160 0.774 0.208 0.808C0.256 0.842 0.306 0.866 0.360 0.892C0.414 0.918 0.470 0.952 0.534 0.966C0.598 0.980 0.680 0.992 0.744 0.978C0.808 0.964 0.876 0.914 0.916 0.864C0.956 0.814 0.976 0.744 0.984 0.686C0.992 0.628 0.988 0.568 0.984 0.512C0.980 0.456 0.972 0.404 0.954 0.350C0.936 0.296 0.912 0.244 0.878 0.194C0.844 0.144 0.800 0.082 0.744 0.052C0.688 0.022 0.604 0.012 0.537 0.020Z",
  wide: "M0.463 0.980C0.529 0.972 0.596 0.934 0.653 0.904C0.710 0.874 0.758 0.840 0.805 0.800C0.853 0.760 0.900 0.720 0.930 0.668C0.960 0.616 0.988 0.550 0.988 0.490C0.988 0.430 0.960 0.364 0.928 0.314C0.896 0.264 0.840 0.226 0.792 0.192C0.744 0.158 0.694 0.134 0.640 0.108C0.586 0.082 0.530 0.048 0.466 0.034C0.402 0.020 0.320 0.008 0.256 0.022C0.192 0.036 0.124 0.086 0.084 0.136C0.044 0.186 0.024 0.256 0.016 0.314C0.008 0.372 0.012 0.432 0.016 0.488C0.020 0.544 0.028 0.596 0.046 0.650C0.064 0.704 0.088 0.756 0.122 0.806C0.156 0.856 0.200 0.918 0.256 0.948C0.312 0.978 0.396 0.988 0.463 0.980Z",
} as const;

const PIECES: Piece[] = [
  {
    key: "meadow",
    photo: meadow,
    w: 38,
    h: 38,
    x: 22,
    y: 26,
    z: 2,
    shape: SHAPES.up,
    rest: -6,
    fromX: "-165%",
    fromY: "12%",
    fromRot: -18,
    delay: "0.04s",
    duration: "1.95s",
    drift: "9.4s",
    dx: "0px",
    dy: "-7px",
  },
  {
    key: "field",
    photo: field,
    w: 28,
    h: 34,
    x: 56,
    y: 8,
    z: 4,
    shape: SHAPES.down,
    rest: 5,
    fromX: "18%",
    fromY: "-175%",
    fromRot: 14,
    delay: "0.18s",
    duration: "1.7s",
    drift: "8.1s",
    dx: "6px",
    dy: "4px",
  },
  {
    key: "walk",
    photo: walk,
    w: 22,
    h: 22,
    x: 60,
    y: 40,
    z: 5,
    shape: SHAPES.right,
    rest: -3,
    fromX: "185%",
    fromY: "-8%",
    fromRot: 10,
    delay: "0.34s",
    duration: "2.05s",
    drift: "11s",
    dx: "-6px",
    dy: "5px",
  },
  {
    key: "standing",
    photo: standing,
    w: 32,
    h: 24,
    x: 8,
    y: 56,
    z: 3,
    shape: SHAPES.wide,
    rest: 7,
    fromX: "-150%",
    fromY: "155%",
    fromRot: -16,
    delay: "0.1s",
    duration: "1.8s",
    drift: "7.6s",
    dx: "5px",
    dy: "-4px",
  },
  {
    key: "portrait",
    photo: portrait,
    w: 18,
    h: 28,
    x: 8,
    y: 10,
    z: 6,
    shape: SHAPES.left,
    rest: -8,
    fromX: "-170%",
    fromY: "-150%",
    fromRot: -22,
    delay: "0.42s",
    duration: "2.1s",
    drift: "10.2s",
    dx: "-5px",
    dy: "-3px",
  },
  {
    key: "together",
    photo: together,
    w: 34,
    h: 22,
    x: 36,
    y: 64,
    z: 3,
    shape: SHAPES.peak,
    rest: 4,
    fromX: "8%",
    fromY: "185%",
    fromRot: 12,
    delay: "0.24s",
    duration: "1.85s",
    drift: "8.8s",
    dx: "4px",
    dy: "7px",
  },
];

function pieceStyle(piece: Piece): CSSProperties {
  return {
    "--x": `${piece.x}%`,
    "--y": `${piece.y}%`,
    "--w": `${piece.w}%`,
    "--h": `${piece.h}%`,
    "--z": piece.z,
    "--rest": `${piece.rest}deg`,
    "--from-x": piece.fromX,
    "--from-y": piece.fromY,
    "--from-rot": `${piece.fromRot}deg`,
    "--delay": piece.delay,
    "--duration": piece.duration,
    "--drift": piece.drift,
    "--dx": piece.dx,
    "--dy": piece.dy,
  } as CSSProperties;
}

export default function Gallery() {
  const clusterRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Photo | null>(null);

  useEffect(() => {
    const cluster = clusterRef.current;
    const sentinel = sentinelRef.current;
    if (!cluster || !sentinel) return;

    cluster.dataset.revealed = "false";
    let played = false;

    const onArriveEnd = (event: AnimationEvent) => {
      if (!event.animationName.includes("arrive")) return;
      const mover = event.target;
      if (!(mover instanceof HTMLElement)) return;
      if (!mover.classList.contains(styles.mover)) return;
      mover.dataset.settled = "true";
    };

    cluster.addEventListener("animationend", onArriveEnd);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (played || !entry?.isIntersecting) return;
        const viewport = entry.rootBounds?.height ?? window.innerHeight;
        const visible = entry.intersectionRect.height;
        if (entry.intersectionRatio < 0.55 && visible < viewport * 0.5) return;
        played = true;
        observer.disconnect();
        cluster.dataset.revealed = "false";
        void cluster.offsetWidth;
        cluster.dataset.revealed = "true";
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.55, 0.7, 0.85, 1] },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      cluster.removeEventListener("animationend", onArriveEnd);
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  return (
    <section className={styles.section} aria-label="Photos">
      <Reveal>
        <p className={styles.index}>
          <span>04</span>
          Pictures
        </p>
      </Reveal>
      <Reveal delayMs={80}>
        <p className={styles.names}>
          {data.couple.first} & {data.couple.second}
        </p>
      </Reveal>

      <svg className={styles.defs} aria-hidden="true">
        <defs>
          {PIECES.map((piece) => (
            <clipPath
              key={piece.key}
              id={`coastal-${piece.key}`}
              clipPathUnits="objectBoundingBox"
            >
              <path d={piece.shape} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div ref={clusterRef} className={styles.cluster}>
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
        {PIECES.map((piece) => (
          <div key={piece.key} className={styles.mover} style={pieceStyle(piece)}>
            <div className={styles.floater}>
              <button
                type="button"
                className={styles.photo}
                style={{ clipPath: `url(#coastal-${piece.key})` }}
                aria-label={`Open photo: ${piece.photo.alt}`}
                onClick={() => setActive(piece.photo)}
              >
                <ImageWithSkeleton
                  native
                  cover
                  src={piece.photo.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="size-full object-cover"
                  wrapperClassName="relative size-full"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {active ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
        >
          <figure className={styles.frame} onClick={(event) => event.stopPropagation()}>
            <ImageWithSkeleton
              native
              src={active.src}
              alt={active.alt}
              wrapperClassName="block w-full"
              skeletonClassName="min-h-64 rounded-[1.35rem]"
            />
            <figcaption>
              {data.couple.first} & {data.couple.second}
            </figcaption>
            <button type="button" className={styles.close} onClick={() => setActive(null)}>
              Close
            </button>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
