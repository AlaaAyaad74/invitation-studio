import { Amiri, Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { arabicFontStyle } from "@/app/fonts-ar";
import type { Lang } from "@/lib/i18n";

/** Heritage Script fonts, shared by the demo and the custom couple pages. */
const cinzel = Cinzel({
  variable: "--font-heritage-caps",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heritage-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const script = Great_Vibes({
  variable: "--font-heritage-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

/** Arabic naskh for the letter card's lines; Ruqaa reads cramped at that size. */
const amiri = Amiri({
  variable: "--font-heritage-ar-naskh",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "700"],
  adjustFontFallback: false,
});

export const heritageFontClasses = `${cinzel.variable} ${cormorant.variable} ${script.variable} ${amiri.variable}`;

export function heritageFontStyle(lang: Lang) {
  return arabicFontStyle(lang, {
    "--font-heritage-caps": ["caps", cinzel],
    "--font-heritage-serif": ["serif", cormorant],
    "--font-heritage-script": ["script", script],
  });
}
