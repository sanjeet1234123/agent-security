import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  output: "standalone",
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || "development",
  },
};

export default nextConfig;
