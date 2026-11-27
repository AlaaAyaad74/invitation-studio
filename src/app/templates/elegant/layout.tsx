import { Bodoni_Moda, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";
import { arabicFontStyle } from "@/app/fonts-ar";
import { getLang } from "@/lib/i18n-server";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni-family",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon-family",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default async function ElegantLayout({ children }: { children: ReactNode }) {
  const style = arabicFontStyle(await getLang(), {
    "--font-bodoni-family": ["serif", bodoni],
    "--font-pinyon-family": ["script", pinyon],
  });

  return (
    <div className={`${bodoni.variable} ${pinyon.variable} min-h-full`} style={style}>
      {children}
    </div>
  );
}
