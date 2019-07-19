/**
 * 图片压缩中间件
 * 1. 使用这个中间件必须使用使用koa-body去获取文件数据
 * 2. 只做图片上传
 * 3. 分别进行tinyAPI,tinyOnline,parse optimized，optimized webp 4种压缩
 * 4. 会记录压缩的size，耗时，用于性能比较
 */
const path = require("path");
const fs = require("fs");
const checkDirExist = require("../utils/checkDirExist");
const uuid = require("node-uuid");

const res = {};
/**
 * 本地保存
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 */
var save = function(file, dir, id) {
  var startTime = Date.now();
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  // 创建可写流
  const upStream = fs.createWriteStream(path.join(dir, `/${file.name}`));
  // 可读流通过管道写入可写流
  var stream = reader.pipe(upStream);
  stream.on("finish", () => {
    // 文件保存完成记录处理结果
    res[id].size = file.size;
    res[id].time = Date.now() - startTime;
    console.log(res);
  });
};
module.exports = upload => {
  return async (ctx, next) => {
    var sourceDir = checkDirExist(upload.sourceDir);
    var optimizedDir = checkDirExist(upload.optimizedDir);
    var files = ctx.request.files.file;
    if (!files) {
      ctx.body = {
        code: 200,
        message: "文件不能为空"
      };
      return false;
    }
    if (!Array.isArray(files)) {
      files = [files];
    }
    for (let i = 0; i < files.length; i++) {
      var extension = path.extname(files[i].name).toLowerCase();
      if (!upload.extensions.includes(extension)) {
        console.log(`${files[i].name}不是图片，跳过...`);
      } else {
        // 生成文件id
        var id = uuid.v4();
        // 初始化文件处理结果
        res[id] = {};
        // 本地保存
        save(files[i], sourceDir, id);
      }
    }
    await next();
  };
};
