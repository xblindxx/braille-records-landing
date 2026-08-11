import { ShieldCheck, Tv } from "lucide-react";

export function TopBanners() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 bg-[#0c0c11] px-4 py-2 sm:gap-3 sm:py-2.5 lg:gap-4 lg:py-3">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 sm:text-xs lg:gap-2 lg:px-4 lg:py-1.5 lg:text-sm">
        <ShieldCheck className="h-3 w-3 text-[#9b5cff] sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
        100% AI-Free
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 sm:text-xs lg:gap-2 lg:px-4 lg:py-1.5 lg:text-sm">
        <Tv className="h-3 w-3 text-[#9b5cff] sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
        Twitch Friendly
      </span>
    </div>
  );
}
