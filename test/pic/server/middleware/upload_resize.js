/**
 * 图片缩放中间件
 * 1. sharp缩放
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/**
 * sharp 压缩图片
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 */
var sharp_optimized = function(file, dir, id) {
  return new Promise((resolve, reject) => {
    // 创建可读流
    var startTime = Date.now();
    const readableStream = fs.createReadStream(file.path);
    const pipeline = sharp().rotate();
    const name = tools.getFileName(file.name);
    const type = tools.getFileType(file.name);
    var cmd = "jpeg";
    if (type === "png") {
      cmd = "png";
    } else if (type === "jpg") {
      cmd = "jpeg";
    } else {
      cmd = "jpeg";
    }
    var obj = {
      pipeline: pipeline.clone(),
      min_path: path.join(dir, `sharpOptimized_${file.name}`)
    };
    obj.pipeline[cmd]({
      quality: 80
    })
      .toFile(obj.min_path)
      .then(data => {
        // 文件保存完成记录处理结果
        // 文件保存完成记录处理结果
        res[id]["sharpOptimized"] = {
          size: data.size,
          time: Date.now() - startTime
        };
        resolve();
        // console.log(res);
      });
    readableStream.pipe(pipeline);
  });
};

module.exports = upload => {
  return async (ctx, next) => {
    // resize返回
    await new Promise((resolve, reject) => {
      // 这个是压缩之后的缩放，不是原图的缩放，但可以设置quality：100达到类似原图的缩放效果
      sharp(path.join(__dirname, "../../source/robot400.jpg"))
      // sharp(path.join(__dirname, "../../source/(109).jpg"))
        // 设置100之后图片可能比原图还大
        // .jpeg({
        //   quality: 100
        // })
        // .resize({ width: 100 })
        // .resize(1200, 1600, {
        //   kernel: sharp.kernel.nearest,
        //   fit: "inside"
        // })
        .toBuffer()
        .then(data => {
          resolve(data);
        });
    }).then(data => {
      // console.log(data)
      ctx.status = 200;
      // 不加这句话会浏览器会自动下载图片
      ctx.type = "jpeg";
      ctx.body = data;
    });
    // 原图返回
    // await new Promise((resolve, reject) => {
    //   var stream = fs.createReadStream(
    //     path.join(__dirname, "../upload/source/source_robot400.jpg")
    //   );
    //   var responseData = [];
    //   //判断状态
    //   stream.on("data", function(chunk) {
    //     responseData.push(chunk);
    //   });
    //   stream.on("end", function() {
    //     // console.log(responseData)
    //     resolve(Buffer.concat(responseData));
    //   });
    //   stream.on("error", function(e) {
    //     reject(e);
    //   });
    // }).then(data => {
    //   ctx.status = 200;
    //   // 不加这句话会浏览器会自动下载图片
    //   ctx.type = "jpeg";
    //   ctx.body = data;
    // });
  };
};
