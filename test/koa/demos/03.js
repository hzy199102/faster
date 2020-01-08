const Koa = require("koa");
const app = new Koa();

// Koa 默认的返回类型是text/plain
const main = ctx => {
  console.log(ctx.request.accepts("xml"));
  console.log(ctx.request.accepts("json1111"));
  if (ctx.request.accepts("xml")) {
    ctx.response.type = "xml";
    ctx.response.body = "<data>Hello World</data>";
  } else if (ctx.request.accepts("json")) {
    ctx.response.type = "json";
    ctx.response.body = { data: "Hello World" };
  } else if (ctx.request.accepts("html")) {
    ctx.response.type = "html";
    ctx.response.body = "<p>Hello World</p>";
  } else {
    ctx.response.type = "text";
    ctx.response.body = "Hello World";
  }
};

app.use(main);

app.listen(3000);
