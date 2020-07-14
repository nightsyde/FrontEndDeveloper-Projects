const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ".\\src\\client\\index.js",
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     quiet: true,
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },

    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: ".\\src\\client\\views\\index.html",
    }),
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    }),
    // new BundleAnalyzerPlugin(),

  ]
}
