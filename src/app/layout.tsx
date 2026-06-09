import type { Metadata } from "next";
import {
  Geist_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Instrument_Sans,
  Inter,
} from "next/font/google";
import {
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SHORT_DESCRIPTION,
} from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "DeFi Triangle — Real-Time DeFi Intelligence",
  description:
    "Your DeFi execution and exposure app. Vaults, swaps, analytics, and privacy — powered by real on-chain data on Solana.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/defi_logo_fill.svg",
    shortcut: "/brand/defi_logo_fill.svg",
    apple: "/brand/defi_logo_fill.svg",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_SHORT_DESCRIPTION,
    images: [
      {
        url: "/twitter-image",
        alt: SITE_NAME,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    geistMono.variable,
    ibmPlexSans.variable,
    ibmPlexMono.variable,
    instrumentSans.variable,
    inter.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f1f5f9] text-[#11274d]">
        {children}
      </body>
    </html>
  );
}
