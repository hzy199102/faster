var { MinHeap } = require("./minheap");

var TreeNode = function(data) {
  this.data = data; // 数据
  this.leftChild = null; //左孩子
  this.rightChild = null; //右孩子
  this.parentNode = null; // 父节点
  // 比较的时候隐式转换
  this.toString = () => {
    return this.data.rate;
  };
  // 2种写法都可以
  //   this.toString = function() {
  //     return this.data.rate;
  //   };
};

var CodeNode = function(code, rate) {
  this.code = code;
  this.rate = rate;
};

/**
 * 哈弗曼树
 * 哈弗曼树可以用堆实现，但是不代表它是个完全二叉树
 * 一定涉及到权重的概念
 */
function HuffmanTree() {
  var root = null;
  this.init_tree = function(arr) {
    var min_heap = new MinHeap();
    min_heap.init(arr);
    // 注意是一次性处理2个数，所以是length - 1，而不是length
    for (let i = 0; i < arr.length - 1; i++) {
      var first = min_heap.remove_min();
      var second = min_heap.remove_min();

      var new_item = new CodeNode("", first.data.rate + second.data.rate);
      var new_node = new TreeNode(new_item);
      min_heap.insert(new_node);
      new_node.leftChild = first;
      new_node.rightChild = second;
      first.parentNode = new_node;
      second.parentNode = new_node;

      root = new_node;
    }
  };

  /**
   *
   * @param {*} node 需要处理的节点
   * @param {*} dict 要展示的数字字典
   * @param {*} code 当前节点编号，编号的设置会有一个规则
   */
  var get_code_from_tree = function(node, dict, code_str) {
    if (!node.leftChild && !node.rightChild) {
      // 叶子节点
      dict[node.data.code] = code_str;
    }
    if (node.leftChild) {
      get_code_from_tree(node.leftChild, dict, code_str + "0");
    }
    if (node.rightChild) {
      get_code_from_tree(node.rightChild, dict, code_str + "1");
    }
  };

  this.get_code = function() {
    // 获得最终的变长编码
    var code_dict = {};
    get_code_from_tree(root, code_dict, "");
    return code_dict;
  };
}

// 准备数据
var code_dict = {
  a: 0.12,
  b: 0.4,
  c: 0.15,
  d: 0.08,
  e: 0.25
};
var forest = [];

for (var key in code_dict) {
  var item = new CodeNode(key, code_dict[key]);
  forest.push(new TreeNode(item));
}

var huffman_tree = new HuffmanTree();
huffman_tree.init_tree(forest);
console.log(huffman_tree.get_code());
