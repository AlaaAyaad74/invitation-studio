import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botanical",
  description:
    "A botanical wedding invitation website template from Invitation Studio — coming soon.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BotanicalTemplatePage() {
  return (
    <div className="relative min-h-svh bg-ivory">
      <main className="relative mx-auto min-h-svh w-full max-w-[430px] bg-white lg:mx-0 lg:ml-auto lg:w-[430px] lg:max-w-none" />
    </div>
  );
}
