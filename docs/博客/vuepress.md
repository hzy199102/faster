使用 vuepress 搭建博客
[https://www.vuepress.cn/]

http://101.200.192.219:2227/wl/
http://101.200.192.219:2201/
https://www.vuepress.cn/guide/#features

1.  yarn 的安装
    npm install -g yarn
    之前在官网下载[https://legacy.yarnpkg.com/zh-Hans/docs/install#windows-stable]，结果安装文件正常安装，但是[yarn -v]报错，
    yarn : 无法将“yarn”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
    刚开始以为环境变量需要配置，后来发现不是这个问题，但是没深究了，因为改为[npm install -g yarn]

2.  vuepress 安装
    [yarn add -D vuepress]
    如果你的现有项目依赖了 webpack 3.x，推荐使用 Yarn 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
    但是我安装时候发现有报错，另外运行时候发现失败，猜测是网络问题导致安装失败，所以设置源
    PS D:\now\work\gitspace\zhierblog> yarn config get registry
    https://registry.yarnpkg.com
    yarn config set registry https://registry.npm.taobao.org
    接着执行[yarn add -D vuepress]
    接着[yarn docs:dev]成功

3.  网站需要导航，搜索等功能

4.  基本配置

    1. 配置文件
    2. 主题配置
    3. 应用级别的配置

5.  公共文件
    生成 favicon.ico，[http://ico.duduxuexi.com/]
    你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，在这种情形下，你可以将它们放在 .vuepress/public 中， 它们最终会被复制到生成的静态文件夹中。

6.  markdown 扩展
    1. Front Matter
       全局参数定义的概念
    2. GitHub 风格的表格
    3. 代码段
       行号
       行高亮
       原始代码
       导入代码段
