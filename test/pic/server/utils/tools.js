/**
 * 工具库
 */
const path = require("path");
const fs = require("fs");

const tools = {
  /**
   * 同步操作
   * 目录必须一层一层创建
   * @param {*} dir 目录路径
   */
  checkDirExist: function(dir) {
    if (!fs.existsSync(dir)) {
      // 如果目录不存在
      // 递归确定它的上一层目录是否存在
      this.checkDirExist(path.dirname(dir));
      // 创建目录
      fs.mkdirSync(dir);
    }
    return dir;
  },

  /**
   * 获取文件名
   * @param {*} filePath 文件路径
   */
  getFileName: function(filePath) {
    return path.basename(filePath, path.extname(filePath));
  },

  /**
   * 获取文件类型
   * @param {*} filePath
   */
  getFileType: function(filePath) {
    return path
      .extname(filePath)
      .toLowerCase()
      .substr(1);
  }
};

module.exports = tools;
