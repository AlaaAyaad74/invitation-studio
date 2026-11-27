import MusicPlayer from "@/components/templates/MusicPlayer";
import Countdown from "@/components/templates/coastal-light/Countdown";
import Gallery from "@/components/templates/coastal-light/Gallery";
import Note from "@/components/templates/coastal-light/Note";
import Reply from "@/components/templates/coastal-light/Reply";
import Schedule from "@/components/templates/coastal-light/Schedule";
import VideoCover from "@/components/templates/coastal-light/VideoCover";
import StudioCredit from "@/components/templates/StudioCredit";
import type { CoastalLightInvitation } from "@/data/coastal-light";
import styles from "./Invitation.module.css";

// Palette for this template, scoped to its root.
const root = [
  "[--paper:#fffbfa] [--ink:#2a1520] [--mute:#6a4550] [--line:rgba(42,21,32,0.16)]",
  "[--blue:#6f4448] [--blue-deep:#3a222c] [--seal:#e4b6ae] [--seal-deep:#d4a39b] [--seal-ink:#9a5c52]",
  "bg-transparent font-[family-name:var(--font-minimal-script),'Segoe_Script',cursive] text-(--ink)",
].join(" ");
const credit =
  "px-6 pt-1 pb-9 text-center font-[family-name:var(--font-minimal-serif),Georgia,serif] text-[1.15rem] font-medium tracking-[0] normal-case text-(--mute)";

export default function Invitation({ data }: { data: CoastalLightInvitation }) {
  return (
    <div className={`${styles.revealScope} ${root}`}>
      {/* Remount per video so a language switch starts the new film fresh. */}
      <VideoCover key={data.video} data={data} />
      <div className="bg-[linear-gradient(180deg,#fffbfa_0%,#fdf4f2_52%,#fbeeea_100%)]">
        <Countdown data={data} />
        <Schedule data={data} />
        <Note data={data} />
        <Gallery data={data} />
        <Reply data={data} />
        <StudioCredit className={credit} />
      </div>
      <MusicPlayer src={data.music} />
    </div>
  );
}
