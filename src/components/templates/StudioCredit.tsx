import { siteConfig } from "@/lib/site";

export default function StudioCredit({ className }: { className: string }) {
  return (
    <footer className={className}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
      >
        Crafted with Invitation Studio
      </a>
    </footer>
  );
}
