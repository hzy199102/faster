const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = env => {
  console.log(env);
  return {
    entry: {
      polyfills: "./src/polyfills.js",
      index: "./src/index.js"
    },
    module: {
      rules: [
        // {
        //   test: require.resolve("./src/index.js"),
        //   use: "imports-loader?this=>window"
        // },
        {
          test: require.resolve("./src/globals.js"),
          use: "exports-loader?file,parse=helpers.parse"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        title: "Progressive Web Application"
      }),
      new webpack.ProvidePlugin({
        // _: "lodash-es"
        _join: ["lodash-es/join", "default"]
      }),
      new WorkboxPlugin.GenerateSW({
        // 这些选项帮助 ServiceWorkers 快速启用
        // 不允许遗留任何“旧的” ServiceWorkers
        clientsClaim: true,
        skipWaiting: true
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // test: /[\\/]node_modules[\\/][^(?=(babel-polyfill|whatwg-fetch))][\\/]/,
            // test: /[\\/]node_modules[\\/](?!(lodash))/,
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            // chunks: "all"
            chunks(chunk) {
              // 排除名字为`polyfills`的模块。
              return chunk.name !== "polyfills";
            }
          }
        }
      }
    },
    output: {
      // filename: "[name].[chunkhash].js",
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    }
    // The 'mode' option has not been set, webpack will fallback to 'production' for this value
    // mode: "development"
  };
};
