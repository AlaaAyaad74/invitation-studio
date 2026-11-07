import ArchFrameIcon from "@/components/icons/ArchFrameIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import AddToCalendar from "@/components/templates/AddToCalendar";
import { getCalendarUrl, type ElegantInvitation } from "@/data/elegant";
import { templateCopy } from "@/data/template-copy";
import { LuWatch } from "react-icons/lu";
import { PiDressLight } from "react-icons/pi";
import { TbGlassFull } from "react-icons/tb";

const actionClass =
  "inline-flex flex-1 items-center justify-center gap-1.5 px-3 py-3 text-[0.62rem] tracking-[0.12em] whitespace-nowrap text-e-leaf uppercase no-underline transition-colors duration-200 hover:bg-e-blush focus-visible:bg-e-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-leaf";

const SWATCHES = [
  { name: { en: "Blush", ar: "وردي" }, className: "bg-e-blush border-e-rose/50" },
  { name: { en: "Ivory", ar: "عاجي" }, className: "bg-e-white border-e-gold" },
  { name: { en: "Green", ar: "أخضر" }, className: "bg-e-leaf border-e-leaf" },
] as const;

const COPY = {
  en: { label: "The day", title: "Walk with us", map: "Open the map" },
  ar: { label: "اليوم الموعود", title: "امشوا معنا", map: "افتح الخريطة" },
} as const;

export default function Journey({ data }: { data: ElegantInvitation }) {
  const calendarUrl = getCalendarUrl(data);
  const t = COPY[data.lang];
  const common = templateCopy(data.lang);

  return (
    <section className="px-[1.35rem] pt-5 pb-10" aria-label={common.weddingDay}>
      <Reveal className="text-center">
        <p className="text-[0.68rem] tracking-[0.34em] text-e-rose uppercase">
          {t.label}
        </p>
        <h2 className="mt-2 font-pinyon text-[clamp(2.6rem,11vw,3.3rem)] leading-none font-normal text-e-ink">
          {t.title}
        </h2>
        <p className="mx-auto mt-3.5 max-w-64 font-bodoni text-[1.15rem] leading-snug text-e-muted italic">
          {data.verse}
        </p>
      </Reveal>

      <Reveal>
        <div className="relative mx-auto mt-1.5 grid h-[15.5rem] place-items-center text-e-rose">
          <ArchFrameIcon className="absolute inset-0 size-full" />
          <div className="relative mt-6 text-center text-e-ink">
            <p className="text-[0.66rem] tracking-[0.28em] text-e-muted uppercase">
              {data.dateLabel.weekday}
            </p>
            <p className="my-0.5 font-bodoni text-[5.1rem] leading-[0.8] font-medium tracking-[-0.04em] text-e-ink italic">
              {data.dateLabel.day}
            </p>
            <p className="mt-1.5 text-[0.66rem] tracking-[0.28em] text-e-muted uppercase">
              {data.dateLabel.month} {data.dateLabel.year}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="-mt-1 text-center">
        <p className="font-bodoni text-[1.85rem] leading-tight font-medium">
          {data.venue.name}
        </p>
        <p className="mt-1.5 font-bodoni text-[1.05rem] text-e-muted italic">
          {data.venue.address}
        </p>
        <p className="mt-1.5 font-bodoni text-[1.05rem] text-e-muted italic">
          {data.timeLabel}
        </p>
      </Reveal>

      <div className="mt-8">
        <div className="grid gap-3">
          {data.moments.map((moment, index) => (
            <Reveal key={moment.kind} delayMs={index * 90}>
              <article className="flex items-start gap-3">
                <span
                  className="relative flex shrink-0 justify-center self-stretch"
                  style={{ width: "2.75rem" }}
                >
                  {index < data.moments.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute"
                      style={{
                        top: 34,
                        bottom: -42,
                        left: "50%",
                        width: 1,
                        transform: "translateX(-50%)",
                        background: "linear-gradient(#c45c6c, #d4b483)",
                      }}
                    />
                  ) : null}
                  <span
                    className="relative z-[1] mt-3 grid place-items-center rounded-full border border-e-rose/70 bg-e-cream text-e-rose shadow-[0_0_0_4px_#fbf6f1]"
                    style={{ width: "2.75rem", height: "2.75rem" }}
                  >
                    <MomentMark kind={moment.kind} />
                  </span>
                </span>
                <div className="min-w-0 flex-1 rounded-2xl bg-e-white px-4 py-3 shadow-[0_18px_34px_-26px_rgba(36,28,26,0.55)]">
                  <p className="text-[0.62rem] tracking-[0.28em] text-e-rose uppercase">
                    {moment.label}
                  </p>
                  <p className="mt-1 font-bodoni text-[1.55rem] leading-tight font-medium italic">
                    {moment.time}
                  </p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-e-muted">
                    {moment.detail}
                  </p>
                  {moment.kind === "attire" ? (
                    <ul className="mt-3 flex gap-2">
                      {SWATCHES.map((swatch) => (
                        <li key={swatch.name.en}>
                          <span
                            className={`block size-4 rounded-full border ${swatch.className}`}
                            title={swatch.name[data.lang]}
                          />
                          <span className="sr-only">{swatch.name[data.lang]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-5">
        <div className="flex overflow-hidden rounded-full border border-e-leaf/15 bg-e-white">
          <AddToCalendar template={data.calendarId} href={calendarUrl} className={actionClass}>
            <CalendarIcon className="size-4 fill-none stroke-current stroke-[1.6]" />
            {common.addToCalendar}
          </AddToCalendar>
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} border-s border-e-leaf/15`}
          >
            <MapPinIcon className="size-4" />
            {t.map}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function MomentMark({ kind }: { kind: string }) {
  const iconProps = { size: "1.55rem", "aria-hidden": true } as const;

  if (kind === "celebration") return <TbGlassFull {...iconProps} />;
  if (kind === "attire") return <PiDressLight {...iconProps} />;
  return <LuWatch {...iconProps} />;
}
