"use client";

import MapPinIcon from "@/app/common/icons/MapPinIcon";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { atelierRoseInvitation as data, getCalendarUrl } from "@/data/atelier-rose";
import { useState, type CSSProperties } from "react";
import { Rose } from "./Paper";
import Reveal from "./Reveal";
import styles from "./Venue.module.css";
import ui from "./ui.module.css";

function StreetMap() {
  return (
    <svg className={styles.street} viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="168" fill="#f7e9e3" />
      {/* River. */}
      <path d="M-10,30 C60,10 90,70 150,64 S250,0 330,24 V-10 H-10Z" fill="#dfe6dc" />
      <path d="M-10,30 C60,10 90,70 150,64 S250,0 330,24" fill="none" stroke="#c8d3c3" strokeWidth="1.5" />
      {/* Gardens. */}
      <ellipse cx="62" cy="122" rx="38" ry="22" fill="#d6dfcc" />
      <ellipse cx="262" cy="128" rx="30" ry="18" fill="#d6dfcc" />
      {/* Streets. */}
      <g fill="none" stroke="#fffaf7" strokeLinecap="round">
        <path d="M-10,96 C80,90 200,104 330,92" strokeWidth="7" />
        <path d="M110,180 C120,120 150,90 172,40" strokeWidth="6" />
        <path d="M230,180 C214,140 210,110 220,60" strokeWidth="4" />
        <path d="M-10,150 C100,140 220,150 330,140" strokeWidth="4" />
        <path d="M40,60 C70,80 80,120 70,180" strokeWidth="3" />
      </g>
      <text x="22" y="24" className={styles.mapLabel}>The Nile</text>
      <text x="236" y="160" className={styles.mapLabel}>Zamalek</text>
      {/* Dotted route to the pin. */}
      <path
        d="M20,150 C70,140 110,110 160,96"
        fill="none"
        stroke="var(--rose)"
        strokeWidth="1.6"
        strokeDasharray="2 5"
        strokeLinecap="round"
        className={styles.route}
      />
      {/* Compass. */}
      <g transform="translate(290 46)" fill="none" stroke="var(--muted)" strokeWidth="0.9">
        <circle r="11" />
        <path d="M0,-15 L3,0 L0,15 L-3,0Z" fill="var(--blush-deep)" />
        <text y="-18" textAnchor="middle" className={styles.mapLabel} stroke="none">N</text>
      </g>
    </svg>
  );
}

export default function Venue() {
  const { venue, dateLabel } = data;
  const [open, setOpen] = useState(false);

  return (
    <Reveal as="section" className={`${ui.section} ${ui.scallop} ${styles.section}`} aria-label="Where">
      <p className={`${ui.kicker} ${ui.rise}`}>Where &amp; when</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Find your way
      </h2>

      <div
        className={`${styles.map} ${ui.rise}`}
        style={{ "--d": "260ms" } as CSSProperties}
        data-open={open ? "true" : "false"}
      >
        <div className={`${styles.panel} ${styles.p1}`}>
          <div className={styles.face}>
            <Rose className={styles.panelRose} tone="blush" />
            <span className={styles.panelKicker}>
              {dateLabel.weekday}, {dateLabel.day} {dateLabel.month} · {data.timeShort}
            </span>
            <h3 className={styles.venueName}>{venue.name}</h3>
            <span className={styles.city}>{venue.city}</span>
            <button
              type="button"
              className={styles.unfold}
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="ar-venue-map"
            >
              {open ? "Fold the map" : "Unfold the map"}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className={`${styles.panel} ${styles.p2}`} id="ar-venue-map" inert={!open}>
            <span className={styles.back} aria-hidden="true" />
            <div className={styles.face}>
              <StreetMap />
              <span className={styles.pin} aria-hidden="true">
                <MapPinIcon className={styles.pinIcon} />
              </span>
            </div>

            <div className={`${styles.panel} ${styles.p3}`}>
              <span className={styles.back} aria-hidden="true" />
              <div className={styles.face}>
                <p className={styles.address}>{venue.address}</p>
                <div className={styles.actions}>
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={ui.button}
                  >
                    Open map
                  </a>
                  <AddToCalendar
                    template="atelier-rose"
                    href={getCalendarUrl()}
                    className={`${ui.button} ${ui.ghost}`}
                  >
                    Save date
                  </AddToCalendar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
