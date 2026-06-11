export type SecurityDecision =
  | {
      action: "allow";
      reason?: "scanner-user-agent";
      suspicious: boolean;
    }
  | {
      action: "deny";
      reason:
        | "sensitive-path"
        | "protected-route"
        | "next-action-probe"
        | "unsafe-method"
        | "unknown-path";
      suspicious: boolean;
    };

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const SENSITIVE_SEGMENTS = new Set([
  ".env",
  ".git",
  ".hg",
  ".svn",
  ".terraform",
]);

const SENSITIVE_EXACT_PATHS = new Set([
  "/.ds_store",
  "/config.json",
  "/admin/config/database.js",
  "/debug/default/view",
  "/info.php",
  "/wefile.php",
  "/wp-login.php",
  "/xmlrpc.php",
]);

const SENSITIVE_EXTENSIONS = [
  ".backup",
  ".bak",
  ".conf",
  ".config",
  ".ini",
  ".log",
  ".map",
  ".old",
  ".orig",
  ".sql",
  ".sqlite",
  ".sqlite3",
  ".tfstate",
  ".tmp",
  ".zip",
];

const PROTECTED_PREFIXES = [
  "/admin",
  "/api/internal",
  "/debug",
  "/internal",
];

const INTERNAL_NEXT_PREFIXES = [
  "/_next/cache",
  "/_next/server",
  "/_next/trace",
];

const PUBLIC_EXACT_PATHS = new Set([
  "/",
  "/file.svg",
  "/globe.svg",
  "/icon",
  "/log",
  "/logo.svg",
  "/next.svg",
  "/og.svg",
  "/opengraph-image",
  "/robots.txt",
  "/sitemap.xml",
  "/twitter-image",
  "/vercel.svg",
  "/window.svg",
  "/brand/frontier_logo.webp",
  "/brand/logo-design-mono-white.svg",
  "/brand/defi_logo_dark.svg",
  "/brand/defi_logo_fill.svg",
  "/brand/defi_logo_white.svg",
  "/fonts/geistpixelsquare.woff2",
]);

const PUBLIC_PREFIXES = [
  "/_next/image",
  "/_next/static",
  "/.well-known",
];

const SCANNER_USER_AGENT_PATTERNS = [
  /acunetix/i,
  /dirbuster/i,
  /ffuf/i,
  /go-http-client/i,
  /gobuster/i,
  /httpx/i,
  /libwww-perl/i,
  /masscan/i,
  /nessus/i,
  /nikto/i,
  /nuclei/i,
  /openvas/i,
  /python-requests/i,
  /sqlmap/i,
  /wpscan/i,
  /zgrab/i,
];

function decodePathname(pathname: string): string {
  let current = pathname;

  for (let i = 0; i < 2; i += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) {
        return decoded;
      }
      current = decoded;
    } catch {
      return current;
    }
  }

  return current;
}

export function normalizePathname(pathname: string): string {
  const decoded = decodePathname(pathname).replace(/\\/g, "/");
  const withLeadingSlash = decoded.startsWith("/") ? decoded : `/${decoded}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/").toLowerCase();
}

function hasSensitiveSegment(pathname: string): boolean {
  return pathname
    .split("/")
    .filter(Boolean)
    .some((segment) => {
      if (SENSITIVE_SEGMENTS.has(segment)) {
        return true;
      }

      return segment.startsWith(".env.") || segment.startsWith(".terraform");
    });
}

function hasSensitiveExtension(pathname: string): boolean {
  return SENSITIVE_EXTENSIONS.some(
    (extension) =>
      pathname.endsWith(extension) || pathname.includes(`${extension}.`)
  );
}

function matchesPrefix(pathname: string, prefix: string): boolean {
  return (
    pathname === prefix ||
    pathname.startsWith(`${prefix}/`) ||
    pathname.startsWith(`${prefix}.`)
  );
}

export function isSensitivePath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);

  return (
    SENSITIVE_EXACT_PATHS.has(normalized) ||
    hasSensitiveSegment(normalized) ||
    hasSensitiveExtension(normalized) ||
    INTERNAL_NEXT_PREFIXES.some((prefix) => matchesPrefix(normalized, prefix))
  );
}

export function isProtectedRoute(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return PROTECTED_PREFIXES.some((prefix) => matchesPrefix(normalized, prefix));
}

export function isNextActionProbe(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return normalized === "/_nextjs_action";
}

export function isPublicPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  const withoutTrailingSlash =
    normalized.length > 1 ? normalized.replace(/\/+$/, "") : normalized;

  return (
    PUBLIC_EXACT_PATHS.has(withoutTrailingSlash) ||
    PUBLIC_PREFIXES.some((prefix) => matchesPrefix(withoutTrailingSlash, prefix))
  );
}

export function isScannerUserAgent(userAgent: string | null): boolean {
  if (!userAgent) {
    return false;
  }

  return SCANNER_USER_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function assessRequest(input: {
  method: string;
  pathname: string;
  userAgent?: string | null;
}): SecurityDecision {
  const method = input.method.toUpperCase();
  const sensitivePath = isSensitivePath(input.pathname);
  const protectedRoute = isProtectedRoute(input.pathname);
  const nextActionProbe = isNextActionProbe(input.pathname);
  const scannerUserAgent = isScannerUserAgent(input.userAgent ?? null);
  const suspicious =
    sensitivePath || protectedRoute || nextActionProbe || scannerUserAgent;

  if (sensitivePath) {
    return { action: "deny", reason: "sensitive-path", suspicious };
  }

  if (protectedRoute) {
    return { action: "deny", reason: "protected-route", suspicious };
  }

  if (nextActionProbe) {
    return { action: "deny", reason: "next-action-probe", suspicious };
  }

  if (!READ_METHODS.has(method)) {
    return { action: "deny", reason: "unsafe-method", suspicious: true };
  }

  if (!isPublicPath(input.pathname)) {
    return { action: "deny", reason: "unknown-path", suspicious: true };
  }

  if (scannerUserAgent) {
    return { action: "allow", reason: "scanner-user-agent", suspicious };
  }

  return { action: "allow", suspicious };
}
