import type { ReactNode } from "react";
import OrderTemplateBar from "@/components/OrderTemplateBar";

/** Shared by every /templates/<slug> demo: adds the "Order this template" bar. */
export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <OrderTemplateBar />
    </>
  );
}
