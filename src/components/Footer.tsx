export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory-deep/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 sm:flex-row sm:justify-between sm:px-8">
        <img
          src="/logo.webp"
          alt="Invitation Studio"
          width={160}
          height={160}
          className="h-36 w-36 shrink-0 object-contain sm:h-40 sm:w-40"
        />
        <p className="text-sm text-ink-muted">
          Wedding invitation websites & custom couple branding.
        </p>
        <a
          href="mailto:hello@vowcraft.studio"
          className="text-sm text-sage-deep underline-offset-4 hover:underline"
        >
          hello@vowcraft.studio
        </a>
      </div>
    </footer>
  );
}
