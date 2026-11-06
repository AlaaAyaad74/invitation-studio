"use client";

import { desertBloomInvitation as data } from "@/data/desert-bloom";
import { useEffect, useRef, useState } from "react";
import InView from "./InView";
import { Bloom } from "./Ornaments";
import motion from "./motion.module.css";
import ui from "./ui.module.css";
import styles from "./Timeline.module.css";

// Where on screen the flower "sits" while the list scrolls past (0 = top).
const ANCHOR = 0.55;

export default function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;
    let centers: number[] = [];

    const measure = () => {
      centers = [...list.querySelectorAll<HTMLElement>("[data-node]")].map(
        (node) => {
          const item = node.parentElement as HTMLElement;
          return item.offsetTop + node.offsetTop + node.offsetHeight / 2;
        },
      );
      if (!centers.length) return;
      list.style.setProperty("--start", `${centers[0]}px`);
      list.style.setProperty("--end", `${centers[centers.length - 1]}px`);
    };

    const update = () => {
      frame = 0;
      if (!centers.length) return;
      const start = centers[0];
      const end = centers[centers.length - 1];
      const anchor =
        window.innerHeight * ANCHOR - list.getBoundingClientRect().top;
      const travel = Math.min(end, Math.max(start, anchor));

      list.style.setProperty("--travel", `${travel}px`);
      list.style.setProperty("--spin", `${(travel - start) * 0.9}deg`);
      list.dataset.moving = anchor > start && anchor < end ? "true" : "false";

      let last = -1;
      centers.forEach((center, index) => {
        if (travel >= center - 2) last = index;
      });
      setReached((current) => (current === last ? current : last));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const remeasure = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    const observer = new ResizeObserver(remeasure);
    observer.observe(list);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.timeline} aria-label="The evening">
      <InView className={styles.head}>
        <p className={`${ui.kicker} ${motion.kickerIn}`}>The evening</p>
        <h2 className={`${ui.heading} ${motion.writeIn}`}>How it unfolds</h2>
      </InView>

      <div ref={listRef} className={styles.track}>
        <span className={styles.rail} aria-hidden="true" />
        <span className={styles.trail} aria-hidden="true" />
        <span className={styles.traveler} aria-hidden="true">
          <Bloom className={styles.travelerBloom} />
        </span>

        <ol className={styles.moments}>
          {data.moments.map((moment, index) => (
            <InView
              as="li"
              key={moment.title}
              className={styles.moment}
              threshold={0.6}
              data-reached={index <= reached ? "true" : "false"}
            >
              <span className={styles.node} data-node>
                <Bloom className={styles.nodeBloom} />
              </span>
              <span className={styles.time}>{moment.time}</span>
              <strong className={styles.momentTitle}>{moment.title}</strong>
              <span className={styles.momentDetail}>{moment.detail}</span>
            </InView>
          ))}
        </ol>
      </div>
    </section>
  );
}
