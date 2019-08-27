const fs = require("fs");
const request = require("request");

// 创建文件夹
function mkdir(pos, dirArray, _callback) {
  const len = dirArray.length;
  console.log(len);
  if (pos >= len || pos > 10) {
    _callback();
    return;
  }
  let currentDir = "";
  for (let i = 0; i <= pos; i++) {
    if (i != 0) currentDir += "/";
    currentDir += dirArray[i];
  }
  fs.exists(currentDir, exists => {
    if (!exists) {
      fs.mkdir(currentDir, err => {
        if (err) {
          console.log("创建文件夹出错！");
        } else {
          console.log(`${currentDir}文件夹-创建成功！`);
          mkdir(pos + 1, dirArray, _callback);
        }
      });
    } else {
      console.log(`${currentDir}文件夹-已存在！`);
      mkdir(pos + 1, dirArray, _callback);
    }
  });
}

// 创建目录结构
function mkdirs(dirpath, _callback) {
  const dirArray = dirpath.split("/");
  fs.exists(dirpath, exists => {
    if (!exists) {
      mkdir(0, dirArray, () => {
        console.log(`已创建路径：${dirpath}`);
        _callback();
      });
    } else {
      //   console.log('文件夹已经存在!准备写入文件!');
      _callback();
    }
  });
}

const checkPath = dirpath =>
  new Promise((resolve, reject) => {
    mkdirs(dirpath, resolve);
  });

const readFile = (path, type = "utf8") =>
  new Promise((resolve, reject) => {
    fs.readFile(path, type, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    // 块方式写入文件
    const ws = fs.createWriteStream(filepath);
    ws.on("open", () => {
      console.log("下载：", url, filepath);
    });
    ws.on("error", err => {
      console.log("出错：", url, filepath);
      reject(err);
    });
    ws.on("finish", () => {
      console.log("完成：", url, filepath);
      resolve(true);
    });
    request(url).pipe(ws);
  });
}
const sleep = ms => () => new Promise(resolve => setTimeout(resolve, ms));
async function readJson() {
  const data = await readFile("../url/禁欲进行时.json");
  const json = JSON.parse(data);
  var i = 0;
  for (var key in json) {
    // i++;
    // if (i > 4) {
    //   break;
    // }
    const dirpath = `../url/禁欲进行时`;
    await checkPath(dirpath);
    var list = json[key];
    for (let i = 0; i < list.length; i++) {
      // 怕被封IP，低调点...
      await sleep(Math.random() * 10000);
      var filepath = `../url/禁欲进行时/${key}_${list[i].substr(
        list[i].lastIndexOf("/") + 1,
        6
      )}.jpg`;
      downloadFile(list[i], filepath);
    }
  }
}
// readJson();
async function readJson2() {
  const data = await readFile("../url/禁欲进行时.json");
  const json = JSON.parse(data);
  var i = 0;
  for (var key in json) {
    i += json[key].length;
  }
  console.log(i);
}

// readJson2();
