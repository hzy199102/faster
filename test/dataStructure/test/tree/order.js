const BinaryTree = require("../../js_class/tree/binarytree");
var { Stack } = require("../../js_class/stack/myStack.js");

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

function pre_order(node) {
  var line = "前序遍历：";
  var stack = new Stack();
  var curr_node = node;

  while (curr_node) {
    line += curr_node.data;
    if (curr_node.rightChild) {
      stack.push(curr_node.rightChild);
    }

    if (curr_node.leftChild) {
      curr_node = curr_node.leftChild;
    } else {
      // 没有左子树
      curr_node = stack.pop();
    }
  }
  console.log(line);
}

function in_order(node) {
  var line = "中序遍历：";
  var stack = new Stack();
  var curr_node = node;
  while (true) {
    while (curr_node) {
      stack.push(curr_node);
      curr_node = curr_node.leftChild;
    }
    var pop_item = stack.pop();
    line += pop_item.data;
    curr_node = pop_item.rightChild;
    if (!curr_node && stack.isEmpty()) {
      break;
    }
  }
  console.log(line);
}
var Tag = function(node, state) {
  this.node = node;
  this.state = state; // 0表示左边已经遍历结束,1表示右边已经遍历结束
};
function post_order(node) {
  var line = "后序遍历：";
  var stack = new Stack();
  var curr_node = node;
  while (true) {
    while (curr_node) {
      var tag = new Tag(curr_node, 0);
      stack.push(tag);
      curr_node = curr_node.leftChild;
    }
    var pop_item = stack.pop();
    if (pop_item.node.rightChild && pop_item.state === 0) {
      pop_item.state = 1;
      stack.push(pop_item);
      curr_node = pop_item.node.rightChild;
    } else {
      line += pop_item.node.data;
    }
    if (!curr_node && stack.isEmpty()) {
      break;
    }
  }
  console.log(line);
}
pre_order(root_node);
in_order(root_node);
post_order(root_node);
