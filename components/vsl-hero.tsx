"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";

const YOUTUBE_ID = "ssMQgTUAc2M";

interface VslHeroProps {
  releaseCount: number;
}

export function VslHero({ releaseCount }: VslHeroProps) {
  const [docked, setDocked] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDocked(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-20">
        <HeroBackdrop />

        <div className="relative z-10 mb-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80">
          <Zap className="h-3 w-3" />
          Braille Records &mdash; {releaseCount} releases and counting
        </div>

        <h1 className="font-display text-balance relative z-10 max-w-4xl text-center text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          You have just found the electronic underground
        </h1>

        <p className="relative z-10 mt-6 max-w-xl text-center text-sm text-white/50 sm:text-base">
          Watch this, then scroll down &mdash; the full Braille Records
          catalog is waiting below, sorted by genre and linked straight to
          Bandcamp.
        </p>

        <div ref={sentinelRef} className="relative z-10 mt-10 w-full max-w-4xl">
          <div
            className={`scanline relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_0_120px_-20px_rgba(255,255,255,0.15)] transition-opacity duration-300 ${
              docked ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                title="Braille Records VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            catalog below
          </span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      <AnimatePresence>
        {docked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 40 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="fixed bottom-5 right-5 z-50 w-[220px] overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl sm:w-[280px]"
          >
            <div className="flex items-center justify-between bg-white px-2 py-1">
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-black">
                Braille Records
              </span>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                title="Braille Records VSL (docked)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#9b5cff]/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-white/5 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 30%, black, transparent)",
        }}
      />
    </div>
  );
}
