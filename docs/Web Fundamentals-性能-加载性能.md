Web Fundamentals-性能-加载性能

1. 衡量绩效
   1. Lighthouse
      chrome 扩展 lighthouse（https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk）
      npm 包：npm install -g lighthouse
   2. PageSpeed 见解
      https://developers.google.com/speed/pagespeed/insights/
   3. WebPageTest
      https://www.webpagetest.org/
   4. Pingdom
      https://tools.pingdom.com/
2. 文字内容
   1. 加密压缩文本内容
      这个 webpack 打包工具有对应 plugin 插件
   2. 服务器压缩
      Gzip
      https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/ 【如何使用 GZIP 压缩优化您的站点】
      http://www.gidnetwork.com/tools/gzip-test.php 【Gzip 测试站点】
      nodejs 的 GZIP 方法
   3. 减少图书馆使用
      流行的 CSS 和 JavaScript 库尽力缩小和压缩下载文件，但通常它们仍然是非常严重的带宽消费者。例如，jQuery - 取决于所应用的版本和压缩算法 - 可能从 28k 到超过 250k。如果您需要大多数给定库的功能，那很好; 但是如果你只需要一两件特定的东西，你可以通过用一次性函数或 CSS 规则替换这些特性来节省大量的下载时间。
      http://youmightnotneedjquery.com/#toggle_class【你可能没有吨需要的JQUERY】
      类似 element-ui 的插件支持按需加载
3. 图形内容
   1. 删除不必要的图像
      这个和业务有关，也涉及到延迟加载等一系列知识点
   2. 选择适当的图像类型
      将 PNG 用于剪贴画，线条图或任何需要透明度的地方，JPG 用于照片，以及需要动画时的 GIF
      不过一般情况下 JPG 要优先选择，因为它比 png 小太多，而且一般人的肉眼无法识别其中的差别，在业务中可以对比确认选择
   3. 删除图像元数据（重要）
      大多数图像中存在元数据或“关于数据的数据”，并且可能包括（例如，在相机照片上）关于相机/电话型号的数据，日期和时间戳，照片应用设置，文件格式，高度和宽度，地理位置坐标等等。图像编辑器可能在其保存的文件中包含元数据，例如作者姓名，分辨率，色彩空间，版权和关键字。
      http://www.verexif.com/en/【在线查看和删除EXIF】这个网址亲测效果很好，可以查看和删除图像元数据，我图片少了20%的体积
      https://exif.tuchong.com/view/7799285/【在线查看EXIF】这个是中国的，信息格式更标准，但没有删除功能。
      也可以 nodejs 中存储删除了元数据的图片，让他们体积变小。
   4. 调整图像大小
      从服务器检索大图像，然后使用 CSS 在浏览器中调整大小。这是以前的常用操作，但是现在使用阿里云存储图片，就可以使用它的图片裁剪技术
      https://help.aliyun.com/document_detail/44686.html?spm=5176.doc44688.6.934.W5dAil【文档】
      阿里云的图片服务支持对服务器的图片下发时候的裁剪，缩放，但是从api看不支持上传图片的压缩，裁剪，所以需要本地处理
   5. 图片转 webp
      https://www.imqianduan.com/nodejs/246.html【nodejs应用转换png,jpg,gif为webp图片格式】
      https://www.jianshu.com/p/66ea1c37c2fe【JavaScript自动转换淘宝图片格式.webp】
   6. 图片压缩
      图片压缩和图片转 webp 是 2 个不同的概念，因为有些浏览器不支持 webp，所以图片压缩也是必要的
      https://tinypng.com/
   7. 总结：就目前而言，图片的处理可以用 nodejs 写个测试 demo 来熟悉这些概念
      图片处理.md
