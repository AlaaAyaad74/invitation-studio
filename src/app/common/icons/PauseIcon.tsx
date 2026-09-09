type IconProps = {
  className?: string;
};

export default function PauseIcon({
  className = "h-[20px] w-[20px] text-ink",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <rect x="6.5" y="5" width="3.8" height="14" rx="1.4" />
      <rect x="13.7" y="5" width="3.8" height="14" rx="1.4" />
    </svg>
  );
}
