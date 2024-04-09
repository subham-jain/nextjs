/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/user/profile:path*",
        destination: "/profile?view=order-history",
      },
      {
        source: "/user/checkout:path*",
        destination: "/checkout?view=address",
      },
      {
        source: "/customer/order-status/:id",
        destination: "/order-status/:id",
      },
      {
        source: "/customer/address",
        destination: "/checkout?view=address",
      },
      {
        source: "/customer/cart",
        destination: "/checkout?view=cart",
      },
      {
        source: "/customer/cart-summary",
        destination: "/checkout?view=slot",
      },
      {
        source: "/customer/payments",
        destination: "/checkout?view=payment",
      },
      {
        source: "/how-hogbucks-works-app",
        destination: "/licious-cash",
      },
      {
        source: "/refer-earn-tnc",
        destination: "/refer/tc",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.licious.in",
      },
      {
        protocol: "https",
        hostname: "assets.licious.in",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
