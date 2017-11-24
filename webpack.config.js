const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: __dirname + '/src/index.js',
  devtool: isProd ? 'source-map' : 'cheap-source-map',
  output: {
    path: __dirname + '/dist',
    filename: `monitor-client${isProd ? '.min' : ''}.js`,
    libraryTarget: 'umd',
    library: 'WebMonitor',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['env'] } }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: { comments: false, },
      compress: { warnings: false }
    })
  ] : [],
  devServer: {
    host: 'localhost',
    port: 7777,
    open: true
  }
}
module.exports = config;
