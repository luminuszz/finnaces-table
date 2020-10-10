/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');

module.exports = withPlugins([
  [withBundleAnalyzer({})],
  withImages,
  withSass,
  {
    trailingSlash: true,

    reactStrictMode: true,

    typescript: {
      ignoreBuildErrors: true,
    },

    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ];
    },
  },
]);
