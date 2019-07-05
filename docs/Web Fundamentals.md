App Shell 模型
App Shell 架构是构建 Progressive Web App（渐进式 web app） 的一种方式，这种应用能可靠且即时地加载到您的用户屏幕上，与本机应用相似。

这是一个非常庞大的系统只是体系
目前只简单的测试

Web Fundamentals/GUIDES/Performance/Rendering Performance/Avoid Large, Complex Layouts and Layout Thrashing(避免大型、复杂的布局和布局抖动)一文
对应项目：WebFundamentals/Performance

1. 避免大型、复杂的布局和布局抖动
   布局是浏览器计算各元素几何信息的过程：元素的大小以及在页面中的位置。 根据所用的 CSS、元素的内容或父级元素，每个元素都将有显式或隐含的大小信息。此过程在 Chrome、Opera、Safari 和 Internet Explorer 中称为布局 (Layout)。 在 Firefox 中称为自动重排 (Reflow)，但实际上其过程是一样的。
   与样式计算相似，布局开销的直接考虑因素如下：

   1. 需要布局的元素数量。
   2. 这些布局的复杂性。

   布局需要注意的点：

   1. 布局的作用范围一般为整个文档。
   2. DOM 元素的数量将影响性能；应尽可能避免触发布局。
   3. 评估布局模型的性能；新版 Flexbox 一般比旧版 Flexbox 或基于浮动的布局模型更快。
   4. 避免强制同步布局和布局抖动；先读取样式值，然后进行样式更改。
      1. 避免强制同步布局
         将一帧送到屏幕会采用如下顺序：JavaScript——>Style——>Layout——>Paint——>Composite
         首先 JavaScript 运行，然后计算样式，然后布局。但是，可以使用 JavaScript 强制浏览器提前执行布局。这被称为强制同步布局。
         要记住的第一件事是，在 JavaScript 运行时，来自上一帧的所有旧布局值是已知的，并且可供您查询。
         例子：
         您要在帧的开头写出一个元素（让我们称其为“框”）的高度
         // Schedule our function to run at the start of the frame.
         requestAnimationFrame(logBoxHeight);
         function logBoxHeight() {
         // Gets the height of the box in pixels and logs it out.
         console.log(box.offsetHeight);
         }
         如果在请求此框的高度之前，已更改其样式，就会出现问题：
         function logBoxHeight() {
         box.classList.add('super-big');
         // Gets the height of the box in pixels
         // and logs it out.
         console.log(box.offsetHeight);
         }
         现在，为了回答高度问题，浏览器必须先应用样式更改（由于增加了 super-big 类），然后运行布局。这时它才能返回正确的高度。这是不必要的，并且可能是开销很大的工作。
         因此，始终应先批量读取样式并执行（浏览器可以使用上一帧的布局值），然后执行任何写操作：
         正确完成时，以上函数应为：
         function logBoxHeight() {
         // Gets the height of the box in pixels
         // and logs it out.
         console.log(box.offsetHeight);
         box.classList.add('super-big');
         }
         大部分情况下，并不需要应用样式然后查询值；使用上一帧的值就足够了。与浏览器同步（或比其提前）运行样式计算和布局可能成为瓶颈，并且您一般不想做这种设计。
      2. 避免布局抖动
         例子：
         function resizeAllParagraphsToMatchBlockWidth() {
         // Puts the browser into a read-write-read-write cycle.
         for (var i = 0; i < paragraphs.length; i++) {
         paragraphs[i].style.width = box.offsetWidth + 'px';
         }
         }
         此代码循环处理一组段落，并设置每个段落的宽度以匹配一个称为“box”的元素的宽度。这看起来没有害处，但问题是循环的每次迭代读取一个样式值 (box.offsetWidth)，
         然后立即使用此值来更新段落的宽度 (paragraphs[i].style.width)。在循环的下次迭代时，浏览器必须考虑样式已更改这一事实，
         因为 offsetWidth 是上次请求的（在上一次迭代中），因此它必须应用样式更改，然后运行布局。每次迭代都将出现此问题！
         // Read.
         var width = box.offsetWidth;
         function resizeAllParagraphsToMatchBlockWidth() {
         for (var i = 0; i < paragraphs.length; i++) {
         // Now write.
         paragraphs[i].style.width = width + 'px';
         }
         }
   5. Fastdom
      https://github.com/wilsonpage/fastdom

