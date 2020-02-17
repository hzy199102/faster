/**
 * 测试埋点接口
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const sourcePath = path.join(__dirname, "../upload/badge");
const options = {
  method: "post",
  hostname: "op-gdq.glodon.com",
  path: "/gdq/op/upload",
  //   rejectUnauthorized: false,
  headers: {
    Authorization:
      "NTk4YmZiMjM1MjBjZjc3ZDJkODZkMjNmX2VlMDEyNzE5LWZiMTUtNDUwZC05Y2I4LTEzODhkM2VmZDJmYw==",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
  }
};
const url = "https://eva.glodon.com/gdq/op/upload";
const resPath = path.join(__dirname, "./res.json");

// 上传图片
async function upload() {
  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      console.error(err);
    }
    var i = 0;
    files.forEach(async file => {
      i++;
      if (i > 2) {
        return false;
      }
      var imgPath = path.join(sourcePath, file);
      var req = https.request(options, res => {
        res.on("data", res => {
          console.log(res.toString());
        });
      });
      req.on("error", e => {
        console.error(e);
      });
      // 同步写入要上传的文件内容，记住encoding = binary，一般文件的读写都是二进制
      req.write(fs.readFileSync(imgPath), "binary");
      req.end();
    });
  });
  //
  //   const html = await fetch(url, {
  //     method: " POST "
  //   }).then(res => res.text());

  //   return {
  //     list,
  //     title
  //   };
}

async function handle() {
  await upload();
  console.log(1111);
  //   console.log(main);
  // fs.writeFileSync(`../url/${main.title}.json`, JSON.stringify(source));
}
handle();
