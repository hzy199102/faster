const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
// 专门解析exif信息，类似client的exif
const exifReader = require("exif-reader");
const imgPath = path.join(__dirname, "../source/"),
  optimizedPath = path.join(__dirname, "../optimized/sharp/");
/**
 * 压缩一张图片
 * 对比tiny
 * 1.tiny压缩效率更高，但可能是需要调整配置的原因
 * 2.sharp压缩速度更快
 * 3.sharp的配置灵活性远远超过tiny
 * 4.sharp没有限制，tiny毕竟是商业的
 *
 * 这是最基础的图片压缩
 */
var test1 = function() {
  sharp(path.join(imgPath, "(109).jpg"))
    //   .resize(300, 200)
    .toFile(path.join(optimizedPath, "(109)2.jpg"), function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });
};

/**
 * 这个方式可以拿到压缩后图片的简单的数据，比如图片的宽高，大小，比较实用
 */
var test2 = function() {
  // 创建可读流
  const readableStream = fs.createReadStream(path.join(imgPath, "(109).jpg"));
  // 创建可写流
  const writableStream = fs.createWriteStream(
    path.join(optimizedPath, "(109)2.jpg")
  );
  var transformer = sharp()
    // .resize(300)
    .on("info", function(info) {
      console.log(info);
      console.log("Image height is " + info.height);
    });
  readableStream.pipe(transformer).pipe(writableStream);
};

/**
 * 这里涉及到2个知识点
 * rotate
 * 1. 如果提供了一个角度，它将转换为有效的正度数旋转。例如，-450将产生270度旋转。
 * 2. 根据exif方向标记，以显式角度或自动方向旋转输出图像。不过我提供了ios手机旋转的照片，但没发现有自动调整的情况，不知道是我拍摄的照片有什么要求吗？
 * clone
 * 获取Sharp实例的“快照”，返回一个新实例。克隆的实例继承其父实例的输入。这允许多个输出流并因此允许多个处理流水线共享单个输入流。
 * 通俗的说就是一个输入流可以被复制而产生多个输出流，比如一个图片同时被不同程度的压缩和转webp
 */
var test3 = function() {
  // 创建可读流
  const readableStream = fs.createReadStream(
    path.join(imgPath, "微信图片2.jpg")
  );
  // 创建可写流
  const firstWritableStream = fs.createWriteStream(
    path.join(optimizedPath, "(109)3.jpg")
  );
  const secondWritableStream = fs.createWriteStream(
    path.join(optimizedPath, "(109)4.jpg")
  );
  const pipeline = sharp().rotate();
  pipeline
    .clone()
    // .resize(800, 600)
    .on("info", function(info) {
      console.log(info);
      console.log("Image1 height is " + info.height);
    })
    .pipe(firstWritableStream);
  pipeline
    .clone()
    .extract({
      left: 20,
      top: 20,
      width: 100,
      height: 100
    })
    .on("info", function(info) {
      console.log(info);
      console.log("Image2 height is " + info.height);
    })
    .pipe(secondWritableStream);
  readableStream.pipe(pipeline);
};

/**
 * metadata
 * 快速访问（未缓存）图像元数据，无需解码任何压缩图像数据。这是个promise对象
 * 注意：exif信息是个buffer，并且无法用nodejs支持的encoding编码解析，所以需要安装插件，经过作者推荐，选择了exif-reader
 * https://github.com/lovell/sharp/issues/285【如何解码元数据EXIF缓冲区】
 * 在sharp的使用中有人遇到和我一样的问题，我搜索的关键字是【nodejs exif buffer encoding】，巧的是sharp的作者给了答复，并且让我明白，sharp有功能测试！
 * https://github.com/lovell/sharp/blob/master/test/unit/metadata.js#L46-L49 这个功能测试让我明白需要用exif-reader插件
 *
 * 如果需要
 */
var test4 = function() {
  const image = sharp(path.join(imgPath, "微信图片2.jpg"));
  image.metadata().then(function(metadata) {
    console.log(metadata);
    const exif = exifReader(metadata.exif);
    console.log(exif);
    // return image
    //   .resize(Math.round(metadata.width / 2))
    //   .webp()
    //   .toBuffer();
  });
  // .then(function(data) {
  //   // data contains a WebP image half the width and height of the original JPEG
  // });
};

test4();
