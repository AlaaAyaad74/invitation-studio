"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** Counts down, then sends the visitor to the home page. */
export default function RedirectHome({ seconds }: { seconds: number }) {
  const router = useRouter();
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setLeft((value) => Math.max(0, value - 1));
    }, 1000);
    const leave = window.setTimeout(() => router.replace("/"), seconds * 1000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(leave);
    };
  }, [router, seconds]);

  return (
    <>
      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        Taking you home in {left}…
      </p>
      <Link
        href="/"
        replace
        className="mt-4 inline-flex bg-sage-deep px-5 py-3 text-sm text-white transition hover:bg-sage"
      >
        Go home now
      </Link>
    </>
  );
}
