console.log("script3");
export default "hello world";
// type=module 这段代码才能执行，否则Uncaught SyntaxError: Unexpected identifier
// import message from "./script1.js";
// console.log("来自script3的import引入：" + message);
