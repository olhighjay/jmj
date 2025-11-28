import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Allow all image formats
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
