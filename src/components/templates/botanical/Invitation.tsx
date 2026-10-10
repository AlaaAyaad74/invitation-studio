import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/templates/botanical/Countdown";
import Details from "@/components/templates/botanical/Details";
import Gallery from "@/components/templates/botanical/Gallery";
import MusicPlayer from "@/components/templates/MusicPlayer";
import StudioCredit from "@/components/templates/StudioCredit";
import VideoCover from "@/components/templates/botanical/VideoCover";
import { getWhatsAppUrl, type BotanicalContent } from "@/data/botanical";

export default function Invitation({ data }: { data: BotanicalContent }) {
  const whatsappUrl = data.rsvp ? getWhatsAppUrl(data.rsvp) : null;

  return (
    <div className="bg-[#f6f0e6] text-ink">
      <VideoCover data={data} />
      <Countdown data={data} />
      <Details data={data} />
      <Gallery data={data} />

      <section className="relative overflow-hidden px-6 py-16 text-center">
        <Reveal className="relative">
          <p className="text-[11px] tracking-[0.3em] text-gold uppercase">
            RSVP
          </p>
          <h2 className="mt-3 font-display text-3xl text-balance text-ink">
            We would love to have you with us
          </h2>
          {data.rsvp ? (
            <p className="mt-3 text-sm text-ink-muted">{data.rsvp.deadline}</p>
          ) : null}
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-gold/55 px-6 py-3 text-xs tracking-[0.18em] text-ink uppercase transition hover:bg-ink hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4 fill-current" />
              Confirm on WhatsApp
            </a>
          ) : null}
        </Reveal>
      </section>

      <StudioCredit className="px-6 py-8 text-center text-[10px] tracking-[0.24em] text-ink-muted uppercase" />

      {data.music ? <MusicPlayer src={data.music} /> : null}
    </div>
  );
}
