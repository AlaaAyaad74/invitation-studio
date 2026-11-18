"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import styles from "./Gallery.module.css";
import ui from "./ui.module.css";

type Photo = (typeof data.gallery)[number];

/** Instant photo that develops (white haze to full colour) once it is seen. */
function Polaroid({ photo, index }: { photo: Photo; index: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [lifted, setLifted] = useState(false);

  useInView(
    ref,
    (inView) => {
      if (inView && ref.current) ref.current.dataset.developed = "true";
    },
    { threshold: 0.6, once: true },
  );

  return (
    <button
      ref={ref}
      type="button"
      className={styles.polaroid}
      style={{ "--tilt": `${index % 2 ? 3 : -3}deg` } as CSSProperties}
      data-developed="false"
      data-lifted={lifted ? "true" : "false"}
      aria-pressed={lifted}
      aria-label={`${photo.alt}. ${photo.caption}`}
      onClick={() => setLifted((value) => !value)}
    >
      <span className={styles.tape} aria-hidden="true" />
      <span className={styles.frame}>
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="220px"
          className={styles.image}
        />
        <span className={styles.haze} aria-hidden="true" />
      </span>
      <span className={styles.caption} aria-hidden="true">
        {photo.caption}
      </span>
    </button>
  );
}

export default function Gallery() {
  return (
    <Reveal as="section" className={`${ui.section} ${styles.section}`} aria-label="Our moments">
      <p className={`${ui.kicker} ${ui.rise}`}>Little moments</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Still developing
      </h2>
      <p className={`${ui.lead} ${ui.rise}`} style={{ "--d": "220ms" } as CSSProperties}>
        Slide along the line and watch each photo come to life.
      </p>

      <div className={`${styles.strip} ${ui.rise}`} style={{ "--d": "320ms" } as CSSProperties}>
        <span className={styles.line} aria-hidden="true" />
        {data.gallery.map((photo, index) => (
          <Polaroid key={photo.src} photo={photo} index={index} />
        ))}
      </div>
    </Reveal>
  );
}
