const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const config = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'source-map',
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'React Mobx Starter',
      inject: 'body',
    })
  ]
}

module.exports = merge(baseConfig, config)
