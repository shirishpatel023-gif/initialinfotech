import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocationBar } from "@/components/layout/location-bar";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://initial-infotech.vercel.app"),
  title: {
    default: "Initial Infotech",
    template: "%s | Initial Infotech",
  },
  description:
    "Initial Infotech is a Bardoli-based software and app development company delivering modern web, mobile, and AI-enabled products.",
  keywords: [
    "Initial Infotech",
    "Bardoli software company",
    "mobile app development",
    "custom software development",
    "employee directory",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--color-ink)] text-[var(--color-text)]">
        <div className="site-shell">
          <Header />
          <LocationBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster theme="light" richColors position="top-right" />
      </body>
    </html>
  );
}
