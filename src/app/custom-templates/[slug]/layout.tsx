import type { ReactNode } from "react";
import {
  heritageFontClasses,
  heritageFontStyle,
} from "@/app/templates/heritage-script/fonts";

/**
 * Custom couple invitations are Arabic only, whatever language the visitor
 * last picked on the main site.
 */
export default function CustomTemplateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      lang="ar"
      dir="rtl"
      className={`${heritageFontClasses} min-h-full`}
      style={heritageFontStyle("ar")}
    >
      {children}
    </div>
  );
}
