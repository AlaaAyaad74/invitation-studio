import { Almarai, Aref_Ruqaa, Reem_Kufi, Tajawal } from "next/font/google";
import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";

/*
 * Arabic partners for the Latin wedding fonts. Each one carries only the
 * Arabic subset and no metric fallback face, so when it sits in front of a
 * Latin font, Arabic letters use it while digits and Latin letters fall
 * through to the template's own Latin font.
 *
 *   sans   (Figtree, Jost, Outfit)              -> Tajawal
 *   serif  (Cormorant, Bodoni)                  -> Almarai
 *   script (Great Vibes, Pinyon, Parisienne...) -> Aref Ruqaa
 *   caps   (Cinzel, Italiana)                   -> Reem Kufi
 */
const arSans = Tajawal({
  variable: "--font-ar-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const arSerif = Almarai({
  variable: "--font-ar-serif",
  subsets: ["arabic"],
  weight: ["300", "400", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const arScript = Aref_Ruqaa({
  variable: "--font-ar-script",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
});

const arCaps = Reem_Kufi({
  variable: "--font-ar-caps",
  subsets: ["arabic"],
  display: "swap",
  adjustFontFallback: false,
});

const arabic = {
  sans: arSans,
  serif: arSerif,
  script: arScript,
  caps: arCaps,
} as const;

export type FontKind = keyof typeof arabic;

type LoadedFont = { style: { fontFamily: string } };

/** Class names that define the `--font-ar-*` variables. */
export const arabicFontVariables = Object.values(arabic)
  .map((font) => font.variable)
  .join(" ");

/**
 * Inline style that puts the matching Arabic font in front of each Latin
 * font variable. Empty for English, so the Latin fonts stay untouched.
 */
export function arabicFontStyle(
  lang: Lang,
  fonts: Record<string, [FontKind, LoadedFont]>,
): CSSProperties | undefined {
  if (lang !== "ar") return undefined;

  const style: Record<string, string> = {};
  for (const [variable, [kind, latin]] of Object.entries(fonts)) {
    style[variable] = `${arabic[kind].style.fontFamily}, ${latin.style.fontFamily}`;
  }
  return style as CSSProperties;
}
