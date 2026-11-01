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
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path
              d="M1 5c3.2-4.2 6.4-4.2 8 0 1.6-4.2 4.8-4.2 8 0"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
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
