参考资料：https://www.cnblogs.com/jiasm/p/9160691.html【原生ES-Module在浏览器中的尝试】
https://segmentfault.com/a/1190000014318751【图说 ES Modules】
https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors【ECMAScript modules in browsers】

demo:test/esmodule

使用方式
在使用上，唯一的区别就是需要在 script 标签上添加一个 type="module"的属性来表示这个文件是作为 module 的方式来运行的。

<script type="module">
  import message from './message.js'
  console.log(message) // hello world
</script>

message.js
export default 'hello world'

优雅降级
这里有一个类似于 noscript 标签的存在。可以在 script 标签上添加 nomodule 属性来实现一个回退方案。

<script type="module">
  import module from './module.js'
</script>
<script nomodule>
  alert('your browsers can not supports es modules! please upgrade it.')
</script>

原理
nomodule 的处理方案是这样的： 支持 type="module"的浏览器会忽略包含 nomodule 属性的 script 脚本执行。
而不支持 type="module"的浏览器则会忽略 type="module"脚本的执行。
这是因为浏览器默认只解析 type="text/javascript"的脚本，而如果不填写 type 属性则默认为 text/javascript。
也就是说在浏览器不支持 module 的情况下，nomodule 对应的脚本文件就会被执行。

module 的注意细节：

1. 有效的 module 路径定义
   在 webpack 打包的文件中，引用全局包是通过 import module from 'XXX'来实现的。这个实际是一个简写，webpack 会根据这个路径去 node_modules 中找到对应的 module 并引入进来。
   但是原生支持的 module 是不存在 node_modules 一说的（全局对象都在 window 里了）。
   from 后边的路径一定要是一个有效的 URL。Uncaught TypeError: Failed to resolve module specifier "script1.js". Relative references must start with either "/", "./", or "../".
   一定不能省略文件后缀（即使是远端文件也是可以使用的，而不像 webpack 需要将本地文件打包到一起），除非后端专门对请求做了特殊处理。
2. module 的文件默认为 defer
   在普通的脚本中，defer 关键字是只指针对脚本文件的，如果是 inline-script，添加属性是不生效的。
   但是在 type="module"的情况下，不管是文件还是行内脚本，都会具有 defer 的特性。
3. 可以对 module 类型的脚本添加 async 属性
   async 可以作用于所有的 module 类型的脚本，无论是行内还是文件形式的。
   但是添加了 async 关键字以后并不意味着浏览器在解析到这个脚本文件时就会执行，而是会等到这段脚本所依赖的所有 module 加载完毕后再执行。
   import 的约定，必须在一段代码内的起始位置进行声明，且不能够在函数内部进行
   也就是说下边的 log 输出顺序完全取决于 module.js 加载的时长。

   <script async type="module" >
     import * from './module.js'
     console.log('module')
   </script>
   <script async src="./defer/async.js"></script>

4. 一个 module 只会加载一次
   这个 module 是否唯一的定义是资源对应的完整路径是否一致。
   如果当前页面路径为https://www.baidu.com/a/b/c.html，则文件中的/module.js、../../module.js与https://www.baidu.com/module.js都会被认为是同一个module。
   但是像这个例子中的 module1.js 与 module1.js?a=1 就被认定为两个 module，所以这个代码执行的结果就是会加载两次 module1.js。

5. 与常规脚本不同，模块脚本（及其导入）是通过CORS获取的。这意味着跨源模块脚本必须返回有效的CORS头文件，如访问控制允许源文件：*。
   client: <script async type="module" src="http://127.0.0.1:12307/script1.js"></script>
   server: res.setHeader("Access-Control-Allow-Origin", "*");

为什么要模块化

1. JS 本身就提供了一种方式帮你组织变量，称为函数作用域。因为函数作用域的缘故，一个函数无法访问另一个函数中定义的变量。
   这种方式是很有效的。它使得我们在写一个函数的时候，只需要考虑当前函数，而不必担心其它函数可能会改变当前函数的变量。
   不过，它也有不好的地方。它会让我们很难在不同函数之间共享变量。
