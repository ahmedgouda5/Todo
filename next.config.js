/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true, // 👈 دي لازم تتكتب
  },
};

module.exports = nextConfig;
