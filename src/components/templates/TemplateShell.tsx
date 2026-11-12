import type { ReactNode } from "react";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";

type TemplateShellProps = {
  /** Poster shown beside the invitation on wide screens. */
  coverSrc: string;
  coverAlt: string;
  /** Background of the 480px invitation column. */
  stageBackground: string;
  /** Let clicks pass through the cover's shading veil. */
  veilPassThrough?: boolean;
  children: ReactNode;
};

const styles = {
  frame: "relative min-h-svh bg-ivory",
  // Hidden on phones; from 720px a fixed poster fills the space left of the column.
  cover:
    "hidden min-[720px]:fixed min-[720px]:inset-y-0 min-[720px]:right-[480px] min-[720px]:left-0 min-[720px]:z-0 min-[720px]:block min-[720px]:overflow-hidden",
  image:
    "h-full w-full object-cover object-[center_72%] [filter:brightness(1.12)_contrast(1.06)_saturate(1.05)]",
  veil: "absolute inset-0 [background:radial-gradient(120%_90%_at_50%_55%,transparent_0%,transparent_52%,color-mix(in_srgb,var(--ink)_12%,transparent)_100%),linear-gradient(90deg,transparent_0%,transparent_78%,color-mix(in_srgb,var(--ink)_18%,transparent)_100%)]",
  // Centred phone-width column; from 720px it docks to the right edge.
  stage:
    "relative z-10 mx-auto min-h-svh w-full max-w-[480px] min-w-[280px] overflow-x-hidden min-[720px]:mr-0 min-[720px]:ml-auto min-[720px]:w-[480px] min-[720px]:max-w-none min-[720px]:shadow-[-24px_0_60px_-28px_rgba(42,38,35,0.45)]",
};

/** Page frame for the Botanical and Coastal Light templates. */
export default function TemplateShell({
  coverSrc,
  coverAlt,
  stageBackground,
  veilPassThrough = false,
  children,
}: TemplateShellProps) {
  return (
    <div className={styles.frame}>
      <aside className={styles.cover}>
        <ImageWithSkeleton
          native
          cover
          src={coverSrc}
          alt={coverAlt}
          className={styles.image}
          wrapperClassName="absolute inset-0"
        />
        <div
          className={`${styles.veil}${veilPassThrough ? " pointer-events-none" : ""}`}
        />
      </aside>

      <main className={`${styles.stage} ${stageBackground}`}>{children}</main>
    </div>
  );
}
