/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['media.graphassets.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    BLOG_NAME: process.env.NEXT_PUBLIC_BLOG_NAME,
    API_URI: process.env.NEXT_PUBLIC_API_URI,
    HOMEPAGE_MENU: process.env.NEXT_PUBLIC_HOMEPAGE_MENU,
    GEOLOCATION: process.env.NEXT_PUBLIC_GEOLOCATION,
    BACKEND_ACCESS_TOKEN: process.env.BACKEND_ACCESS_TOKEN ,
    MAIN_WEBSITE: process.env.NEXT_MAIN_WEBSITE_DOMAIN
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // productionBrowserSourceMaps: true,
}
