import { ShieldCheck, Tv, Youtube } from "lucide-react";

const BADGES = [
  { label: "100% AI-Free", Icon: ShieldCheck },
  { label: "Twitch Friendly", Icon: Tv },
  { label: "YouTube Friendly", Icon: Youtube },
];

// Phones keep the compact size so the bar stays slim. From tablet width (768px) up the
// badges are 1.5x the previous size (text 12/14px -> 18/21px, icons 14/16px ->
// 21/24px, padding and gaps scaled to match).
export function TopBanners() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-white/10 bg-[#0c0c11] px-3 py-2 md:gap-[18px] md:px-4 md:py-[15px] lg:gap-6 lg:py-[18px]">
      {BADGES.map(({ label, Icon }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 md:gap-[9px] md:px-[18px] md:py-1.5 md:text-lg lg:gap-3 lg:px-6 lg:py-[9px] lg:text-[21px]"
        >
          <Icon className="h-3 w-3 text-[#9b5cff] md:h-[21px] md:w-[21px] lg:h-6 lg:w-6" />
          {label}
        </span>
      ))}
    </div>
  );
}
