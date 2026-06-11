type Header = {
  key: string;
  value: string;
};

function compactCsp(value: string): string {
  return value.replace(/\s{2,}/g, " ").trim();
}

export function createContentSecurityPolicy(isDev = false): string {
  return compactCsp(`
    default-src 'self';
    base-uri 'self';
    object-src 'none';
    frame-ancestors 'none';
    form-action 'self';
    img-src 'self' data: blob:;
    font-src 'self' data:;
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
    connect-src 'self'${isDev ? " ws: wss:" : ""};
    manifest-src 'self';
    worker-src 'self' blob:;
    upgrade-insecure-requests;
  `);
}

export function getSecurityHeaders(isDev = false): Header[] {
  return [
    {
      key: "Content-Security-Policy",
      value: createContentSecurityPolicy(isDev),
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    },
    {
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin",
    },
    {
      key: "Cross-Origin-Resource-Policy",
      value: "same-origin",
    },
  ];
}
