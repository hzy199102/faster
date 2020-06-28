import "./main.css";
var { file, parse } = require("./globals2.js");
console.log(file);
parse();

function component() {
  var element = document.createElement("div");

  element.innerHTML = _join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
