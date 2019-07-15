const fs = require("fs");
const path = require("path");
const https = require("https");
const { URL } = require("url");

const sourcePath = path.join(__dirname, "../source/"),
  optimizedPath = path.join(__dirname, "../optimized/tiny/"),
  exts = [".jpg", ".png"],
  max = 5200000; // 5MB == 5242848.754299136

/**
 * 需要强调的是，只要是压缩，就一定存在失真，就是明显不明显的问题，看你是否能接收，压缩大图效果好点，如果本身就是几十KB的小图，失真的情况可能会更明显点，需要权衡
 * options应该写入的参数，可以参考以后API了解具体的参数信息，结合tiny官网压缩图片的http请求（network查看）
 * https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_request_write_chunk_encoding_callback
 * http.request（options [，callback]）
 * 可以得出需要以下必要参数：
 * method: "POST",
 * hostname: "tinypng.com",
 * path: "/web/shrink",
 * 但是仅仅这样运行会出错{"error":"Unauthorized","message":"Please use api.tinify.com"}
 * 逐步加入headers请求头（完全参照tiny官网压缩图片的http请求（network查看））
 * "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
 * 加入User-Agent，已经可以接收到压缩结果
 *
 */
const options = {
  method: "POST",
  hostname: "tinypng.com",
  path: "/web/shrink",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
  }
};

/**
 * 将压缩得到的图片下载到本地，并且计算压缩比
 * 这里主要了解如何获得下载图片的文件流
 *
 * @param {*} imgpath 原始图片路径
 * @param {*} obj 压缩图片得到的结果，据此判断压缩比，压缩图片地址等信息
 * @param {*} optimizedPath 压缩文件夹路径
 */
function fileSave(imgpath, obj, optimizedPath) {
  let options = new URL(obj.output.url);
  let req = https.request(options, res => {
    let body = "";
    res.setEncoding("binary");
    res.on("data", function(data) {
      body += data;
    });

    res.on("end", function() {
      const optimizedImgPath = path.join(
        optimizedPath,
        path.basename(imgpath, path.extname(imgpath)) +
          `_${obj.input.size}${path.extname(imgpath)}`
      );
      fs.writeFile(optimizedImgPath, body, "binary", err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(
          `[${imgpath}] \n 压缩成功，原始大小=>${obj.input.size}，压缩大小=>${
            obj.output.size
          }，优化比例=>${
            obj.output.ratio
          } \n 放至[${optimizedImgPath}] \n ----------------------`
        );
      });
    });
  });
  req.on("error", e => {
    console.error(e);
  });
  req.end();
}

/**
 * 模拟浏览器发送tiny官网的压缩图片http请求
 * 返回信息：
 * 1. {"input":{"size":8058,"type":"image/jpeg"},"output":{"size":7541,"type":"image/jpeg","width":400,"height":400,"ratio":0.9358,"url":"https://tinypng.com/web/output/mh9r7h1wb0e6t9tkcdmjthbekpun43nx"}}
 * 2. {"error":"Unauthorized","message":"Please use api.tinify.com"}或者{"error":"InputMissing","message":"Input file is empty"}等等...
 * @param {*} imgPath 原图路径
 * @param {*} optimizedPath 压缩文件夹路径
 *
 */
function fileTiny(imgPath, optimizedPath) {
  var req = https.request(options, res => {
    res.on("data", res => {
      // console.log(res.toString());
      let obj = JSON.parse(res.toString());
      if (obj.error) {
        console.log(`[${imgPath}]：压缩失败！报错：${obj.message}`);
      } else {
        fileSave(imgPath, obj, optimizedPath);
      }
    });
  });
  req.on("error", e => {
    console.error(e);
  });
  // 同步写入要上传的文件内容，记住encoding = binary，一般文件的读写都是二进制
  req.write(fs.readFileSync(imgPath), "binary");
  req.end();
}

/**
 * 文件过滤条件
 * @param {*} stats fs.Stats对象提供有关文件的信息
 * @param {*} file 文件路径
 */
function fileFilter(stats, file) {
  // 必须是文件，小于5MB，后缀 jpg||png
  return stats.size <= max && exts.includes(path.extname(file));
}

/**
 * 获取文件列表，如果是文件夹则递归
 *
 * @param {*} sourcePath 原图文件夹路径，也可以是单独的文件路径
 * @param {*} optimizedPath 压缩文件夹路径
 */
function fileList(sourcePath, optimizedPath) {
  fs.statSync(optimizedPath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!stats.isDirectory()) {
      console.log("压缩文件夹路径出错，不是文件夹...");
      return;
    }
  });
  fs.stat(sourcePath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (stats.isFile()) {
      if (fileFilter(stats, sourcePath)) {
        fileTiny(sourcePath, optimizedPath);
      } else {
        console.log("文件" + sourcePath + "不符合压缩条件");
      }
      return;
    }
    if (stats.isDirectory()) {
      fs.readdir(sourcePath, (err, files) => {
        if (err) {
          console.error(err);
        }
        files.forEach(file => {
          fileList(path.join(sourcePath, file), optimizedPath);
        });
      });
    }
  });
}

// 程序入口
fileList(sourcePath, optimizedPath);
