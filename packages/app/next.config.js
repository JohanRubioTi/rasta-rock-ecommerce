const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts',
          publicPath: '/_next/static/fonts',
        },
      },
    })
    return config
  },
}

module.exports = withPlugins(
  [
    withFonts,
    withExpo,
    // Add other plugins here
  ],
  nextConfig
)
