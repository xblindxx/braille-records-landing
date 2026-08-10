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

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${badgeColor}`}
          >
            {icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            {badge}
          </span>
        </div>

        <h3 className="font-display mb-2 text-lg font-black uppercase tracking-tight text-white sm:text-xl">
          {title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">
          {description}
        </p>

        <div
          className={`inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-wide ${
            comingSoon
              ? "text-white/30"
              : "text-white transition-transform group-hover:translate-x-1"
          }`}
        >
          {comingSoon ? "Coming Soon" : cta}
          {!comingSoon && <ArrowRight className="h-3.5 w-3.5" />}
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
          icon={<Gift className="h-4 w-4 text-white" />}
          badgeColor="bg-[#9b5cff]"
          badge="100% Free"
          title="101%"
          description="An hour-long DJ mix of electronic video game remixes — 100 game remixes from bLiNd, ranging 2002–2017."
          cta="Listen Free on Bandcamp"
          href="https://braillerecords.com/album/101"
          art="https://f4.bcbits.com/img/a2341209040_16.jpg"
        />

        <OptionCard
          icon={<Crown className="h-4 w-4 text-black" />}
          badgeColor="bg-white"
          badge="Membership"
          title="Braille Records Subscription"
          description="Get every new release the moment it drops, plus unlimited access to the entire back catalog. $50/year."
          cta="Subscribe on Bandcamp"
          href="https://braillerecords.com/subscribe"
        />

        <OptionCard
          icon={<Package className="h-4 w-4 text-black" />}
          badgeColor="bg-white"
          badge="$97 One-Time"
          title="Own the Entire Discography"
          description="Every Braille Records release, every artist, all 109 and counting — yours forever in one purchase."
          cta="Buy the Full Catalog"
          comingSoon
        />
      </div>
    </section>
  );
}
