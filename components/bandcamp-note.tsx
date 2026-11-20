export function BandcampNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/55 sm:text-sm ${className}`}
    >
      <span className="font-semibold text-white/75">
        Free &amp; pay-what-you-want on Bandcamp:
      </span>{" "}
      to add a release to your Bandcamp account, Bandcamp requires a $1 minimum
      donation. Otherwise you can only download the release as a zip file, and
      that&apos;s it.
    </p>
  );
}