此示例的修正方法还是先读取值，然后写入值：
当您更改样式时，浏览器会检查任何更改是否需要计算布局，以及是否需要更新渲染树。对“几何属性”（如宽度、高度、左侧或顶部）的更改都需要布局计算。
如果无法避免布局，关键还是要使用 Chrome DevTools 来查看布局要花多长时间，并确定布局是否为造成瓶颈的原因。在后面的内容我会详细介绍如何检验一个网页的性能
NOTE:想要一个有关哪些 CSS 属性会触发布局、绘制或合成的确切列表？请查看 CSS 触发器。https://csstriggers.com/

1. 如何检验一个网页的性能，这次以网页动画为例，测试页面性能瓶颈

   1. 隐身模式打开 chrome
      目的是避免缓存以及不必要的问题
   2. 运行测试项目，打开网址
   3. 限制 cpu 速度
      由于有些用户的设备 cpu 性能很高，无法很好的分析移动端，或者发现低级设备的性能问题，所以我们要降速找到控制台中的 performance 项，找到 CPU 选项，选择降低 4 倍性能或 6 倍性能
   4. 了解 performance 各模块，确保准确定位问题
      1. record(CTRL+E)录制，一般 3 秒就停止录制
      2. FPS
         页面每秒帧数，60 为极佳，<24 会让用户感觉卡顿，因为人眼识别为 24 帧
         FPS 由红色的条和绿色的半透明条二部分组成， 红色：意味着帧数已经下降到影响用户体验的程度，chrome 已经帮你标注了，这块有问题。绿色：其实就是 Fps 指数，所有绿色柱体高度越高，性能越好
      3. CPU
         cpu 包括两种状态：充满颜色， 不充满颜色。cpu 是否充满颜色和 fps 存在联系
      4. 了解 Frames
         Frames 部分，主要用于查看特定帧的 fps，可以查看特定的帧情况。
      5. 了解 FPS 快捷工具
         在 chrome 中，还有格 more tools 选项，选中 rendering 选项，开启 fps meter 开关，会直接在页面上，出现了一个 fps 统计器，一般不用。
   5. 找到瓶颈
      1. 了解 Summary
         对性能进行录制完成的时候，会默认在底部展示一个 Summary 摘要，显示全局的信息
         上面展示了 0 ～ 5.52s 录制时间的具体耗时：1，script 执行耗时 1952.8ms；2，render 渲染耗时 2986.8ms；3，Painting 重绘耗时 472.1ms
      2. 了解 Main
         为了方便我们观看，我们可以在 fps、cpu、net 模块，点击一下，缩小时间区间；Main 部分，其中每一块是每一帧中所做的事情，Main 中展示的是火焰图，也就是函数调用的堆栈
         火焰图，可以简单理解，x 轴表示时间，y 轴表示调用的函数，函数中还包含依次调用的函数，y 轴只占用 x 轴的一个时间维度
      3. 识别问题，红色三角号
         Animation Frame Fired 右上角有个红色三角号，这就是 chrome 自动帮助识别出有问题的部分，选择具体的红色三角号，能在 summary 看到具体问题分析，以及具体问题代码。
   6. demo 性能分析结论
      m.style.top = pos + "px";
      if (m.offsetTop === 0) {...}
      我们的动画元素可能有上百个，本应该统一运行布局一次，但是因为这段代码，每次对动画元素进行位置更新之后（此时还没进行统一布局），m.offsetTop 会让浏览器强制运行布局去计算，所以本来一次的布局变成了上百次（和动画元素个数有关），使用 JavaScript 强制浏览器提前执行布局。这被称为强制同步布局。
      var pos = parseInt(m.style.top.slice(0, m.style.top.indexOf("px")));
      m.classList.contains("down") ? (pos += distance) : (pos -= distance);
      ...
      m.style.top = pos + "px";
      if (pos === 0) {...}
      在动画元素位置更新之前就获取动画元素的 pos，更新完之后不去触发，这样就避免了强制重新布局的问题，原理是：在 JavaScript 运行时，来自上一帧的所有旧布局值是已知的，并且可供您查询。
