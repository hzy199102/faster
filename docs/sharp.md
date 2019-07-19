sharp 的使用
参考资料：https://sharp.pixelplumbing.com/en/stable/install/【sharp官网】
对应 demo: test/pic/cmd/sharp.js

1. 前言
   我一直想找一个压缩图片的 npm 包，之后找到了 tiny，效果也很好，但是在转 webp 方面，tiny 并不具备，我发现 google 提供单独的工具，但是单独使用太过麻烦，我想看下是否用 npm 包有对其的封装，之后在国内的网页指引下找到一些 star 不到 100 的小众包，比如 webp-converter，但是我觉得不合适，因为提供的文档太少，使用的人太少，而且许久没更新了，后来在 stackoverflow 上终于有所发现，这就是 sharp，而且它比我想象的还要好，过万的 star 就是最好的证明
2. sharp 的安装
   cnpm install sharp
   从安装日志可以看出它会下载对应系统的依赖，对于 win64——主要是 libvips 及其依赖项，会被提取并存储 node_modules\sharp\vendor
   F:\git\faster\test>cnpm install sharp
   √ Installed 1 packages
   √ Linked 67 latest versions
   info sharp Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.7.4/libvips-8.7.4-win32-x64.tar.gz
   info sharp Creating F:\git\faster\test\node_modules\.0.22.1@sharp\build\Release
   info sharp Copying DLLs from F:\git\faster\test\node_modules\.0.22.1@sharp\vendor\lib to F:\git\faster\test\node_modules\.0.22.1@sharp\build\Release
   prebuild-install http request GET https://cdn.npm.taobao.org/dist/sharp/v0.22.1/sharp-v0.22.1-node-v64-win32-x64.tar.gz
   prebuild-install http 200 https://cdn.npm.taobao.org/dist/sharp/v0.22.1/sharp-v0.22.1-node-v64-win32-x64.tar.gz
   √ Run 1 scripts
   √ All packages installed (71 packages installed from npm registry, used 7m, speed 2.09kB/s, json 78(60.47kB), tarball 835.25kB)
3. sharp 的 api 测试使用分析总结
   1. 使用极其简单，api 非常详尽，也可以通过源码判断 api 的使用，基本不会掉坑
   2. clone 方法，允许多个输出流并因此允许多个处理流水线共享单个输入流，可以用于同一文件同时多线程分别进行 webp 生成和压缩处理
   3. metadata 方法可以取 exif，但是需要 exif-reader 插件才能查看。
   4. 只有这样才能取到 metadata.size
      - const readableStream = fs.createReadStream(path.join(imgPath, "微信图片 2.jpg"));
      - var img = sharp();
      - img.metadata().then(function (metadata) {console.log(metadata.size)}
      - readableStream.pipe(img);
   5. pipe 是异步的，所以需要用以下代码去处理同步问题
      // var stream = reader.pipe(upStream);
      // stream.on("finish", () => {
      // // end ... do something ...
      // });
   6. rotate 方法，如果提供了一个角度，它将转换为有效的正度数旋转。例如，-450 将产生 270 度旋转。根据 exif 方向标记，以显式角度或自动方向旋转输出图像。
   7. withMetadata 方法 可以在压缩的时候保存 exif 信息
   8. webp,jpeg,png 三个方法都是可配置参数的，quality 是最常用的配置
4. sharp 与 tiny 对比
   1. tiny 只能压缩图片,而且限制为jpg和png，不能生成 webp，而且没有配置化参数，但是效果的确不错，别人都帮用户配置好了。
      可以智能裁剪图片，即找到图片的关键处，裁剪它，这是 tiny 的独特功能
      如果是调用 API，免费版有每月 500 压缩的限制，另外因为压缩速度较慢，有点甚至达到2分钟以上，
      如果使用模拟浏览器请求线上压缩，效果和 API 请求一致，但是速度更快，而且压缩效果一样，而且可以跳过每月 500 次的限制，但是有5M的大小上限
      sharp是国外的产品，要考虑网络问题，一个2M的图片，API压缩的时间超过90秒，在加上没有进度显示，体验非常不好
   2. sharp 可以压缩图片，也可以生成 webp，并且可以配置化参数，获取 exif 信息，裁剪，校正图片旋转等，总体来说没有 sharp 那么智能，但是使用起来更自由
      sharp 处理图片的速度非常快，秒级

扩展学习
https://www.cnblogs.com/doit8791/p/6107254.html【一张图是不是原图，图片Exif信息】
