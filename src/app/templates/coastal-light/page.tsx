import type { Metadata } from "next";
import { preload } from "react-dom";
import Invitation from "@/components/templates/coastal-light/Invitation";
import styles from "./shell.module.css";

const VIDEO_SRC = "/minimal/minimal-hero.mp4";
const POSTER_SRC = "/minimal/hero-poster.webp";

export const metadata: Metadata = {
  title: "Coastal Light",
  description: "Airy layouts inspired by seaside vows and soft horizons.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CoastalLightTemplatePage() {
  preload(VIDEO_SRC, { as: "video" });

  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <img
          src="/templates/coastal-light.webp"
          alt="Coastal Light invitation template"
          className={styles.image}
        />
        <div className={styles.veil} />
      </aside>

      <main className={styles.stage}>
        <Invitation />
      </main>
    </div>
  );
}
