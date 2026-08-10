"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Zap, X, ArrowUp } from "lucide-react";

const YOUTUBE_ID = "ssMQgTUAc2M";
// No autoplay/mute: the video waits for a tap to play. Since playback is
// then a genuine user gesture, mobile browsers allow it to start WITH sound
// by default — which sidesteps a real bug where YouTube's embed chrome
// hides the unmute control entirely on narrow mobile widths (like the
// docked mini player), leaving muted autoplay video with no way to unmute.
const YOUTUBE_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?controls=1&rel=0&modestbranding=1`;

interface VslHeroProps {
  releaseCount: number;
}

export function VslHero({ releaseCount }: VslHeroProps) {
  const [docked, setDocked] = useState(false);
  const [closed, setClosed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowDocked = !entry.isIntersecting;
        setDocked(nowDocked);
        // Reset the "closed" dismissal once the hero video is back in view,
        // so closing the mini-player doesn't permanently hide it forever.
        if (!nowDocked) setClosed(false);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          Tap play, then scroll down &mdash; the full Braille Records catalog
          is waiting below, sorted by genre and linked straight to Bandcamp.
        </p>

        {/* Sentinel marks the point where the video is considered "in view".
            When it scrolls out, the player docks to the corner. */}
        <div ref={sentinelRef} className="relative z-10 mt-10 w-full max-w-4xl">
          <div
            className={`scanline relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_0_120px_-20px_rgba(255,255,255,0.15)] transition-opacity duration-300 ${
              docked ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={YOUTUBE_SRC}
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

      {/* Docked mini player — appears once the hero video scrolls out of view */}
      <AnimatePresence>
        {docked && !closed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 40 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
            className="fixed bottom-5 right-5 z-50 w-[220px] overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl sm:w-[280px]"
          >
            <div className="flex items-center justify-between bg-white px-2 py-1.5">
              <span className="font-display truncate text-[10px] font-bold uppercase tracking-widest text-black">
                Braille Records
              </span>
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  onClick={scrollToTop}
                  aria-label="Back to top / reattach video"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/10 hover:text-black active:bg-black/20"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setClosed(true)}
                  aria-label="Close video"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/10 hover:text-black active:bg-black/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={YOUTUBE_SRC}
                title="Braille Records VSL (docked)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small re-open tab once the docked player has been dismissed */}
      <AnimatePresence>
        {docked && closed && (
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            onClick={() => setClosed(false)}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 rounded-full border border-white/20 bg-black px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white shadow-2xl"
          >
            <Zap className="h-3 w-3" />
            Watch
          </motion.button>
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
