import { Bodoni_Moda, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";

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

export default function ElegantLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${bodoni.variable} ${pinyon.variable} min-h-full`}>
      {children}
    </div>
  );
}
