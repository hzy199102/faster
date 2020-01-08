const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const redirect = ctx => {
  ctx.response.redirect("/");
};

const main = ctx => {
  ctx.response.body = "Hello World";
};

router.get("/", main);
router.get("/redirect", redirect);

app.use(router.routes());

app.listen(3000);
