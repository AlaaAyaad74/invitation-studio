"use client";

import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import { atelierRoseInvitation as data, rsvpUrl } from "@/data/atelier-rose";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Rose, Sprig } from "./Paper";
import Reveal from "./Reveal";
import styles from "./Rsvp.module.css";
import ui from "./ui.module.css";

type Stage = "write" | "folding" | "flying" | "sent";
type Answer = "accept" | "decline";

const MAX_GUESTS = 5;

function composeMessage(name: string, answer: Answer, guests: number, note: string) {
  const { first, second } = data.couple;
  const lines = [`Dear ${first} & ${second},`];
  if (answer === "accept") {
    lines.push(
      `${name} joyfully accepts your invitation, ${guests} ${guests > 1 ? "guests" : "guest"} in total.`,
    );
  } else {
    lines.push(`${name} regretfully can't make it, but sends all their love.`);
  }
  if (note.trim()) lines.push("", `"${note.trim()}"`);
  return lines.join("\n");
}

export default function Rsvp() {
  const { rsvp } = data;
  const [stage, setStage] = useState<Stage>("write");
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState<Answer>("accept");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage !== "write") return;
    const url = rsvpUrl(composeMessage(name.trim(), answer, guests, note));
    setLink(url);
    navigator.vibrate?.(10);

    const fast = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStage("folding");
    timers.current.push(
      window.setTimeout(() => setStage("flying"), fast ? 50 : 700),
      window.setTimeout(
        () => {
          setStage("sent");
          // Phones hand wa.me to the WhatsApp app. Same-tab navigation is
          // never blocked the way a delayed pop-up is. On desktop the guest
          // keeps the page and uses the button instead.
          if (window.matchMedia("(pointer: coarse)").matches) {
            window.location.href = url;
          }
        },
        fast ? 150 : 2000,
      ),
    );
  };

  return (
    <Reveal as="section" className={`${ui.section} ${styles.section}`} aria-label="Reply">
      <p className={`${ui.kicker} ${ui.rise}`}>Kindly reply</p>
      <h2 className={`${ui.title} ${ui.rise}`} style={{ "--d": "120ms" } as CSSProperties}>
        Send us a note
      </h2>
      <p className={`${ui.lead} ${ui.rise}`} style={{ "--d": "220ms" } as CSSProperties}>
        {rsvp.deadline}
      </p>

      <div className={`${styles.desk} ${ui.rise}`} style={{ "--d": "320ms" } as CSSProperties} data-stage={stage}>
        <form className={styles.note} onSubmit={send} inert={stage !== "write"}>
          <Rose className={styles.noteRose} tone="peach" />
          <Sprig className={styles.noteSprig} />

          <label className={styles.field}>
            <span className={styles.label}>Your name</span>
            <input
              className={styles.input}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={60}
              autoComplete="name"
              placeholder="Write it here"
            />
          </label>

          <fieldset className={styles.choice}>
            <legend className={styles.label}>Will you join us?</legend>
            <label className={styles.chip}>
              <input
                type="radio"
                name="answer"
                checked={answer === "accept"}
                onChange={() => setAnswer("accept")}
              />
              <span>Joyfully yes</span>
            </label>
            <label className={styles.chip}>
              <input
                type="radio"
                name="answer"
                checked={answer === "decline"}
                onChange={() => setAnswer("decline")}
              />
              <span>Sadly no</span>
            </label>
          </fieldset>

          <div className={styles.guests} data-hidden={answer === "decline" ? "true" : "false"}>
            <span className={styles.label} id="ar-guests">
              Guests, you included
            </span>
            <div className={styles.stepper} role="group" aria-labelledby="ar-guests">
              <button
                type="button"
                onClick={() => setGuests((value) => Math.max(1, value - 1))}
                disabled={guests <= 1}
                aria-label="One guest fewer"
              >
                −
              </button>
              <output aria-live="polite">{guests}</output>
              <button
                type="button"
                onClick={() => setGuests((value) => Math.min(MAX_GUESTS, value + 1))}
                disabled={guests >= MAX_GUESTS}
                aria-label="One more guest"
              >
                +
              </button>
            </div>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>A line for the couple</span>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={240}
              rows={3}
              placeholder="Optional, but we'd love it"
            />
          </label>

          <button type="submit" className={`${ui.button} ${styles.submit}`}>
            Fold &amp; send
            <svg viewBox="0 0 24 24" className={ui.icon} aria-hidden="true">
              <path d="M21 3 3 10.5l7 2.5M21 3l-4 18-7-8M21 3 10 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* The note, folded into a plane, flying off to WhatsApp. */}
        <span className={styles.flight} aria-hidden="true">
          <svg className={styles.trail} viewBox="0 0 300 340" preserveAspectRatio="none">
            <path d="M150,320 C60,280 40,190 120,160 S250,120 290,10" />
          </svg>
          <svg className={styles.plane} viewBox="0 0 64 48">
            <path d="M2,22 62,2 40,46 28,30Z" fill="var(--card)" />
            <path d="M62,2 28,30 30,44Z" fill="var(--blush-deep)" />
            <path d="M2,22 62,2 28,30Z" fill="#f6ebe6" />
            <path d="M2,22 62,2 40,46 28,30Z M62,2 28,30" fill="none" stroke="var(--rose-deep)" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </span>

        <div className={styles.sent} aria-live="polite">
          {stage === "sent" ? (
            <>
              <p className={styles.sentTitle}>Your note is on its way</p>
              <p className={styles.sentCopy}>
                WhatsApp should open with your message ready. Just press send.
              </p>
              <a href={link} target="_blank" rel="noreferrer" className={ui.button}>
                <WhatsAppIcon className={`${ui.icon} fill-current`} />
                Open WhatsApp
              </a>
              <button type="button" className={styles.again} onClick={() => setStage("write")}>
                Write another note
              </button>
            </>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
