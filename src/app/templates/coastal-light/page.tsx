import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Invitation from "@/components/templates/coastal-light/Invitation";
import { coastalLightInvitations } from "@/data/coastal-light";
import { getLang } from "@/lib/i18n-server";
import type { Metadata } from "next";
import { preload } from "react-dom";
import styles from "./shell.module.css";

export const metadata: Metadata = {
  title: "Coastal Light",
  description: "Airy layouts inspired by seaside vows and soft horizons.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function CoastalLightTemplatePage() {
  const lang = await getLang();
  const data = coastalLightInvitations[lang];
  preload(data.video, { as: "video" });

  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <ImageWithSkeleton
          native
          cover
          src="/templates/coastal-light.webp"
          alt={lang === "ar" ? "تصميم دعوة الظرف الأبيض" : "Coastal Light invitation template"}
          className={styles.image}
          wrapperClassName="absolute inset-0"
        />
        <div className={styles.veil} />
      </aside>

      <main className={styles.stage}>
        <Invitation data={data} />
      </main>
    </div>
  );
}
