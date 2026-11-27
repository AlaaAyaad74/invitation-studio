import type { IconType } from "react-icons";
import { LuCalendarCheck, LuClock3, LuStar } from "react-icons/lu";
import { IoCashOutline } from "react-icons/io5";
import StarIcon from "@/components/icons/StarIcon";
import Reveal from "@/components/Reveal";
import { contactCopy, startingPriceAmount } from "@/lib/contact";
import { getLang } from "@/lib/i18n-server";
import type { Lang } from "@/lib/i18n";

type TrustItem = {
  icon: IconType;
  /** Large display line. */
  value: string;
  /** Small unit beside the value (e.g. currency). */
  unit?: string;
  caption: string;
  /** Show a row of five stars under the value. */
  stars?: boolean;
};

const COPY = {
  en: {
    heading: "Why couples choose us",
    hrs: "hrs",
    price: "Starting price",
    delivery: "Delivery time",
    rsvpValue: "RSVP",
    rsvp: "Online guest replies",
    rated: "Rated by our couples",
    stars: "5 out of 5 stars",
  },
  ar: {
    heading: "ليه العرسان بيختارونا",
    hrs: "ساعة",
    price: "يبدأ السعر من",
    delivery: "وقت التسليم",
    rsvpValue: "تأكيد",
    rsvp: "حضور الضيوف أونلاين",
    rated: "تقييم عرساننا",
    stars: "5 من 5 نجوم",
  },
} as const;

function itemsFor(lang: Lang): TrustItem[] {
  const t = COPY[lang];
  return [
    {
      icon: IoCashOutline,
      value: startingPriceAmount,
      unit: contactCopy[lang].currency,
      caption: t.price,
    },
    { icon: LuClock3, value: "24:48", unit: t.hrs, caption: t.delivery },
    { icon: LuCalendarCheck, value: t.rsvpValue, caption: t.rsvp },
    { icon: LuStar, value: "5.0", caption: t.rated, stars: true },
  ];
}

// Hairline dividers: a 2 × 2 grid on phones, one row of four from md.
// Logical sides (border-e) so the grid mirrors in right-to-left.
const cellBorders = [
  "border-e border-b md:border-b-0",
  "border-b md:border-b-0 md:border-e",
  "border-e md:border-e",
  "",
];

/**
 * A display number with even-height (lining) digits; the ":" or "." between
 * the digits is set smaller in gold, like a printed invitation.
 */
function Figure({ value }: { value: string }) {
  const parts = value.split(/([:.])/);
  return (
    <span dir="ltr" className="inline-flex items-baseline">
      {parts.map((part, i) =>
        part === ":" || part === "." ? (
          <span
            key={i}
            className={`text-gold ${part === ":" ? "relative -top-[0.08em] mx-[0.08em] text-[0.8em]" : "mx-[0.02em]"}`}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

function GoldRule({ flip = false }: { flip?: boolean }) {
  return (
    <span aria-hidden className={`flex items-center gap-1.5 ${flip ? "flex-row-reverse" : ""}`}>
      <span
        className={`h-px w-4 min-[360px]:w-8 sm:w-14 ${flip ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-transparent to-gold/70`}
      />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
    </span>
  );
}

/**
 * Short reasons to trust us, styled like a stationery card: it rises over the
 * bottom of the hero, with an inner gold frame and a script heading.
 */
export default async function TrustStrip() {
  const lang = await getLang();
  const t = COPY[lang];
  const items = itemsFor(lang);

  return (
    <section
      aria-label={t.heading}
      className="relative z-20 -mt-8 px-3 sm:-mt-12 sm:px-8"
    >
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden bg-white shadow-[0_34px_70px_-36px_color-mix(in_srgb,var(--ink)_60%,transparent)]">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose/60 via-gold to-sage/70"
          />
          <div aria-hidden className="texture-grain pointer-events-none absolute inset-0 opacity-30" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -bottom-20 h-48 w-48 rounded-full bg-rose/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gold/15 blur-3xl"
          />
          {/* Inner frame, like the border on a printed invitation card. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-2.5 border border-gold/25 sm:inset-3"
          />

          <div className="relative flex items-center justify-center gap-2 pt-5 min-[360px]:gap-3 sm:pt-7">
            <GoldRule />
            <p className="font-script text-[1.4rem] leading-none whitespace-nowrap text-rose min-[360px]:text-[1.65rem] sm:text-3xl">
              {t.heading}
            </p>
            <GoldRule flip />
          </div>

          <ul className="relative mx-2.5 mb-2.5 mt-3 grid grid-cols-2 sm:mx-3 sm:mb-3 sm:mt-4 md:grid-cols-4">
            {/* Gold diamond where the phone grid's dividers cross. */}
            <li
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold md:hidden"
            />
            {items.map(({ icon: Icon, value, unit, caption, stars }, index) => (
              <li
                key={caption}
                className={`group flex flex-col items-center border-gold/20 px-2 pt-4 pb-4 text-center transition-colors duration-500 hover:bg-ivory/60 sm:pt-5 sm:pb-6 ${cellBorders[index]}`}
              >
                <span className="relative grid h-11 w-11 place-items-center sm:h-12 sm:w-12">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-dashed border-gold/55 motion-safe:animate-e-orbit"
                  />
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ivory text-gold transition duration-500 group-hover:bg-gold group-hover:text-white sm:h-9 sm:w-9">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                </span>

                <span className="mt-2.5 flex items-baseline gap-1.5 font-display text-[2rem] leading-none font-medium text-ink [font-variant-numeric:lining-nums] sm:text-[2.6rem]">
                  <Figure value={value} />
                  {unit ? (
                    <span className="font-display text-[0.8rem] tracking-[0.2em] text-gold uppercase sm:text-sm">
                      {unit}
                    </span>
                  ) : null}
                  {/* Beside the value (not below it), so every cell has the same height.
                      Hidden on phones, where the cell is too narrow. */}
                  {stars ? (
                    <span
                      className="ms-0.5 hidden gap-0.5 self-center text-gold sm:flex"
                      role="img"
                      aria-label={t.stars}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon key={i} className="h-2.5 w-2.5 fill-current" />
                      ))}
                    </span>
                  ) : null}
                </span>

                {/* Tighter tracking on phones keeps every caption on one line. */}
                <span className="mt-2 text-[9px] tracking-[0.08em] whitespace-nowrap min-[360px]:text-[10px] min-[360px]:tracking-[0.1em] text-ink-muted uppercase min-[400px]:tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em]">
                  {caption}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
