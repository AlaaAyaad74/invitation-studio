import TemplateShell from "@/components/templates/TemplateShell";
import Invitation from "@/components/templates/coastal-light/Invitation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coastal Light",
  description: "Airy layouts inspired by seaside vows and soft horizons.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CoastalLightTemplatePage() {
  // No head preload for the cover video: the <video> element loads it itself,
  // after fonts, scripts and the poster instead of ahead of them.
  return (
    <TemplateShell
      coverSrc="/templates/coastal-light.webp"
      coverAlt="Coastal Light invitation template"
      stageBackground="bg-[#fffbfa]"
      veilPassThrough
    >
      <Invitation />
    </TemplateShell>
  );
}
