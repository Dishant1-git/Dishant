import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Full-stack MERN developer building scalable, production-ready web applications — e-commerce platforms, dashboards, marketplaces and marketing sites.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dishantkaushal.vercel.app"),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Dishant Kaushal",
    "MERN developer",
    "full stack developer",
    "React developer",
    "Node.js",
    "MongoDB",
    "Next.js portfolio",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    images: [{ url: profile.avatar, width: 460, height: 460, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [profile.avatar],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1f1a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
