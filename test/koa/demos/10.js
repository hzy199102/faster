const Koa = require("koa");
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
};
app.use(logger);

const main = ctx => {
  ctx.response.body = "Hello World";
};
app.use(main);
app.listen(3000);
