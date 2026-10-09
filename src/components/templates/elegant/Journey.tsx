import CalendarIcon from "@/app/common/icons/CalendarIcon";
import Reveal from "@/components/Reveal";
import {
  elegantInvitation as data,
  getCalendarUrl,
} from "@/data/elegant";

const calendarUrl = getCalendarUrl(data);

const actionClass =
  "inline-flex flex-1 items-center justify-center gap-1.5 px-3 py-3 text-[0.62rem] tracking-[0.12em] whitespace-nowrap text-e-leaf uppercase no-underline transition-colors duration-200 hover:bg-e-blush focus-visible:bg-e-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e-leaf";

const SWATCHES = [
  { name: "Blush", className: "bg-e-blush border-e-rose/50" },
  { name: "Ivory", className: "bg-e-white border-e-gold" },
  { name: "Green", className: "bg-e-leaf border-e-leaf" },
] as const;

export default function Journey() {
  return (
    <section className="px-[1.35rem] pt-5 pb-10" aria-label="Wedding day">
      <Reveal className="text-center">
        <p className="text-[0.68rem] tracking-[0.34em] text-e-rose uppercase">
          The day
        </p>
        <h2 className="mt-2 font-pinyon text-[clamp(2.6rem,11vw,3.3rem)] leading-none font-normal text-e-ink">
          Walk with us
        </h2>
        <p className="mx-auto mt-3.5 max-w-64 font-bodoni text-[1.15rem] leading-snug text-e-muted italic">
          {data.verse}
        </p>
      </Reveal>

      <Reveal>
        <div className="relative mx-auto mt-1.5 grid h-[15.5rem] place-items-center text-e-rose">
          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 240 168"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M28 166 V78 C28 36 68 14 120 14 C172 14 212 36 212 78 V166"
              stroke="currentColor"
              strokeWidth="1.15"
            />
            <path
              d="M44 166 V82 C44 48 76 30 120 30 C164 30 196 48 196 82 V166"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.45"
            />
            <circle cx="28" cy="166" r="3" fill="currentColor" />
            <circle cx="212" cy="166" r="3" fill="currentColor" />
          </svg>
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
            <Reveal key={moment.label} delayMs={index * 90}>
              <article className="flex items-start gap-3">
                <span className="relative flex w-9 shrink-0 justify-center self-stretch">
                  {index < data.moments.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute"
                      style={{
                        top: 30,
                        bottom: -42,
                        left: "50%",
                        width: 1,
                        transform: "translateX(-50%)",
                        background: "linear-gradient(#c45c6c, #d4b483)",
                      }}
                    />
                  ) : null}
                  <span className="relative z-[1] mt-3 grid size-9 place-items-center rounded-full border border-e-rose/70 bg-e-cream text-e-rose shadow-[0_0_0_4px_#fbf6f1]">
                    <MomentMark index={index} />
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
                  {moment.label === "Attire" ? (
                    <ul className="mt-3 flex gap-2">
                      {SWATCHES.map((swatch) => (
                        <li key={swatch.name}>
                          <span
                            className={`block size-4 rounded-full border ${swatch.className}`}
                            title={swatch.name}
                          />
                          <span className="sr-only">{swatch.name}</span>
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
          <a href={calendarUrl} target="_blank" rel="noreferrer" className={actionClass}>
            <CalendarIcon className="size-4 fill-none stroke-current stroke-[1.6]" />
            Add to calendar
          </a>
          <a
            href={data.venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} border-l border-e-leaf/15`}
          >
            <MapIcon />
            Open the map
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function MomentMark({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <path d="M12 3.2 13.15 7.6 17.7 8.55 13.15 9.5 12 13.9 10.85 9.5 6.3 8.55 10.85 7.6 12 3.2Z" />
        <path d="M17.2 13.2 17.8 15.2 19.8 15.75 17.8 16.3 17.2 18.3 16.6 16.3 14.6 15.75 16.6 15.2 17.2 13.2Z" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <path d="M7 17.5c0-6 4.2-9.2 10.8-10.2-.6 6.4-4.2 10.2-10.8 10.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
      <path
        d="M6.5 17.5V10.2C6.5 7.2 8.8 5.2 12 5.2s5.5 2 5.5 5V17.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
      <path
        d="M12 20.5s5.5-4.7 5.5-9.2a5.5 5.5 0 1 0-11 0c0 4.5 5.5 9.2 5.5 9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11.2" r="1.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
