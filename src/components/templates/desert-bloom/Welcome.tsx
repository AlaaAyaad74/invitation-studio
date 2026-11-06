import { desertBloomInvitation as data } from "@/data/desert-bloom";
import { Fragment, type CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import ui from "./ui.module.css";
import styles from "./Welcome.module.css";

const WORDS = data.welcome.split(" ");

/** Names, written in ink, with the welcome message word by word. */
export default function Welcome() {
  const { couple } = data;

  return (
    <InView
      as="section"
      className={styles.welcome}
      aria-label="Welcome"
      offset="35%"
    >
      <span className={styles.sunrise} aria-hidden="true" />
      <p className={`${ui.kicker} ${motion.kickerIn}`}>{data.intro}</p>
      <h1 className={styles.names}>
        <span
          className={styles.name}
          style={{ "--d": "300ms" } as CSSProperties}
        >
          {couple.first}
        </span>
        <span
          className={styles.amp}
          style={{ "--d": "1500ms" } as CSSProperties}
        >
          &amp;
        </span>
        <span
          className={styles.name}
          style={{ "--d": "1700ms" } as CSSProperties}
        >
          {couple.second}
        </span>
      </h1>
      <svg
        className={styles.flourish}
        viewBox="0 0 220 30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 18c30-14 54 8 82-2 14-5 18-12 22-12s8 7 22 12c28 10 52-12 82 2"
          stroke="var(--gold-soft)"
          strokeWidth="1.2"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
      <p
        className={`${styles.tagline} ${motion.kickerIn}`}
        style={{ "--kd": "3000ms" } as CSSProperties}
      >
        {data.tagline}
      </p>
      <p className={styles.lead}>
        {WORDS.map((word, index) => (
          <Fragment key={index}>
            <span
              className={styles.word}
              style={{ "--d": `${3300 + index * 70}ms` } as CSSProperties}
            >
              {word}
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </InView>
  );
}
