import type { ReactNode } from "react";
import LangToggle from "@/components/i18n/LangToggle";

/** Every template preview gets the floating English / Arabic switch. */
export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LangToggle floating />
    </>
  );
}
