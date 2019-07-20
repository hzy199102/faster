/**
 * 图片压缩中间件
 * 1. 使用这个中间件必须使用使用koa-body去获取文件数据
 * 2. 只做图片上传
 * 3. 分别进行tinyAPI,tinyOnline,parse optimized，optimized webp 4种压缩
 * 4. 会记录压缩的size，耗时，用于性能比较
 */
const path = require("path");
const fs = require("fs");
const tools = require("../utils/tools");
const tinyOnline = require("../utils/tinyOnline");
const sharp = require("sharp");
const uuid = require("node-uuid");
const tinify = require("tinify");
const { tiny } = require("../config");

var res = {};
/**
 * 本地保存
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 */
var save = function(file, dir, id) {
  return new Promise((resolve, reject) => {
    var startTime = Date.now();
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 创建可写流
    const upStream = fs.createWriteStream(
      path.join(dir, `/source_${file.name}`)
    );
    // 可读流通过管道写入可写流
    var stream = reader.pipe(upStream);
    stream.on("finish", () => {
      // 文件保存完成记录处理结果
      res[id]["source"] = {
        size: file.size,
        time: Date.now() - startTime,
        url: 'source/source_robot400.jpg'
      };
      // 因为file.path是临时文件，没有后缀，为了确保不是因为后缀不存在导致tiny判断文件类型产生了耗时，特意在这里加一个测试，结果证明有无后缀影响不大
      // // tiny API 压缩
      // tiny_api({path: path.join(dir, `/source_${file.name}`),name: file.name},dir,id);
      // // tiny online 压缩
      // tiny_online({path: path.join(dir, `/source_${file.name}`),name: file.name},dir,id,false);
      // console.log(res);
      resolve();
    });
  });
};
/**
 * tiny api 压缩图片
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 */
var tiny_api = function(file, dir, id) {
  var startTime = Date.now();
  // console.log(`${file.name}开始tinyapi压缩`);
  const source = tinify.fromFile(file.path);
  source
    .toBuffer()
    .then(u8a => {
      // console.log(
      //   `${file.name}结束tinyapi压缩，开始本地保存，耗时：${Date.now() -
      //     startTime}`
      // );
      fs.writeFileSync(path.join(dir, `/tinyAPI_${file.name}`), u8a);
      // console.log(
      //   `${file.name}tinyapi本地保存完毕，耗时：${Date.now() - startTime}`
      // );
      // 文件保存完成记录处理结果
      // 文件保存完成记录处理结果
      res[id]["tinyApi"] = {
        size: u8a.length,
        time: Date.now() - startTime
      };
      // console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
};
/**
 * tiny online 压缩图片
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 * @param {*} doFilter 是否进行基本过滤
 */
var tiny_online = function(file, dir, id, doFilter = true) {
  var startTime = Date.now();
  tinyOnline(file.path, file.name, dir, doFilter).then(
    data => {
      // 文件保存完成记录处理结果
      // 文件保存完成记录处理结果
      res[id]["tinyOnline"] = {
        size: data.size,
        time: Date.now() - startTime
      };
      // console.log(res);
    },
    err => {
      console.log(err);
    }
  );
};
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

/**
 * sharp webp
 *
 * @param {*} file 文件
 * @param {*} dir 保存目录
 * @param {*} id 文件id
 */
var sharp_webp = function(file, dir, id) {
  return new Promise((resolve, reject) => {
    // 创建可读流
    var startTime = Date.now();
    const readableStream = fs.createReadStream(file.path);
    const pipeline = sharp().rotate();
    const name = tools.getFileName(file.name);
    var webpObj = {
      pipeline: pipeline.clone(),
      min_path: path.join(dir, `sharpWebp_${name}.webp`)
    };
    webpObj.pipeline
      .webp({
        quality: 50
      })
      .toFile(webpObj.min_path)
      .then(data => {
        // 文件保存完成记录处理结果
        // 文件保存完成记录处理结果
        res[id]["sharpWebp"] = {
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
    var promiseAll = [];
    res = {};
    var sourceDir = tools.checkDirExist(upload.sourceDir);
    var optimizedDir = tools.checkDirExist(upload.optimizedDir);
    var files = ctx.request.files.file;
    if (!files) {
      console.log("文件不能为空");
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
        promiseAll.push(save(files[i], sourceDir, id));
        // tiny API 压缩
        // tiny_api(files[i], optimizedDir, id);
        // tiny online 压缩
        // tiny_online(files[i], optimizedDir, id, false);
        // sharp压缩
        promiseAll.push(sharp_optimized(files[i], optimizedDir, id));
        // sharp webp
        promiseAll.push(sharp_webp(files[i], optimizedDir, id));
      }
    }
    await Promise.all(promiseAll).then(function(results) {
      console.log(res);
      ctx.upload = { res };
      next();
    });
  };
};
