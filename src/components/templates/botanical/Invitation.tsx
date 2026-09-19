import WhatsAppIcon from "@/app/common/icons/WhatsAppIcon";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/templates/botanical/Countdown";
import Details from "@/components/templates/botanical/Details";
import Gallery from "@/components/templates/botanical/Gallery";
import VideoCover from "@/components/templates/botanical/VideoCover";
import {
  botanicalInvitation as data,
  getWhatsAppUrl,
} from "@/data/botanical";

const whatsappUrl = getWhatsAppUrl(data);

export default function Invitation() {
  return (
    <div className="bg-[#f6f0e6] text-ink">
      <VideoCover />
      <Countdown />
      <Details />
      <Gallery />

      <section className="relative overflow-hidden px-6 py-16 text-center">
        <div className="absolute inset-0 bg-sage-deep" />
        <Reveal className="relative">
          <p className="text-[11px] tracking-[0.3em] text-rose-soft uppercase">
            RSVP
          </p>
          <h2 className="mt-3 font-display text-3xl text-balance text-white">
            We would love to have you with us
          </h2>
          <p className="mt-3 text-sm text-white/75">{data.rsvp.deadline}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-3 text-xs tracking-[0.18em] text-ink uppercase transition hover:bg-ivory"
          >
            <WhatsAppIcon className="h-4 w-4 fill-current" />
            Confirm on WhatsApp
          </a>
        </Reveal>
      </section>

      <footer className="px-6 py-8 text-center text-[10px] tracking-[0.24em] text-ink-muted uppercase">
        Crafted with Invitation Studio
      </footer>
    </div>
  );
}
