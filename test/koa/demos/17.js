const Koa = require("koa");
const app = new Koa();
const main = ctx => {
  ctx.throw(500);
  // ctx.throw(400, ".name required");
};
app.use(main);
app.on("error", (err, ctx) => console.error("server error", err));
app.listen(3000);
