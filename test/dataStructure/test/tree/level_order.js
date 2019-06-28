/**
 * 分层打印二叉树
 */
const { BinaryTree } = require("../../js_class/tree/binarytree");
const { Queue } = require("../../js_class/queue/myQueue");
var bt = new BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

// 层次遍历
var level_order = function(node) {
  var queue = new Queue();
  queue.enqueue(root_node);
  queue.enqueue(0);
  var str_link = "";
  while (!queue.isEmpty()) {
    var del_item = queue.dequeue();
    if (del_item === 0) {
      console.log(str_link);
      str_link = "";
      if (queue.isEmpty()) {
        break;
      } else {
        queue.enqueue(0);
      }
      continue;
    }
    str_link += del_item.data + "";
    if (del_item.leftChild) {
      queue.enqueue(del_item.leftChild);
    }
    if (del_item.rightChild) {
      queue.enqueue(del_item.rightChild);
    }
  }
};

level_order(root_node);
