import { ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-white/40">
      <p className="font-display mb-2 text-sm font-bold uppercase tracking-widest text-white/70">
        Braille Records
      </p>
      <p className="mb-4">
        Independent electronic label. Every release available direct on
        Bandcamp.
      </p>
      <a
        href="https://braillerecords.com/music"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-white hover:underline"
      >
        View full catalog on Bandcamp <ExternalLink className="h-3 w-3" />
      </a>
    </footer>
  );
}
