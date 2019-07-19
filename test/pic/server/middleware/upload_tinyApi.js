/**
 * tiny API 压缩文件中间件
 *
 */
const tinify = require("tinify");
const { tiny } = require("../config");
const path = require("path");
const fs = require("fs");
const checkDirExist = require("../utils/checkDirExist");
tinify.key = tiny.key;

var tinySave = function(sourcefilePath, optimizedFileDir, file) {
  console.log("开始tiny压缩....");
  var startTime = Date.now();
  const source = tinify.fromFile(sourcefilePath);

  // 获取Uint8Array类型的数据，先获取size，在保存成文件，这样效率最高，而且保存的文件名可以带有size
  source
    .toBuffer()
    .then(u8a => {
      let optimizedFilePath = path.join(
        optimizedFileDir,
        `/optimized_${u8a.length}_${file.name}`
      );
      fs.writeFileSync(optimizedFilePath, u8a);
      console.log("tiny压缩结束，耗时：" + (Date.now() - startTime));
    })
    .catch(e => {
      console.log(e);
    });
};

// 上传图片中间件
module.exports = upload => {
  return async (ctx, next) => {
    console.log(upload);
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
      const element = files[i];
    }

    await next();
  };
};
