import StudioCredit from "@/components/templates/StudioCredit";
import InView from "./InView";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <InView className={styles.wrap} offset="0px">
      <StudioCredit className={styles.footer} />
    </InView>
  );
}
