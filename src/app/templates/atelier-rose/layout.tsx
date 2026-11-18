import { Bodoni_Moda, Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import type { ReactNode } from "react";
import theme from "./theme.module.css";

const script = Pinyon_Script({
  variable: "--font-ar-script",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const display = Bodoni_Moda({
  variable: "--font-ar-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const serif = Cormorant_Garamond({
  variable: "--font-ar-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-ar-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export default function AtelierRoseLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${script.variable} ${display.variable} ${serif.variable} ${sans.variable} ${theme.theme} min-h-full`}
    >
      {children}
    </div>
  );
}
