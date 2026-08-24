import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/winter-trip-2026',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
