faster faster faster

待看
https://www.cnblogs.com/caizhenbo/p/6836390.html【【前端安全】JavaScript防XSS攻击】
https://cli.vuejs.org/zh/guide/browser-compatibility.html#%E7%8E%B0%E4%BB%A3%E6%A8%A1%E5%BC%8F【vuecli】
https://developers.google.com/web/fundamentals/?hl=zh-cn【Web Fundamentals】
https://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/#section:dns-prefetching【Web设计人员和前端开发人员的前端性能】
https://cloud.tencent.com/developer/article/1150960【腾讯是如何大幅降低带宽和网络流量的】

1. 测试下 git 提交!
   docs/git.md
2. 为了了解 ECM 概念，先去了解了 script 标签，并引申了部分浏览器渲染过程，主要是 DOMContentLoaded 和 load 的区别
   docs/script 标签的 async 和 defer.md
   docs/DOMContentLoaded 和 load 的区别.md
3. 开始测试 ES-Module 的相关特性
   docs/ESModule.md
4. 加入数据结构相关项目
   docs/数据结构.html
5. google 开发者 Web Fundamentals（web 基本原理）
   从 web 基本原理开始，阐述各种性能优化，本次是【避免大型、复杂的布局和布局抖动】以及【Chrome 运行时性能瓶颈分析】
   docs/Web Fundamentals.md
6. 预加载的深度调研
   prefetch.md
   总结一下就是全部的预加载配置都是无效的
7. 字体深度调研
   @font-face(字体)详解.md
   不同字体的混搭的实现思路
8. 图片处理 demo
   koa + vue + axios
   图片处理.md
   https 模拟上传文件和下载文件，配置请求头，操作文件流，tiny 的压缩部分全部搞定
9. 临时加入 ws server 测试工作
10. 使用 settings sync 对多台设备的 vscode 配置进行同步
11. 开始编写 demo:sendBeacon，前端数据上报
12. requestAnimationFrame 深入调研
13. nodejs 服务端部署完成，但是缺乏 ngnix 配置
14. 对于 elementUI 的理解加深一步
15. https://mp.weixin.qq.com/s/G21jKt1DBB1107k6eF7BHQ
16. flow 深入调研
    flow.md
17. 如果运行命令，发现缺少 modules，而之前这个命令一直都是好好的，那说明安装其他 npm 包的时候影响了 node_module 的包结构，
    已知的最好方法是删除 node_modules 文件夹，重新执行 cnpm install。
