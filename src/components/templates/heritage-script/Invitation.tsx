import CalendarIcon from "@/app/common/icons/CalendarIcon";
import AddToCalendar from "@/components/templates/AddToCalendar";
import MusicPlayer from "@/components/templates/MusicPlayer";
import StudioCredit from "@/components/templates/StudioCredit";
import Countdown from "@/components/templates/heritage-script/Countdown";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import Gallery from "@/components/templates/heritage-script/Gallery";
import LetterCard from "@/components/templates/heritage-script/LetterCard";
import { getCalendarUrl, heritageInvitation as data } from "@/data/heritage-script";
import styles from "./Invitation.module.css";

const calendarUrl = getCalendarUrl();

export default function Invitation() {
  const { dateLabel, venue } = data;

  return (
    <div className={styles.root}>
      <LetterCard />
      <Countdown />

      <section className={styles.details} aria-label="Celebration details">
        <FadeIn as="h2" className={styles.heading}>
          The evening
        </FadeIn>
        <ul className={styles.list}>
          <FadeIn as="li" className={styles.item} delay={160}>
            <span className={styles.label}>When</span>
            <strong className={styles.value}>
              {dateLabel.weekday}, {dateLabel.day} {dateLabel.month}
            </strong>
            <span className={styles.note}>{data.timeLabel}</span>
            <AddToCalendar
              template="heritage-script"
              href={calendarUrl}
              className={styles.link}
            >
              <CalendarIcon className={styles.linkIcon} />
              Add to calendar
            </AddToCalendar>
          </FadeIn>
          <FadeIn as="li" className={styles.item} delay={380}>
            <span className={styles.label}>Where</span>
            <strong className={styles.value}>{venue.name}</strong>
            <span className={styles.note}>{venue.city}</span>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              <MapIcon />
              Open location
            </a>
          </FadeIn>
          <FadeIn as="li" className={styles.item} delay={600}>
            <span className={styles.label}>Attire</span>
            <strong className={styles.value}>{data.attire}</strong>
            <span className={styles.note}>An evening in crimson and gold</span>
          </FadeIn>
        </ul>
      </section>

      <Gallery />

      <FadeIn>
        <StudioCredit className={styles.credit} />
      </FadeIn>

      <MusicPlayer src={data.music} />
    </div>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.linkIcon} fill="none" aria-hidden="true">
      <path
        d="M12 20.5s5.5-4.7 5.5-9.2a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.2 5.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11.2" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
