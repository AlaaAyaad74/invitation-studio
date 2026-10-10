import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import Invitation from "@/components/templates/botanical/Invitation";
import { capitalName } from "@/data/botanical";
import { getCouple, couples } from "@/data/couples";
import styles from "../../templates/botanical/shell.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return couples.map((couple) => ({ slug: couple.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) return { title: "Invitation" };

  const { first, second } = couple.couple;
  return {
    title: `${capitalName(first)} & ${capitalName(second)}`,
    description: `${first} and ${second} invite you to their wedding on ${couple.dateLabel.weekday}, ${couple.dateLabel.day} ${couple.dateLabel.month} ${couple.dateLabel.year}.`,
    robots: { index: false, follow: true },
  };
}

export default async function CoupleInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) notFound();

  preload("/botanical/Botanical.mp4", { as: "video" });

  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <img
          src="/templates/botanical.webp"
          alt=""
          className={styles.image}
        />
        <div className={styles.veil} />
      </aside>

      <main className={styles.stage}>
        <Invitation data={couple} />
      </main>
    </div>
  );
}
