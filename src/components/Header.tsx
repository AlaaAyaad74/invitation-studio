"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#templates", label: "Templates" },
  { href: "#features", label: "Features" },
  { href: "#services", label: "Services" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solidBar = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${
          solidBar
            ? "bg-ivory/95 shadow-[0_1px_0_color-mix(in_srgb,var(--ink)_8%,transparent)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-5 sm:h-28 sm:px-8">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className={`font-display text-2xl tracking-[0.04em] transition-colors duration-300 sm:text-3xl ${
              solidBar ? "text-ink" : "text-white"
            }`}
          >
            <img
              src="/logo.webp"
              alt="Invitation Studio"
              width={96}
              height={96}
              className="h-20 w-auto sm:h-24"
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:opacity-80 ${
                  solidBar ? "text-ink-muted" : "text-white/85"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#services"
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
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-display text-4xl leading-tight text-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${120 + index * 70}ms` : "0ms",
                }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#services"
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
