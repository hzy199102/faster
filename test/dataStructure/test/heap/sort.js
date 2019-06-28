const { MinHeap } = require("../../js_class/heap/minheap");

var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var min_heap = new MinHeap(arr.length);
for (let i = 0; i < arr.length; i++) {
  min_heap.insert(arr[i]);
}
var sort_arr = [];
for (let i = 0; i < arr.length; i++) {
  sort_arr.push(min_heap.remove_min());
}
console.log(sort_arr);
