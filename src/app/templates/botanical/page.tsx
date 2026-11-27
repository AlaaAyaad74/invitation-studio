import TemplateShell from "@/components/templates/TemplateShell";
import Invitation from "@/components/templates/botanical/Invitation";
import { botanicalInvitations } from "@/data/botanical";
import { getLang } from "@/lib/i18n-server";
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

export default async function BotanicalTemplatePage() {
  preload("/botanical/Botanical.mp4", { as: "video" });
  const lang = await getLang();

  return (
    <TemplateShell
      coverSrc="/templates/botanical.webp"
      coverAlt={lang === "ar" ? "تصميم دعوة بحيرة البجع" : "Botanical invitation template"}
      stageBackground="bg-[#fff]"
    >
      <Invitation data={botanicalInvitations[lang]} />
    </TemplateShell>
  );
}
