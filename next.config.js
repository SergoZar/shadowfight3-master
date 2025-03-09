/**
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  // basePath: "",
  assetPrefix: "./",
  images: { unoptimized: true }
}
module.exports = nextConfig