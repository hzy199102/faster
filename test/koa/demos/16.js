const Koa = require("koa");
const app = new Koa();
const compose = require("koa-compose");
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

const middlewares = compose([handler, main]);
app.use(middlewares);
// app.use(handler);
// app.use(main);
app.listen(3000);
