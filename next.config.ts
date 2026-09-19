import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 2,
    imgOptConcurrency: 1,
    turbopackPluginRuntimeStrategy: "workerThreads",
  },
};

export default nextConfig;
