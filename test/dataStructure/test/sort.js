var { BitMap } = require("../js_class/bitmap/bitmap.js");
const { MinHeap } = require("../js_class/heap/minheap");
const { MaxHeap } = require("../js_class/heap/maxheap");
var {
  BinarySearchTree
} = require("../js_class/search_tree/binarysearchtree.js");

var { AVLTree } = require("../js_class/search_tree/avl_tree.js");
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

/**
 * bitmap 排序
 * 有局限性，只能不同的数据
 * @param {*} arr
 * @param {*} sort_arr
 */
function bitmapSort(arr, sort_arr) {
  sort_arr = [];
  var start = Date.now();
  var bit_map = new BitMap(Math.floor(arr.length / 32) + 1);
  for (var i = 0; i < arr.length; i++) {
    bit_map.addMember(arr[i]);
  }
  for (var i = 0; i <= sum; i++) {
    if (bit_map.isExist(i)) {
      sort_arr.push(i);
    }
  }
  console.log("bitmap 排序耗时(ms)：", Date.now() - start);
  console.log("bitmap 排序长度：", sort_arr.length);
}

/**
 * minheap 从小到大排序
 * @param {*} arr
 * @param {*} sort_arr
 */
function minHeapSort(arr, sort_arr) {
  sort_arr = [];
  var start = Date.now();
  var min_heap = new MinHeap(arr.length);
  for (let i = 0; i < arr.length; i++) {
    min_heap.insert(arr[i]);
  }
  var sort_arr = [];
  for (let i = 0; i < arr.length; i++) {
    sort_arr.push(min_heap.remove_min());
  }
  console.log("minheap从小到大排序耗时(ms)：", Date.now() - start);
  console.log("minheap从小到大排序长度：", sort_arr.length);
  // console.log("minheap从小到大排序：", sort_arr);
}

/**
 * maxheap从大到小排序
 * @param {*} arr
 * @param {*} sort_arr
 */
function maxHeapSort(arr, sort_arr) {
  sort_arr = [];
  var start = Date.now();
  var max_heap = new MaxHeap(arr.length);
  for (let i = 0; i < arr.length; i++) {
    max_heap.insert(arr[i]);
  }
  var sort_arr = [];
  for (let i = 0; i < arr.length; i++) {
    sort_arr.push(max_heap.remove_max());
  }
  console.log("maxheap从大到小排序耗时(ms)：", Date.now() - start);
  console.log("maxheap从大到小排序长度：", sort_arr.length);
  // console.log("maxheap从大到小排序：", sort_arr);
}

/**
 * 二叉搜索树排序
 * @param {*} arr
 * @param {*} sort_arr
 */
function binarySearchTreeSort(arr, sort_arr) {
  sort_arr = [];
  var start = Date.now();
  var binarySearchTree = new BinarySearchTree();
  for (let i = 0; i < arr.length; i++) {
    binarySearchTree.insert(arr[i]);
  }
  binarySearchTree.sort(binarySearchTree.get_root(), sort_arr);
  console.log("二叉搜索树高度：", binarySearchTree.height());
  console.log("二叉搜索树排序耗时(ms)：", Date.now() - start);
  console.log("二叉搜索树排序长度：", sort_arr.length);
}

/**
 * AVL树排序
 * @param {*} arr
 * @param {*} sort_arr
 */
function AVLTreeSort(arr, sort_arr) {
  // arr = [10, 4, 2, 6, 7];
  sort_arr = [];
  var start = Date.now();
  var avlTree = new AVLTree();
  for (let i = 0; i < arr.length; i++) {
    avlTree.insert(arr[i]);
  }
  avlTree.sort(avlTree.get_root(), sort_arr);
  console.log("AVL树排序耗时(ms)：", Date.now() - start);
  console.log("AVL树排序长度：", sort_arr.length);
  var height = avlTree.height();
  console.log("AVL树高度：", height);
}

/**
 * 冒泡排序
 * @param {*} arr
 */
function bubbleSort(arr) {
  var start = Date.now();
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //相邻元素两两对比
        var temp = arr[j + 1]; //元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  console.log("冒泡排序耗时(ms)：", Date.now() - start);
  console.log("冒泡排序长度：", arr.length);
}
var sum = 1;
var max = 20;
for (let i = 1; i < max; i++) {
  sum = sum * 2;
}
// sum = 8192;
console.log(sum);
var arr = createData(sum);
console.log("随机数长度：", arr.length);
var sort_arr = [];

bitmapSort(arr, sort_arr);
minHeapSort(arr, sort_arr);
maxHeapSort(arr, sort_arr);
// bubbleSort(arr, sort_arr);
/**
 * 搜索二叉树的生成比AVL树耗时要短，在排序中AVL树没有任何优势，但是在查找时，AVL树比搜索二叉树优势更大
 */
binarySearchTreeSort(arr, sort_arr);
AVLTreeSort(arr, sort_arr);
