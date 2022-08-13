/** @type {import('next').NextConfig} */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');

const moduleExports = {
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


const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};


// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
