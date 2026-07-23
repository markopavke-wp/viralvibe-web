import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Direct /public URLs — avoids Vercel Image Optimization responses
  // that can break display in some browsers (Content-Disposition: attachment).
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
