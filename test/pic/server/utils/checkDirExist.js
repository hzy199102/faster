/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
const path = require("path");
const fs = require("fs");

/**
 * 同步操作
 * 目录必须一层一层创建
 * @param {*} dir 目录路径
 */
function checkDirExist(dir) {
  if (!fs.existsSync(dir)) {
    // 如果目录不存在
    // 递归确定它的上一层目录是否存在
    checkDirExist(path.dirname(dir));
    // 创建目录
    fs.mkdirSync(dir);
  }
  return dir;
}

module.exports = checkDirExist;
