import type { NextConfig } from "next";
import { getSecurityHeaders } from "./src/lib/security-headers";

const canonicalOrigin = "https://www.defitriangle.xyz";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: getSecurityHeaders(process.env.NODE_ENV === "development"),
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "defitriangle.xyz",
          },
        ],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
