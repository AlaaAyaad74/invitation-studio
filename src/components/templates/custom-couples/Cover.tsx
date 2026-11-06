import Image from "next/image";
import styles from "./Cover.module.css";

type CoverProps = {
  image: string;
  alt: string;
};

export default function Cover({ image, alt }: CoverProps) {
  return (
    <section className={styles.cover} aria-label={alt}>
      <Image
        src={image}
        alt={alt}
        width={1080}
        height={1350}
        sizes="(max-width: 520px) 100vw, 520px"
        className={styles.image}
        preload
      />
    </section>
  );
}
