echarts 入坑史
官网：https://www.echartsjs.com/gallery/editor.html?c=doc-example/tutorial-async

1. 背景
   中台项目加入 echarts 功能

2. 入坑步骤
   1. 官网文档教程学习，仿写第一个 echarts
      1. 在绘图前我们需要为 ECharts 准备一个具备高宽的 DOM 容器，没有设置宽高会显示不出来！
      2. 因为是在 vue 中使用 echarts，所以初始化一定要在 vue 的 mounted 阶段，因为这个时候 dom 元素才被生成。
   2. 把接口数据展示成 echarts
      1. 留意图表参数的大小写问题
   3. 使用 echarts 提供的构建脚本自定义构建
      1. node node_modules/echarts/build/build.js --help 命令无法执行，提示缺包
         我进入 node_modules/echarts/package.json，发现缺少的包就是 devDependencies 下的包，
         我目前还想不通为什么没用自动下载这些依赖包，于是我把它们拷贝出来放到我的 package.json 的 devDependencies 下，除去重复的，运行 cnpm install，搞定
         在网上看到一个帖子。说 npm config set production false 可以解决问题，他找到这个的原因是 npm config ls -l，发现 production = true，
         npm 有个默认配置项 production （生产）设置为 true 时就不会安装 devDependencies 下的依赖包。
         网址：https://www.jianshu.com/p/a00e500f7aff
         可惜我不是这个原因造成的。
      2. node node_modules/echarts/build/build.js --min -i echarts.custom.js -o lib/echarts.custom.min.js
         这样就生成了只包含 pie 的 echarts 包，它的大小是 224KB，如果在加入 bar，大小变成 278KB，另外页面引入会发现图表支持 bar 和 pie
         在 test/echarts 下有测试代码
      3. 在线自定义构建
         https://echarts.baidu.com/builder.html
      4. 直接使用构建工具（如 rollup、webpack、browserify）自己构建，我比较熟悉 webpack
   4. 在 webpack 中使用 ECharts
      1. cnpm install echarts --save
      2. // 引入 ECharts 主模块
         var echarts = require('echarts/lib/echarts');
         // 引入柱状图
         require('echarts/lib/chart/bar');
         // 引入提示框和标题组件
         require('echarts/lib/component/tooltip');
         require('echarts/lib/component/title');
      3. 可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
   5. 个性化图表样式
      图标样式的设置主要看 API，但是大体分 3 个级别，优先级为：全局 < series < data
      可以针对各种样式，如背景色，字体颜色，字体大小，字体，间距，阴影等，甚至有些支持 hover 等等
   6. ECharts 中的样式简介
      1. 颜色主题
         ECharts4 开始，除了一贯的默认主题外，新内置了两套主题，分别为 'light' 和 'dark'。可以这么来使用它们：
         ar chart = echarts.init(dom, 'light');
         var chart = echarts.init(dom, 'dark');
         主题编辑器 https://echarts.baidu.com/theme-builder/
         // 假设主题名称是 "vintage"
         \$.getJSON('xxx/xxx/vintage.json', function (themeJSON) {
         echarts.registerTheme('vintage', JSON.parse(themeJSON))
         var chart = echarts.init(dom, 'vintage');
         });
      2. 调色盘
         调色盘，可以在 option 中设置。它给定了一组颜色，图形、系列会自动从其中选择颜色。 可以设置全局的调色盘，也可以设置系列自己专属的调色盘。
      3. 直接的样式设置 itemStyle, lineStyle, areaStyle, label, ...
      4. 高亮的样式：emphasis
         formatter 标签的文字是个比较有意思的点
   7. 异步数据加载和更新
      1. 异步加载
         在图表初始化后不管任何时候只要通过 jQuery 等工具异步获取数据后通过 setOption 填入数据和配置项就行。
         ECharts 中在更新数据的时候需要通过 name 属性对应到相应的系列，上面示例中如果 name 不存在也可以根据系列的顺序正常更新，但是更多时候推荐更新数据的时候加上系列的 name 数据。
      2. loading 动画
         ECharts 默认有提供了一个简单的加载动画。只需要调用 showLoading 方法显示。数据加载完成后再调用 hideLoading 方法隐藏加载动画。
         myChart.showLoading();
         但是也可以自定义加载动画，比如使用 elementUI 的动画，要点在设计请求前后的标志位去确认请求的当前状态决定动画的出现和隐藏
      3. 数据的动态更新其实和异步加载的方式一致
   8. 使用 dataset 管理数据
