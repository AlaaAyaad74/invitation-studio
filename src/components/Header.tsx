"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import { useDialog } from "@/hooks/useDialog";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/#templates", label: "Templates" },
  { href: "/photos", label: "Photos" },
  { href: "/videos", label: "Videos" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#features", label: "Features" },
  // { href: "/#pricing", label: "Pricing" },
  { href: "/#services", label: "Services" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide while reading downward, show again on any upward scroll.
      // Small moves (< 8px) are ignored so trackpad jitter doesn't flicker it.
      const delta = y - lastY;
      if (y < 120) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      if (Math.abs(delta) > 8 || y < 120) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useDialog({ Escape: () => setOpen(false) }, open);

  const solidBar = !isHome || scrolled || open;
  // Once the page scrolls, the bar and logo shrink to give content more room.
  const compact = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        // The bar slides (not <header>): a transform on <header> would trap the
        // full-screen mobile menu inside it.
        // A short slide stays on even with "reduce motion": it is small, and
        // jumping the bar in and out is more jarring than easing it.
        className={`relative z-50 [transition-property:background-color,box-shadow,translate] [transition-duration:500ms,500ms,450ms] [transition-timing-function:ease-out,ease-out,cubic-bezier(0.22,1,0.36,1)] focus-within:translate-y-0 ${
          hidden && !open ? "-translate-y-full" : ""
        } ${
          solidBar
            ? "bg-ivory/95 shadow-[0_1px_0_color-mix(in_srgb,var(--ink)_8%,transparent)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-3 transition-[height] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 ${
            compact ? "h-16 sm:h-[4.5rem]" : "h-24 sm:h-28"
          }`}
        >
          <Link
            href="/"
            aria-label="Invitation Studio home"
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center"
          >
            <ImageWithSkeleton
              // Optimized: the 1254px, 214 KB source is resized for a 96px slot.
              src="/logo.webp"
              alt="Invitation Studio"
              width={96}
              height={96}
              preload
              className={`block w-auto [transition:height_450ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms] motion-reduce:[transition-property:height]! ${
                compact ? "h-12 sm:h-14" : "h-20 sm:h-24"
              }`}
              wrapperClassName="block"
              // The image already reserves its height, so the skeleton just fills it.
              skeletonClassName="logo-skeleton min-h-0"
            />
          </Link>

          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {links.map((link) => {
              const className = `text-sm tracking-wide transition-colors hover:opacity-80 ${
                solidBar ? "text-ink-muted" : "text-white/85"
              }`;

              return (
                <Link key={link.href} href={link.href} className={className}>
                  {link.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-sm px-4 py-2 text-sm tracking-wide transition-colors ${
                solidBar
                  ? "bg-sage-deep text-white hover:bg-sage"
                  : "bg-white/95 text-ink hover:bg-white"
              }`}
            >
              Start custom
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`relative z-50 flex h-11 w-11 items-center justify-center md:hidden ${
              solidBar ? "text-ink" : "text-white"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full origin-center bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full origin-center bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "bottom-auto top-1/2 -translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink/35 transition-opacity duration-500 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-0 flex h-[100dvh] min-h-[100svh] w-full flex-col bg-ivory transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="flex flex-1 flex-col justify-center gap-2 px-6 pb-10 pt-32 sm:px-8">
            {links.map((link, index) => {
              const className = `font-display text-4xl leading-tight text-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`;
              const style = {
                transitionDelay: open ? `${120 + index * 70}ms` : "0ms",
              };

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={className}
                  style={style}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href={siteConfig.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`mt-8 inline-flex w-fit bg-sage-deep px-6 py-3.5 text-sm tracking-wide text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-sage ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? "330ms" : "0ms" }}
            >
              Start custom
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
