var { BitMap } = require("../../js_class/bitmap/bitmap.js");

/**
 * 创建一个不重复的随机数组
 * @param {*} num 数组最大长度
 */
function createData(num) {
  var arr = [];
  var size = Math.floor(num / 32);
  var bit_map_data = new BitMap(size);
  for (i = 0; i < num; i++) {
    var temp = Math.random() * (num - 1) + 1;
    if (bit_map_data.isExist(temp)) {
      continue;
    }
    bit_map_data.addMember(temp);
    arr.push(temp);
  }
  return arr;
}
// var arr = [0, 6, 88, 7, 73, 34, 10, 99, 22]
var sum = 32000;
var arr = createData(sum);
console.log(arr.length);
var sort_arr = [];
var bit_map = new BitMap(4);
var start = Date.now();
for (var i = 0; i < arr.length; i++) {
  bit_map.addMember(arr[i]);
}
for (var i = 0; i <= sum; i++) {
  if (bit_map.isExist(i)) {
    sort_arr.push(i);
  }
}
console.log(Date.now() - start);
console.log(sort_arr.length)
var start = Date.now()
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
bubbleSort(arr)
console.log(Date.now() - start);
console.log(sort_arr.length)
