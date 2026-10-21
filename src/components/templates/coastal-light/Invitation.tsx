import Countdown from "@/components/templates/coastal-light/Countdown";
import Gallery from "@/components/templates/coastal-light/Gallery";
import Note from "@/components/templates/coastal-light/Note";
import Reply from "@/components/templates/coastal-light/Reply";
import Schedule from "@/components/templates/coastal-light/Schedule";
import VideoCover from "@/components/templates/coastal-light/VideoCover";
import StudioCredit from "@/components/templates/StudioCredit";
import styles from "./Invitation.module.css";

export default function Invitation() {
  return (
    <div className={styles.root}>
      <VideoCover />
      <Countdown />
      <Schedule />
      <Note />
      <Gallery />
      <Reply />
      <StudioCredit className={styles.credit} />
    </div>
  );
}
