// 参考资料：https://blog.csdn.net/weixin_34319640/article/details/93164345
const fs = require("fs");
const { config } = require("../config");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

// 漫画目录页
async function getData(url) {
  const html = await fetch(url).then(res => res.text());
  const $ = cheerio.load(html, { decodeEntities: false });

  //   获取title
  const title = await $("div .con h3").text();
  console.log(title);

  // 获取目录列表
  const list = [];
  function getVlue() {
    var key = $(this).attr("title");
    var href = $(this).attr("href");
    list.push({
      key,
      href
    });
  }
  await $("#sort_div_p")
    .find("a")
    .map(getVlue);

  return {
    list,
    title
  };
}

// 漫画集页
async function getData2(url) {
  const html = await fetch(url).then(res => res.text());
  // console.log(html);
  var sFilesP = html.indexOf("sFiles=");
  var sPathP = html.indexOf("sPath=");
  var endP = html.indexOf(";</script>");
  var sFiles = html.substr(sFilesP + 8, sPathP - sFilesP - 14);
  var sPath = html.substr(sPathP + 7, endP - sPathP - 8);
  // console.log(sFiles);
  // console.log(sPath);
  var sDS =
    "http://20.94201314.net/dm01/|http://20.94201314.net/dm02/|http://20.94201314.net/dm03/|http://20.94201314.net/dm04/|http://20.94201314.net/dm05/|http://20.94201314.net/dm06/|http://20.94201314.net/dm07/|http://20.94201314.net/dm08/|http://20.94201314.net/dm09/|http://20.94201314.net/dm10/|http://20.94201314.net/dm11/|http://20.94201314.net/dm12/|http://20.94201314.net/dm13/|http://20.94201314.net/dm14/|http://20.94201314.net/dm15/|http://20.94201314.net/dm16/";

  var getDomain = function(sDS, sPath) {
    arrDS = sDS.split("|");
    var u = "";
    for (i = 0; i < arrDS.length; i++) {
      if (sPath == i + 1) {
        u = arrDS[i];
        break;
      }
    }
    return u;
  };

  var sDomain = getDomain(sDS, sPath);
  // console.log(sDomain);

  var unsuan = function(s) {
    var x = s.substring(s.length - 1);
    var xi = "abcdefghijklmnopqrstuvwxyz".indexOf(x) + 1;
    var sk = s.substring(s.length - xi - 12, s.length - xi - 1);
    s = s.substring(0, s.length - xi - 12);
    var k = sk.substring(0, sk.length - 1);
    var f = sk.substring(sk.length - 1);
    for (i = 0; i < k.length; i++) {
      eval("s=s.replace(/" + k.substring(i, i + 1) + "/g,'" + i + "')");
    }
    var ss = s.split(f);
    s = "";
    for (i = 0; i < ss.length; i++) {
      s += String.fromCharCode(ss[i]);
    }
    return s;
  };
  sFiles = unsuan(sFiles);
  // console.log(sFiles);
  var arrFiles = sFiles.split("|");
  var sImgListStr = "";

  // for (i = 0; i < arrFiles.length; i++) {
  //   if (sImgListStr == "")
  //     sImgListStr = "{url:'" + sDomain + arrFiles[i] + "',caption:''}";
  //   else sImgListStr += ",{url:'" + sDomain + arrFiles[i] + "',caption:''}";
  // }
  // sImgListStr = "var imglist = [" + sImgListStr + "];";

  for (i = 0; i < arrFiles.length; i++) {
    if (sImgListStr == "") sImgListStr = "'" + sDomain + arrFiles[i] + "'";
    else sImgListStr += ",'" + sDomain + arrFiles[i] + "'";
  }
  sImgListStr = "var imglist = [" + sImgListStr + "];";

  eval(sImgListStr);
  // console.log(imglist);
  return imglist;
}

async function handle() {
  var source = {};
  // var main = await getData(config.ddmmcc.data.tjjzf.url);
  var main = await getData(config.ddmmcc.data.jyjxs.url);
  // console.log(list);
  // list2 = await getData2("http://ddmmcc.com/vols/37742_347067/");
  // console.log(list2);
  for (var i = main.list.length - 1; i >= 0; i--) {
    source[main.list[i].key] = await getData2(main.list[i].href);
  }
  console.log(1111);
  console.log(source);
  fs.writeFileSync(`../url/${main.title}.json`, JSON.stringify(source));
}
handle();
