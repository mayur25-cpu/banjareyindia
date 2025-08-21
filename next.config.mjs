/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 important for static export
  images: {
    unoptimized: true, // 👈 required, since GitHub Pages doesn’t support Next.js Image optimization
  },
  basePath: "/banjareyindia", // 👈 repo name
  assetPrefix: "/banjareyindia/",
};

module.exports = nextConfig;
