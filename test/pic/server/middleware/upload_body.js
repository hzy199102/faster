/**
 * 使用这个中间件必须使用使用koa-body去获取文件数据
 * tiny
 * https://tinypng.com/developers/reference/nodejs
 */
const tinify = require("tinify");
const { tiny } = require("../config");
const path = require("path");
const fs = require('fs');
tinify.key = tiny.key
var extensions = [".jpg", ".jpeg", ".png"];
var mimetyps = ["image/png", "image/jpg", "image/jpeg"];

// 上传图片中间件
module.exports = async (ctx, next) => {
  
  // file属性来源于前端预定上传的字段
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  const extension = path.extname(file.name).toLowerCase();
  const mimetyp = file.type;
  if (extensions.includes(extension) && mimetyps.includes(mimetyp)) {
    // console.log(path.join(__dirname, '../../upload_tiny/'))
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../upload/tiny/' + `/${file.size}_${file.name}`);
    console.log(filePath)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    await next();
  } else {
    console.log('文件类型有误');
    ctx.body = {
      message: "tiny上传失败"
    };
  }
};
