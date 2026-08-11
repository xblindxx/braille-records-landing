import type { Metadata } from "next";
import "./globals.css";
import { releases } from "@/lib/releases";

const releaseCount = releases.length;
const title = "Braille Records — You Have Just Found The Electronic Underground";
const description = `${releaseCount} releases. One label. Trance, dubstep, trap, house, drum & bass and more — straight from the Braille Records catalog on Bandcamp.`;
const ogImageUrl =
  "https://galaxy-prod.tlcdn.com/view/user_30lkrHgNDuDcw8jcID4t5begfcs/d2a781b37c1f4bb3a01a06903ae6ce05.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://landing.braillerecords.com"),
  title,
  description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 1200,
        alt: "Braille Records",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07070a] text-[#f2f0ea] antialiased">
        {children}
      </body>
    </html>
  );
}
