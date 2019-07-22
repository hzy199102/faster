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
