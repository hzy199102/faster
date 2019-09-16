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
      2. 路径拼接小知识
         var path = require("path") //引入 node 的 path 模块
         path.resolve('/foo/bar', './baz') // returns '/foo/bar/baz'
         path.resolve('/foo/bar', 'baz') // returns '/foo/bar/baz'
         path.resolve('/foo/bar', '/baz') // returns '/baz'
         path.resolve('/foo/bar', '../baz') // returns '/foo/baz'
         path.resolve('home','/foo/bar', '../baz') // returns '/foo/baz'
         path.resolve('home','./foo/bar', '../baz') // returns '/home/foo/baz'
         path.resolve('home','foo/bar', '../baz') // returns '/home/foo/baz'
         // \_\_dirname 总是指向被执行 js 文件的绝对路径
      3. package.json,build 构建调研

         1. scripts/config，resolve 方法存在的意义？
            路径非常长，如果写全要花费大量代码，另外统一修改也变得繁琐，引入 aliases，相当于路径的公用部分（静态变量），最后才是实际的文件名，这样第一看上去更简洁，第二修正起来也方便。
            这是个非常巧妙的读取文件方式，以后的代码中要时长运用。
         2. format: 'cjs',format: 'es',format: 'umd',编译成不同的 js 风格，那么这些风格的区别是什么呢？
         3. config.js 的作用？
            就是把一些基本配置项经过一些映射转换成 rollup 支持的配置结构
         4. package.json 的命令可以传递一些参数，process.argv[2]可以读取到这些参数，并且根据他们过滤 config 的一些配置，注意里面的关键代码：
            const filters = process.argv[2].split(',')
            builds = builds.filter(b => {
            return filters.some(f => b.output.file.indexOf(f) > -1 || b.\_name.indexOf(f) > -1)
            })
         5. 根据 build 命令处理完参数之后就要进行构建，那么构建需要注意三点：
            1. 因为是多文件构建，所以要按顺序一个个来，build.js 的 build 方法就是队列处理
            2. build 采用 rollup，其中可能有文件需要进行压缩的操作，使用 terser
            3. rollup 之后需要把 code 输出到指定目录文件中，这里可以加入一些日志，甚至是美化的输出日志，或者其他。
         6. Runtime Only VS Runtime+Compiler（重点）
            通常我们利用 vue-cli 去初始化我们的 Vue.js 项目的时候会询问我们用 Runtime Only 版本的还是 Runtime+Compiler 版本。下面我们来对比这两个版本。
            • Runtime Only
            我们在使用 Runtime Only 版本的 Vue.js 的时候，通常需要借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript，因为是在编译阶段做的，所以它只包含运行时的 Vue.js 代码，因此代码体积也会更轻量。
            • Runtime+Compiler
            我们如果没有对代码做预编译，但又使用了 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板，如下所示：
            // 需要编译器的版本
            new Vue({
            template: '<div>{{ hi }}</div>'
            })

            // 这种情况不需要
            new Vue({
            render (h) {
            return h('div', this.hi)
            }
            })
            因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。
            很显然，这个编译过程对性能会有一定损耗，所以通常我们更推荐使用 Runtime-Only 的 Vue.js。
            这里有个问题，什么是预编译，编译和运行都做了些什么？（非常重要的知识点）

      4. 从入口开始
         import vue 的时候我们都做了什么事情去完成 vue 的初始化操作
         我们来分析 Runtime + Compiler 构建出来的 Vue.js，它的入口是 src/platforms/web/entry-runtime-with-compiler.js：
         层层往上找会找到 import Vue from './instance/index'，这里看到 vue 是个 function，而不是个 class，这里有个判断 vue 必须进行 new 的实例化。
         每一个 mixin 都会往 vue 的原型是混入一些方法
         1. 为什么是 function 而不是 class，或者说用 es5 而不是 es6 去实现 vue 呢？
            因为 es6 要实现 mixin 的效果会比较难写，而 es5 可以把 vue 原型上的方法拆分到不同文件下去管理
         2. vue 除了挂载原型方法，还会挂载全局方法，全局方法的挂载是在 global-api/index，其实就是 vue 的静态属性
            defineProperty 是关键，initUse，initMixin，initExtend 等等的实现很有深入的必要。
         3. 总结 vue 的初始化过程
            1. 在 instance/index 里找到 vue 的定义，通过 minxin 去挂载原型方法
            2. 在 core/index 里找到 initGlobalAPI，给 vue 挂载静态方法

2. 数据驱动
   1. new Vue 发生了什么
      当我们在 vue 的 template 中定义一个变量{{message}}的时候，vue 是怎么把它渲染到 html 中的？
      1. vue 是个 function 实现的 class，所以执行 new Vue 的时候先进入 instance/index，执行 this.\_init(options)
      2. Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等。
      3. 为什么 options 的 data 中的属性，可以通过 this.属性的方式获取呢？
         1. instance/index 执行的\_init 方法来自 init.js,里面调用了 state.js 中 initState 方法中调用 initData 方法（有点拗口）
         2. initData 首先希望 data 参数是个方法，为什么？闭包！（重点），接着检查不要和 methods 和 props 中的属性名重复了，因为这些属性最终都会通过 this.属性的方式被使用，
            接着就是关键的 proxy(vm, `_data`, key)，就是代理，其实 this.\_data.属性才能获取值，但是通过代理，具体就是 Object.defineProperty 的 get 和 set，成功让 this.属性
            也能获取值，最后就是 toggleObserving，数据监听，这个暂时不研究。
      4. 这里涉及到 1.3.3.6 Runtime Only VS Runtime+Compiler（重点）的知识点，如果在 vue-cli 构建项目，想要 debugger 源码，就应该选择 Runtime+Compiler，这样配置文件
         build/webpack.base.conf.js 中就会出现
         alias: {'vue': 'vue/dist/vue.esm.js'}，也就是说 import vue 的时候，就会引入可以断点的非压缩源码。
         当时在 vue3.0 中，已经没有这样的选择，直接配置 alias 就是了，不过项目体积会大 30%，而且这个配置是很有技巧的，需要在根路径加入 vue.config.js，输入如下代码：
         const path = require("path");
         function resolve(dir) {
         return path.join(\_\_dirname, dir);
         }
         module.exports = {
         lintOnSave: true,
         chainWebpack: config => {
         config.resolve.alias
         .set("vueesm", resolve("node_modules/vue/dist/vue.esm.js"))
         }
         };
         查找 node_modules 中 vue 的 package.json,看"module": "dist/vue.runtime.esm.js",说明 vue 使用的是这个入口，但是我们配置了 alias，然后引用 import vue from 'vueesm';
         那么就可以在这个入口观察 vue 了。
