import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Server-side: how long Next avoids re-fetching/re-optimizing from the
    // source (Google Drive/Cloudinary). Paired with the no-cache header below
    // so the *browser* still revalidates on every load (incl. plain Ctrl+R,
    // not just a hard refresh) — a fast 304 if nothing changed within this
    // window, a real re-fetch once it has.
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        // Forces the browser to revalidate with the server on every load
        // (plain Ctrl+R included, not just a hard refresh) instead of trusting
        // a max-age blindly. Still fast: if the image hasn't changed within
        // minimumCacheTTL, the server just answers 304 and no bytes are
        // re-downloaded — only an actual change triggers a real re-fetch.
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, must-revalidate',
          },
        ],
      },
      // Removed the old blanket no-store rules for /api/team, the activity
      // API routes, and /team — they were overriding the route-level
      // Cache-Control that now enables the 60s ISR caching above.
    ];
  },
};

export default nextConfig;
