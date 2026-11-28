import Invitation from "@/components/templates/heritage-script/Invitation";
import {
  customCouples,
  getCalendarUrl,
  getCouple,
} from "@/data/custom-couples/couples";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "../../templates/heritage-script/shell.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Section wording per occasion (the template's own copy is for a wedding). */
const OCCASION = {
  wedding: {
    section: "تفاصيل الفرح",
    heading: "السهرة",
    event: "wedding",
  },
  engagement: {
    section: "تفاصيل الخطوبة",
    heading: "الخطوبة",
    event: "engagement",
  },
} as const;

export function generateStaticParams() {
  return customCouples.map((customCouple) => ({ slug: customCouple.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) return { title: "Invitation" };

  const { first, second } = couple.latinNames;
  const { dateLabel } = couple.invitation;
  return {
    title: `${first} & ${second}`,
    description: `${first} and ${second} invite you to their ${OCCASION[couple.occasion].event} on ${dateLabel.day} ${dateLabel.month} ${dateLabel.year}.`,
    robots: { index: false, follow: true },
  };
}

export default async function CustomCoupleInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const couple = getCouple(slug);
  if (!couple) notFound();

  const data = couple.invitation;
  const { first, second } = data.couple;
  const { dateLabel } = data;
  const copy = OCCASION[couple.occasion];

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
        <Invitation
          data={data}
          copy={{ section: copy.section, heading: copy.heading }}
          guest={{ campaign: couple.slug, hidden: couple.hideBranding }}
          calendarUrl={getCalendarUrl(couple)}
        />
      </main>
    </div>
  );
}
