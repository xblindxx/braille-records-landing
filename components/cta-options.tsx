import Image from "next/image";
import { ArrowRight, Gift, Crown, Package } from "lucide-react";

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
}: OptionCardProps) {
  const Wrapper = comingSoon ? "div" : "a";
  const wrapperProps = comingSoon
    ? {}
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors ${
        comingSoon ? "opacity-70" : "hover:border-white/25 hover:bg-white/[0.06]"
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

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 lg:gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full lg:h-10 lg:w-10 ${badgeColor}`}
            >
              {icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 lg:text-xs lg:text-white/70">
              {badge}
            </span>
          </div>

          {priceNow && (
            <div className="flex items-baseline gap-1.5 lg:gap-2">
              {priceWas && (
                <span className="text-xs text-white/40 line-through lg:text-base">
                  {priceWas}
                </span>
              )}
              <span className="font-display text-lg font-black text-white lg:text-3xl">
                {priceNow}
              </span>
            </div>
          )}
        </div>

        <h3 className="font-display mb-2 text-lg font-black uppercase tracking-tight text-white sm:text-xl lg:text-2xl">
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <OptionCard
          icon={<Gift className="h-4 w-4 text-white lg:h-5 lg:w-5" />}
          badgeColor="bg-[#9b5cff]"
          badge="100% Free"
          title="101%"
          description="An hour-long DJ mix of electronic video game remixes — 100 game remixes from bLiNd, ranging 2002–2017."
          cta="Listen Free on Bandcamp"
          href="https://braillerecords.com/album/101"
          art="https://f4.bcbits.com/img/a2341209040_16.jpg"
        />

        <OptionCard
          icon={<Crown className="h-4 w-4 text-black lg:h-5 lg:w-5" />}
          badgeColor="bg-white"
          badge="Membership"
          title="Braille Records Subscription"
          description="Get every new release the moment it drops, plus unlimited access to the entire back catalog. $50/year."
          cta="Subscribe on Bandcamp"
          href="https://braillerecords.com/subscribe"
          art="https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/d2a781b37c1f4bb3a01a06903ae6ce05.jpg"
        />

        <OptionCard
          icon={<Package className="h-4 w-4 text-black lg:h-5 lg:w-5" />}
          badgeColor="bg-white"
          badge="Best Value"
          priceWas="$463"
          priceNow="$97"
          title="Own the Entire Discography"
          description="Every Braille Records release — all 109 and counting — sent as a Dropbox link in 320kbps MP3 and lossless FLAC. Buy anytime this year and every new release drops straight into your folder too."
          cta="Buy the Full Catalog"
          comingSoon
          art="https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/7fc01051f6e748d7af988ed2ae46fbd9.jpg"
        />
      </div>
    </section>
  );
}
