"use client";

import CountdownLinesIcon from "@/components/icons/CountdownLinesIcon";
import Reveal from "@/components/Reveal";
import type { ElegantInvitation } from "@/data/elegant";
import { fullDate, templateCopy } from "@/data/template-copy";
import { pad, useRemainingTime } from "@/hooks/useRemainingTime";

const UNITS = ["hours", "minutes", "seconds"] as const;

const COPY = {
  en: {
    label: "The countdown",
    title: "until the arch opens",
    done: "The garden is open",
    days: "Days",
  },
  ar: {
    label: "العد التنازلي",
    title: "لحد ما القوس يتفتح",
    done: "الجنينة مستنياكم",
    days: "يوم",
  },
} as const;

export default function Countdown({ data }: { data: ElegantInvitation }) {
  const remaining = useRemainingTime(data.start);
  const t = COPY[data.lang];
  const common = templateCopy(data.lang);

  const dateLine = fullDate(data.dateLabel, data.lang);

  return (
    <section
      className="relative overflow-hidden px-5 pt-[3.4rem] pb-[2.4rem] text-center"
      aria-label={common.countdownLabel}
    >
      <div
        className="pointer-events-none absolute top-0"
        style={{
          left: "50%",
          translate: "-50% 0",
          width: "72%",
          height: "11rem",
        }}
        aria-hidden="true"
      >
        <CountdownLinesIcon />
      </div>

      <Reveal className="relative pt-8" style={{ paddingTop: "2rem" }}>
        <p className="text-[0.68rem] tracking-[0.34em] text-e-rose uppercase">
          {t.label}
        </p>
        <h2 className="mt-2 font-pinyon text-[clamp(2.5rem,10vw,3.15rem)] leading-none font-normal text-e-ink">
          {t.title}
        </h2>

        {remaining?.done ? (
          <div className="my-8">
            <p className="font-pinyon text-6xl leading-none text-e-rose">
              {common.today}
            </p>
            <p className="mt-2 text-[0.72rem] tracking-[0.22em] text-e-muted uppercase">
              {t.done}
            </p>
          </div>
        ) : (
          <>
            <div className="relative mx-auto mt-6 grid size-[15.2rem] place-items-center">
              <span
                className="absolute inset-0 rounded-full border border-e-rose/40"
                aria-hidden="true"
              />
              <span
                className="absolute inset-[0.65rem] rounded-full border border-dashed border-e-gold/75"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 animate-e-orbit"
                style={{ animation: "spin 60s linear infinite" }}
                aria-hidden="true"
              >
                <i className="absolute top-[-0.22rem] left-1/2 size-[0.48rem] -translate-x-1/2 rounded-full bg-e-rose shadow-[0_0_0_4px_color-mix(in_srgb,#fbf6f1_80%,transparent)]" />
              </span>
              <p className="relative m-0">
                <span
                  key={remaining?.days ?? "d"}
                  className="block animate-e-tick font-bodoni text-[5.4rem] leading-[0.8] font-medium tracking-[-0.04em] text-e-rose-deep italic"
                >
                  {remaining ? remaining.days : "—"}
                </span>
                <span className="mt-2 block text-[0.66rem] tracking-[0.32em] text-e-muted uppercase">
                  {t.days}
                </span>
              </p>
            </div>

            <div className="mx-auto mt-5 grid max-w-72 grid-cols-3 gap-1.5">
              {UNITS.map((unit) => (
                <div key={unit}>
                  <span
                    key={remaining?.[unit] ?? unit}
                    className="block animate-e-tick font-bodoni text-[1.85rem] leading-none font-medium text-e-ink"
                  >
                    {remaining ? pad(remaining[unit]) : "—"}
                  </span>
                  <span className="mt-1 block text-[0.58rem] tracking-[0.18em] text-e-muted uppercase">
                    {common.units[unit]}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-5 font-bodoni text-[1.12rem] text-e-muted italic">
          {dateLine}
        </p>
      </Reveal>
    </section>
  );
}
