const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: `monitor-client${isProd ? '.min' : ''}.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['env'] } }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false, },
      compress: { warnings: false }
    })
  ] : []
}
module.exports = config;