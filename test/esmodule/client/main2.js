import { message } from "./main1.js";
var count = 5;
export { count };
console.log(message);
setTimeout(() => {
  console.log(message);
}, 0);
