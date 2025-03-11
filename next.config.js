/**
 * @type {import('next').NextConfig}
 */
 
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: "/shadowfight3-master",
  // assetPrefix: "./",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true }
}
module.exports = nextConfig