vue

0. 跳过的需要看文档的内容

   1. performance， mark
      这个是 vue 在卡顿的情况下进行性能分析的操作。

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

1. 数据驱动

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
         根据 scripts/build.js 中的 config.js，确认 vue.runtime.esm.js 的入口文件是 web/entry-runtime.js，而 vue.esm.js 的入口文件是 web/entry-runtime-with-compiler.js，所以我们后期看的文件是 entry-runtime-with-compiler.js
   2. Vue 实例挂载的实现
      1. \$mount 的具体实现
         1. 找到 el，并且它不能是 html 或者 body，因为它会替换里面的内容，即替换 html 或者 body
         2. 使用 entry-runtime-with-compiler.js，则即使没有在 vue 的初始化时传入 options.render，也没关系，它会编译，因为它重写了$mount，加入了没有 render 时候对 template 的编译转换成 render 的操作，
            但是 entry-runtime.js 的\$mount 则必须制定 render 函数，这就是 1.3.3.6 二者的具体区别表现形式！
         3. 接着它会调用 runtime/index.js 的\$mount，相当于复用，核心是 core/instance/lifecycle.js 的 mountComponent，它先判断 render 函数是否存在，接着声明 updateComponent 函数，
            updateComponent = () => {vm.\_update(vm.\_render(), hydrating)}，\_render 会生成 vnode，接着\_update 会进行 vnode 挂载，这个函数会作为 observer/Watcher 类的初始化参数，
            （注意 watcher 有很多种，这个是 isRenderWatcher，渲染 watcher！），被定义到 watcher.getter 中，并且会在初始化时候就被执行一次，这样就实现了真实渲染，除了首次渲染，之后更新数据的时候，还会执行 updateComponent 函数。
   3. \_render 方法的实现
      1. \_render 是 vue 原型方法，在 instance/index.js 中通过 renderMixin(Vue)绑定，实际实现在 core/instance/render.js
      2. \_render 中 vm.\$createElement 是在 initRender 方法中实现，而 initRender 方法是在 instance/index.js 中通过 initMixin(Vue)去调用实现的
      3. initRender 方法 vm.\_c 和 vm.$createElement的区别？
         一个是模板编译render，一个是手写render,这个在2.5 createElement 方法会提到
         _render方法中对render的执行：vnode = render.call(vm._renderProxy, vm.$createElement)；
         说明 options.render 函数接受的参数只有 vm.$createElement方法（vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)）,这里的 createElement 来自 vdom/create-element，会生成一个 vnode，在 demo 中我简单的传入了 tag，data,children 去测试了 render 函数，我发现如果使用 render 函数而非 template，那么就少了替换模板内容的过程，如果在 initdata 进行断点，会发现 template 会先出现模板内容，在 updateComponent 的时候替换成实际内容，而 render 函数是直接呈现实际内容的。
      4. \_renderProxy 是什么?
         \_renderProxy 同 2.3.2，也是通过 initMixin(Vue)去调用实现的，在 core/instance/init.js 中，这里的 initProxy 方法涉及到 es6 的 Proxy（知识点），对象访问的劫持。
         如果浏览器支持 Proxy，那么在开发环境会创建一个相关对象，目的是：如果请求了未定义的属性，会出现错误警告，比如 data 中定义了 message，但是 template 中使用的是 message2，那么对象访问劫持，就会判断出这个属性未被定义，就出现相应警告。
      5. 总结起来\_render 方法就是为了生成 vnode
   4. Virtual DOM
      真正的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。当我们频繁的去做 DOM 更新，会产生一定的性能问题。而 Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多。
      vue 没有基于 react，而是基于 snabbdom（https://github.com/snabbdom/snabbdom）
   5. createElement 方法的实现

      1. createElement 来自 vdom/create-element
      2. createElement 首先进行参数处理，因为是数组参数，而非对象参数，所以一旦漏传中间参数处理起来就很麻烦，所以专门加入一些形参处理，中间有参数漏传，则后面的参数依次补上
      3. children 的一位数组化处理：normalizeChildren 和 simpleNormalizeChildren
         由于 Virtual DOM 实际上是一个树状结构，每一个 VNode 可能会有若干个子节点，这些子节点应该也是 VNode 的类型。\_createElement 接收的第 4 个参数 children 是任意类型的，因此我们需要把它们规范成 VNode 类型。
         simpleNormalizeChildren 方法调用场景是 render 函数当函数是编译生成的。理论上编译生成的 children 都已经是 VNode 类型的，但这里有一个例外，就是 functional component 函数式组件返回的是一个数组而不是一个根节点，所以会通过 Array.prototype.concat 方法把整个 children 数组打平，让它的深度只有一层。
         normalizeChildren 方法的调用场景有 2 种，一个场景是 render 函数是用户手写的，当 children 只有一个节点的时候，Vue.js 从接口层面允许用户把 children 写成基础类型用来创建单个简单的文本节点，这种情况会调用 createTextVNode 创建一个文本节点的 VNode；另一个场景是当编译 slot、v-for 的时候会产生嵌套数组的情况，会调用 normalizeArrayChildren 方法，

         这就是 vm.\_c 和 vm.$createElement的区别，vm.\_c是模板编译render，所以children已经被自动转为最多2层的数组，可以直接使用Array.prototype.concat.apply([], children)进行一维数组化操作，即使这样，vue也做了优化，必须Array.isArray(children[i])，才进行这样的操作。而vm.$createElement 是手写 render，vue 不确认它是几层，所以要 normalizeArrayChildren 进行更加复杂的操作去进行一维数组化操作，这里有 2 个知识点，第一：递归，在存在 children，是多层的情况下，第二：如果 2 个紧挨的元素，特别是父节点和子节点的第一个元素都是 textnode 的情况下，要进行合并，这是性能优化的细节。

      4. 创建 vnode，tag 可以是 string，包括 html 原生标签，也可以是 component 组件，但无论如何，它会以不同的 tag 情况，创建对应的 vode，然后返回 vnode，这样\_render 就生成了 vnode。

   6. update
      非常复杂，必须 debugger 看一遍过程

      1. [_update] 来自 [core/instance/lifecycle]，在初始化和数据改变 2 种情况下会被调用。
      2. [_update]的核心方法是[__patch__]，它被定义在[platforms/web/runtime/pacth.js]，通过[core/vdom/patch.js]下的[createPatchFunction]方法返回 function 初始化
         [export const patch: Function = createPatchFunction({ nodeOps, modules })]，有点像 react 的高阶函数。[nodeOps]都是 web 实际 dom 操作的方法，
      3. 实际的[patch]方法，核心参数 4 个，[oldVnode, vnode, hydrating, removeOnly]，调用如下：[vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)]
         会把真实的[el]转变成[vnode]，而且真实的[el]会挂载在[vnode.elm]上，通过代码[new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)]实现，
         因为[el]在初始化的时候一定是真实的 dom 元素，而在数据更新的时候才会使用[vnode],接着会调用[createElm]方法，作用是把[vnode]挂载在真实的[dom]上，核心 4 个参数，[vnode,insertedVnodeQueue,
         parentElm,refElm,]，分别对应[vnode]，空的数组，[el]的父节点（比如 div 的父节点 body），[nodeOps.nextSibling(oldElm)]，
         （这里为什么要传入[el]的父节点以及[el]的下一个兄弟节点呢？
         其实是为了在真实 dom 插入的时候准确定位插入的位置，如果[el]已经是父节点的最后一个节点，直接插入，如果后面还有兄弟节点，一定要插入在兄弟节点的前面！）
         [createElm]会对[tag]做检测，看是否合法，有时候组件没被注册这里就会提示错误，
         接着会生成[vnode]的[vnode.elm]，就是[vnode]的真实 dom，这个就是要真实挂载的 dom，
         接着会找到[vnode]下的[children]，递归执行[createElm]，但是切记，从里往外插入，最终才是把[vnode]的真实节点进行挂载。
      4. 因为新创建了一个 dom 并且进行了挂载，那就必须把原来的 dom 元素删除。当然这个是经过[isDef]判断的，否则可能只是单纯修正原来 dom 的值，不会做这个替换操作。
      5. 在[platforms/web/entry-runtime-with-compiler.js]中重定义[$mount]，这时候会确认[el]，以及将[template]转成[render]，接着[mount.call(this, el, hydrating)]会调用原始的[$mount]，
         而它被定义在[platforms/web/runtime/index.js]中，这里会确认[__patch__]
         （patch 是平台相关的，在 Web 和 Weex 环境，它们把虚拟 DOM 映射到 “平台 DOM” 的方法是不同的，并且对 “DOM” 包括的属性模块创建和更新也不尽相同。因此每个平台都有各自的 nodeOps 和 modules，
         它们的代码需要托管在 src/platforms 这个大目录下。而不同平台的 patch 的主要逻辑部分是相同的，所以这部分公共的部分托管在 core 这个大目录下。差异化部分只需要通过参数来区别，
         这里用到了一个函数柯里化的技巧，通过 createPatchFunction 把差异化参数提前固化，这样不用每次调用 patch 的时候都传递 nodeOps 和 modules 了，利用闭包的方法让 patch 实现了对 nodeOps 和 modules 的持有，
         这种编程技巧也非常值得学习。），
         在[$mount]中会调用定义在[core/instance/lifecycle.js]的[mountComponent]方法，它会[el]绑定[vm.$el = el]，并且生成[updateComponent]函数
         [updateComponent = () => { vm._update(vm._render(), hydrating) }]，将它作为参数传入[Watcher]，这样就实现了在初始化和数据改变 2 种情况下会被调用（watch 在 2.1.2.3 有详细介绍），[_update]
      6. [_update]核心是[__patch__]，用到了函数柯里化，会在初始化的时候将真实的[el]（也成为挂载节点）转成[vnode]，并将[_render]转换出的[vnode]调用[createElm]方法进行真实 dom 的生成，
         这里还会处理他的 children，接着挂载，并且经过[isDef]判断，把原来的 dom 元素删除。

   7. 数据驱动总结
      [new vue()] => [init] => [$mount] => [complie] => [render] => [vnode] => [patch] => [DOM]

