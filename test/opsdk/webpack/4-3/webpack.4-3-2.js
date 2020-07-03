const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const prefix = "4-3/";

module.exports = {
  // JS 执行入口文件
  entry: {
    main: `./${prefix}main.js`
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "[name].js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader?cacheDirectory"],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader"]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: `[name].css`
    })
  ],
  devtool: "source-map" // 输出 source-map 方便直接调试 ES6 源码
};
