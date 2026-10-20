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
        <p className={styles.time}>{data.timeLabel}</p>
        <figure className={styles.hall}>
          <img src="/coastal-light/hall.png" alt="" className={styles.mark} />
          <figcaption>
            <span className={styles.place}>{data.venue.name}</span>
            {data.venue.address ? (
              <span className={styles.where}>
                <i />
                {data.venue.address}
                <i />
              </span>
            ) : null}
          </figcaption>
        </figure>
        <p className={styles.attire}>
          <span>Attire</span>
          {data.dressCode}
        </p>
      </Reveal>

      <Reveal delayMs={100}>
        <ol className={styles.plan}>
          {data.moments.map((moment) => (
            <li key={moment.label} className={styles.moment}>
              <span className={styles.what}>{moment.label}</span>
              <span className={styles.when}>{moment.time}</span>
              <span className={styles.detail}>{moment.detail}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delayMs={180}>
        <div className={styles.actions}>
          <AddToCalendar
            template="coastal-light"
            href={calendarUrl}
            className={styles.action}
          >
            <CalendarIcon className={styles.icon} />
            Add to calendar
          </AddToCalendar>
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.action}
          >
            <MapIcon />
            Open map
          </a>
        </div>
      </Reveal>
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
