const fs = require("fs");
const Koa = require("koa");
const app = new Koa();

const main = async function(ctx, next) {
  ctx.response.type = "html";
  ctx.response.body = await new Promise((resolve, reject) => {
    // 读image文件夹
    fs.readFile("./template.html", "utf-8", (err, data) => {
      if (err) ctx.throw(err);
      // jsonData = json; // 将所有的文件夹名字放到外面来。
      resolve(data); // resolve过后，await语句才结束
    });
  });
};

app.use(main);
app.listen(3000);
