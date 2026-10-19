import CalendarIcon from "@/app/common/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { coastalLightInvitation as data, getCalendarUrl } from "@/data/coastal-light";
import styles from "./Schedule.module.css";

const calendarUrl = getCalendarUrl(data);

const rows = [
  { label: "Time", value: data.timeLabel },
  {
    label: "Place",
    value: data.venue.address
      ? `${data.venue.name}, ${data.venue.address}`
      : data.venue.name,
  },
  { label: "Attire", value: data.dressCode },
  ...data.moments.map((moment) => ({
    label: moment.label,
    value: `${moment.time} — ${moment.detail}`,
  })),
];

export default function Schedule() {
  return (
    <section className={styles.section} aria-label="Wedding day">
      <Reveal>
        <p className={styles.index}>
          <span>02</span>
          The day
        </p>
      </Reveal>

      <dl className={styles.list}>
        {rows.map((row, index) => (
          <Reveal key={row.label} delayMs={index * 90}>
            <div className={styles.row}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delayMs={rows.length * 90}>
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
