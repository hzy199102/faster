const http = require("http");
const fs = require("fs");

const port = 12307;
const rootPath = "./client/";
const htmlReg = /^\/(index)?$/;
const cssReg = /^\/(link)([12])/;
const scriptReg = /^\/(script)([12])/;
const scriptFastReg = /^\/(script3)/;

http
  .createServer((req, res) => {
    let { url } = req;
    switch (true) {
      case cssReg.test(url):
        res.setHeader("Content-Type", "text/css");
        res.writeHead(200, { "Content-Type": "text/css" });
        setTimeout(() => {
          res.end(
            fs.readFileSync(
              `${rootPath}${url.match(cssReg)[1]}${url.match(cssReg)[2]}.css`
            )
          );
        }, url.match(cssReg)[2] * 1000);
        break;
      case scriptReg.test(url):
        res.setHeader("Content-Type", "application/javascript");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        setTimeout(() => {
          res.end(
            fs.readFileSync(
              `${rootPath}${url.match(scriptReg)[1]}${
                url.match(scriptReg)[2]
              }.js`
            )
          );
        }, url.match(scriptReg)[2] * 1000);
        break;
      case scriptFastReg.test(url):
        res.setHeader("Content-Type", "application/javascript");
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(
          fs.readFileSync(`${rootPath}${url.match(scriptFastReg)[1]}.js`)
        );
        break;
      case htmlReg.test(url):
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync(`${rootPath}index.html`));
        break;
      default:
        res.end("");
    }
  })
  .listen(port, () => {
    console.log(`server run as http://127.0.0.1:${port}`);
  });
