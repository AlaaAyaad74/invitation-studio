import type { Metadata } from "next";
import { preload } from "react-dom";
import Invitation from "@/components/templates/desert-bloom/Invitation";
import { desertBloomInvitation as data } from "@/data/desert-bloom";
import styles from "./shell.module.css";

export const metadata: Metadata = {
  title: "Desert Bloom",
  description:
    "Lace, wax seal, and peach roses — a warm, interactive wedding invitation.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DesertBloomPage() {
  preload(data.hero.poster, { as: "image", fetchPriority: "high" });

  const { couple, dateLabel } = data;

  return (
    <div className={styles.frame}>
      <aside className={styles.cover} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.coverVideo} src={data.hero.poster} alt="" />
        <div className={styles.coverVeil} />
        <div className={styles.coverCopy}>
          <p className={styles.coverKicker}>{data.intro}</p>
          <p className={styles.coverNames}>
            {couple.first}
            <span>&</span>
            {couple.second}
          </p>
          <p className={styles.coverDate}>
            {dateLabel.day} · {dateLabel.month} · {dateLabel.year}
          </p>
        </div>
      </aside>

      <main className={styles.stage}>
        <Invitation />
      </main>
    </div>
  );
}
