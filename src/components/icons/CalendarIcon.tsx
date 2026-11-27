type IconProps = {
  className?: string;
};

export default function CalendarIcon({
  className = "h-[18px] w-[18px] fill-none stroke-current stroke-[1.6]",
}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}
