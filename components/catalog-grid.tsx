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
    <section id="catalog" className="relative px-4 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80">
          <Disc3 className="h-3 w-3" />
          The Full Catalog
        </div>
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          {releases.length} releases. Every genre.
        </h2>
        <p className="mt-4 text-sm text-white/50 sm:text-base">
          Every cover links straight to Bandcamp &mdash; stream, download, or
          buy direct from the artists.
        </p>
      </div>

      <div className="sticky top-0 z-20 -mx-4 mb-10 flex flex-col gap-3 border-y border-white/10 bg-[#07070a]/90 px-4 py-4 backdrop-blur sm:mx-0 sm:items-center sm:rounded-2xl sm:border sm:px-4">
        <div className="flex w-full flex-wrap items-center justify-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {genreList.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                active === g
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {g}
              {g !== "All" && (
                <span className="ml-1.5 opacity-60">
                  {countByGenre.get(g) ?? 0}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPwywOnly((v) => !v)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
            pwywOnly
              ? "border-[#9b5cff] bg-[#9b5cff] text-white"
              : "border-[#9b5cff]/50 bg-[#9b5cff]/10 text-[#c9a9ff] hover:bg-[#9b5cff]/20"
          }`}
        >
          <Gift className="h-3.5 w-3.5" />
          Pay What You Want
          <span className="opacity-70">{pwywCount}</span>
        </button>
      </div>

      <p className="mb-4 text-center text-xs uppercase tracking-widest text-white/30">
        Showing {filtered.length} release{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
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
      className="group relative block aspect-square overflow-hidden rounded-lg bg-white/5"
    >
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

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
    </motion.a>
  );
}
