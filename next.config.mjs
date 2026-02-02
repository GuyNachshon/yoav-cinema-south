import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/assets/tickers/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: process.env.NODE_ENV === "development"
              ? "no-cache, no-store, must-revalidate"
              : "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
