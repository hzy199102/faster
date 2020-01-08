const Koa = require("koa");
const app = new Koa();
const serve = require("koa-static");
const path = require("path");

console.log(path.join(__dirname));
const main = serve(path.join(__dirname));

app.use(main);

app.listen(3000);
