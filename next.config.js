const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

module.exports = withCSS(
  withFonts(
    withImages(
      withSass({
        webpack: config => {
          config.plugins.push(new webpack.EnvironmentPlugin(process.env));
          return config;
        },
      }),
    ),
  ),
);
