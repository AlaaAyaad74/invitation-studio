import CalendarIcon from "@/app/common/icons/CalendarIcon";
import AddToCalendar from "@/components/templates/AddToCalendar";
import {
  desertBloomInvitation as data,
  getCalendarUrl,
} from "@/data/desert-bloom";
import InView from "./InView";
import shared from "./Invitation.module.css";
import { Bloom, Branch } from "./Ornaments";
import styles from "./Details.module.css";

const calendarUrl = getCalendarUrl();

export default function Details() {
  const { dateLabel, venue } = data;

  return (
    <InView as="section" className={styles.details} aria-label="When and where">
      <div className={styles.gate}>
        <div className={styles.card}>
          <span className={styles.apex} aria-hidden="true">
            <Bloom className={styles.apexBloom} />
          </span>
          <Lantern />
          <InView className={styles.item}>
            <Palace />
          </InView>

          <InView className={`${styles.block} ${styles.item}`}>
            <span className={styles.medallion}>
              <CalendarIcon className={styles.medallionIcon} />
            </span>
            <span className={styles.label}>When</span>
            <strong className={styles.value}>
              {dateLabel.day} {dateLabel.month} {dateLabel.year}
            </strong>
            <span className={styles.note}>{dateLabel.weekday} evening</span>
            <span className={styles.chip}>
              <ClockIcon />
              {data.timeShort}
            </span>
          </InView>

          <InView className={styles.item}>
            <Branch className={styles.branch} />
          </InView>

          <InView className={`${styles.block} ${styles.item}`}>
            <span className={styles.medallion}>
              <PinIcon className={styles.medallionIcon} />
            </span>
            <span className={styles.label}>Where</span>
            <strong className={styles.value}>{venue.name}</strong>
            <span className={styles.note}>{venue.city}</span>
          </InView>

          <InView className={`${styles.mapWrap} ${styles.item}`}>
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.map}
              aria-label={`Open ${venue.name} in maps`}
            >
              <MapArt />
              <span className={styles.mapCta}>
                Open location
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </InView>

          <InView className={styles.item}>
            <AddToCalendar
              template="desert-bloom"
              href={calendarUrl}
              className={shared.primary}
            >
              <CalendarIcon className={`${shared.icon} ${shared.iconStroke}`} />
              Add to calendar
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
      <svg viewBox="0 0 40 104" fill="none">
        <defs>
          <linearGradient id="db-lantern-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6e2" />
            <stop offset="1" stopColor="#f3cf9f" />
          </linearGradient>
        </defs>
        {/* Chain */}
        <g stroke="var(--gold-soft)" strokeWidth="1">
          <ellipse cx="20" cy="4" rx="1.6" ry="2.6" />
          <ellipse cx="20" cy="10" rx="1.6" ry="2.6" />
          <ellipse cx="20" cy="16" rx="1.6" ry="2.6" />
          <ellipse cx="20" cy="22" rx="1.6" ry="2.6" />
        </g>
        <g stroke="var(--gold)" strokeWidth="1.1" strokeLinejoin="round">
          {/* Finial and cap */}
          <circle cx="20" cy="28" r="2.4" fill="var(--surface)" />
          <path d="M20 30.5v3" />
          <path
            d="M10.5 42c1.5-5.5 5-8.5 9.5-8.5s8 3 9.5 8.5z"
            fill="var(--gold-soft)"
          />
          <path d="M9 42h22v2.6H9z" fill="var(--gold)" />
          {/* Glass body with arched panels */}
          <path d="M11 44.6h18l-1.6 30H12.6z" fill="url(#db-lantern-glass)" />
          <path
            d="M15 72V52.5a2.6 2.6 0 0 1 5.2 0V72M19.8 72V52.5a2.6 2.6 0 0 1 5.2 0V72"
            stroke="var(--gold-soft)"
            strokeWidth="0.8"
          />
          {/* Base */}
          <path d="M11.6 74.6h16.8v2.6H11.6z" fill="var(--gold)" />
          <path d="M13.5 77.2h13L23 82.5h-6z" fill="var(--gold-soft)" />
        </g>
        {/* Tassel */}
        <path d="M20 82.5v5" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="20" cy="89" r="1.8" fill="var(--gold)" />
        <path
          d="M18.6 90.5 18 98M20 90.8v8M21.4 90.5 22 98"
          stroke="var(--rose)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// Fine line drawing of the palace, sitting inside the arch.
function Palace() {
  return (
    <svg
      className={styles.palace}
      viewBox="0 0 240 92"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="db-palace-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2d6c2" />
          <stop offset="1" stopColor="#fffbf6" />
        </linearGradient>
        <linearGradient id="db-palace-ground" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9a56b" stopOpacity="0" />
          <stop offset="0.2" stopColor="#c9a56b" />
          <stop offset="0.8" stopColor="#c9a56b" />
          <stop offset="1" stopColor="#c9a56b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g
        stroke="var(--gold-soft)"
        strokeWidth="0.9"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="var(--surface)"
      >
        {/* Towers */}
        <path d="M40 86V48h8v38M192 86V48h8v38" />
        <path d="M38 58h12M190 58h12" />
        <path
          d="M40 48c0-5 1.8-8 4-10 2.2 2 4 5 4 10M192 48c0-5 1.8-8 4-10 2.2 2 4 5 4 10"
          fill="url(#db-palace-dome)"
        />
        <path d="M44 38v-4M196 38v-4" />
        <path d="M42.4 70v-4a1.6 1.6 0 0 1 3.2 0v4M194.4 70v-4a1.6 1.6 0 0 1 3.2 0v4" />

        {/* Wings */}
        <path d="M56 86V66h34v20M150 86V66h34v20" />
        <path d="M54 66h38M148 66h38" />
        <path
          d="M64 66c0-5.5 4-8.5 9-11 5 2.5 9 5.5 9 11M158 66c0-5.5 4-8.5 9-11 5 2.5 9 5.5 9 11"
          fill="url(#db-palace-dome)"
        />
        <path d="M73 55v-3.5M167 55v-3.5" />
        <path d="M61 82v-7a3 3 0 0 1 6 0v7M70 82v-7a3 3 0 0 1 6 0v7M79 82v-7a3 3 0 0 1 6 0v7" />
        <path d="M155 82v-7a3 3 0 0 1 6 0v7M164 82v-7a3 3 0 0 1 6 0v7M173 82v-7a3 3 0 0 1 6 0v7" />

        {/* Main hall and dome */}
        <path d="M90 86V56h60v30" />
        <path d="M88 56h64" />
        <path d="M100 56v-5h40v5" />
        <path
          d="M101 51c0-15 10-22 19-30 9 8 19 15 19 30"
          fill="url(#db-palace-dome)"
          stroke="var(--gold)"
        />
        <path d="M120 21v-8" stroke="var(--gold)" />
        <circle cx="120" cy="10.5" r="2.3" stroke="var(--gold)" />
        <path d="M111 86V73a9 9 0 0 1 18 0v13" stroke="var(--gold)" />
        <path d="M96 70v-5a2.5 2.5 0 0 1 5 0v5M139 70v-5a2.5 2.5 0 0 1 5 0v5" />
      </g>

      {/* Ground */}
      <path d="M8 86h224" stroke="url(#db-palace-ground)" strokeWidth="1" />
      <path
        d="M86 89.5h68"
        stroke="var(--gold-soft)"
        strokeWidth="0.6"
        opacity="0.6"
      />

      {/* Roses */}
      <g fill="var(--sage)" opacity="0.75">
        <ellipse
          cx="22"
          cy="83"
          rx="4"
          ry="1.6"
          transform="rotate(-30 22 83)"
        />
        <ellipse cx="33" cy="82" rx="4" ry="1.6" transform="rotate(25 33 82)" />
        <ellipse
          cx="218"
          cy="83"
          rx="4"
          ry="1.6"
          transform="rotate(30 218 83)"
        />
        <ellipse
          cx="207"
          cy="82"
          rx="4"
          ry="1.6"
          transform="rotate(-25 207 82)"
        />
      </g>
      <g fill="var(--peach)">
        <circle cx="27" cy="80" r="3.4" />
        <circle cx="213" cy="80" r="3.4" />
        <circle cx="20" cy="85" r="2.2" />
        <circle cx="220" cy="85" r="2.2" />
      </g>
      <g fill="var(--rose)" opacity="0.5">
        <circle cx="27" cy="80" r="1.2" />
        <circle cx="213" cy="80" r="1.2" />
      </g>
    </svg>
  );
}

function MapArt() {
  return (
    <svg
      className={styles.mapArt}
      viewBox="0 0 300 120"
      fill="none"
      aria-hidden="true"
    >
      <rect width="300" height="120" fill="var(--bg-alt)" />
      <path
        d="M0 84c60-10 90 14 150 2s100-30 150-18v52H0z"
        fill="color-mix(in srgb, var(--sage) 14%, transparent)"
      />
      <g stroke="var(--surface)" strokeWidth="7" strokeLinecap="round">
        <path d="M-10 40c80 10 130-20 320 4" />
        <path d="M70 -10c10 50-6 90 10 140" />
        <path d="M230 -10c-16 60 10 80-6 140" />
      </g>
      <g stroke="var(--line)" strokeWidth="2">
        <path d="M0 100h300M120 0v120" />
      </g>
      <path
        className={styles.route}
        d="M30 104c30-6 40-30 50-52s60-14 100-10 40-4 52-6"
        stroke="var(--rose)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <circle
        cx="30"
        cy="104"
        r="4"
        fill="var(--surface)"
        stroke="var(--rose)"
        strokeWidth="2"
      />
      <g transform="translate(232 36)">
        <circle className={styles.ping} r="10" fill="var(--gold-soft)" />
        <path
          d="M0 4s-11-9.5-11-18a11 11 0 1 1 22 0c0 8.5-11 18-11 18Z"
          fill="var(--gold)"
          transform="translate(0 -6)"
        />
        <circle cx="0" cy="-20" r="4" fill="var(--surface)" />
      </g>
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 20.5s5.5-4.7 5.5-9.2a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.2 5.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="11.2"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
