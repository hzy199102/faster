var TreeNode = function(data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
  this.parent = null;
};

function BinarySearchTree() {
  var root = null;
  var insert_data = function(node, data) {
    if (root == null) {
      root = new TreeNode(data);
      return true;
    }
    if (data < node.data) {
      if (node.leftChild) {
        insert_data(node.leftChild, data);
      } else {
        var new_node = new TreeNode(data);
        node.leftChild = new_node;
        new_node.parent = node;
        return true;
      }
    } else if (data > node.data) {
      if (node.rightChild) {
        insert_data(node.rightChild, data);
      } else {
        var new_node = new TreeNode(data);
        node.rightChild = new_node;
        new_node.parent = node;
        return true;
      }
    } else {
      return false;
    }
  };
  this.insert = function(data) {
    return insert_data(root, data);
  };

  var search_data = function(node, data) {
    if (!node) {
      return null;
    }
    if (node.data > data) {
      return search_data(node.leftChild, data);
    } else if (node.data < data) {
      return search_data(node.rightChild, data);
    } else {
      return node;
    }
  };
  this.search = function(data) {
    return search_data(root, data);
  };
  var link_parent = function(parent, node, next_node) {
    // 连接父节点和子节点
    if (parent == null) {
      root = next_node;
      // 专门处理只有一个根节点的情况，此时next_node为null，无parent
      if (next_node) {
        root.parent = null;
      }
    } else {
      if (next_node) {
        next_node.parent = parent;
      }
      if (parent.leftChild && parent.leftChild.data == node.data) {
        parent.leftChild = next_node;
      } else {
        parent.rightChild = next_node;
      }
    }
  };
  var remove_data = function(node, data) {
    if (node === null) {
      return false;
    }
    if (data < node.data) {
      return remove_data(node.leftChild, data);
    } else if (data > node.data) {
      return remove_data(node.rightChild, data);
    } else {
      if (node.leftChild && node.rightChild) {
        var tmp = node.rightChild;
        while (tmp.leftChild) {
          tmp = tmp.leftChild;
        }
        node.data = tmp.data;
        // 这里可以优化，remove_data(tmp.parent, tmp.data); 去右子树里删除中序下的第一个节点
        return remove_data(node.rightChild, tmp.data);
      } else {
        var parent = node.parent;
        if (!node.leftChild) {
          link_parent(parent, node, node.rightChild);
        } else {
          link_parent(parent, node, node.lefttChild);
        }
        return true;
      }
    }
  };

  this.remove = function(data) {
    return remove_data(root, data);
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
  var tree_height = function(node) {
    // 左子树的高度和右子树的高度取最大值,加上当前的高度
    if (!node) {
      return 0;
    }

    var left_child_height = tree_height(node.leftChild);
    var right_child_height = tree_height(node.rightChild);
    if (left_child_height > right_child_height) {
      return left_child_height + 1;
    } else {
      return right_child_height + 1;
    }
  };
  // 返回高度
  this.height = function() {
    return tree_height(root);
  };
  // 排序（从小到大）
  this.sort = function(node, arr) {
    if (node === null) {
      return;
    }
    this.sort(node.leftChild, arr);
    arr.push(node.data);
    this.sort(node.rightChild, arr);
  };

  // 返回根节点
  this.get_root = function() {
    return root;
  };
}
// require
module.exports = {
  BinarySearchTree
};
