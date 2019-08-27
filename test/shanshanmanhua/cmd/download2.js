var { checkPath, readFile, downloadFile } = require("../utils/fs");
var { sequence } = require("../utils/promise");

async function readJson() {
  const data = await readFile("../url/调教家政妇.json");
  console.log(data);
  const json = JSON.parse(data);
  const cur = 30;
  await sequence(
    json.map((list, idx) => async () => {
      const dirpath = `../jojo/${idx + 1}`;
      await checkPath(dirpath);
      await sequence(
        chunk(list, cur).map((pages, pdx) => async () => {
          await sleep(Math.random() * 1000);
          console.log("正在获取:", `/jojo/${idx + 1}/`, ` 第${pdx + 1}批`);
          await Promise.all(
            pages.map(async (j, jdx) => {
              const filepath = `../url/${idx + 1}/${cur * pdx + jdx + 1}.jpg`;
              async function race() {
                await sleep(Math.random() * 1000);
                const res = await Promise.race([
                  downloadFile(j, filepath),
                  sleep(60000)
                ]);
                if (res) {
                  // console.log('下载成功');
                } else {
                  console.log("重新加入队列");
                  await race();
                }
              }
              await race();
            })
          );
        })
      );
    })
  );
  console.log("获取成功");
}
// readJson();
