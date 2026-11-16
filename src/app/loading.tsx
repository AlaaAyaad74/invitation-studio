// Shown instantly on navigation while the next page streams in, so a tap on a
// slow connection never looks like it did nothing.
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-svh items-center justify-center bg-ivory"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold motion-reduce:animate-none" />
    </div>
  );
}
