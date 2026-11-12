import Reveal from "@/components/Reveal";
import { coastalLightInvitation as data } from "@/data/coastal-light";

const styles = {
  section: "px-7 pt-[2.8rem] pb-[0.6rem] font-[family-name:var(--font-minimal-serif),Georgia,serif]",
  index: "m-0 flex items-baseline justify-center gap-[0.55rem] text-[1.35rem] font-normal tracking-[0] normal-case text-(--ink) [&_span]:tracking-[0.08em] [&_span]:text-(--seal-ink)",
  line: "mx-auto mt-[1.15rem] mb-0 max-w-[16rem] text-center text-[clamp(2rem,7vw,2.4rem)] leading-[1.25] font-medium text-balance",
};

export default function Note() {
  return (
    <section className={styles.section} aria-label="A note">
      <Reveal>
        <p className={styles.index}>
          <span>03</span>
          A note
        </p>
      </Reveal>
      <Reveal delayMs={90}>
        <p className={styles.line}>{data.note}</p>
      </Reveal>
    </section>
  );
}
