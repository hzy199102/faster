/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
const path = require("path");
const fs = require("fs");

/**
 * 同步操作
 * @param {*} p
 */
function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
  return p;
}

module.exports = checkDirExist;
