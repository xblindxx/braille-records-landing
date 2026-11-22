import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { TopBanners } from "@/components/top-banners";
import { SiteFooter } from "@/components/site-footer";
import { withUtm } from "@/lib/meta";

const BUNDLE_URL = "https://blindedm.com/braille-records-all-releases-bundle";
// Vertical (9:16) YouTube Short with the bundle story. Tap-to-play with sound,
// no autoplay, so mobile browsers allow audio.
const BUNDLE_VIDEO_ID = "7JahbpV2RbY";
const BUNDLE_VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${BUNDLE_VIDEO_ID}?rel=0&modestbranding=1&playsinline=1`;
const COLLAGE =
  "https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/7fc01051f6e748d7af988ed2ae46fbd9.jpg";

const title = "Own 28 Years of Music: $97 | Braille Records";
const description =
  "All 109 Braille Records releases plus 200 unreleased songs: 28 years of music from 1998 to 2026, 1,100+ tracks, in one Dropbox folder.";

export const metadata: Metadata = {
  title,
  description,
  // Ad landing page: keep it out of search results so it doesn't compete with the main page.
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: COLLAGE, width: 1014, height: 1012, alt: "Braille Records catalog bundle" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [COLLAGE] },
};

const STATS = [
  { big: "28", small: "years of music" },
  { big: "1,100+", small: "tracks" },
  { big: "200", small: "unreleased songs" },
  { big: "109", small: "releases" },
];

const INCLUDED = [
  "All 109 Braille Records releases, in 320kbps MP3 and lossless FLAC",
  "200 unreleased songs, including the early years 1998–2002",
  "Everything through 2026: 28 years of music",
  "One Dropbox link, yours to keep",
  "Buy this year and every new release drops into your folder too",
];

function BuyButton() {
  return (
    <a
      href={withUtm(BUNDLE_URL, "bundle-page")}
      target="_blank"
      rel="noopener noreferrer"
      data-meta-event="InitiateCheckout"
      data-meta-name="Own the Entire Discography (bundle page)"
      data-meta-value={97}
      className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-5 font-display text-sm font-black uppercase tracking-wide text-black transition-transform hover:scale-[1.02] sm:w-auto sm:px-8 sm:text-lg"
    >
      Get the full catalog: $97
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export default function BundlePage() {
  return (
    <main className="grain relative min-h-screen">
      <TopBanners />

      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#9b5cff]/20 blur-[140px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80">
            Braille Records &mdash; the whole catalog
          </p>
          <h1 className="font-display text-balance text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-6xl">
            28 years of music. One folder.
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/55 sm:text-base">
            1998 &rarr; 2026
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Vertical player: width is capped by viewport height too, so it never
              pushes the price and buy button far down the page. */}
          <div
            className="mx-auto text-center"
            style={{ width: "min(340px, calc(58svh * 9 / 16))" }}
          >
            <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
              <iframe
                className="h-full w-full"
                src={BUNDLE_VIDEO_SRC}
                title="Braille Records: the whole catalog"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/45">
              Tap play, sound on
            </p>
          </div>

          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-baseline justify-center gap-3 lg:justify-start">
              <span className="text-xl text-white/55 line-through lg:text-2xl">$453</span>
              <span className="font-display text-7xl font-black leading-none text-white lg:text-8xl">
                $97
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                one-time
              </span>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/55">
              Bought one by one, the 109 releases alone are over $450
            </p>

            <ul className="mt-7 space-y-3 text-left text-base text-white/80">
              {INCLUDED.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#b98cff]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center lg:justify-start">
              <BuyButton />
            </div>
            <p className="mt-4 text-xs text-white/45">
              Secure checkout on blindedm.com
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.small}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center"
            >
              <p className="font-display text-3xl font-black text-[#b98cff] sm:text-4xl">{s.big}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/65">{s.small}</p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-14 max-w-xl text-center">
          <BuyButton />
          <p className="mt-6">
            <Link href="/" className="text-sm text-white/50 underline-offset-2 hover:text-white hover:underline">
              See all options
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
