export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory-deep/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <img
          src="/logo.webp"
          alt="Invitation Studio"
          width={96}
          height={96}
          className="h-24 w-auto"
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
