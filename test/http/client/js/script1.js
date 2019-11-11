function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}
sleep(6 * 1000);
console.log("script1");
