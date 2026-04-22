import type { Metadata } from "next";
import {
  Geist_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Instrument_Sans,
  Inter,
} from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DeFi Triangle — Real-Time DeFi Intelligence",
  description:
    "Your DeFi execution and exposure app. Vaults, swaps, analytics, and privacy — powered by real on-chain data on Solana.",
  openGraph: {
    title: "DeFi Triangle",
    description: "Your DeFi execution and exposure app.",
    siteName: "DeFi Triangle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeFi Triangle",
    description: "Your DeFi execution and exposure app.",
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
