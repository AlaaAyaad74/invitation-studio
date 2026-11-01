import Invitation from "@/components/templates/custom-couples/Invitation";
import { capitalName } from "@/data/botanical";
import {
  customCouples,
  getCouple,
} from "@/data/custom-couples/couples";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../../templates/heritage-script/shell.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return customCouples.map((customCouple) => ({ slug: customCouple.slug }));
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

export default async function CustomCoupleInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) notFound();

  const { first, second, dateLabel } = {
    first: couple.couple.first,
    second: couple.couple.second,
    dateLabel: couple.dateLabel,
  };

  return (
    <div className={styles.frame}>
      <aside className={styles.cover} aria-hidden="true">
        <p className={styles.monogram}>
          <span>{first[0]}</span>
          <span className={styles.monogramAmp}>&</span>
          <span>{second[0]}</span>
        </p>
        <p className={styles.coverCaption}>
          {dateLabel.day} {dateLabel.month} {dateLabel.year}
        </p>
      </aside>

      <main className={styles.stage}>
        <Invitation data={couple} />
      </main>
    </div>
  );
}
