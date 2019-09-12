vue

1. 准备工作
   1. 认识 flow
      Flow（https://flow.org/en/docs/getting-started/） 是 facebook 出品的 JavaScript 静态类型检查工具。Vue.js 的源码利用了 Flow 做了静态类型检查。
      1. 为什么用 Flow
      2. Flow 的工作方式
      3. Flow 在 Vue.js 源码中的应用
         1. libdef
            有时候我们想引用第三方库，或者自定义一些类型，但 Flow 并不认识，因此检查的时候会报错。为了解决这类问题，Flow 提出了一个 libdef 的概念，可以用来识别这些第三方库或者是自定义类型，而 Vue.js 也利用了这一特性。
         2. declare 关键字（扩展内容）
   2. vue.js 源码目录设计
      重点说 src
      1. compiler
      2. core
      3. platform
      4. server
      5. sfc
      6. shared
   3. vue.js 源码构建
      1. webapck 和 rollup 差别，为什么 vue 选择 rollup 构建？
         webpack 功能更强大，除了 js 还支持图片其他文件，而 rollup 更纯粹，也更轻量。
