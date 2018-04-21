const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.js')('prod')
const path = require('path')

module.exports = webpackMerge(commonConfig, {

  mode: 'production',

  output: {
    path: path.join(process.cwd(), '../../dist/api/static/'),
    filename: '[name].[hash:6].js',
  },

  plugins: [
    new CleanWebpackPlugin(['dist/api/static'], {
      root: path.join(__dirname, '../../'),
      verbose: true,
      dry: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('prod'),
      },
    }),
  ],

})
