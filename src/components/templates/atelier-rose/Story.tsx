"use client";

import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { Fragment, useState, type CSSProperties } from "react";
import { Rose, Sprig } from "./Paper";
import Reveal from "./Reveal";
import styles from "./Story.module.css";
import ui from "./ui.module.css";

type Side = "first" | "second";

export default function Story() {
  const { couple, signs } = data;
  const [flipped, setFlipped] = useState<Record<Side, boolean>>({
    first: false,
    second: false,
  });
  const words = data.welcome.split(" ");

  const signsList = [
    { side: "first" as const, name: couple.first, ...signs.first, tone: "blush" as const },
    { side: "second" as const, name: couple.second, ...signs.second, tone: "peach" as const },
  ];

  return (
    <Reveal as="section" className={`${ui.section} ${styles.story}`} aria-label="Our story">
      <span id="ar-story" className={styles.anchor} />
      <p className={`${ui.kicker} ${ui.rise}`}>Two chairs, one promise</p>

      {/* Twine with two signs hanging from it, like the chair signs. */}
      <div className={styles.line}>
        <svg className={styles.twine} viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,8 Q200,58 400,8" />
        </svg>
        <Sprig className={`${styles.twineSprig} ${styles.twineSprigLeft}`} />
        <Sprig className={`${styles.twineSprig} ${styles.twineSprigRight}`} />

        <div className={styles.signs}>
          {signsList.map((sign, index) => (
            <div
              key={sign.side}
              className={styles.hang}
              style={{ "--i": index } as CSSProperties}
            >
              <span className={styles.string} aria-hidden="true" />
              <button
                type="button"
                className={styles.card}
                data-flipped={flipped[sign.side] ? "true" : "false"}
                aria-pressed={flipped[sign.side]}
                aria-label={`${sign.word}: ${sign.name}. ${sign.note}`}
                onClick={() =>
                  setFlipped((current) => ({ ...current, [sign.side]: !current[sign.side] }))
                }
              >
                <span className={`${styles.face} ${styles.front}`} aria-hidden="true">
                  <Rose className={styles.cardRose} tone={sign.tone} />
                  <span className={styles.word}>{sign.word}</span>
                  <span className={styles.flourish} />
                  <span className={styles.tap}>tap to turn</span>
                </span>
                <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
                  <span className={styles.backName}>{sign.name}</span>
                  <span className={styles.backNote}>{sign.note}</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* The welcome note writes itself in, word by word. */}
      <p className={styles.welcome}>
        {words.map((word, index) => (
          <Fragment key={index}>
            <span style={{ "--w": index } as CSSProperties}>{word}</span>{" "}
          </Fragment>
        ))}
      </p>
      <p className={`${styles.signature} ${ui.rise}`} style={{ "--d": `${words.length * 45 + 300}ms` } as CSSProperties}>
        {couple.first} &amp; {couple.second}
      </p>
    </Reveal>
  );
}