2. 如果我们想跟当前函数以外的函数共享变量要怎么办呢？一种通用的做法是把要共享的变量提升到上一层作用域，比如全局作用域。
   在 jQuery 时代这种提升做法相当普遍。在我们加载任何 jQuery 插件之前，我们必须确保 jQuery 已经存在于全局作用域。
   这种方式的弊端非常明显：
   1. 所有的 script 必须以正确的顺序排列，开发者必须非常谨慎地确保没有任何一个脚本排列错误。如果排列错了，那么在运行过程中，应用将会抛出错误，并且停止继续运行。
   2. 使得代码的后期维护变得困难。它会使得移除旧代码或者脚本标签变得充满不确定性。你根本不知道移除它会带来什么影响。代码之间的依赖是不透明的。
      任何函数都可能依赖全局作用域中的任何变量，以至于你也不知道哪个函数依赖哪个脚本。
   3. 由于变量存在于全局作用域，所以任何代码都可以改变它。

模块化的作用

1. 模块化为你提供了一种更好的方式来组织变量和函数。你可以把相关的变量和函数放在一起组成一个模块。这种组织方式会把函数和变量放在模块作用域中。模块中的函数可以通过模块作用域来共享变量。
2. 与函数作用域不同的是，模块作用域还提供了一种暴露变量给其他模块使用的方式。模块可以明确地指定哪些变量、类或函数对外暴露。对外暴露的过程称为导出。
   一旦导出，其他模块就可以明确地声称它们依赖这些导出的变量、类或者函数。因为这是一种明确的关系，所以你可以很简单地辨别哪些代码能移除，哪些不能移除。
3. 一个是 Node.js 使用的 CommonJS （CJS）；另一个是 JS 规范的新模块系统 EcmaScript modules（ESM），Node.js 也正在添加对 ESM 的支持。

ESM 原理
当你在使用模块进行开发时，其实是在构建一张依赖关系图。不同模块之间的连线就代表了代码中的导入语句。
正是这些导入语句告诉浏览器或者 Node 该去加载哪些代码。
我们要做的是为依赖关系图指定一个入口文件。从这个入口文件开始，浏览器或者 Node 就会顺着导入语句找出所依赖的其他代码文件。

文件是由加载器来提取的，而加载器由另一个不同的标准所规范。对于浏览器来说，这个标准就是 HTML。但是你还可以根据所使用的平台使用不同的加载器。
加载器也同时控制着如何加载模块。它会调用 ESM 的方法，包括 ParseModule、Module.Instantiate 和 Module.Evaluate 。

