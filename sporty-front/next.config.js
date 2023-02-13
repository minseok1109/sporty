/**
 * @type {import('next').NextConfig}
 */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:8000/accounts/token",
      },
    ];
  },
});
