"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { LuShare2 } from "react-icons/lu";
import ShareModal from "@/components/ShareModal";

type ShareButtonProps = {
  title: string;
  path: string;
  message?: string;
  /** Which top corner of the positioned parent the button sits in. */
  side?: "left" | "right";
  /** Inline z-index; when omitted the button uses the `z-10` class. */
  zIndex?: number;
};

/** Round white share button floating over a card, plus its share sheet. */
export default function ShareButton({
  title,
  path,
  message,
  side = "right",
  zIndex,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        aria-label={`Share ${title}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(event) => {
          // Cards open their own viewer on click; sharing must not.
          event.stopPropagation();
          setOpen(true);
        }}
        style={{
          top: 10,
          [side]: 10,
          width: 36,
          height: 36,
          backgroundColor: "#fff",
          cursor: "pointer",
          ...(zIndex === undefined ? null : { zIndex }),
        }}
        className={`absolute ${zIndex === undefined ? "z-10 " : ""}inline-flex items-center justify-center rounded-full text-ink shadow-[0_8px_18px_-10px_rgba(0,0,0,0.55)]`}
      >
        <LuShare2 className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {open
        ? createPortal(
            <ShareModal
              title={title}
              path={path}
              message={message}
              onClose={close}
            />,
            document.body,
          )
        : null}
    </>
  );
}
