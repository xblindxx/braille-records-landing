import Image from "next/image";
import { ArrowRight, Gift, Crown, Package, Gamepad2 } from "lucide-react";

interface OptionCardProps {
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  cta: string;
  href?: string;
  art?: string;
  comingSoon?: boolean;
  priceWas?: string;
  priceNow?: string;
  priceNote?: string;
}

function OptionCard({
  icon,
  badge,
  badgeColor,
  title,
  description,
  cta,
  href,
  art,
  comingSoon,
  priceWas,
  priceNow,
  priceNote,
}: OptionCardProps) {
  const Wrapper = comingSoon ? "div" : "a";
  const wrapperProps = comingSoon
    ? {}
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors ${
        comingSoon ? "" : "hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      {art && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
          <Image
            src={art}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 lg:p-7 xl:p-6">
        <div className="mb-3 flex items-center gap-2 lg:gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full lg:h-10 lg:w-10 ${badgeColor}`}
          >
            {icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 lg:text-xs lg:text-white/70">
            {badge}
          </span>
        </div>

        {/* Price row: same size + position on all four cards so the tiers
            read as one consistent ladder (FREE / $25 / $50 / $97). */}
        <div className="mb-4 flex items-baseline gap-2">
          {priceWas && (
            <span className="text-sm text-white/55 line-through lg:text-lg">
              {priceWas}
            </span>
          )}
          <span className="font-display text-3xl font-black leading-none text-white lg:text-4xl xl:text-3xl 2xl:text-4xl">
            {priceNow}
          </span>
          {priceNote && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60 lg:text-xs">
              {priceNote}
            </span>
          )}
        </div>

        <h3 className="font-display mb-2 text-lg font-black uppercase tracking-tight text-white sm:text-xl lg:text-2xl xl:text-xl 2xl:text-2xl">
          {title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50 lg:text-base lg:text-white/65">
          {description}
        </p>

        <div
          className={`inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-wide lg:text-sm ${
            comingSoon
              ? "text-white/30"
              : "text-white transition-transform group-hover:translate-x-1"
          }`}
        >
          {comingSoon ? "Coming Soon" : cta}
          {!comingSoon && <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
        </div>
      </div>
    </Wrapper>
  );
}

export function CtaOptions() {
  return (
    <section className="relative z-10 px-4 pb-16 pt-4 sm:px-8 sm:pb-24 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        <OptionCard
          icon={<Gift className="h-4 w-4 text-white lg:h-5 lg:w-5" />}
          badgeColor="bg-[#9b5cff]"
          badge="100% Free"
          priceNow="$0"
          priceNote="enter $0 at checkout"
          title="101%"
          description="An hour-long DJ mix of electronic video game remixes — 100 game remixes from bLiNd, ranging 2002–2017."
          cta="Listen on Bandcamp"
          href="https://braillerecords.com/album/101"
          art="https://f4.bcbits.com/img/a2341209040_16.jpg"
        />

        <OptionCard
          icon={<Gamepad2 className="h-4 w-4 text-black lg:h-5 lg:w-5" />}
          badgeColor="bg-white"
          badge="Game Remixes"
          priceNow="$25"
          priceNote="one-time"
          title="bLiNd Remix Anthology"
          description="Every videogame remix bLiNd has made, 2002–2021, in one collection — 229 tracks, including all the game arrangement albums like Chozo Legacy (Super Metroid) and NESterYears, classic NES games remixed into trance and house. MP3 + FLAC, instant download."
          cta="Get the Anthology"
          href="https://www.blindedm.com/blind-remixes"
          art="https://g.tlcdn.com/gen/4f11ee9cd1034072929261f4487f3bc9.jpeg"
        />

        <OptionCard
          icon={<Crown className="h-4 w-4 text-black lg:h-5 lg:w-5" />}
          badgeColor="bg-white"
          badge="Membership"
          priceNow="$50"
          priceNote="per year"
          title="Braille Records Subscription"
          description="Get every new release the moment it drops, unlimited access to the entire back catalog, and 15% off CDs/Vinyls/Cassettes."
          cta="Subscribe on Bandcamp"
          href="https://braillerecords.com/subscribe"
          art="https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/d2a781b37c1f4bb3a01a06903ae6ce05.jpg"
        />

        <OptionCard
          icon={<Package className="h-4 w-4 text-black lg:h-5 lg:w-5" />}
          badgeColor="bg-white"
          badge="Best Value"
          priceWas="$453"
          priceNow="$97"
          priceNote="one-time"
          title="Own the Entire Discography"
          description="Every Braille Records release — all 109 and counting — sent as a Dropbox link in 320kbps MP3 and lossless FLAC. Buy anytime this year and every new release drops straight into your folder too."
          cta="Buy the Full Catalog"
          href="https://blindedm.com/braille-records-all-releases-bundle"
          art="https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/7fc01051f6e748d7af988ed2ae46fbd9.jpg"
        />
      </div>
    </section>
  );
}
