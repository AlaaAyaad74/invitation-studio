"use client";

import { useEffect, useRef } from "react";
import styles from "./TypingVideo.module.css";

type TypingVideoProps = {
  src: string;
};

function Flourish({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 360 64"
        fill="none"
        className={styles.flourishSvg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* soft outer rails */}
        <path
          d="M18 32c42-18 78-18 118 0M342 32c-42-18-78-18-118 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          d="M28 36c36-12 68-12 100 0M332 36c-36-12-68-12-100 0"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* left vine */}
        <path
          d="M34 32c22-16 44-18 68-8 10 4 18 4 28 0 8-3 14-3 20 1"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M54 24c6-10 2-16-4-18M78 20c8-11 3-17-3-19M102 22c7-10 1-15-5-16"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M62 38c5 9 0 15-6 17M86 40c7 10 1 16-5 18M110 38c6 9 0 14-5 15"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M68 18c4.5-1.5 8 1.5 7 6-3.5 2.5-8.5 1-10-2.5 0-1.5 1.5-3 3-3.5Z"
          fill="currentColor"
          opacity="0.78"
        />
        <path
          d="M96 16c4.8-1.2 8.2 2.2 6.8 6.4-3.8 2.2-9 .4-10.2-3.2-.2-1.6 1.2-3 3.4-3.2Z"
          fill="currentColor"
          opacity="0.7"
        />

        {/* right vine (mirror) */}
        <path
          d="M326 32c-22-16-44-18-68-8-10 4-18 4-28 0-8-3-14-3-20 1"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M306 24c-6-10-2-16 4-18M282 20c-8-11-3-17 3-19M258 22c-7-10-1-15 5-16"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M298 38c-5 9 0 15 6 17M274 40c-7 10-1 16 5 18M250 38c-6 9 0 14 5 15"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M292 18c-4.5-1.5-8 1.5-7 6 3.5 2.5 8.5 1 10-2.5 0-1.5-1.5-3-3-3.5Z"
          fill="currentColor"
          opacity="0.78"
        />
        <path
          d="M264 16c-4.8-1.2-8.2 2.2-6.8 6.4 3.8 2.2 9 .4 10.2-3.2.2-1.6-1.2-3-3.4-3.2Z"
          fill="currentColor"
          opacity="0.7"
        />

        {/* center crest */}
        <path
          d="M156 32c8-14 20-20 24-20s16 6 24 20c-8 14-20 20-24 20s-16-6-24-20Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M164 32c5.5-9.5 12.5-13.5 16-13.5s10.5 4 16 13.5c-5.5 9.5-12.5 13.5-16 13.5s-10.5-4-16-13.5Z"
          fill="#5c0e1c"
          opacity="0.92"
        />
        <path
          d="M172 32c3-5.5 6.8-7.8 8-7.8s5 2.3 8 7.8c-3 5.5-6.8 7.8-8 7.8s-5-2.3-8-7.8Z"
          fill="currentColor"
          opacity="0.95"
        />
        <circle cx="180" cy="32" r="2.15" fill="#5c0e1c" />

        {/* side buds near crest */}
        <path
          d="M148 32c-7-2-11-7-11-12 5 1 9 5 11 12Z"
          fill="currentColor"
          opacity="0.72"
        />
        <path
          d="M148 32c-7 2-11 7-11 12 5-1 9-5 11-12Z"
          fill="currentColor"
          opacity="0.55"
        />
        <path
          d="M212 32c7-2 11-7 11-12-5 1-9 5-11 12Z"
          fill="currentColor"
          opacity="0.72"
        />
        <path
          d="M212 32c7 2 11 7 11 12-5-1-9-5-11-12Z"
          fill="currentColor"
          opacity="0.55"
        />

        {/* tiny end dots */}
        <circle cx="22" cy="32" r="1.6" fill="currentColor" opacity="0.55" />
        <circle cx="338" cy="32" r="1.6" fill="currentColor" opacity="0.55" />
      </svg>
    </div>
  );
}

export default function TypingVideo({ src }: TypingVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;

    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played) return;
        video
          .play()
          .then(() => {
            played = true;
            observer.disconnect();
          })
          .catch(() => {
            /* keep watching until a muted play succeeds once */
          });
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Arabic invitation message"
    >
      <Flourish className={styles.flourish} />
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        aria-hidden="true"
      />
      <Flourish className={`${styles.flourish} ${styles.flourishBottom}`} />
    </section>
  );
}
