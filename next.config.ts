import type { NextConfig } from "next";

// Real protection lives on the server; these headers stop other sites from
// framing the pages, sniffing content types, or using device features.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Never ship readable source to the browser.
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compiler: {
    // Strip console.log/info/debug from production bundles; keep errors.
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  experimental: {
    cpus: 2,
    imgOptConcurrency: 1,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default nextConfig;
