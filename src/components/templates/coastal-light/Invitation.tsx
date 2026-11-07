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

export default function Invitation({ data }: { data: CoastalLightInvitation }) {
  return (
    <div className={styles.root}>
      <VideoCover data={data} />
      <div className={styles.sheet}>
        <Countdown data={data} />
        <Schedule data={data} />
        <Note data={data} />
        <Gallery data={data} />
        <Reply data={data} />
        <StudioCredit className={styles.credit} />
      </div>
      <MusicPlayer src={data.music} />
    </div>
  );
}
