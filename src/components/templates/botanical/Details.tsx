import WaveOrnamentIcon from "@/components/icons/WaveOrnamentIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { getCalendarUrl, type BotanicalContent } from "@/data/botanical";
import { templateCopy } from "@/data/template-copy";
import styles from "./Details.module.css";

const COPY = {
  en: {
    section: "Wedding details",
    label: "The details",
    script: "Join us",
    hint: "in celebration of their wedding",
  },
  ar: {
    section: "تفاصيل الزفاف",
    label: "التفاصيل",
    script: "شاركونا فرحتنا",
    hint: "احتفالًا بزفافنا",
  },
} as const;

export default function Details({ data }: { data: BotanicalContent }) {
  const lang = data.lang ?? "en";
  const t = COPY[lang];
  const common = templateCopy(lang);
  const calendarId = data.calendarId ?? "botanical";
  const calendarUrl = getCalendarUrl(data, calendarId);
  return (
    <section className={styles.section} aria-label={t.section}>
      <Reveal className={styles.intro}>
        <p className={styles.label}>{t.label}</p>
        <h2 className={styles.script}>{t.script}</h2>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <WaveOrnamentIcon />
          <span />
        </div>
        <p className={styles.hint}>{t.hint}</p>
      </Reveal>

      <div className={styles.list}>
        <Reveal>
          <article className={styles.card}>
            <p className={styles.cardLabel}>{common.when}</p>
            <p className={styles.weekday}>{data.dateLabel.weekday}</p>
            <p className={styles.day}>{data.dateLabel.day}</p>
            <p className={styles.month}>
              {data.dateLabel.month} {data.dateLabel.year}
            </p>
            <p className={styles.meta}>{data.timeLabel}</p>
            <AddToCalendar
              template={calendarId}
              href={calendarUrl}
              className={styles.action}
            >
              <CalendarIcon className={styles.icon} />
              {common.addToCalendar}
            </AddToCalendar>
          </article>
        </Reveal>

        <Reveal delayMs={90}>
          <article className={styles.card}>
            <p className={styles.cardLabel}>{common.where}</p>
            <p className={styles.title}>{data.venue.name}</p>
            {data.venue.address ? (
              <p className={styles.meta}>{data.venue.address}</p>
            ) : null}
            <a
              href={data.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.action}
            >
              {common.openMap}
            </a>
          </article>
        </Reveal>

        {data.dressCode ? (
          <Reveal delayMs={180}>
            <article className={styles.card}>
              <p className={styles.cardLabel}>{common.dressCode}</p>
              <p className={styles.title}>{data.dressCode}</p>
            </article>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