1. 构建
   查找，下载，然后把所有文件解析成模块记录。
   1. 确定要从哪里下载包含该模块的文件，也称为模块定位（Module Resolution）
      加载器负责定位文件并且提取。
      首先，它需要找到入口文件。在 HTML 中，你可以通过 script 标签来告诉加载器。
      其次，导入语句中有一部分称为模块定位符（Module Specifier），它会告诉加载器去哪定位依赖模块。
      1. 对于模块定位符，有一点要注意的是：它们在浏览器和 Node 中会有不同的处理。每个平台都有自己的一套方式来解析模块定位符。这些方式称为模块定位算法，不同的平台会使用不同的模块定位算法。
         浏览器只接受 URL 作为模块定位符。
   2. 提取文件，通过从 URL 下载或者从文件系统加载
      1. 从 URL 加载模块文件。但是，这并不是在整个关系图上同时发生的。因为在解析完这个模块之前，你根本不知道它依赖哪些模块。而且在它下载完成之前，你也无法解析它。
         这就意味着，我们必须一层层遍历依赖树，先解析文件，然后找出依赖，最后又定位并加载这些依赖，如此往复。
      2. 如果主线程正在等待这些模块文件下载完成，许多其他任务将会堆积在任务队列中，造成阻塞。这是 ESM 标准把算法分成多个阶段的原因之一。
         将构建划分为一个独立阶段后，浏览器可以在进入同步的实例化过程之前下载文件然后理解模块关系图。
      3. ESM 和 CJS 之间最主要的区别之一就是，ESM 把算法化为为多个阶段。
         CJS 使用不同的算法是因为它从文件系统加载文件，这耗费的时间远远小于从网络上下载。因此 Node 在加载文件的时候可以阻塞主线程，而不造成太大影响。
         而且既然文件已经加载完成了，那么它就可以直接进行实例化和运行。所以在 CJS 中实例化和运行并不是两个相互独立的阶段。
         示例：
         let path = "module-" + lang;
         let formatter = require(path);
         ...
         formatter.format(content)
         在 Node 的 CJS 中，你可以在模块定位符中使用变量。因为已经执行了 require 之前的代码，所以模块定位符中的变量此刻是有值的，这样就可以进行模块定位的处理了。
         但是对于 ESM，在运行任何代码之前，你首先需要建立整个模块依赖的关系图。也就是说，建立关系图时变量是还没有值的，因为代码都还没运行。
      4. 加载器使用模块映射（Module Map）来管理缓存。每个全局作用域都在一个单独的模块映射中跟踪其模块。
         当加载器要从一个 URL 加载文件时，它会把 URL 记录到模块映射中，并把它标记为正在下载的文件。然后它会发出这个文件请求并继续开始获取下一个文件。
         当其他模块也依赖这个文件的时候会发生什么呢？加载器会查找模块映射中的每一个 URL 。如果发现 URL 的状态为正在下载，则会跳过该 URL ，然后开始下一个依赖的处理。
         注意如果同一个模块如果 url 不同，确切指加入不同的参数，比如 module1.js 与 module1.js?a=1，那么它们是 2 个不同的模块。
   3. 解析文件为模块记录
      我们已经拿到了模块文件，我们需要把它解析为模块记录。后续任何时候再次请求这个模块时，加载器就可以直接从模块映射中获取该模块。
      1. 不同的解析方式称为解析目标（Parse Goal）。如果按照不同的解析目标来解析相同的文件，会得到不同的结果。因此，在解析文件之前，必须清楚地知道所解析的文件类型是什么，不管它是不是一个模块文件。
      2. 在浏览器中，知道文件类型是很简单的。只需要在 script 脚本中添加 type="module" 属性即可。这告诉浏览器这个文件需要被解析为一个模块。
         如果不加这个，浏览器会出错 Uncaught SyntaxError: Unexpected identifier
2. 实例化
   为所有模块分配内存空间（此刻还没有填充值），然后依照导出、导入语句把模块指向对应的内存地址。这个过程称为链接（Linking）。一个模块实例结合了代码和状态。
   状态存储在内存中，所以实例化的过程就是把所有值写入内存的过程。实例化阶段完成后，我们得到了所有模块实例，以及已完成链接的导入、导出值。

   1. JS 引擎会创建一个模块环境记录（Module Environment Record）。它管理着模块记录的所有变量。然后，引擎会找出所有导出在内存中的地址。模块环境记录会跟踪每个导出对应于哪个内存地址。
      这些内存地址此时还没有值，只有等到运行后它们才会被填充上实际值。
   2. 为了实例化模块关系图，引擎会采用深度优先的后序遍历方式。它会顺着关系图到达最底端没有任何依赖的模块，然后设置它们的导出。最终，引擎会把模块下的所有依赖导出链接到当前模块。
      然后回到上一层把模块的导入链接起来。
   3. 在 CJS 中，整个导出对象在导出时都是值拷贝。如果导出模块内导出的值改变了，导入模块中导入的值也不会改变。
      相反，ESM 则使用称为实时绑定（Live Binding）的方式。导出和导入的模块都指向相同的内存地址（即值引用）。所以，当导出模块内导出的值改变后，导入模块中的值也实时改变了。
      ESM 采用这种实时绑定的原因是，引擎可以在不运行任何模块代码的情况下完成链接。
      浏览器示例：
      export const name = 'Niko'
      export let age = 18
      age = 20

      import {name, age} from './module'
      console.log(name, age) // Niko 20

