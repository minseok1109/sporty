// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

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
    removeConsole: process.env.NODE_ENV === "production",
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/(^/api/(?!auth/).*$)/",
  //       destination:
  //         process.env.NODE_ENV === "production"
  //           ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/:path*`
  //           : "http://127.0.0.1:8000/:path*",
  //     },
  //   ];
  // },
});

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true },
);
