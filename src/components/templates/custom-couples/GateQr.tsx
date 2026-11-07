import WaveOrnamentIcon from "@/components/icons/WaveOrnamentIcon";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import FadeIn from "@/components/templates/heritage-script/FadeIn";
import styles from "./GateQr.module.css";

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