3. 运行
   往已申请好的内存空间中填入真实值。JS 引擎通过运行顶层代码（函数外的代码）来完成填充。

   1. 循环依赖
      示例：参考esmodule/main1.js以及main2.js
      在 CJS 中，最开始时，main 模块会运行 require 语句。紧接着，会去加载 counter 模块。
      counter 模块会试图去访问导出对象的 message 。不过，由于 main 模块中还没运行到 message 处，所以此时得到的 message 为 undefined。JS 引擎会为本地变量分配空间并把值设为 undefined 。
      运行阶段继续往下执行，直到 counter 模块顶层代码的末尾处。我们想知道，当 counter 模块运行结束后，message 是否会得到真实值，所以我们设置了一个超时定时器。之后运行阶段便返回到 main.js 中。
      这时，message 将会被初始化并添加到内存中。但是这个 message 与 counter 模块中的 message 之间并没有任何关联关系，所以 counter 模块中的 message 仍然为 undefined。
      在 EMS 中，如果导出值采用的是实时绑定方式，那么 counter 模块最终会得到真实的 message 值。当超时定时器开始计时时，main.js 的运行就已经完成并设置了 message 值。

扩展：import 和 export 在使用的一些小提示

1. 在导出某些模块时，也是可以像 import 时使用 as 关键字来重命名你要导出的某个值。

   // info.js
   let name = 'Niko'
   let age = 18

   export {
   name as firstName,
   age
   }

   // import
   import {firstName, age} from './info.js'

   Tips: export 的调用不像 node 中的 module.exports = {}
   可以进行多次调用，而且不会覆盖（key 重名除外）。

2. export 导出的属性均为可读的
   也就是说 export 导出的属性是不能够修改的，如果试图修改则会得到一个异常。
   但是，类似 const 的效果，如果某一个导出的值是引用类型的，对象或者数组之类的。
   你可以操作该对象的一些属性，例如对数组进行 push 之类的操作。这样的修改会导致其他引用该模块都会受到影响，因为使用的是一个地址。
3. export 在代码中的顺序并不影响最终导出的结果
   export const name = 'Niko'
   export let age = 18
   age = 20

   const 或者 let 对于 调用方来说没有任何区别

   import {name, age} from './module'
   console.log(name, age) // Niko 20

4. 导出全部的语法如下：import * as allThings from './iport/module.js'

总结：
1. ESM 分构建，实例化，运行3个步骤，构建时，模块定位符必须是URL；遍历依赖树，先解析文件，然后找出依赖，最后又定位并加载这些依赖，如此往复，直到建立整个依赖关系图。
   因为是网络下载文件，所以为防止主线程阻塞才把构建划分为独立异步的阶段，而cjs是加载本地文件，所以构建，实例化和运行可同步执行，所以cjs中引入文件的路径可配置，EMS
   则不行，配置的路径没有运行！模块映射管理缓存，用url确定具体模块，所以url加参数就变成不一样的模块。ESM解析模块根据type=module确定模块文件
2. 实例化过程中，JS 引擎会创建一个模块环境记录（Module Environment Record）。它管理着模块记录的所有变量。然后，引擎会找出多有导出在内存中的地址。
   模块环境记录会跟踪每个导出对应于哪个内存地址。为了实例化模块关系图，引擎会采用深度优先的后序遍历方式。即，它会顺着关系图到达最底端没有任何依赖的模块，然后设置它们的导出。
   在 CJS 中，整个导出对象在导出时都是值拷贝。如果导出模块内导出的值改变了，导入模块中导入的值也不会改变。
   ESM 则使用称为实时绑定（Live Binding）的方式。导出和导入的模块都指向相同的内存地址（即值引用）。所以，当导出模块内导出的值改变后，导入模块中的值也实时改变了。
3. 运行是往已申请好的内存空间中填入真实值。支持循环依赖
4. module和nomodule是性能优化的关键之一，保证低版本浏览器和高版本浏览器对polyfill的支持，减小高版本js文件的体积
5. 跨源模块脚本必须返回有效的CORS头文件，如访问控制允许源文件：*