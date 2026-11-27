import { Cormorant_Garamond, Jost, Parisienne } from "next/font/google";
import type { ReactNode } from "react";
import { arabicFontStyle } from "@/app/fonts-ar";
import { getLang } from "@/lib/i18n-server";
import theme from "./theme.module.css";

const script = Parisienne({
  variable: "--font-db-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const serif = Cormorant_Garamond({
  variable: "--font-db-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-db-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export default async function DesertBloomLayout({ children }: { children: ReactNode }) {
  const style = arabicFontStyle(await getLang(), {
    "--font-db-script": ["script", script],
    "--font-db-serif": ["serif", serif],
    "--font-db-sans": ["sans", sans],
  });

  return (
    <div
      className={`${script.variable} ${serif.variable} ${sans.variable} ${theme.theme} min-h-full`}
      style={style}
    >
      {children}
    </div>
  );
}
