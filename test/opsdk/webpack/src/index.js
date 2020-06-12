// import _ from "lodash";
// var { file, parse } = require("./globals.js");
// console.log(file);
// parse();
// function component() {
//   var element = document.createElement("div");

//   // Lodash, now imported by this script
//   // element.innerHTML = _.join(["Hello", "webpack"], " ");
//   element.innerHTML = _join(["Hello", "webpack"], " ");

//   // this.alert("Hmmm, this probably isn't a great idea...");

//   return element;
// }

// document.body.appendChild(component());

import _ from "lodash";
import printMe from "./print.js";

if ("serviceWorker" in navigator) {
  console.log(111);
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

function component() {
  var element = document.createElement("div");
  var btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
