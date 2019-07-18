/**
 * koa2 框架，不多说
 */
const Koa = require("koa");
const path = require("path");
// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
// 下面以koa2-cors为例:https://www.jianshu.com/p/5b3acded5182【node.js 应答跨域请求实现 （以koa2-cors为例）】
const cors = require("koa2-cors");

const app = new Koa();

const port = 12802;

const koaBody = require("koa-body");
app.use(koaBody());
// 具体参数我们在后面进行解释
app.use(
  cors({
    origin: function(ctx) {
      return "*";
      // console.log(ctx.url);
      // if (ctx.url === "/") {
      //   return "*"; // 允许来自所有域名请求
      // }
      // // 这样就能只允许 http://localhost:8080 这个域名的请求了
      // return "http://127.0.0.1:8080";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

// 导入路由文件
const dispatch = require("./routes/index");
app.use(dispatch.routes());

// 监听端口
app.listen(port, function() {
  console.log(`server run as http://10.1.77.73:${port}`);
});
