var BinTreeNode = function(data) {
  this.data = data; // 数据
  this.leftChild = null; //左孩子
  this.rightChild = null; //右孩子
  this.parentNode = null; // 父节点
};
var { Stack } = require("../stack/myStack");
function BinaryTree() {
  var root = null; // 根节点

  /**
   * 初始化二叉树有很多种方式，采用广义表表示的建立二叉树方法
   * 算法：
   * 广义表的表名放在表前，表示树的根节点，括号中的是根的左右子树
   * 每个节点的左右子树用逗号隔开，如果有仅有右子树没有左子树，逗号不省略
   * 整个广义表的最后加上特殊符号#表示输入结束
   *
   * 遍历这个A(B(D,E(G,)),C(,F))# 字符串，来建立一颗二叉树。
   * 1.遇到左括号的时候，说明前面有一个节点，这个括号里的两个节点都是它的子节点，但是子节点后面还会有子节点，因此，
   * 我们需要一个先进后出的数据结构，把前面的节点保存下来，这样，栈顶就是当前要处理的两个节点的父节点。
   * 2.逗号分隔了左右子树，因此需要一个变量来标识遇到的是左子树还是右子树，
   * 假设这个变量为k，遇到左括号的时候，k=1，表示开始识别左子树，遇到逗号，k=2表示开始识别右子树。
   * 3.遇到右括号，说明一棵子树结束了，那么栈顶的元素正是这棵子树的根节点，执行pop方法出栈。
   */
  this.init_tree = function(string) {
    var stack = new Stack();
    var k = 0; // 标识识别的是左子树还是右子树
    var new_node = null;

    for (var i = 0; i < string.length; i++) {
      var item = string[i];
      if (item === "#") {
        break;
      } else if (item === "(") {
        // 如果碰到(,说明前面一定有个节点，并且开始处理左子树
        stack.push(new_node);
        k = 1;
      } else if (item === ",") {
        k = 2;
      } else if (item === ")") {
        stack.pop();
      } else {
        new_node = new BinTreeNode(item); // 创建节点
        if (root == null) {
          root = new_node;
        } else {
          // 说明new_node是左孩子
          if (k === 1) {
            var top_item = stack.top();
            top_item.leftChild = new_node;
            new_node.parentNode = top_item;
          } else if (k === 2) {
            var top_item = stack.top();
            top_item.rightChild = new_node;
            new_node.parentNode = top_item;
          }
        }
      }
    }
  };

  // 返回根节点
  this.get_root = function() {
    return root;
  };

  // 中序遍历
  this.in_order = function(node) {
    if (node === null) {
      return;
    }
    this.in_order(node.leftChild);
    console.log(node.data);
    this.in_order(node.rightChild);
  };

  // 后序遍历
  this.post_order = function(node) {
    if (node === null) {
      return;
    }
    this.post_order(node.leftChild);
    this.post_order(node.rightChild);
    console.log(node.data);
  };

  // 前序遍历
  this.pre_order = function(node) {
    if (node === null) {
      return;
    }
    console.log(node.data);
    this.pre_order(node.leftChild);
    this.pre_order(node.rightChild);
  };
  /**
   * 一颗树的节点数量 = 左子树的节点数量 + 右子树的节点数量 + 1
   */
  var tree_node_count = function(node) {
    if (node === null) {
      return 0;
    }
    var left_node_count = tree_node_count(node.leftChild);
    var right_node_count = tree_node_count(node.rightChild);
    return left_node_count + right_node_count + 1;
  };

  // 返回节点数量
  this.size = function() {
    return tree_node_count(root);
  };

  /**
   *
   * @param {*} node
   */
  var tree_height = function(node) {
    if (node === null) {
      return 0;
    }
    // 先计算左子树高度
    var left_child_height = tree_height(node.leftChild);
    // 再计算右子树高度
    var right_child_height = tree_height(node.rightChild);
    // 比较大小
    if (left_child_height > right_child_height) {
      return left_child_height + 1;
    } else {
      return right_child_height + 1;
    }
  };
  this.height = function() {
    return tree_height(root);
  };

  var find_node = function(node, data) {
    if (node === null) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    // 先到左子树去找
    var left_res = find_node(node.leftChild, data);
    if (left_res) {
      return left_res;
    }
    return find_node(node.rightChild, data);
  };

  this.find = function(data) {
    return find_node(root, data);
  };
}

// var bt = new BinaryTree();
// bt.init_tree("A(B(D,E(G,)),C(,F))#");
// var root_node = bt.get_root();
// bt.in_order(root_node);
// console.log(1111);
// bt.post_order(root_node);
// console.log(1111);
// bt.pre_order(root_node);

exports.BinaryTree = BinaryTree;
