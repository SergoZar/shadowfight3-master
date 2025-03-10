/**
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  output: 'export',
  distDir: 'out',
  //basePath: "shadowfight3-master",
  //assetPrefix: "./",
  basePath: '/shadowfight3-master',
  assetPrefix: '/shadowfight3-master',
 images: { unoptimized: true }
}
module.exports = nextConfig
