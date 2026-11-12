import WaveOrnamentIcon from "@/app/common/icons/WaveOrnamentIcon";
import CalendarIcon from "@/app/common/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { getCalendarUrl, type BotanicalContent } from "@/data/botanical";

const smallCaps = "tracking-[0.28em] uppercase";
const cormorant = "font-[family-name:var(--font-cormorant),serif]";

const styles = {
  section: "bg-transparent px-[1.05rem] pt-[2.85rem] pb-[3.2rem] text-center text-(--ink)",
  intro: "px-[0.4rem] pt-0 pb-[1.7rem]",
  label: "m-0 text-[0.68rem] tracking-[0.34em] text-(--gold) uppercase",
  script: "mx-0 mt-[0.65rem] mb-0 font-[family-name:var(--font-great-vibes),cursive] text-[2.7rem] leading-[0.95] font-normal text-(--ink)",
  ornament: "mx-auto mt-[0.85rem] mb-0 flex items-center justify-center gap-[0.7rem] text-(--gold) [&_span]:block [&_span]:h-px [&_span]:w-[2.15rem] [&_span]:bg-current [&_span]:opacity-70",
  hint: `mx-0 mt-[0.7rem] mb-0 ${cormorant} text-[1.05rem] text-(--ink-muted) italic`,
  list: "grid gap-3",
  card: "rounded-[1.35rem] border border-[color-mix(in_srgb,var(--gold)_52%,transparent)] bg-transparent px-[1.1rem] pt-[1.55rem] pb-[1.45rem]",
  cardLabel: "m-0 text-[0.62rem] tracking-[0.3em] text-(--gold) uppercase",
  weekday: `mx-0 mt-[0.7rem] mb-0 text-[0.68rem] ${smallCaps} text-(--ink-muted)`,
  day: `mx-0 mt-[0.2rem] mb-0 ${cormorant} text-[4.4rem] leading-[0.9] tracking-[-0.04em] text-(--ink)`,
  month: `mx-0 mt-[0.35rem] mb-0 text-[0.68rem] ${smallCaps} text-(--ink-muted)`,
  title: `mx-0 mt-[0.7rem] mb-0 ${cormorant} text-[1.85rem] leading-[1.15] text-(--ink)`,
  meta: `mx-0 mt-[0.45rem] mb-0 ${cormorant} text-[1.02rem] text-(--ink-muted) italic`,
  action: "mt-[1.05rem] inline-flex items-center gap-[0.45rem] rounded-full border border-[color-mix(in_srgb,var(--gold)_55%,transparent)] px-4 py-[0.62rem] text-[0.62rem] tracking-[0.16em] text-(--ink) uppercase no-underline [transition:background_200ms_ease,color_200ms_ease] hover:bg-(--ink) hover:text-(--white) focus-visible:bg-(--ink) focus-visible:text-(--white)",
  icon: "h-[0.95rem] w-[0.95rem] fill-none stroke-current stroke-[1.6]",
};

export default function Details({ data }: { data: BotanicalContent }) {
  const calendarId = data.calendarId ?? "botanical";
  const calendarUrl = getCalendarUrl(data, calendarId);
  return (
    <section className={styles.section} aria-label="Wedding details">
      <Reveal className={styles.intro}>
        <p className={styles.label}>The details</p>
        <h2 className={styles.script}>Join us</h2>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <WaveOrnamentIcon />
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
            <AddToCalendar
              template={calendarId}
              href={calendarUrl}
              className={styles.action}
            >
              <CalendarIcon className={styles.icon} />
              Add to calendar
            </AddToCalendar>
          </article>
        </Reveal>

        <Reveal delayMs={90}>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Where</p>
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
              Open map
            </a>
          </article>
        </Reveal>

        {data.dressCode ? (
          <Reveal delayMs={180}>
            <article className={styles.card}>
              <p className={styles.cardLabel}>Dress code</p>
              <p className={styles.title}>{data.dressCode}</p>
            </article>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
