import MusicPlayer from "@/components/templates/MusicPlayer";
import { desertBloomInvitation as data } from "@/data/desert-bloom";
import Countdown from "./Countdown";
import Details from "./Details";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Petals from "./Petals";
import Rsvp from "./Rsvp";
import ScratchReveal from "./ScratchReveal";
import Timeline from "./Timeline";
import VideoCover from "./VideoCover";
import Welcome from "./Welcome";
import styles from "./Invitation.module.css";

export default function Invitation() {
  return (
    <div className={styles.root}>
      <VideoCover />

      <Welcome />

      <ScratchReveal />
      <Countdown />

      <Timeline />

      <Details />

      <Gallery />

      <Rsvp />

      <Footer />

      <Petals />
      <MusicPlayer src={data.music} />
    </div>
  );
}
