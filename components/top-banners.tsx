import { ShieldCheck, Tv, Youtube } from "lucide-react";

const BADGES = [
  { label: "100% AI-Free", Icon: ShieldCheck },
  { label: "Twitch Friendly", Icon: Tv },
  { label: "YouTube Friendly", Icon: Youtube },
];

export function TopBanners() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-white/10 bg-[#0c0c11] px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 lg:gap-4 lg:py-3">
      {BADGES.map(({ label, Icon }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 sm:px-3 sm:text-xs lg:gap-2 lg:px-4 lg:py-1.5 lg:text-sm"
        >
          <Icon className="h-3 w-3 text-[#9b5cff] sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
          {label}
        </span>
      ))}
    </div>
  );
}
