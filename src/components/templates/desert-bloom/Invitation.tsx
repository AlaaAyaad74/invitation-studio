import MusicPlayer from "@/components/templates/MusicPlayer";
import type { DesertBloomInvitation } from "@/data/desert-bloom";
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

export default function Invitation({ data }: { data: DesertBloomInvitation }) {
  return (
    <div className={styles.root}>
      <VideoCover data={data} />

      <Welcome data={data} />

      <ScratchReveal data={data} />
      <Countdown data={data} />

      <Timeline data={data} />

      <Details data={data} />

      <Gallery data={data} />

      <Rsvp data={data} />

      <Footer />

      <Petals />
      <MusicPlayer src={data.music} />
    </div>
  );
}
