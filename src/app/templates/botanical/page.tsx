import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Invitation from "@/components/templates/botanical/Invitation";
import { botanicalInvitations } from "@/data/botanical";
import { getLang } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { preload } from "react-dom";
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

export default async function BotanicalTemplatePage() {
  preload("/botanical/Botanical.mp4", { as: "video" });
  const lang = await getLang();

  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <ImageWithSkeleton
          native
          cover
          src="/templates/botanical.webp"
          alt={lang === "ar" ? "تصميم دعوة بوتانيكال" : "Botanical invitation template"}
          className={styles.image}
          wrapperClassName="absolute inset-0"
        />
        <div className={styles.veil} />
      </aside>

      <main className={styles.stage}>
        <Invitation data={botanicalInvitations[lang]} />
      </main>
    </div>
  );
}
