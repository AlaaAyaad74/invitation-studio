import CalendarIcon from "@/app/common/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { coastalLightInvitation as data, getCalendarUrl } from "@/data/coastal-light";
import styles from "./Schedule.module.css";

const calendarUrl = getCalendarUrl(data);

export default function Schedule() {
  return (
    <section className={styles.section} aria-label="Wedding day">
      <Reveal>
        <p className={styles.index}>
          <span>02</span>
          The day
        </p>
      </Reveal>
      <Reveal delayMs={70}>
        <p className={styles.time}>{data.timeLabel}</p>
      </Reveal>
      <figure className={styles.hall}>
        <Reveal delayMs={120}>
          <span className={styles.mark} aria-hidden="true" />
        </Reveal>
        <figcaption>
          <Reveal delayMs={170}>
            <span className={styles.place}>{data.venue.name}</span>
          </Reveal>
          {data.venue.address ? (
            <Reveal delayMs={210}>
              <span className={styles.where}>
                <i />
                {data.venue.address}
                <i />
              </span>
            </Reveal>
          ) : null}
        </figcaption>
      </figure>
      <Reveal delayMs={250}>
        <p className={styles.attire}>
          <span>Attire</span>
          {data.dressCode}
        </p>
      </Reveal>

      <div className={styles.plan}>
        {data.moments.map((moment, index) => (
          <Reveal key={moment.label} delayMs={80 + index * 90}>
            <p className={styles.moment}>
              <span className={styles.what}>{moment.label}</span>
              <span className={styles.when}>{moment.time}</span>
              <span className={styles.detail}>{moment.detail}</span>
            </p>
          </Reveal>
        ))}
      </div>

      <div className={styles.actions}>
        <Reveal>
          <AddToCalendar
            template="coastal-light"
            href={calendarUrl}
            className={styles.action}
          >
            <span className={styles.badge}>
              <CalendarIcon className={styles.icon} />
            </span>
            Add to calendar
          </AddToCalendar>
        </Reveal>
        <Reveal delayMs={90}>
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.action}
          >
            <span className={styles.badge}>
              <MapIcon />
            </span>
            Open map
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} fill="none" aria-hidden="true">
      <path
        d="M12 20.5s5.5-4.7 5.5-9.2a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.2 5.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11.2" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
