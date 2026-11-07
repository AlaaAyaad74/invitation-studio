import MapPinIcon from "@/components/icons/MapPinIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { getCalendarUrl, type CoastalLightInvitation } from "@/data/coastal-light";
import { templateCopy } from "@/data/template-copy";
import styles from "./Schedule.module.css";

export default function Schedule({ data }: { data: CoastalLightInvitation }) {
  const calendarUrl = getCalendarUrl(data);
  const common = templateCopy(data.lang);
  return (
    <section className={styles.section} aria-label={common.weddingDay}>
      <Reveal>
        <p className={styles.index}>
          <span>02</span>
          {data.lang === "ar" ? "اليوم" : "The day"}
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
          <span>{common.attire}</span>
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
            template={data.calendarId}
            href={calendarUrl}
            className={styles.action}
          >
            <span className={styles.badge}>
              <CalendarIcon className={styles.icon} />
            </span>
            {common.addToCalendar}
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
              <MapPinIcon className={styles.icon} />
            </span>
            {common.openMap}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
