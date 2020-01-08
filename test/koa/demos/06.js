const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const about = async ctx => {
  ctx.response.type = "html";
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = async ctx => {
  ctx.response.body = "Hello World";
};

router.get("/", main);
router.get("/about", about);

app.use(router.routes());

app.listen(3000);