1. 组件化
   1. 组件化概念
   2. createComponent
      1. [core/vdom/create-element.js]中的[createElement]根据[tag]判断用什么方式创建[vnode]，如果是组件创建，那么使用[core/vdom/create-component.js]中的[createComponent]，
      2. [createComponent]中[const baseCtor = context.$options._base]，首先[core/global-api/index.js]中的[initGlobalAPI]方法调用[Vue.options._base = Vue]，而在[core/instance/init.js]中的[_init]
         方法会将[new Vue(Options)]中的[options]通过[initInternalComponent]方法（它的内部实现比动态枚举快，faster than dynamic enumeration.）合并到[vm.$options]上，所以[baseCtor]就是[Vue]
      3. [Ctor = baseCtor.extend(Ctor)]就是让[Ctor]变成新的构造器，在[core/global-api/extend.js]的[extend]类方法上，首先会对[name](就是vue文件中的name属性)做[validateComponentName]校验，实现是在
         [core/util/options.js]上，主要是不能和 html 标签有冲突，常见的如 header。接着定义[sub]，一个子的构造函数，[Sub.prototype = Object.create(Super.prototype), Sub.prototype.constructor = Sub]，
         经典的原型继承，这样就能使用[Vue]的原型方法，比如[_init]，接着[Sub.options = mergeOptions(Super.options,extendOptions)]，会把组件的参数和[Vue.options]上的做合并
         （注意，这里指的不是[new Vue(Options)]中的[options]！是[Vue]类上本身挂载的[options]），并用[super]指向[Vue]，接着处理下[Sub.options.props]和[Sub.options.computed](##这里面有优化的手段，可深入)
         接着把[Vue]的类方法(静态方法)全部赋值到[sub]上，目的是让[sub]拥有和[Vue]一样的能力，接着缓存下来这个[sub]对象，避免多次执行 Vue.extend 的时候对同一个子组件重复构造。
      4. 创建完构造器之后，异步组件处理，data 处理，比如 options 的重新计算，防止全局 mixin 对其的影响，v-model 的判断，props 处理，函数组件的处理，自定义事件处理，抽象组件处理，这些通通略过
      5. [installComponentHooks]安装组件的钩子，[patch]过程中，执行不同的阶段会处理不同阶段的钩子，[componentVNodeHooks]包括 4 个钩子函数[init],[prepatch],[insert],[destroy],而在与[vnode.data.hook]
         的合并策略是先执行[componentVNodeHooks]的钩子函数，在执行[vnode.data.hook]定义的函数
      6. 实例化[vnode],注意组件实例化成[vnode]传递参数的不同点。组件是没有[children]，但是有[componentOptions]，这里面的[children]一般就是[slot]
      7. 总结起来就是三部分，生成组件构造器，并且继承于[Vue]，有它的原型方法以及类方法，接着安装组件钩子函数，最后实例化 vnode。
   3. 组件 patch
      1. 目标
         1. 了解组件 patch 的整体流程
         2. 了解组件 patch 流程中的 activeInstance,vm.\$vnode,vm.\_vnode
         3. 了解嵌套组件的插入顺序
      2. [core/vdom/patch.js]中的[createElm]的[createComponent(vnode, insertedVnodeQueue, parentElm, refElm)]
   4. 配置合并
      1. 了解外部调用场景的配置合并
      2. 了解组件场景的配置合并
      3. 这里介绍 vue 合并配置（mergeOptions）的流程
         1. 来自 Vue.mixin 的 mergeOptions
            这个可以在 Call stack 里看到来自 Vue.mixin
            parent 就是 Vue.options,包括 components,directives,filters,\_base,其中\_base 在子组件 extends 里用到，剩下 3 个是 initGlobalAPI 的时候得到
            Vue.options = Object.create(null)
            ASSET_TYPES.forEach(type => {
            Vue.options[type + 's'] = Object.create(null)
            })
            child 就是 mixin 的参数
            {
            created() {
            console.log("parent created");
            }
            }
            合并策略 strats 在 util/options.js 中有定义，不同类型的 key 对应不同的合并策略，created 的合并策略是生成数组方法，先父后子。
            合并完成,Vue.options 上会多相关 key-value（created）
         2. 来自 new Vue()的 Vue.init
            这个可以在 Call stack 里看到来自 new Vue()
            因为不是组件，所以会走非组件的 mergeOptions
            parent 就是 Vue.options，但此时它经过 Vue.mixix 的 mergeOptions，已经多了一些新的 key-value（created）
            child 就是 new Vue()里面的参数
            {
            el: "#app",
            render: h => h(childComp)
            }
            合并完成就是 options 又多了 2 个 key-value，但注意在 Vue.options 上没这 2 个 key-value
         3. 来自 Vue.extend 的 mergeOptions
            这个可以在 Call stack 里看到来自 Vue.extend
            因为包含 childComp 子组件，所以在创建这个子组件的构造函数的时候，会进行合并配置的操作
            parent 就是 Vue.options，但此时它经过 Vue.mixix 的 mergeOptions，已经多了一些新的 key-value（created）
            child 就是 childComp 的对象
            {
            template: "<div>{{msg}}</div>",
            created() {
            console.log("child created");
            },
            mounted() {
            console.log("child mounted");
            },
            data() {
            return {
            msg: "Hello Vue"
            };
            }
            }
            合并完成就是 options 又多了 2 个 key-value，但注意在 Vue.options 上没这这些 key-value
         4. 来自 VueComponent（子组件）的 Vue.init
            这个可以在 Call stack 里看到来自
            var Sub = function VueComponent (options) {
            this.*init(options);
            };
            因为它是组件，所以 initInternalComponent 方法合并配置
            没有合并策略 strats，也没有递归，知识简单的对象赋值，注意 vm.\$options 此时\_proto*原型链上会有 Vue.options 的属性
            合并完成
