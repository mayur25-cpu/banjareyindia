/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // since GitHub Pages only supports static export
  basePath: "/banjareyindia", // your repo name
  assetPrefix: "/banjareyindia/",
  images: {
    unoptimized: true, // because static export disables Next Image optimization
  },
};

export default nextConfig;
