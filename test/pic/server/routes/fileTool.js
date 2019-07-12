const Router = require("koa-router");
const router = new Router({ prefix: "/file" });
const uploadMiddleware = require("../middleware/upload");

router.post("/exif", uploadMiddleware, async ctx => {
  ctx.body = {
    message: "上传成功"
  };
});

module.exports = router;
