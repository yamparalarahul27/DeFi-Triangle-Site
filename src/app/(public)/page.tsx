import Image from "next/image";
import { Radio } from "lucide-react";

const CTA_HREF = "https://app.defitriangle.xyz";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 gradient-frost-hero relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
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
          Your DeFi Execution, Exposure and Edge Layer
        </p>

        <div className="rounded-sm border border-white/25 bg-white/10 backdrop-blur px-5 py-5 text-left w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Radio size={14} className="text-[#7ee5c6]" />
                <p className="text-[11px] tracking-[0.14em] text-white/85 font-ibm-plex-sans">
                  Token Edge
                </p>
              </div>
              <p className="font-ibm-plex-sans text-sm text-white/80">
                Discover movers. Validate token safety.
              </p>
            </div>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-sm text-sm font-ibm-plex-sans font-medium bg-white text-[#11274d] hover:bg-white/90 active:scale-[0.97] transition-all duration-200 self-start sm:self-auto"
            >
              View
            </a>
          </div>
        </div>

        <p className="font-ibm-plex-sans text-xs text-white/50 flex items-center justify-center gap-2 flex-wrap">
          <span>Building in public for</span>
          <Image
            src="/brand/Logo-Design-Mono-White.svg"
            alt="Colosseum"
            width={120}
            height={22}
            className="h-[14px] w-auto opacity-90"
          />
          <Image
            src="/brand/Frontier_Logo.webp"
            alt="Frontier"
            width={132}
            height={22}
            className="h-[14px] w-auto opacity-90"
          />
          <span>Hackathon</span>
        </p>

        <div className="pt-4 w-full">
          <a
            href="https://x.com/yamparalarahul1"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-left block w-full hover:bg-white/[0.14] transition-colors duration-200"
          >
            <p className="text-sm text-white font-ibm-plex-sans">
              Yamparala Rahul
            </p>
            <p className="text-xs text-white/70 font-ibm-plex-sans">
              Design Engineer
            </p>
            <p className="text-[11px] text-white/70 mt-2 font-ibm-plex-sans">
              @yamparalarahul1
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
