import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import styles from "./Cover.module.css";

type CoverProps = {
  src: string;
  alt: string;
};

export default function Cover({ src, alt }: CoverProps) {
  return (
    <section className={styles.cover} aria-label="Invitation card">
      <div className={styles.frame}>
        <ImageWithSkeleton
          native
          src={src}
          alt={alt}
          fetchPriority="high"
          className={styles.image}
          wrapperClassName="block w-full"
          skeletonClassName="min-h-[28rem]"
        />
      </div>
    </section>
  );
}
