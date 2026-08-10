import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Braille Records — You Have Just Found The Electronic Underground",
  description:
    "94 releases. One label. Trance, dubstep, trap, house, drum & bass and more — straight from the Braille Records catalog on Bandcamp.",
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
