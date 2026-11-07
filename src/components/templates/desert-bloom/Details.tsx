import ArrowUpRightIcon from "@/components/icons/ArrowUpRightIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import LanternIcon from "@/components/icons/LanternIcon";
import MapArtIcon from "@/components/icons/MapArtIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
import PalaceIcon from "@/components/icons/PalaceIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { getCalendarUrl, type DesertBloomInvitation } from "@/data/desert-bloom";
import { templateCopy } from "@/data/template-copy";
import InView from "./InView";
import ui from "./ui.module.css";
import BloomIcon from "@/components/icons/BloomIcon";
import BranchIcon from "@/components/icons/BranchIcon";
import styles from "./Details.module.css";

export default function Details({ data }: { data: DesertBloomInvitation }) {
  const { dateLabel, venue } = data;
  const calendarUrl = getCalendarUrl(data);
  const ar = data.lang === "ar";
  const common = templateCopy(data.lang);

  return (
    <InView
      as="section"
      className={styles.details}
      aria-label={ar ? "الموعد والمكان" : "When and where"}
    >
      <div className={styles.gate}>
        <div className={styles.card}>
          <span className={styles.apex} aria-hidden="true">
            <BloomIcon className={styles.apexBloom} />
          </span>
          <Lantern />
          <InView className={styles.item}>
            <PalaceIcon className={styles.palace} />
          </InView>

          <InView className={`${styles.block} ${styles.item}`}>
            <span className={styles.medallion}>
              <CalendarIcon className={styles.medallionIcon} />
            </span>
            <span className={styles.label}>{common.when}</span>
            <strong className={styles.value}>
              {dateLabel.day} {dateLabel.month} {dateLabel.year}
            </strong>
            <span className={styles.note}>
              {ar ? `مساء ${dateLabel.weekday}` : `${dateLabel.weekday} evening`}
            </span>
            <span className={styles.chip}>
              <ClockIcon />
              {data.timeShort}
            </span>
          </InView>

          <InView className={styles.item}>
            <BranchIcon className={styles.branch} />
          </InView>

          <InView className={`${styles.block} ${styles.item}`}>
            <span className={styles.medallion}>
              <MapPinIcon className={styles.medallionIcon} />
            </span>
            <span className={styles.label}>{common.where}</span>
            <strong className={styles.value}>{venue.name}</strong>
            <span className={styles.note}>{venue.city}</span>
          </InView>

          <InView className={`${styles.mapWrap} ${styles.item}`}>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.map}
              aria-label={
                ar ? `افتح ${venue.name} على الخريطة` : `Open ${venue.name} in maps`
              }
            >
              <MapArtIcon
                className={styles.mapArt}
                routeClassName={styles.route}
                pingClassName={styles.ping}
              />
              <span className={styles.mapCta}>
                {common.openLocation}
                <ArrowUpRightIcon strokeWidth={1.8} />
              </span>
            </a>
          </InView>

          <InView className={styles.item}>
            <AddToCalendar
              template={data.calendarId}
              href={calendarUrl}
              className={ui.primary}
            >
              <CalendarIcon className={`${ui.icon} ${ui.iconStroke}`} />
              {common.addToCalendar}
            </AddToCalendar>
          </InView>
        </div>
      </div>
    </InView>
  );
}

function Lantern() {
  return (
    <span className={styles.lantern} aria-hidden="true">
      <span className={styles.glow} />
      <LanternIcon />
    </span>
  );
}
