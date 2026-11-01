import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
} from "next/font/google";
import type { ReactNode } from "react";

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

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: "400",
});

export default function CustomTemplateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${cinzel.variable} ${cormorant.variable} ${script.variable} ${amiri.variable} min-h-full`}
    >
      {children}
    </div>
  );
}
