"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Disc3, Gift } from "lucide-react";
import { releases, Release } from "@/lib/releases";

const BUCKET_ORDER = [
  "House",
  "Trance",
  "Soundtrack & Game",
  "Drum & Bass",
  "Dubstep",
  "Future Bass",
  "Breaks & Retro",
  "Bass Music",
  "Trap",
  "Ethnic / World",
  "Hip Hop",
  "Synthwave / 80s",
  "Techno",
  "Downtempo",
];

export function CatalogGrid() {
  const { genreList, countByGenre } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of releases) {
      for (const b of r.buckets) {
        counts.set(b, (counts.get(b) ?? 0) + 1);
      }
    }
    const ordered = BUCKET_ORDER.filter((b) => counts.has(b));
    return { genreList: ["All", ...ordered], countByGenre: counts };
  }, []);

  const [active, setActive] = useState("All");
  const [pwywOnly, setPwywOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = releases;
    if (active !== "All")
      list = list.filter((r) => r.buckets.includes(active));
    if (pwywOnly) list = list.filter((r) => r.pwyw || r.free);
    return list;
  }, [active, pwywOnly]);

  const pwywCount = useMemo(
    () => releases.filter((r) => r.pwyw || r.free).length,
    [],
  );

  return (
    <section id="catalog" className="relative px-4 py-10 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80 sm:mb-4">
          <Disc3 className="h-3 w-3" />
          The Full Catalog
        </div>
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white sm:text-3xl md:text-5xl">
          {releases.length} releases. Every genre.
        </h2>
        <p className="mt-2 text-xs text-white/50 sm:mt-4 sm:text-base">
          Every cover links straight to Bandcamp — stream, download, or
          buy direct from the artists.
        </p>
      </div>

      <div className="no-scrollbar sticky top-0 z-20 -mx-4 mb-4 flex shrink-0 items-center gap-2 overflow-x-auto border-y border-white/10 bg-[#07070a]/90 px-4 py-2 backdrop-blur sm:mx-0 sm:mb-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:rounded-2xl sm:border sm:px-4 sm:py-4">
        <button
          onClick={() => setActive("All")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide transition-colors sm:px-4 sm:text-xs ${
            active === "All"
              ? "bg-white text-black"
              : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setPwywOnly((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors sm:px-4 sm:text-xs ${
            pwywOnly
              ? "border-[#9b5cff] bg-[#9b5cff] text-white"
              : "border-[#9b5cff]/50 bg-[#9b5cff]/10 text-[#c9a9ff] hover:bg-[#9b5cff]/20"
          }`}
        >
          <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          Pay What You Want
          <span className="opacity-70">{pwywCount}</span>
        </button>

        {genreList
          .filter((g) => g !== "All")
          .map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wide transition-colors sm:px-4 sm:text-xs ${
                active === g
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {g}
              <span className="ml-1.5 opacity-60">
                {countByGenre.get(g) ?? 0}
              </span>
            </button>
          ))}
      </div>

      <p className="mb-3 text-center text-[10px] uppercase tracking-widest text-white/30 sm:mb-4 sm:text-xs">
        Showing {filtered.length} release{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.div
        layout
        className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {filtered.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-white/40">
          No releases match these filters yet.
        </p>
      )}
    </section>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  return (
    <motion.a
      layout
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/5">
        <Image
          src={release.art}
          alt={`${release.title} by ${release.artist}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />

        {(release.pwyw || release.free) && (
          <span className="absolute left-2 top-2 rounded-full bg-[#9b5cff] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
            {release.free ? "Free" : "PWYW"}
          </span>
        )}

        <div className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-black/95 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 sm:flex sm:group-hover:opacity-100">
          <p className="mb-0.5 text-[10px] uppercase tracking-widest text-white/70">
            {release.genres.join(", ")}
          </p>
          <p className="line-clamp-2 text-xs font-semibold leading-tight text-white">
            {release.title}
          </p>
          <p className="mt-0.5 text-[11px] text-white/60">{release.artist}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-white">
            Listen on Bandcamp <ExternalLink className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>

      <div className="mt-1.5 sm:hidden">
        <p className="truncate text-[11px] font-semibold leading-tight text-white">
          {release.title}
        </p>
        <p className="truncate text-[10px] text-white/50">{release.artist}</p>
      </div>
    </motion.a>
  );
}
