import StudioCredit from "@/components/templates/StudioCredit";
import InView from "./InView";

// Fades and lifts in once the wrapper reports data-in="true".
const footer = [
  "px-6 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
  "text-center font-[family-name:var(--font-db-sans),sans-serif] text-[0.9rem] tracking-[0.06em] text-(--text-muted)",
  "translate-y-3 opacity-0 [transition:opacity_0.8s_ease,translate_0.9s_cubic-bezier(0.22,1,0.36,1)]",
  "in-data-[in=true]:translate-y-0 in-data-[in=true]:opacity-100",
  "motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:[transition:none]",
].join(" ");

export default function Footer() {
  return (
    <InView className="bg-(--bg-alt)" offset="0px">
      <StudioCredit className={footer} />
    </InView>
  );
}
