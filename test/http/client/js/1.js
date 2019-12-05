let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});
var result;
async function demo(params) {
  console.log(1111);
  try {
    result = await p;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  console.log(2222);
}

demo();
// while (true) {
//   if (result === "success") {
//     break;
//   }
// }
console.log(33333);
