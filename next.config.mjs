/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  images: {
    // AVIF first, WebP next: both beat the original PNG by an order of magnitude,
    // and the optimizer caches each width for 30 days.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [56, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // Import only the icons that are used instead of walking the whole package
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        // Hashed build output never changes, so let it live in the browser cache
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
