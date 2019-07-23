const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
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
  // 如果是sendBeacon方式，使用如下方式响应
  // ctx.status = 200;
  // ctx.body = "1111111";
});
router.get("/report", async ctx => {
  console.log(ctx.query);
  console.log(ctx.querystring);
  console.log(ctx.query.fuc);
  // 上报成功图片返回，一定要是图片，否则前端不支持
  await new Promise((resolve, reject) => {
    var stream = fs.createReadStream(
      // path.join(__dirname, "../../client/robot400.jpg")
      path.join(__dirname, "../../client/report.jpg")
    );
    var responseData = [];
    //判断状态
    stream.on("data", function(chunk) {
      responseData.push(chunk);
    });
    stream.on("end", function() {
      // console.log(responseData)
      resolve(Buffer.concat(responseData));
    });
    stream.on("error", function(e) {
      reject(e);
    });
  }).then(data => {
    ctx.status = 200;
    // 不加这句话会浏览器会自动下载图片
    ctx.type = "jpeg";
    ctx.body = data;
  });
  // ctx.body = {
  //   message: "report上报成功1111"
  // };
});

module.exports = router;
