import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Cho phép build pass dù có TypeScript error (dùng cho demo deploy)
    ignoreBuildErrors: true,
  },
  devIndicators: false,
  // Gzip/Brotli compression for all responses
  compress: true,
  // Remove X-Powered-By header (minor security improvement)
  poweredByHeader: false,
  images: {
    // WebP only — AVIF encoding takes 4-5s cold (too slow for LCP)
    formats: ['image/webp'],
    qualities: [75, 80, 85, 90, 92, 94, 95, 96, 100],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Ngăn NFT bundle các file nặng vào serverless function (Next.js 15+ stable)
  outputFileTracingExcludes: {
    '**': [
      './public/**',
      './mobile-ss-ver2/**',
      './docs/**',
      './_extracted_new/**',
      './_mobile_extract/**',
      './src_extracted/**',
      './base/**',
      './halong-cruise-wp/**',
    ],
  },
  async headers() {
    // In development avoid setting long-lived immutable Cache-Control for Next static chunks
    // as it can cause stale module/chunk issues with the dev server and HMR.
    const securityHeaders = {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' }
      ]
    };

    const cssAndImageCacheHeader = {
      // Cache CSS and image assets for 30 minutes (1800 seconds)
      source: '/(:path*\\.(?:css|png|jpg|jpeg|svg|webp|avif|gif))',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=1800' }
      ]
    };

    if (process.env.NODE_ENV !== 'production') {
      // Let Next dev server manage cache headers for /_next/static to keep Turbopack stable,
      // but explicitly apply the requested 30-minute caching rule for CSS and images.
      return [
        cssAndImageCacheHeader,
        securityHeaders
      ];
    }

    // Hero LCP image preload — HTTP Link header được gửi cùng 200 response headers,
    // trước khi HTML body được parse. Tách thành 2 entry riêng (desktop 1920w + mobile 828w)
    // để tránh comma conflict khi dùng imagesrcset inline.
    const heroImagePath = '%2Fimages%2Fhero%2Fvietnam-hanoi-temple-of-literature-4k.jpg';
    const heroBase = `/_next/image?url=${heroImagePath}`;
    // Preload cả 2 breakpoint phổ biến nhất — browser sẽ dùng version phù hợp từ <img srcset>
    // 2 link directives trong 1 header: desktop (≥1024px) dùng 1920w, mobile (<1024px) dùng 828w.
    // Comma giữa 2 directives là RFC 8288 hợp lệ; media query không chứa comma → parse OK.
    // Browser chọn đúng kích thước theo viewport → desktop 417KB, mobile ~80KB.
    const heroLinkHeader = [
      `<${heroBase}&w=1920&q=75>; rel=preload; as=image; fetchpriority=high; media="(min-width: 1024px)"`,
      `<${heroBase}&w=828&q=75>; rel=preload; as=image; fetchpriority=high; media="(max-width: 1023px)"`
    ].join(', ');
    const heroPreloadHeader = {
      // Home page (tất cả locale): /, /vi, /zh, /zh-tw, /ko, /ja, /de, /fr, /es, /it, /pt, /ru, /en
      source: '/:locale(|vi|zh|zh\\-tw|ko|ja|de|fr|es|it|pt|ru|en)',
      headers: [{ key: 'Link', value: heroLinkHeader }]
    };

    return [
      heroPreloadHeader,
      {
        // Cache static font and icon assets in /public for 1 year
        source: '/(:path*\\.(?:woff2|woff|ttf|otf|eot|ico))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      cssAndImageCacheHeader,
      {
        // Cache Next.js static chunks for 1 year
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      securityHeaders
    ];
  }
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
