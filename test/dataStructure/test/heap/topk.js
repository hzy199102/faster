/**
 * 一个非常大的数据集合有n个整数，求集合中最大的K个值。
 */
const { BitMap } = require("../../js_class/bitmap/bitmap");
const { MinHeap } = require("../../js_class/heap/minheap");
/**
 * 创建一个不重复的随机数组
 * @param {*} num 数组最大长度
 */
function createData(num) {
  var arr = [];
  var size = Math.floor(num / 32);
  var bit_map_data = new BitMap(size);
  for (i = 0; i < num; i++) {
    var temp = Math.floor(Math.random() * (num - 1) + 1);
    if (bit_map_data.isExist(temp)) {
      continue;
    }
    bit_map_data.addMember(temp);
    arr.push(temp);
  }
  return arr;
}

var sum = 127;
var arr = createData(sum);
console.log(arr.length);

function topk(num, arr) {
  var min_heap = new MinHeap(num);
  for (let i = 0; i < num; i++) {
    min_heap.insert(arr[i]);
  }
  for (let i = num; i < arr.length; i++) {
    if (arr[i] > min_heap.get_min()) {
      min_heap.remove_min();
      min_heap.insert(arr[i]);
    }
  }
  min_heap.print();
}
topk(3, arr);
