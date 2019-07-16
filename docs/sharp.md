sharp的使用
参考资料：https://sharp.pixelplumbing.com/en/stable/install/【sharp官网】
1. 前言
   我一直想找一个压缩图片的npm包，之后找到了tiny，效果也很好，但是在转webp方面，tiny并不具备，我发现google提供单独的工具，但是单独使用太过麻烦，我想看下是否用npm包有对其的封装，之后在国内的网页指引下找到一些star不到100的小众包，比如webp-converter，但是我觉得不合适，因为提供的文档太少，使用的人太少，而且许久没更新了，后来在stackoverflow上终于有所发现，这就是sharp，而且它比我想象的还要好，过万的star就是最好的证明
2. sharp的安装
   cnpm install sharp
   从安装日志可以看出它会下载对应系统的依赖，对于win64——主要是libvips及其依赖项，会被提取并存储node_modules\sharp\vendor
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

扩展学习
https://www.cnblogs.com/doit8791/p/6107254.html【一张图是不是原图，图片Exif信息】
