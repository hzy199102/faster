const Router = require("koa-router");
const router = new Router();
router.post("/report", async ctx => {
  var data = null;
  if (typeof ctx.request.body === "string") {
    data = JSON.parse(ctx.request.body);
  } else {
    data = ctx.request.body;
  }
  console.log(data);
  // console.log(ctx.request.header);
  console.log(ctx.request.header.token);
  ctx.body = {
    message: "report上报成功"
  };
});

module.exports = router;
