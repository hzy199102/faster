/**
 * koa2 框架，不多说
 */
const Koa = require("koa");
const path = require("path");
/**
 * 静态资源
 */
const static = require("koa-static");
// const bodyparser = require('koa-bodyparser')
/**
 * 路由
 */
const Router = require("koa-router");

const app = new Koa();

const port = 12603;

// 错误处理中间件写在最上面
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 系统日志
    // console.log(error);
    // 给用户显示信息
    // ctx.status = error.statusCode || error.status || 500;
    // ctx.type = "json";
    ctx.type = "text";
    if (error.expose) {
      ctx.body = error.message;
    } else {
      ctx.body = error.stack;
    }

    // 全局错误处理
    ctx.app.emit("error", error);
  }
});

// 静态文件服务
app.use(static(path.resolve("./client")));
// 注册bodyparser
// app.use(bodyparser())
/**
 * koa2 使用 koa-body 代替 koa-bodyparser 和 koa-multer
 */
const koaBody = require("koa-body");
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      multipart: true // 支持多文件上传，默认开启
    }
  })
);
const cors = require("koa2-cors");
// 这是通用设置，但是对于请求设置了Credentialed，则无效，因为通用设置中origin："*"
// app.use(cors());
// 需要自定义设置
app.use(
  cors({
    origin: function(ctx) {
      // 请求设置了withCredentials，那不能配置return "*", 否则报如下错误：
      // Response to preflight request doesn't pass access control check:
      // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
      // The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
      return "*,*";
      // 这样就动态返回请求域了
      // return ctx.header.origin;
      // return "http://127.0.0.1:12602";
      // console.log(ctx.url);
      // if (ctx.url === "/") {
      //   return "*"; // 允许来自所有域名请求
      // }
      // // 这样就能只允许 http://localhost:8080 这个域名的请求了
      // return "http://127.0.0.1:8080";
    },
    // exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    // preflightContinue: false,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS "],
    // 如果是自定义设置，前端headers自定义传递的东西，这里一定要配置接受，
    // 如果不配置，在前端console也会提示错误原因，如以下就是缺少token
    // has been blocked by CORS policy: Request header field token is not allowed by Access-Control-Allow-Headers in preflight response.
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "token"
    ]
  })
);
// app.use(async (ctx, next) => {
//   console.log(11111);
//   // 允许来自所有域名请求
//   ctx.set("Access-Control-Allow-Origin", "*");
//   // 这样就能只允许 http://localhost:8080 这个域名的请求了
//   // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
//   // 设置所允许的HTTP请求方法
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

//   // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "x-requested-with, accept, origin, content-type"
//   );

//   // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

//   // Content-Type表示具体请求中的媒体类型信息
//   // ctx.set("Content-Type", "application/json;charset=utf-8");

//   // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
//   // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
//   ctx.set("Access-Control-Allow-Credentials", true);

//   // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
//   // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
//   // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
//   // ctx.set("Access-Control-Max-Age", 300);

//   /*
//     CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
//         Cache-Control、
//         Content-Language、
//         Content-Type、
//         Expires、
//         Last-Modified、
//         Pragma。
//     */
//   // 需要获取其他字段时，使用Access-Control-Expose-Headers，
//   // getResponseHeader('myData')可以返回我们所需的值
//   // ctx.set("Access-Control-Expose-Headers", "myData");

//   await next();
// });

// 导入路由文件
const report = require("./routes/report");
app.use(report.routes());

// 监听全局错误事件
app.on("error", err => {
  console.error(err);
});

// 监听端口
app.listen(port, function() {
  console.log(path.resolve("./"));
  console.log(__dirname);
  console.log(`server run as http://127.0.0.1:${port}`);
});
