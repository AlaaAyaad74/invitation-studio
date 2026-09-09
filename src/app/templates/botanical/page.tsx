import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botanical | Invitation Studio",
  description: "Botanical invitation template.",
};

export default function BotanicalTemplatePage() {
  return (
    <div className="relative min-h-svh bg-ivory">
      <main className="relative mx-auto min-h-svh w-full max-w-[430px] bg-white lg:mx-0 lg:ml-auto lg:w-[430px] lg:max-w-none" />
    </div>
  );
}
