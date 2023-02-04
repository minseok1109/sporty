/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://localhost:8000/accounts/token",
      },
    ];
  },
};
