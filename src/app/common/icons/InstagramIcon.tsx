type IconProps = {
  className?: string;
};

export default function InstagramIcon({
  className = "h-[18px] w-[18px] fill-current",
}: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.75A2.75 2.75 0 0 0 4.75 7.5v9A2.75 2.75 0 0 0 7.5 19.25h9A2.75 2.75 0 0 0 19.25 16.5v-9A2.75 2.75 0 0 0 16.5 4.75h-9Zm9.75 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7.75A4.25 4.25 0 1 1 7.75 12 4.25 4.25 0 0 1 12 7.75Zm0 1.75A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z" />
    </svg>
  );
}
