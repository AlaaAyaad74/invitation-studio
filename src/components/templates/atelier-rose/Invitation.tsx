"use client";

import MusicPlayer from "@/components/templates/MusicPlayer";
import StudioCredit from "@/components/templates/StudioCredit";
import { atelierRoseInvitation as data } from "@/data/atelier-rose";
import { useState, type CSSProperties } from "react";
import Bloom from "./Bloom";
import Countdown from "./Countdown";
import Deck from "./Deck";
import Gallery from "./Gallery";
import Hero from "./Hero";
import Opening from "./Opening";
import { PaperDefs, Rose, Sprig } from "./Paper";
import Petals from "./Petals";
import Reveal from "./Reveal";
import Rsvp from "./Rsvp";
import Story from "./Story";
import Thread from "./Thread";
import Venue from "./Venue";
import styles from "./Invitation.module.css";
import ui from "./ui.module.css";

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const { couple } = data;

  return (
    <div className={styles.invitation}>
      <PaperDefs />
      <Opening onOpen={() => setOpened(true)} />

      <Hero ready={opened} />
      <Story />
      <Countdown />
      <Deck />
      <Venue />
      <Gallery />
      <Bloom />
      <Rsvp />

      <Reveal as="footer" className={styles.closing} offset="5%">
        <div className={styles.closingBouquet} aria-hidden="true">
          <Sprig className={styles.closingSprig} />
          <Sprig className={`${styles.closingSprig} ${styles.closingSprigRight}`} />
          <Rose className={styles.closingRose} tone="blush" />
          <Rose className={styles.closingRoseSmall} tone="peach" />
        </div>
        <p className={`${styles.closingLine} ${ui.rise}`}>See you there</p>
        <p className={`${styles.closingNames} ${ui.rise}`} style={{ "--d": "150ms" } as CSSProperties}>
          {couple.first} &amp; {couple.second}
        </p>
        <StudioCredit className={styles.credit} />
      </Reveal>

      <Thread active={opened} />
      <Petals active={opened} />
      <MusicPlayer src={data.music} label="Atelier Rose music" />
    </div>
  );
}
