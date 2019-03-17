const path = require("path");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: "",
    entry: {
      index: './src/index.tsx',
    },
    devtool: "inline-source-map",
    mode: "production",
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          use: [
            'ts-loader',
            'source-map-loader',
          ]
        },
        {
          test: /\.(less|css)$/,
          use: [
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
      extensions: [".tsx", ".ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin(),
      ]
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
    },
};