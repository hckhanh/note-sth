const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function() {
  return Merge(CommonConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {}
      }),

      new ExtractTextPlugin('index.css')
    ]
  })
}
