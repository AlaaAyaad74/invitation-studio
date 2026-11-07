import type { Metadata } from "next";
import RedirectHome from "@/components/RedirectHome";
import { getLang } from "@/lib/i18n-server";

const COPY = {
  en: {
    title: "This page could not be found.",
    lead: "The link may have expired or been moved.",
  },
  ar: {
    title: "تعذّر العثور على هذه الصفحة.",
    lead: "ربما انتهت صلاحية الرابط أو تم نقله.",
  },
} as const;

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = COPY[await getLang()];
  return (
    <main className="relative flex min-h-svh flex-1 items-center justify-center overflow-hidden bg-ivory px-6 text-center">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />

      <div className="relative max-w-md">
        <p className="text-sm tracking-[0.2em] text-rose uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-ink-muted">
          {t.lead}
        </p>
        <RedirectHome seconds={3} />
      </div>
    </main>
  );
}
