const { readFileSync } = require('fs')
const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')

const license = readFileSync('./LICENSE')

module.exports = function() {
  return Merge(CommonConfig, {
    output: {
      filename: '[name].[chunkhash].js'
    },
    devtool: 'hidden-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          warnings: false,
          collapse_vars: true,
          reduce_vars: true,
          screw_ie8: true
        },
        comments: false,
        sourceMap: true
      }),

      new OptimizeCssAssetsPlugin(),

      new ManifestPlugin({ basePath: '/' }),

      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest'
      }),

      new ExtractTextPlugin({ filename: 'index.[chunkhash].css', allChunks: true }),

      new webpack.BannerPlugin({ banner: license.toString() })
      // Add license to all css,js files
    ]
  })
}
