import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH ?? '/winter-trip-2026',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
