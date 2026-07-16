import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // API requests are proxied via the catch-all route at /app/api/[...path]/route.ts
  // which properly forwards Set-Cookie headers (unlike next.config.ts rewrites).
};

export default nextConfig;
