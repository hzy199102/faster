const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const router = new Router({ prefix: "/file" });
const uploadMulterMiddleware = require("../middleware/upload_multer");
const uploadOptimizedMiddleware = require("../middleware/upload_optimized");
const uploadResizeMiddleware = require("../middleware/upload_resize");
const uploadTinyTestMiddleware = require("../middleware/upload_tinyTest");

const upload_static = {
  // 原文件存放路径
  sourceDir: path.join(__dirname, "../upload/source/"),
  // 压缩文件存放路径
  optimizedDir: path.join(__dirname, "../upload/optimized/"),
  // 压缩文件的类型要求
  extensions: [".jpg", ".jpeg", ".png", ".gif"]
  // mimetyps: ["image/png", "image/jpg", "image/jpeg"]
};
router.post("/multer", uploadMulterMiddleware, async ctx => {
  ctx.body = {
    message: "multer上传成功"
  };
});

router.post("/tiny", uploadTinyTestMiddleware, async ctx => {
  ctx.body = {
    message: "tiny上传成功"
  };
});

// 中间件的加载顺序是从左往右
router.post(
  "/optimized",
  uploadOptimizedMiddleware(upload_static),
  async ctx => {
    ctx.body = {
      message: ctx.upload.res
    };
  }
);

// 测试不走koa-static的内容怎么传递回前端，其实如果看koa-static的原理，应该也和这个类似
router.get("/resize", uploadResizeMiddleware(upload_static), async ctx => {
  
});

module.exports = router;
