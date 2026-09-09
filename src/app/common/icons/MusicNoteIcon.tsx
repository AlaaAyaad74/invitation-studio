type IconProps = {
  className?: string;
};

export default function MusicNoteIcon({
  className = "h-[22px] w-[22px] text-ink",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <ellipse
        cx="7.1"
        cy="17.4"
        rx="2.55"
        ry="2.1"
        transform="rotate(-20 7.1 17.4)"
      />
      <ellipse
        cx="15.6"
        cy="15.9"
        rx="2.55"
        ry="2.1"
        transform="rotate(-20 15.6 15.9)"
      />
      <rect x="8.85" y="5.2" width="1.55" height="12.4" rx="0.4" />
      <rect x="17.35" y="3.7" width="1.55" height="12.4" rx="0.4" />
      <path d="M10.4 5.2h7.5v2.35c-1.1.55-3.35 1.2-7.5 1.55V5.2Z" />
    </svg>
  );
}
