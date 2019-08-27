// 参考资料：https://blog.csdn.net/weixin_34319640/article/details/93164345
const fs = require("fs");
const path = require("path");

const https = require("https");
const { URL } = require("url");

const { config } = require("../config");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

console.log(config.ddmmcc);

async function getData(url) {
  const html = await fetch(url).then(res => res.text());
  const $ = cheerio.load(html, { decodeEntities: false });

  //   获取title
  const title = await $("div .con h3").text();
  console.log(title);

  // 获取目录列表
  const list = [];
  function getVlue() {
    console.log($(this).attr("title"));
    console.log($(this).attr("href"));
    // const href = `${baseUrl}${$(this)
    //   .find("a")
    //   .attr("href")}`;
    // list.push({
    //   href
    // });
  }
  await $("#sort_div_p")
    .find("a")
    .map(getVlue);
}

getData(config.ddmmcc.data.tjjzf.url);

// fileList(root);

// // 获取文件列表
// function fileList(folder) {
//   fs.readdir(folder, (err, files) => {
//     if (err) console.error(err);
//     files.forEach(file => {
//       fileFilter(folder + file);
//     });
//   });
// }

// // 过滤文件格式，返回所有jpg,png图片
// function fileFilter(file) {
//   fs.stat(file, (err, stats) => {
//     if (err) return console.error(err);
//     if (
//       // 必须是文件，小于5MB，后缀 jpg||png
//       stats.size <= max &&
//       stats.isFile() &&
//       exts.includes(path.extname(file))
//     ) {
//       fileUpload(file); // console.log('可以压缩：' + file);
//     }
//     if (stats.isDirectory()) fileList(file + "/");
//   });
// }
// // 异步API,压缩图片
// // {"error":"Bad request","message":"Request is invalid"}
// // {"input": { "size": 887, "type": "image/png" },"output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }}
// function fileUpload(img) {
//   var req = https.request(options, function(res) {
//     res.on("data", buf => {
//       let obj = JSON.parse(buf.toString());
//       if (obj.error) {
//         console.log(`[${img}]：压缩失败！报错：${obj.message}`);
//       } else {
//         fileUpdate(img, obj);
//       }
//     });
//   });

//   req.write(fs.readFileSync(img), "binary");
//   req.on("error", e => {
//     console.error(e);
//   });
//   req.end();
// }
// // 该方法被循环调用,请求图片数据
// function fileUpdate(imgpath, obj) {
//   let options = new URL(obj.output.url);
//   let req = https.request(options, res => {
//     let body = "";
//     res.setEncoding("binary");
//     res.on("data", function(data) {
//       body += data;
//     });

//     res.on("end", function() {
//       fs.writeFile(imgpath, body, "binary", err => {
//         if (err) return console.error(err);
//         console.log(
//           `[${imgpath}] \n 压缩成功，原始大小-${obj.input.size}，压缩大小-${
//             obj.output.size
//           }，优化比例-${obj.output.ratio}`
//         );
//       });
//     });
//   });
//   req.on("error", e => {
//     console.error(e);
//   });
//   req.end();
// }
