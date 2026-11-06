import MusicPlayer from "@/components/templates/MusicPlayer";
import { desertBloomInvitation as data } from "@/data/desert-bloom";
import { Fragment, type CSSProperties } from "react";
import Countdown from "./Countdown";
import Details from "./Details";
import Footer from "./Footer";
import Gallery from "./Gallery";
import InView from "./InView";
import Petals from "./Petals";
import Rsvp from "./Rsvp";
import ScratchReveal from "./ScratchReveal";
import Timeline from "./Timeline";
import VideoCover from "./VideoCover";
import styles from "./Invitation.module.css";

const WORDS = data.welcome.split(" ");

export default function Invitation() {
  const { couple } = data;

  return (
    <div className={styles.root}>
      <VideoCover />

      <InView
        as="section"
        className={styles.welcome}
        aria-label="Welcome"
        offset="35%"
      >
        <span className={styles.sunrise} aria-hidden="true" />
        <p className={`${styles.kicker} ${styles.kickerIn}`}>{data.intro}</p>
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
          className={`${styles.tagline} ${styles.kickerIn}`}
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

      <ScratchReveal />
      <Countdown />

      <Timeline />

      <Details />

      <Gallery />

      <Rsvp />

      <Footer />

      <Petals />
      <MusicPlayer src={data.music} />
    </div>
  );
}
