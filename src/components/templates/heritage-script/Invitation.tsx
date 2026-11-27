import MapPinIcon from "@/components/icons/MapPinIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import AddToCalendar from "@/components/templates/AddToCalendar";
import MusicPlayer from "@/components/templates/MusicPlayer";
import StudioCredit from "@/components/templates/StudioCredit";
import Countdown from "@/components/templates/heritage-script/Countdown";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import Gallery from "@/components/templates/heritage-script/Gallery";
import LetterCard from "@/components/templates/heritage-script/LetterCard";
import { getCalendarUrl, type HeritageInvitation } from "@/data/heritage-script";
import { templateCopy } from "@/data/template-copy";
import styles from "./Invitation.module.css";

const COPY = {
  en: {
    section: "Celebration details",
    heading: "The evening",
    attireNote: "An evening in crimson and gold",
  },
  ar: {
    section: "تفاصيل الفرح",
    heading: "السهرة",
    attireNote: "سهرة بالأحمر والدهبي",
  },
} as const;

export default function Invitation({ data }: { data: HeritageInvitation }) {
  const { dateLabel, venue } = data;
  const calendarUrl = getCalendarUrl(data);
  const t = COPY[data.lang];
  const common = templateCopy(data.lang);
  const comma = data.lang === "ar" ? "،" : ",";

  return (
    <div className={styles.root}>
      <LetterCard data={data} />
      <Countdown start={data.start} dateLabel={dateLabel} lang={data.lang} />

      <section className={styles.details} aria-label={t.section}>
        <FadeIn as="h2" className={styles.heading}>
          {t.heading}
        </FadeIn>
        <ul className={styles.list}>
          <FadeIn as="li" className={styles.item} delay={160}>
            <span className={styles.label}>{common.when}</span>
            <strong className={styles.value}>
              {dateLabel.weekday}
              {comma} {dateLabel.day} {dateLabel.month}
            </strong>
            <span className={styles.note}>{data.timeLabel}</span>
            <AddToCalendar
              template={data.calendarId}
              href={calendarUrl}
              className={styles.link}
            >
              <CalendarIcon className={styles.linkIcon} />
              {common.addToCalendar}
            </AddToCalendar>
          </FadeIn>
          <FadeIn as="li" className={styles.item} delay={380}>
            <span className={styles.label}>{common.where}</span>
            <strong className={styles.value}>{venue.name}</strong>
            <span className={styles.note}>{venue.city}</span>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              <MapPinIcon className={styles.linkIcon} />
              {common.openLocation}
            </a>
          </FadeIn>
          <FadeIn as="li" className={styles.item} delay={600}>
            <span className={styles.label}>{common.attire}</span>
            <strong className={styles.value}>{data.attire}</strong>
            <span className={styles.note}>{t.attireNote}</span>
          </FadeIn>
        </ul>
      </section>

      <Gallery data={data} />

      <FadeIn>
        <StudioCredit className={styles.credit} />
      </FadeIn>

      <MusicPlayer src={data.music} />
    </div>
  );
}
