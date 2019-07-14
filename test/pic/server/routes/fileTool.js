const Router = require("koa-router");
const router = new Router({ prefix: "/file" });
const uploadMulterMiddleware = require("../middleware/upload_multer");
const uploadTinyMiddleware = require("../middleware/upload_body");

router.post("/multer", uploadMulterMiddleware, async ctx => {
  ctx.body = {
    message: "multer上传成功"
  };
});

router.post("/tiny", uploadTinyMiddleware, async ctx => {
  ctx.body = {
    message: "tiny上传成功"
  };
});

module.exports = router;
