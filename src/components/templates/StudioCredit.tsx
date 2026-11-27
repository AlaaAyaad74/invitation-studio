"use client";

import ArrowUpRightIcon from "@/components/icons/ArrowUpRightIcon";
import { useLang } from "@/components/i18n/LangProvider";
import { siteConfig } from "@/lib/site";

export default function StudioCredit({ className }: { className: string }) {
  const ar = useLang() === "ar";
  return (
    <footer className={className}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-1.5 underline decoration-current/50 transition-opacity hover:opacity-70 hover:decoration-current ${
          // Arabic letters must join: no tracking or caps from the template,
          // a larger size, and the underline clear of the dots below.
          ar
            ? "text-[1.3em] leading-relaxed tracking-normal normal-case underline-offset-[0.55em]"
            : "underline-offset-4"
        }`}
      >
        {ar ? "اتعملت بحب في استوديو الدعوات" : "Crafted with Invitation Studio"}
        <ArrowUpRightIcon className={`h-[1.1em] w-[1.1em] shrink-0 ${ar ? "-scale-x-100" : ""}`} />
      </a>
    </footer>
  );
}
