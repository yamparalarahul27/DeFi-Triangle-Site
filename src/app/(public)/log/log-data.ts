export interface DayEntry {
  date: string;
  added: string;
  fixed: string;
  learned: string;
}

export const LOG: DayEntry[] = [
  {
    date: "2026-04-20",
    added:
      "Birdeye BIP Sprint 1 integration — token safety score on token detail pages, trending tokens rail, new listings radar with safety badges. Torque MCP event tracking (swap, deposit, wallet connect) + leaderboard component. Palm USD Freedom Swap card (pending Solana mint).",
    fixed:
      "Resolved all 23 lint errors/warnings (0 remaining). Regenerated package-lock.json for clean npm ci. API middleware: origin check + rate limit + CORS on all /api/* routes.",
    learned:
      "Birdeye token_security endpoint gives freeze authority, mint authority, top holder concentration — free safety layer complementing Jupiter Shield. Torque event ingestion requires custom events to be registered first via MCP before incentive queries work.",
  },
  {
    date: "2026-04-19",
    added:
      "OG image (edge-rendered 1200×630 frost gradient) + social meta tags (openGraph + twitter card). Dynamic favicon via Next.js icon.tsx replacing default Vercel triangle. ALARM.md research doc — PagerDuty for DeFi concept.",
    fixed:
      "Swap page Suspense boundary for useSearchParams (build was failing on Vercel prerender). Stale branch cleanup (4 deleted). Interested counter storing user rank in localStorage.",
    learned:
      "Next.js 16 requires Suspense around useSearchParams for static prerendering — without it the build fails silently. SVG favicons work in modern browsers but some platforms (Slack, Discord) still need ICO or dynamic PNG.",
  },
  {
    date: "2026-04-18",
    added:
      "Rebranded to DeFi Triangle (15 files, 0 old Y-Vault/DeFi Cockpit refs). TESTS.md with 22 sections covering best/worst cases for every integration. Consolidated 4 research docs into unified RESEARCH.md (1532 → 277 lines).",
    fixed:
      "Umbra SDK: added deferMasterSeedSignature + explicit anonymous:false (from reference implementation). PublicMints propagation to ShieldedBalances. Recovery form completed with amount + destination inputs.",
    learned:
      "Reference implementation (crypto-pay-umbra) showed deferMasterSeedSignature prevents unexpected wallet popup on client init. anonymous:true requires a ZK Prover not bundled in SDK v4 — must be explicitly false.",
  },
  {
    date: "2026-04-17",
    added:
      "Public landing page with \"Interested\" counter (Supabase-backed) and \"View Log\" CTA. Route restructure: cockpit moves under /cockpit, landing at /.",
    fixed:
      "Project Log page reversed to show latest day first. Unified all side-track research (Umbra, Torque, LI.FI) into single TRACKS.md.",
    learned:
      "Build in public works best when the landing page is a funnel, not a gate — judges and testers still need direct access to the cockpit.",
  },
  {
    date: "2026-04-16",
    added:
      "Jupiter Ultra upgrade — swap page now uses /ultra/v1 (order/execute/shield/search/holdings). Live SPL token search combobox. Wallet balances section via Ultra holdings. Side track research: Umbra Privacy, Torque MCP, LI.FI.",
    fixed:
      "Purged all mocks: deleted MockJupiterSwapService, ServiceFactory, useServices (dead code), FALLBACK_PRICES, stale cache. Prices return null when unavailable — UI shows \"Price unavailable\" instead of fake numbers.",
    learned:
      "Jupiter Ultra's /shield endpoint detects scam tokens before swap execution — free safety layer. Umbra SDK uses @solana/kit (not web3.js) — adapter needed. Torque MCP is an AI-agent tool, not a traditional SDK.",
  },
  {
    date: "2026-04-15",
    added:
      "Rich NFT view — attributes, creators, royalty, ownership, cNFT compression, collection filter pills, detail modal with Magic Eden/Tensor/Solscan links. Wallet chip dropdown (copy/disconnect/switch-soon).",
    fixed:
      "Migrated Kamino + Jupiter + Deriverse services to current official docs. HeliusNftService expanded from 8 to 20+ parsed DAS fields. Pagination fix: 50 → 1000 NFT cap.",
    learned:
      "Helius DAS response already contains all the NFT richness (attributes, creators, royalties) — we were just throwing it away in the parser. No new API needed.",
  },
  {
    date: "2026-04-14",
    added:
      "Sprint 1+2: DexScreener pairs, Sanctum LST Directory, NFT Holdings gallery, Trending tokens rail. Deriverse DEX devnet trade analytics with real on-chain parsing.",
    fixed:
      "Vault APY/TVL/symbols now match kamino.finance exactly. RPC Fast + round-robin rotation across 3 providers eliminated single-point RPC failures.",
    learned:
      "Pre-push hooks (lockfile sync + lint + typecheck + build + audit gate) catch issues before they reach CI — saves 10 min per push cycle.",
  },
  {
    date: "2026-04-13",
    added:
      "Market page with live CoinGecko token list. Kamino Lending product integration. Multi-source token chart service (Binance → Birdeye → GeckoTerminal).",
    fixed:
      "Removed fiat/Dodo deposit flow — enforced crypto-only deposits. Optimized build by removing 4 unused deps, externalizing Solana SDKs, lazy-loading Recharts.",
    learned:
      "Agentation must be stripped from main on every merge — added a checklist in CLAUDE.md. Vault data split (general every 1hr, positions on wallet connect) cut RPC calls by 60%.",
  },
  {
    date: "2026-04-12",
    added:
      "Pivoted to DeFi Triangle. Built route architecture (10 pages), protocol-agnostic DEX analytics, token detail with multi-source oracles, vault detail page, Project Overview dashboard.",
    fixed:
      "Removed ALL hardcoded mock data — real Kamino SDK data or error banner, nothing fake. Liveline chart rendering fixed with explicit pixel height.",
    learned:
      "Experience-first design wins hackathons — real data flowing through a stunning UI that people screenshot is more compelling than a half-working deposit pipeline.",
  },
  {
    date: "2026-04-11",
    added:
      "Logo, live SOL price in bottom bar, clickable vault cards linking to detail view. Devnet vault strategy documented using SPL Token PDAs.",
    fixed:
      "ETH token icon was wrong Wormhole-wrapped asset. Green text contrast on light background improved for accessibility.",
    learned:
      "Kamino vault deposits are mainnet-only — can't demo without real money. This constraint drove the pivot to read-only cockpit.",
  },
  {
    date: "2026-04-10",
    added:
      "Jupiter Swap wired into deposit flow — 5-step user story complete. Asgard UI design system (frost/hela/loki tokens) applied across all components.",
    fixed:
      "Scalable token icons using Solana CDN replaced local images. Mobile 320px responsive pass on all cards and grids.",
    learned:
      "No single CDN has all Solana token icons — need a multi-source fallback chain (known URLs → runtime cache → CDN → avatar).",
  },
];
