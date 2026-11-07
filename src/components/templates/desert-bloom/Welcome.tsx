import WelcomeFlourishIcon from "@/components/icons/WelcomeFlourishIcon";
import type { DesertBloomInvitation } from "@/data/desert-bloom";
import { Fragment, type CSSProperties } from "react";
import InView from "./InView";
import motion from "./motion.module.css";
import ui from "./ui.module.css";
import styles from "./Welcome.module.css";

/** Names, written in ink, with the welcome message word by word. */
export default function Welcome({ data }: { data: DesertBloomInvitation }) {
  const { couple } = data;
  const WORDS = data.welcome.split(" ");

  return (
    <InView
      as="section"
      className={styles.welcome}
      aria-label={data.lang === "ar" ? "ترحيب" : "Welcome"}
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
      <WelcomeFlourishIcon className={styles.flourish} />
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
