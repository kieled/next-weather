/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }
}

module.exports = nextConfig
