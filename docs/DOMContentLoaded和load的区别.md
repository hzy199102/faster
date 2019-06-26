参考网址：https://www.cnblogs.com/caizhenbo/p/6679478.html【DOMContentLoaded与load的区别】
DOMContentLoaded 顾名思义，就是 dom 内容加载完毕。那什么是 dom 内容加载完毕呢？
我们从打开一个网页说起。当输入一个 URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。
从页面空白到展示出页面内容，会触发 DOMContentLoaded 事件。而这段时间就是 HTML 文档被加载和解析完成。

这时候问题又来了，什么是 HTML 文档被加载和解析完成。要解决这个问题，我们就必须了解浏览器渲染原理。
当我们在浏览器地址输入 URL 时，浏览器会发送请求到服务器，服务器将请求的 HTML 文档发送回浏览器，浏览器将文档下载下来后，便开始从上到下解析，解析完成之后，会生成 DOM。
如果页面中有 css，会根据 css 的内容形成 CSSOM，然后 DOM 和 CSSOM 会生成一个渲染树，最后浏览器会根据渲染树的内容计算出各个节点在页面中的确切大小和位置，并将其绘制在浏览器上。

1. 在解析 html 的过程中，html 的解析会被中断，这是因为 javascript 会阻塞 dom 的解析。当解析过程中遇到 script 标签的时候，便会停止解析过程，转而去处理脚本，
   如果脚本是内联的，浏览器会先去执行这段内联的脚本，如果是外链的，那么先会去加载脚本，然后执行。在处理完脚本之后，浏览器便继续解析 HTML 文档。
2. 同时 javascript 的执行会受到标签前面样式文件的影响。如果在标签前面有样式文件，需要样式文件加载并解析完毕后才执行脚本。这是因为 javascript 可以查询对象的样式。
3. 在现在浏览器中，为了减缓渲染被阻塞的情况，现代的浏览器都使用了猜测预加载。当解析被阻塞的时候，浏览器会有一个轻量级的 HTML（或 CSS）扫描器（scanner）继续在文档中扫描，
   查找那些将来可能能够用到的资源 文件的 url，在渲染器使用它们之前将其下载下来。
4. 在任何情况下，DOMContentLoaded 的触发不需要等待图片等其他资源加载完成。
5. load，页面上所有的资源（图片，音频，视频等）被加载以后才会触发 load 事件，简单来说，页面的 load 事件会在 DOMContentLoaded 被触发之后才触发。
6. onload 事件所有的浏览器都支持，所以我们不需要什么兼容，只要通过调用。DOMContentLoaded 不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容。
   支持 DOMContentLoaded 事件的，就使用 DOMContentLoaded 事件；IE6、IE7 不支持 DOMContentLoaded，但它支持 onreadystatechange 事件，该事件的目的是提供与文档或元素的加载状态有关的信息。
   更低的 ie 还有个特有的方法 doScroll， 通过间隔调用：document.documentElement.doScroll("left");可以检测 DOM 是否加载完成。 当页面未加载完成时，该方法会报错，直到 doScroll 不再报错时，就代表 DOM 加载完成了。该方法更接近 DOMContentLoaded 的实现。

在面试的过程中，经常会有人在回答页面的优化中提到将 js 放到 body 标签底部，原因是因为浏览器生成 Dom 树的时候是一行一行读 HTML 代码的，script 标签放在最后面就不会影响前面的页面的渲染。那么问题来了，既然 Dom 树完全生成好后页面才能渲染出来，浏览器又必须读完全部 HTML 才能生成完整的 Dom 树，script 标签不放在 body 底部是不是也一样，因为 dom 树的生成需要整个文档解析完毕。我们再来看一下 chrome 在页面渲染过程中的，绿色标志线是 First Paint 的时间。纳尼，为什么会出现 firstpaint，页面的 paint 不是在渲染树生成之后吗？其实现代浏览器为了更好的用户体验,渲染引擎将尝试尽快在屏幕上显示的内容。它不会等到所有 HTML 解析之前开始构建和布局渲染树。部分的内容将被解析并显示。也就是说浏览器能够渲染不完整的 dom 树和 cssom，尽快的减少白屏的时间。假如我们将 js 放在 header，js 将阻塞解析 dom，dom 的内容会影响到 First Paint，导致 First Paint 延后。所以说我们会将 js 放在后面，以减少 First Paint 的时间，但是不会减少 DOMContentLoaded 被触发的时间。

扩展深入资料：https://yq.aliyun.com/articles/609917【再谈 load 与 DOMContentLoaded】
