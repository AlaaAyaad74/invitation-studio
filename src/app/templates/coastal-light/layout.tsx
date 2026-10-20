import { Cormorant_Garamond, Italiana, Outfit, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";

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

export default function CoastalLightLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${italiana.variable} ${cormorant.variable} ${outfit.variable} ${pinyon.variable} min-h-full`}>
      {children}
    </div>
  );
}
