/**
 * 输出指定层的节点个数
 */
const { BinaryTree } = require("../../js_class/tree/binarytree");
const { Queue } = require("../../js_class/queue/myQueue");
var bt = new BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

// 获得宽度
var get_width = function(node, n) {
  // 实现你的函数
  if (node == null) {
    return 0;
  }
  var queue = new Queue();
  queue.enqueue(node);
  queue.enqueue(0);
  var width = 1;
  var level = 0;
  while (!queue.isEmpty()) {
    var del_item = queue.dequeue();
    // 处理完当前层的数据，此时queue获得了下一层的全部数据信息
    if (del_item === 0) {
      level += 1; // 当前层
      if (level === n) {
        // 这个数据是在上一层处理的时候就已经保存好了的，哪怕是初始化也是提前保存了下一层的数据
        return width;
      }
      width = queue.size(); // 下一层的总数
      if (queue.isEmpty()) {
        break;
      } else {
        queue.enqueue(0);
      }
    }
    if (del_item.leftChild) {
      queue.enqueue(del_item.leftChild);
    }
    if (del_item.rightChild) {
      queue.enqueue(del_item.rightChild);
    }
  }
};

console.log(get_width(root_node, 1));
console.log(get_width(root_node, 2));
console.log(get_width(root_node, 3));
console.log(get_width(root_node, 4));
console.log(get_width(root_node, 5));
