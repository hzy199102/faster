const fs = require("fs");
var path = require("path");
var filePath = path.resolve("./config.json");
var subFilePath = path.resolve("./config2.json");

var subFile = JSON.parse(fs.readFileSync(subFilePath, { encoding: "utf8" }));
console.log(subFile);
console.log(111);
try {
  var file = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));
  console.log(file);
  console.log(222);
  var a = Object.assign(file, subFile);
  console.log(a);
  console.log(file);
  console.log(subFile);
} catch (error) {
  console.log(error);
}
