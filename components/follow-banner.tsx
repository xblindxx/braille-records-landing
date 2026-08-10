import { Heart, ArrowRight } from "lucide-react";

export function FollowBanner() {
  return (
    <section className="relative z-10 px-4 pt-6 sm:px-8 sm:pt-10 lg:px-12">
      <a
        href="https://braillerecords.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-white/25 hover:bg-white/[0.06] sm:flex-row sm:gap-4 sm:px-6"
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Heart className="h-4 w-4 text-white" />
          </span>
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">
              Not ready to buy or subscribe?
            </span>{" "}
            At the very least, follow Braille Records on Bandcamp so you never
            miss a new release.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition-transform group-hover:translate-x-1">
          Follow on Bandcamp
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </a>
    </section>
  );
}
