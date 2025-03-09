/**
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  output: 'export',
  distDir: 'out',
  // basePath: "",
  assetPrefix: "./",
  images: { unoptimized: true }
}
module.exports = nextConfig