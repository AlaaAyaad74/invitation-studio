"use client";

import Image from "next/image";
import UkFlagIcon from "@/components/icons/UkFlagIcon";
import { useLangSwitch } from "@/components/i18n/LangProvider";
import type { Lang } from "@/lib/i18n";
import styles from "./LangToggle.module.css";

const LABELS: Record<Lang, { short: string; switchTo: string }> = {
  en: { short: "EN", switchTo: "التبديل إلى العربية" },
  ar: { short: "AR", switchTo: "Switch to English" },
};

type LangToggleProps = {
  /** Fixed in the top corner, for template pages without a header. */
  floating?: boolean;
  className?: string;
};

/** Pill switch: the round flag slides to the other side on toggle. */
export default function LangToggle({ floating = false, className = "" }: LangToggleProps) {
  const { lang, setLang, pending } = useLangSwitch();
  const next: Lang = lang === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      dir="ltr"
      lang={next}
      onClick={() => setLang(next)}
      aria-label={LABELS[lang].switchTo}
      title={LABELS[lang].switchTo}
      data-lang={lang}
      data-pending={pending ? "true" : "false"}
      className={`${styles.toggle} ${floating ? styles.floating : ""} ${className}`}
    >
      <span className={styles.knob} aria-hidden="true">
        {lang === "en" ? (
          <UkFlagIcon className={styles.flag} />
        ) : (
          <Image
            src="/eg-flag.webp"
            alt=""
            width={64}
            height={64}
            className={styles.flag}
          />
        )}
      </span>
      <span className={styles.label} aria-hidden="true">
        {LABELS[lang].short}
      </span>
    </button>
  );
}
