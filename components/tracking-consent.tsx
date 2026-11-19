"use client";

import { useEffect, useState } from "react";
import { MetaPixel } from "@/components/meta-pixel";

const KEY = "rh-tracking-consent";
type Consent = "loading" | "unknown" | "granted" | "denied";

function clearMetaCookies() {
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
  }
}

// Nothing from Meta loads until the visitor clicks Accept. Their choice is kept
// in this browser so they are only asked once.
export function TrackingConsent() {
  const [consent, setConsent] = useState<Consent>("loading");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setConsent(saved === "granted" || saved === "denied" ? saved : "unknown");
    // The footer's "Cookie settings" link re-opens the banner.
    const reopen = () => setConsent("unknown");
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  const choose = (value: "granted" | "denied") => {
    const wasGranted = localStorage.getItem(KEY) === "granted";
    localStorage.setItem(KEY, value);
    setConsent(value);
    if (value === "denied" && wasGranted) {
      // The Pixel is already running in this page; a reload is the clean way to stop it.
      clearMetaCookies();
      location.reload();
    }
  };

  return (
    <>
      {consent === "granted" && <MetaPixel />}
      {consent === "unknown" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-[#0c0c11]/95 p-4 shadow-2xl backdrop-blur md:inset-x-auto md:bottom-5 md:left-5 md:max-w-md md:rounded-2xl md:border"
        >
          <p className="text-sm leading-relaxed text-white/80">
            We use Meta (Facebook/Instagram) cookies to measure our ads and
            show you more music you&apos;ll like. Nothing loads unless you say
            yes.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => choose("granted")}
              className="flex-1 rounded-full bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
            >
              Accept
            </button>
            <button
              onClick={() => choose("denied")}
              className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            >
              No thanks
            </button>
          </div>
        </div>
      )}
    </>
  );
}
