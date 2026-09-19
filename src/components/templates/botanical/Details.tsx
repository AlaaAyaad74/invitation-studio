import CalendarIcon from "@/app/common/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import {
  botanicalInvitation as data,
  getCalendarUrl,
} from "@/data/botanical";
import styles from "./Details.module.css";

const calendarUrl = getCalendarUrl(data);

export default function Details() {
  return (
    <section className={styles.section} aria-label="Wedding details">
      <Reveal className={styles.intro}>
        <p className={styles.label}>The details</p>
        <h2 className={styles.script}>Join us</h2>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path
              d="M1 5c3.2-4.2 6.4-4.2 8 0 1.6-4.2 4.8-4.2 8 0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <span />
        </div>
        <p className={styles.hint}>in celebration of their wedding</p>
      </Reveal>

      <div className={styles.list}>
        <Reveal>
          <article className={styles.card}>
            <p className={styles.cardLabel}>When</p>
            <p className={styles.weekday}>{data.dateLabel.weekday}</p>
            <p className={styles.day}>{data.dateLabel.day}</p>
            <p className={styles.month}>
              {data.dateLabel.month} {data.dateLabel.year}
            </p>
            <p className={styles.meta}>{data.timeLabel}</p>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.action}
            >
              <CalendarIcon className={styles.icon} />
              Add to calendar
            </a>
          </article>
        </Reveal>

        <Reveal delayMs={90}>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Where</p>
            <p className={styles.title}>{data.venue.name}</p>
            <p className={styles.meta}>{data.venue.address}</p>
            <a
              href={data.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.action}
            >
              Open map
            </a>
          </article>
        </Reveal>

        <Reveal delayMs={180}>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Dress code</p>
            <p className={styles.title}>{data.dressCode}</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
