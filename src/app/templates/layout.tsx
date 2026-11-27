import type { ReactNode } from "react";
import LangToggle from "@/components/i18n/LangToggle";
import OrderTemplateBar from "@/components/OrderTemplateBar";

/**
 * Shared by every /templates/<slug> demo: the floating English / Arabic
 * switch and the "Order this template" bar.
 */
export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LangToggle floating />
      <OrderTemplateBar />
    </>
  );
}
