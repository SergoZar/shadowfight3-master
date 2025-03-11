/**
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  distDir: 'out',
  basePath: "/shadowfight3-master",
  // assetPrefix: "",
  images: { unoptimized: true }
}
module.exports = nextConfig