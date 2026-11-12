import WaveOrnamentIcon from "@/app/common/icons/WaveOrnamentIcon";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import FadeIn from "@/components/templates/heritage-script/FadeIn";

const styles = {
  section: "px-6 pt-[2.7rem] pb-[0.6rem] text-center",
  label: "m-0 font-[family-name:var(--font-heritage-caps),'Times_New_Roman',serif] text-[0.68rem] font-medium tracking-[0.34em] text-[#f3e0b8] uppercase",
  script: "mx-0 mt-[0.65rem] mb-0 font-[family-name:var(--font-heritage-script),'Great_Vibes',cursive] text-[2.55rem] leading-[0.95] text-[#f8efe3]",
  ornament: "mx-auto mt-[0.85rem] mb-0 flex items-center justify-center gap-[0.7rem] text-[#e8c48a] [&_span]:block [&_span]:h-px [&_span]:w-[2.4rem] [&_span]:bg-current [&_span]:opacity-70",
  hint: "mx-0 mt-4 mb-0 font-[family-name:var(--font-heritage-serif),Georgia,serif] text-[1.05rem] leading-[1.45] text-[rgba(248,239,227,0.78)] italic",
  frame: "mx-auto mt-[1.55rem] mb-0 w-[min(100%,15.5rem)] bg-transparent p-0",
  image: "block h-auto w-full",
};

type GateQrProps = {
  src: string;
  alt: string;
};

export default function GateQr({ src, alt }: GateQrProps) {
  return (
    <section className={styles.section} aria-label="Gate entry QR code">
      <FadeIn>
        <p className={styles.label}>At the gates</p>
      </FadeIn>
      <FadeIn delay={180}>
        <p className={styles.script}>Scan to join us</p>
      </FadeIn>
      <FadeIn delay={360}>
        <div className={styles.ornament} aria-hidden="true">
          <span />
          <WaveOrnamentIcon />
          <span />
        </div>
      </FadeIn>
      <FadeIn delay={520}>
        <p className={styles.hint}>
          Please present this code at the entrance
        </p>
      </FadeIn>
      <FadeIn delay={700}>
        <div className={styles.frame}>
          <ImageWithSkeleton
            native
            src={src}
            alt={alt}
            className={styles.image}
            wrapperClassName="block w-full"
            skeletonClassName="min-h-48"
          />
        </div>
      </FadeIn>
    </section>
  );
}
