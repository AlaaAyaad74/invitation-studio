import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/templates/elegant/Countdown";
import Gallery from "@/components/templates/elegant/Gallery";
import Journey from "@/components/templates/elegant/Journey";
import VideoCover from "@/components/templates/elegant/VideoCover";
import MusicPlayer from "@/components/templates/MusicPlayer";
import StudioCredit from "@/components/templates/StudioCredit";
import { elegantInvitation as data, getWhatsAppUrl } from "@/data/elegant";
import Image from "next/image";

const whatsappUrl = getWhatsAppUrl(data);

export default function Invitation() {
  return (
    <div className="bg-e-cream text-e-ink">
      <VideoCover />

      <div className="relative z-[2] -mt-[2.4rem] rounded-t-[2.4rem] bg-[linear-gradient(180deg,#fbf6f1_0%,#fbf6f1_58%,#f6e4dc_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 z-10 w-56"
          style={{ translate: "-50% -4rem" }}
        >
          <p
            className="absolute m-0 rounded-full border border-e-white/40 bg-[rgba(22,14,16,0.28)] px-4 py-2 text-[0.66rem] tracking-[0.26em] text-e-white uppercase backdrop-blur-sm"
            style={{
              bottom: "calc(100% + 0.6rem)",
              left: "50%",
              translate: "-50% 0",
              width: "max-content",
              whiteSpace: "nowrap",
            }}
          >
            {data.dateLabel.weekday} · {data.dateLabel.day}{" "}
            {data.dateLabel.month}
          </p>
          <Image
            src="/elegant/flowers/pink-flowers.gif"
            alt=""
            width={600}
            height={600}
            unoptimized
            className="h-auto w-full"
          />
        </div>

        <Countdown />
        <Journey />
        <Gallery />

        <section className="px-[1.15rem] pt-1.5 pb-2" aria-label="RSVP">
          <Reveal>
            <div className="rounded-[1.7rem] bg-e-white px-5 pt-[2.15rem] pb-[1.7rem] text-center shadow-[0_28px_50px_-34px_rgba(22,51,44,0.65)] outline outline-1 outline-e-rose/40 outline-offset-[-11px]">
              <p
                className="mx-auto flex h-[4.4rem] w-[4.4rem] items-baseline justify-center gap-[0.28rem] rounded-full border border-e-gold/80 font-bodoni text-[1.15rem] leading-[4.4rem] tracking-[0.04em] text-e-rose-deep shadow-[inset_0_0_0_4px_#fffaf6,inset_0_0_0_5px_color-mix(in_srgb,#c45c6c_45%,transparent)]"
                aria-hidden="true"
              >
                <span>A</span>
                <i className="text-[0.95rem] text-e-gold italic">&amp;</i>
                <span>K</span>
              </p>
              <p className="mt-[1.15rem] text-[0.68rem] tracking-[0.34em] text-e-rose uppercase">
                RSVP
              </p>
              <h2 className="mx-auto mt-3 max-w-56 font-bodoni text-[2rem] leading-[1.05] font-medium text-e-ink italic">
                Save us a place in the garden
              </h2>
              <p className="mt-3.5 text-[0.92rem] text-e-muted">
                {data.rsvp.deadline}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-[1.35rem] inline-flex items-center gap-2 rounded-full bg-e-leaf px-5 py-[0.85rem] text-[0.68rem] tracking-[0.16em] text-e-white uppercase no-underline transition-colors duration-200 hover:bg-e-rose-deep focus-visible:bg-e-rose-deep focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-e-leaf"
              >
                <WhatsAppIcon className="size-4 fill-current" />
                Confirm on WhatsApp
              </a>
            </div>
          </Reveal>
        </section>

        <StudioCredit className="px-5 pt-6 pb-7 text-center text-[0.62rem] tracking-[0.26em] text-e-muted uppercase" />
      </div>

      <MusicPlayer src={data.music} />
    </div>
  );
}
