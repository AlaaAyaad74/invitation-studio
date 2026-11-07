import type { Metadata } from "next";
import Invitation from "@/components/templates/heritage-script/Invitation";
import { heritageInvitations } from "@/data/heritage-script";
import { getLang } from "@/lib/i18n-server";
import styles from "./shell.module.css";

export const metadata: Metadata = {
  title: "Heritage Script",
  description:
    "A crimson formal wedding invitation — calligraphy, gold, and evening light.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function HeritageScriptPage() {
  const data = heritageInvitations[await getLang()];
  const { couple, dateLabel } = data;

  return (
    <div className={styles.frame}>
      <aside className={styles.cover} aria-hidden="true">
        <p className={styles.monogram}>
          <span>{couple.first[0]}</span>
          <span className={styles.monogramAmp}>&</span>
          <span>{couple.second[0]}</span>
        </p>
        <p className={styles.coverCaption}>
          {dateLabel.day} {dateLabel.month} {dateLabel.year}
        </p>
      </aside>

      <main className={styles.stage}>
        <Invitation data={data} />
      </main>
    </div>
  );
}
