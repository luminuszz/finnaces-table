/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([
  [withBundleAnalyzer({})],
  withImages,
  {
    trailingSlash: true,

    reactStrictMode: true,

    typescript: {
      ignoreBuildErrors: true,
    },
  },
]);
