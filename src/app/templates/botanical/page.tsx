import type { Metadata } from "next";
import { preload } from "react-dom";
import Invitation from "@/components/templates/botanical/Invitation";
import styles from "./shell.module.css";

export const metadata: Metadata = {
  title: "Botanical",
  description:
    "A botanical wedding invitation website template from Invitation Studio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BotanicalTemplatePage() {
  preload("/botanical/Botanical.mp4", { as: "video" });

  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <img
          src="/templates/botanical.webp"
          alt="Botanical invitation template"
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
