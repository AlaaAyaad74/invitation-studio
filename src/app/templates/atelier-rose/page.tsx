import type { Metadata } from "next";
import Invitation from "@/components/templates/atelier-rose/Invitation";
import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import styles from "./shell.module.css";

export const metadata: Metadata = {
  title: "Atelier Rose",
  description:
    "Untie the ribbon: layered paper, blush roses, and a note that flies home.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AtelierRosePage() {
  const { couple, dateLabel } = data;

  return (
    <div className={styles.frame}>
      {/* Desktop only: the card photo, matted in layered paper. */}
      <aside className={styles.cover} aria-hidden="true">
        <div className={styles.mat}>
          <span className={styles.matLayer} />
          <span className={styles.matLayer} />
          <div className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.cover} alt="" loading="lazy" decoding="async" />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionNames}>
              {couple.first} <em>&amp;</em> {couple.second}
            </span>
            <span className={styles.captionDate}>
              {dateLabel.day} · {dateLabel.month} · {dateLabel.year}
            </span>
          </p>
        </div>
      </aside>

      <main className={styles.stage}>
        <Invitation />
      </main>
    </div>
  );
}
