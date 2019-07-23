const Router = require("koa-router");
const router = new Router();

router.get("/", async ctx => {
  // console.log(1111);
  // ctx.body = {
  //   msg: "12"
  // };
  var data = [
    { serverType: 1, ipWAN: "10.1.77.73", portWAN: 6080 },
    { serverType: 11, ipWAN: "10.1.77.73", portWAN: 6080 },
    { serverType: 9, ipWAN: "file.glodon.com", portWAN: 80 }
  ];
  ctx.body = `callback(${JSON.stringify(data)})`;
});

module.exports = router;
