import TemplateShell from "@/components/templates/TemplateShell";
import Invitation from "@/components/templates/botanical/Invitation";
import { botanicalInvitation } from "@/data/botanical";
import type { Metadata } from "next";
import { preload } from "react-dom";

export const metadata: Metadata = {
  title: "Botanical",
  description:
    "A botanical wedding invitation website template from Invitation Studio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BotanicalTemplatePage() {
  preload("/botanical/Botanical.mp4", { as: "video" });

  return (
    <TemplateShell
      coverSrc="/templates/botanical.webp"
      coverAlt="Botanical invitation template"
      stageBackground="bg-[#fff]"
    >
      <Invitation data={botanicalInvitation} />
    </TemplateShell>
  );
}
