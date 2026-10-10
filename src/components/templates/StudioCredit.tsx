const INSTAGRAM_URL = "https://www.instagram.com/invitation.studio0";

export default function StudioCredit({ className }: { className: string }) {
  return (
    <footer className={className}>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
      >
        Crafted with Invitation Studio
      </a>
    </footer>
  );
}
