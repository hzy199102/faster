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
 * 2. 根据exif方向标记，以显式角度或自动方向旋转输出图像。
 *
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
      width: 500,
      height: 500
    })
    .on("info", function(info) {
      console.log(info);
      console.log("Image2 height is " + info.height);
    })
    .pipe(secondWritableStream);
  // 千万注意：pipe是异步的
  // var stream = reader.pipe(upStream);
  // stream.on("finish", () => {
  //   // end ... do something ...
  // });
  readableStream.pipe(pipeline);
};

/**
 * metadata
 * 快速访问（未缓存）图像元数据，无需解码任何压缩图像数据。这是个promise对象
 * 注意：exif信息是个buffer，并且无法用nodejs支持的encoding编码解析，所以需要安装插件，经过作者推荐，选择了exif-reader
 * https://github.com/lovell/sharp/issues/285【如何解码元数据EXIF缓冲区】
 * 在sharp的使用中有人遇到和我一样的问题，我搜索的关键字是【nodejs exif buffer encoding】，巧的是sharp的作者给了答复，并且让我明白，sharp有功能测试！
 * https://github.com/lovell/sharp/blob/master/test/unit/metadata.js#L46-L49 这个功能测试让我明白需要用exif-reader插件
 * 这个方法可以获取原图的信息，这个在压缩图片的时候可以带入适当参数，比如宽高，比如size，比如统计压缩比
 *
 * Metadata：Total size of image in bytes, for Stream and Buffer input only
 * sharp(input?: string | Buffer, options?: sharp.SharpOptions)
 * 综上说明：sharp(path.join(imgPath, "微信图片2.jpg")).metadata().then(function (metadata) {console.log(metadata.size)});是无法获取metadata.size的
 * 只能如下：
 * const readableStream = fs.createReadStream(path.join(imgPath, "微信图片2.jpg"));
 * var img = sharp();
 * img.metadata().then(function (metadata) {console.log(metadata.size)}
 * readableStream.pipe(img);
 */
var test4 = function() {
  // 这样获取不到metadata.size
  const image = sharp(path.join(imgPath, "微信图片2.jpg"));
  image
    .rotate()
    .metadata()
    .then(function(metadata) {
      console.log(metadata);
      // metadata.exif是照片元数据，需要工具进行数据读取
      // const exif = exifReader(metadata.exif);
      // console.log(exif);

      // throw的数据走reject，如果没有reject方法，会提示运行错误
      // throw 222222;

      // 这里返回什么then就接受什么数据
      return image
        .resize(Math.round(metadata.width / 2), metadata.height)
        .webp();
      // .toBuffer();
    })
    .then(
      data => {
        const secondWritableStream = fs.createWriteStream(
          path.join(optimizedPath, "(109)5.jpg")
        );
        data.pipe(secondWritableStream);
      },
      err => {
        console.log(err);
      }
    );
  // 这样可以获取metadata.size
  const readableStream = fs.createReadStream(
    path.join(imgPath, "微信图片2.jpg")
  );
  const img = sharp();
  img.metadata().then(function(metadata) {
    console.log(metadata.size);
  });
  readableStream.pipe(img);
};

/**
 * 【微信图片2.jpg】（2.14M），用sharp压缩：1.10M，用tiny只有481KB，差距太明显了。
 * 这个测试主要是测试withMetadata是否保存了exif信息
 * 使用了clone技术，共享一个输入流
 *
 */
