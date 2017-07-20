var webpack = require('webpack')
var path = require('path')

var config = {
    entry: __dirname + '/lib/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'es2016', 'es2017']
                }
             },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        })
    ]
}
module.exports = config