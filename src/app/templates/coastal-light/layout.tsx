import { Cormorant_Garamond, Italiana, Outfit, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";
import { arabicFontStyle } from "@/app/fonts-ar";
import { getLang } from "@/lib/i18n-server";

const italiana = Italiana({
  variable: "--font-minimal-display",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-minimal-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const pinyon = Pinyon_Script({
  variable: "--font-minimal-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-minimal-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default async function CoastalLightLayout({ children }: { children: ReactNode }) {
  const style = arabicFontStyle(await getLang(), {
    "--font-minimal-display": ["caps", italiana],
    "--font-minimal-serif": ["serif", cormorant],
    "--font-minimal-script": ["script", pinyon],
    "--font-minimal-sans": ["sans", outfit],
  });

  return (
    <div
      className={`${italiana.variable} ${cormorant.variable} ${outfit.variable} ${pinyon.variable} min-h-full`}
      style={style}
    >
      {children}
    </div>
  );
}
