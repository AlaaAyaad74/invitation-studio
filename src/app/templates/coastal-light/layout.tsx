import { Italiana, Outfit } from "next/font/google";
import type { ReactNode } from "react";

const italiana = Italiana({
  variable: "--font-minimal-display",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const outfit = Outfit({
  variable: "--font-minimal-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export default function CoastalLightLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${italiana.variable} ${outfit.variable} min-h-full`}>
      {children}
    </div>
  );
}
