"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useLang } from "@/components/i18n/LangProvider";
import OrderButton, { channelIcons } from "@/components/OrderButton";
import { getTemplates, templates } from "@/data/templates";
import { contactCopy, primaryContact, startingPriceAmount } from "@/lib/contact";

/**
 * Floating "Order" pill for the /templates/<slug> demos.
 *
 * - Slides in after a short scroll, once the cover's own bottom controls
 *   (seal, play / replay, scroll cue) have moved up out of its way.
 * - On phones it sits level with the music button (bottom right) and stops
 *   short of it; a spacer lets the last section (RSVP, credit) scroll fully above it.
 * - From 720px it floats under the left-hand cover, clear of the invitation.
 * - Stays below gallery lightboxes (z-80) and the music button (z-90).
 */
export default function OrderTemplateBar() {
  const pathname = usePathname();
  const lang = useLang();
  const copy = contactCopy[lang];
  const current = pathname.replace(/\/$/, "");
  const template = getTemplates(lang).find(
    (t) => t.href && !t.comingSoon && t.href === current,
  );
  // The order message names the template in English, so we know which one.
  const orderName = templates.find((t) => t.id === template?.id)?.title ?? template?.title ?? "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!template?.href) return null;

  const ChannelIcon = channelIcons[primaryContact.channel];

  return (
    <>
      <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] min-[720px]:hidden" />
      <div
        className={`fixed bottom-[max(1.15rem,env(safe-area-inset-bottom))] left-3 right-[4.4rem] z-[70] transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[720px]:right-[calc(480px+2rem)] min-[720px]:bottom-8 min-[720px]:left-8 min-[720px]:mx-auto min-[720px]:max-w-sm ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
        }`}
        aria-hidden={!visible}
        inert={!visible}
      >
        {/* Same height as the music button beside it (48px). */}
        <div className="flex h-12 items-center gap-2.5 rounded-full border border-gold/50 bg-ink/90 p-1 shadow-[0_14px_32px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60">
            <Image
              src={template.image}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-top"
            />
          </span>

          <div className="min-w-0 flex-1 leading-none">
            <p className="truncate font-display text-[1.05rem] leading-tight text-white">
              {template.title}
            </p>
            <p className="mt-0.5 text-[10px] tracking-[0.14em] whitespace-nowrap text-white/60 uppercase">
              {copy.from}{" "}
              <span className="text-gold [font-variant-numeric:lining-nums]">
                {startingPriceAmount} {copy.currency}
              </span>
            </p>
          </div>

          <OrderButton
            kind="template"
            name={orderName}
            path={template.href}
            className="shine-sweep group/order inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-gold px-3.5 text-[13px] font-medium tracking-wide whitespace-nowrap text-ink transition hover:bg-white"
          >
            <ChannelIcon aria-hidden className="h-3.5 w-3.5" />
            {copy.order}
            <LuArrowRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover/order:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/order:-translate-x-0.5"
            />
          </OrderButton>
        </div>
      </div>
    </>
  );
}
