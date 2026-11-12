import TemplateShell from "@/components/templates/TemplateShell";
import Invitation from "@/components/templates/coastal-light/Invitation";
import type { Metadata } from "next";
import { preload } from "react-dom";

const VIDEO_SRC = "/minimal/minimal-hero.mp4";

export const metadata: Metadata = {
  title: "Coastal Light",
  description: "Airy layouts inspired by seaside vows and soft horizons.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CoastalLightTemplatePage() {
  preload(VIDEO_SRC, { as: "video" });

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
