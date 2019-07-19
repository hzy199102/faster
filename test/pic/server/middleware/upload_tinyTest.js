/**
 * 使用这个中间件必须使用使用koa-body去获取文件数据
 * tiny
 * https://tinypng.com/developers/reference/nodejs
 */
const tinify = require("tinify");
const { tiny } = require("../config");
const path = require("path");
const fs = require("fs");
const checkDirExist = require("../utils/checkDirExist");
// const EXIF = require("exif-js");
tinify.key = tiny.key;
var extensions = [".jpg", ".jpeg", ".png"];
var mimetyps = ["image/png", "image/jpg", "image/jpeg"];

var tinySave = function(sourcefilePath, optimizedFileDir, file) {
  console.log("开始tiny压缩....");
  var startTime = Date.now();
  // 如果你不想保存原始图片，也可以使用临时文件路径
  // const source = tinify.fromFile(file.path);
  const source = tinify.fromFile(sourcefilePath);

  // 先获取size,在压缩，这样会请求tiny后台2次，效率低下
  // source.result().size().then((size) => {
  //   source.toFile(path.join(__dirname, '../../upload/tiny/' + `/optimized_${size}_${file.name}`)).then(()=>{
  //     console.log(Date.now() - startTime)
  //   });
  // })

  // 先保存压缩文件，在读取它获得size，这样就不能在保存的文件名中带size了
  // let optimizedFilePath = path.join(
  //   optimizedFileDir,
  //   `/optimized_${file.name}`
  // );
  // source.toFile(optimizedFilePath).then((e) => {
  //   console.log(Date.now() - startTime)
  //   console.log(fs.statSync(optimizedFilePath).size)
  //   console.log(Date.now() - startTime)
  // });

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
module.exports = async (ctx, next) => {
  var sourceFileDir = checkDirExist(
    path.join(__dirname, "../../upload/source/")
  );
  var optimizedFileDir = checkDirExist(
    path.join(__dirname, "../../upload/optimized/")
  );
  // file属性来源于前端预定上传的字段
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  console.log(ctx.request.files);
  const extension = path.extname(file.name).toLowerCase();
  const mimetyp = file.type;
  if (extensions.includes(extension) && mimetyps.includes(mimetyp)) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let sourcefilePath = path.join(sourceFileDir, `/${file.size}_${file.name}`);
    // console.log(sourcefilePath);
    // 创建可写流
    const upStream = fs.createWriteStream(sourcefilePath);
    // 可读流通过管道写入可写流
    var stream = reader.pipe(upStream);
    stream.on("finish", () => {
      tinySave(sourcefilePath, optimizedFileDir, file);
    });
    console.log("此时不一定完成了源文件本地保存，因为pipe操作是异步的");
    await next();
  } else {
    console.log("文件类型有误");
    ctx.body = {
      message: "tiny上传失败"
    };
  }
};