var test5 = function() {
  // 创建可读流
  const readableStream = fs.createReadStream(
    path.join(imgPath, "微信图片2.jpg")
    // path.join(imgPath, "(109).jpg")
    // path.join(imgPath, "00012.png")
  );
  const pipeline = sharp().rotate();
  const imageClone = pipeline.clone();
  const imageClone2 = pipeline.clone();
  imageClone
    .withMetadata()
    .metadata()
    .then(info => {
      console.log(11111111111);
      console.log(info);
      return imageClone;
    })
    .then(data => {
      return data.toFile(path.join(optimizedPath, "微信图片2_5_1.jpg"));
    })
    .then(data => {
      console.log(data);
      sharp(path.join(optimizedPath, "微信图片2_5_1.jpg"))
        .metadata()
        .then(info => {
          console.log(1111111);
          console.log(info);
        });
    });
  imageClone2
    .metadata()
    .then(info => {
      console.log(222222222);
      console.log(info);
      return imageClone2;
    })
    .then(data => {
      return data.toFile(path.join(optimizedPath, "微信图片2_5_2.jpg"));
    })
    .then(data => {
      console.log(data);
      sharp(path.join(optimizedPath, "微信图片2_5_2.jpg"))
        .metadata()
        .then(info => {
          console.log(222222222);
          console.log(info);
        });
    });
  readableStream.pipe(pipeline);
};

/**
 * webp,jpeg,png三个方法都是可配置参数的，具体情况自己抉择
 * 我就尝试了quality
 *
 */
var test6 = function() {
  // 创建可读流
  const readableStream = fs.createReadStream(
    path.join(imgPath, "微信图片2.jpg")
    // path.join(imgPath, "(109).jpg")
    // path.join(imgPath, "00012.png")
  );
  const pipeline = sharp().rotate();
  const jpegObj = {
    pipeline: pipeline.clone(),
    size: 0,
    min_size: 0,
    min_path: path.join(optimizedPath, "sharp_6.jpg")
  };
  const webpObj = {
    pipeline: pipeline.clone(),
    size: 0,
    min_size: 0,
    min_path: path.join(optimizedPath, "sharp_6.webp")
  };
  jpegObj.pipeline
    .metadata()
    .then(metadata => {
      jpegObj.size = metadata.size;
      return jpegObj.pipeline;
    })
    .then(data => {
      return data
        .jpeg({
          quality: 50
        })
        .toFile(jpegObj.min_path);
    })
    .then(data => {
      jpegObj.min_size = data.size;
      console.log(`jpegObj:${jpegObj.size}=>${jpegObj.min_size}`);
    });
  webpObj.pipeline
    .metadata()
    .then(metadata => {
      webpObj.size = metadata.size;
      return webpObj.pipeline;
    })
    .then(data => {
      return data
        .webp({
          quality: 50
        })
        .toFile(webpObj.min_path);
    })
    .then(data => {
      webpObj.min_size = data.size;
      console.log(`webpObj:${webpObj.size}=>${webpObj.min_size}`);
    });
  readableStream.pipe(pipeline);
};

var test7 = function() {
  console.log(sharp.concurrency());
};

// 测试方法名是否可以是参数化
var test8 = function() {
  var cmd = "jpeg";
  // 创建可读流
  const readableStream = fs.createReadStream(
    path.join(imgPath, "微信图片2.jpg")
  );
  const pipeline = sharp().rotate();
  const jpegObj = {
    pipeline: pipeline.clone(),
    size: 0,
    min_size: 0,
    min_path: path.join(optimizedPath, "sharp_6.jpg")
  };
  jpegObj.pipeline[cmd]({
    quality: 80
  })
    .toFile(jpegObj.min_path)
    .then(data => {
      jpegObj.min_size = data.size;
      console.log(`jpegObj:${jpegObj.size}=>${jpegObj.min_size}`);
    });

  readableStream.pipe(pipeline);
};
// 生成1px图片
var test9 = function() {
  sharp(path.join(__dirname, "../source/robot400.jpg"))
    // sharp(path.join(__dirname, "../../source/(109).jpg"))
    // 设置100之后图片可能比原图还大
    // .jpeg({
    //   quality: 100
    // })
    // .resize({ width: 100 })
    .resize(1, 1, {
      kernel: sharp.kernel.nearest,
      fit: "inside"
    })
    .toFile(path.join(optimizedPath, "sharp_9.jpg"));
};
test9();
