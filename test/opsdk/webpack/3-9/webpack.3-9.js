const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({
  // 因为webpack4.x包含了contentash这个关键字段，所以在ExtractPlugin中不能使用contenthash
  // 使用md5:contenthash:hex:8替代
  // 官网：https://www.webpackjs.com/plugins/extract-text-webpack-plugin/ 有描述，但是不详细，要仔细分析
  // https://blog.csdn.net/shenzhen_zsw/article/details/97943217
  // 给输出的 CSS 文件名称加上 hash 值
  // filename: `[name]_[contenthash].css`,
  filename: `[name]_[md5:contenthash:hex:8].css`,
});
const DefinePlugin = require("webpack/lib/DefinePlugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const prefix = "3-9/";

module.exports = {
  entry: {
    app: `./${prefix}main.js`, // Chunk app 的 JS 执行入口文件
    polyfills: `./${prefix}polyfills.js`,
    google_analytics: `./${prefix}google_analytics.js`,
  },
  output: {
    // filename: "[name]_[chunkhash:8].js", // 给输出的文件名称加上 hash 值
    filename: (obj) => {
      // console.log(obj.chunk.name);
      if (obj.chunk.name === "polyfills") {
        return `polyfills.bundle.js`;
      } else {
        return `[name]_[chunkhash:8].js`;
      }
    },
    path: path.resolve(__dirname, `./dist`),
  },
  module: {
    rules: [
      {
        test: require.resolve(`./globals2.js`),
        use: "exports-loader?file,parse=helpers.parse",
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         babelrc: false,
      //         babelrcRoots: [
      //           // Keep the root as a root
      //           ".",
      //           // Also consider monorepo packages "root" and load their .babelrc files.
      //           "./3-9/*",
      //         ],
      //         extends: "3-9/.babelrc",
      //       },
      //     },
      //   ],
      //   // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
      //   exclude: path.resolve(__dirname, "node_modules"),
      // },
      {
        test: /\.css/, // 增加对 CSS 文件的支持
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: extractCSS.extract({
          //   fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                // minimize: true,
                sourceMap: true,
              },
            },
          ], // 压缩 CSS 代码
        }),
      },
    ],
  },
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
          },
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      // _: "lodash-es"
      _join: ["lodash-es/join", "default"],
    }),
    // 使用本文的主角 HTMLWebpackPlugin，一个 HTMLWebpackPlugin 对应一个 HTML 文件
    new HTMLWebpackPlugin({
      // inlineSource: ".(js|css)$", // 内联所有 javascript、css。注意：此处正则应在末尾增加一个$，但是掘金的代码解析有问题……
      title: "hzy",
      template: `./${prefix}template.html`, // HTML 模版文件所在的文件路径
      filename: "index.html", // 输出的 HTML 的文件名称
      excludeChunks: ["polyfills"],
    }),
    // new HtmlWebpackInlineSourcePlugin(),
    extractCSS,
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
      canPrint: true, //是否将插件信息打印到控制台
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
