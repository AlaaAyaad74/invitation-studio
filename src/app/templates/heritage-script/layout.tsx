import type { ReactNode } from "react";
import { getLang } from "@/lib/i18n-server";
import { heritageFontClasses, heritageFontStyle } from "./fonts";

export default async function HeritageScriptLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${heritageFontClasses} min-h-full`}
      style={heritageFontStyle(await getLang())}
    >
      {children}
    </div>
  );
}
