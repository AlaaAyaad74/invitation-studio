"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { LuShare2 } from "react-icons/lu";
import ShareModal from "@/components/ShareModal";

type ShareTemplateButtonProps = {
  title: string;
  path: string;
};

export default function ShareTemplateButton({
  title,
  path,
}: ShareTemplateButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Share ${title}`}
        onClick={() => setOpen(true)}
        style={{
          top: 10,
          left: 10,
          width: 36,
          height: 36,
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
        className="absolute z-10 inline-flex items-center justify-center rounded-full text-ink shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)]"
      >
        <LuShare2 className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {open
        ? createPortal(
            <ShareModal title={title} path={path} onClose={close} />,
            document.body,
          )
        : null}
    </>
  );
}
