import Image from "next/image";
import Link from "next/link";
import { Radio } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-6 py-12 gradient-frost-hero relative overflow-hidden">
      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col flex-1">
        <div className="text-center space-y-6 my-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/brand/defi_logo_white.svg"
              alt="DeFi Triangle"
              width={40}
              height={40}
              priority
            />
          </div>

          <h1
            className="text-[38px] sm:text-[56px] lg:text-[68px] text-white tracking-tight leading-tight font-light"
            style={{
              fontFamily:
                "'Geist Pixel Square', var(--font-geist-mono), monospace",
            }}
          >
            DeFi Triangle
          </h1>

          <p className="font-ibm-plex-sans text-sm sm:text-base lg:text-lg text-white/75 max-w-lg mx-auto leading-relaxed">
            DeFi Execution, Exposure and Edge Layer for Solana
          </p>

          <div className="rounded-sm border border-white/25 bg-white/10 backdrop-blur px-5 py-5 text-left w-full mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Radio size={14} className="text-[#7ee5c6]" />
                  <p className="text-[13px] tracking-[0.14em] text-white/85 font-ibm-plex-sans font-semibold">
                    Token Edge
                  </p>
                </div>
                <p className="font-ibm-plex-sans text-sm text-white/80">
                  Discover tokens and gain an edge with planned safety and risk.
                </p>
              </div>
              <span className="inline-flex items-center justify-center h-[32px] px-4 rounded-full text-xs font-ibm-plex-sans font-medium tracking-wider bg-white/10 border border-white/30 text-white/70 self-start sm:self-auto">
                WIP
              </span>
            </div>
          </div>

          <div className="font-ibm-plex-sans text-xs text-white/50 text-center space-y-2">
            <p>Building in public for</p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <Image
                src="/brand/Logo-Design-Mono-White.svg"
                alt="Colosseum"
                width={120}
                height={22}
                className="h-[21px] w-auto opacity-90"
              />
              <Image
                src="/brand/Frontier_Logo.webp"
                alt="Frontier"
                width={132}
                height={22}
                className="h-[14px] w-auto opacity-90"
              />
              <span className="text-[15px] text-white">Hackathon</span>
            </div>
            <div className="pt-1 text-center">
              <Link
                href="/log"
                transitionTypes={["fade"]}
                className="font-ibm-plex-sans text-xs text-white/75 hover:text-white underline underline-offset-2"
              >
                Release log
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 w-full mt-auto">
          <a
            href="https://x.com/yamparalarahul1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 py-1 block w-full text-center"
          >
            <p className="text-xs text-white/75 font-ibm-plex-sans inline-flex items-center justify-center gap-2 flex-wrap">
              <span>Yamparala Rahul</span>
              <span className="text-white/35">•</span>
              <span>Design Engineer</span>
              <span className="text-white/35">•</span>
              <span>@yamparalarahul1</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
