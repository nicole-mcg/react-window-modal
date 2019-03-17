const path = require("path");
const fs = require("fs")

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: "",
  entry: {
    index: './src/index.tsx',
  },
  target: 'web',
  devtool: "inline-source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          'ts-loader',
          'source-map-loader',
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true
            }
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin(),
    ]
  },
  output: {
    library: "WindowModal",
    libraryExport: "WindowModal",
    libraryTarget: 'umd',
    auxiliaryComment: 'Test Comment',
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};