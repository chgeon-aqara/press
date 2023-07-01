/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [options.defaultLoaders.babel],
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '../../lib')
      ]
    })
    return config
  },
}
