const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '9000'

const config = {
  mode: 'development',
  entry: {
    app: './src/index.tsx',
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [],
  },
  devServer: {
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = merge(baseConfig, config)