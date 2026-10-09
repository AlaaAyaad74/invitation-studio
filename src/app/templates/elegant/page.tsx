import type { Metadata } from "next";
import { preload } from "react-dom";
import Invitation from "@/components/templates/elegant/Invitation";

const VIDEO_SRC = "/elegant/elegant_hero_video.mp4";

export const metadata: Metadata = {
  title: "Elegant",
  description:
    "An elegant wedding invitation — a rose arch, a garden path, and an evening made of light.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ElegantTemplatePage() {
  preload("/elegant/hero-poster.webp", { as: "image" });
  preload(VIDEO_SRC, { as: "video" });

  return (
    <div className="relative min-h-svh bg-ivory">
      <aside className="pointer-events-none fixed inset-y-0 right-[480px] left-0 z-0 hidden overflow-hidden min-[720px]:block">
        <img
          src="/templates/midnight-silk.webp"
          alt=""
          className="size-full object-cover object-[center_72%] brightness-[1.12] contrast-[1.06] saturate-[1.05]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_55%,transparent_0%,transparent_52%,color-mix(in_srgb,var(--ink)_12%,transparent)_100%),linear-gradient(90deg,transparent_0%,transparent_78%,color-mix(in_srgb,var(--ink)_18%,transparent)_100%)]" />
      </aside>

      <main className="relative z-10 mx-auto min-h-svh w-full min-w-[280px] max-w-[480px] overflow-x-hidden bg-e-cream min-[720px]:mr-0 min-[720px]:ml-auto min-[720px]:w-[480px] min-[720px]:max-w-none min-[720px]:shadow-[-28px_0_70px_-24px_rgba(8,18,16,0.55)]">
        <Invitation />
      </main>
    </div>
  );
}
