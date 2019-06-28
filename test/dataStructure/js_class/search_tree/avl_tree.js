// const { Queue } = require("../../js_class/queue/myQueue");
const { LinkListQueue } = require("../../js_class/queue/linkListQueue");
const Queue = LinkListQueue;
var AVLNode = function(data) {
  this.bf = 0;
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
  this.parent = null;
};

var AVLTree = function() {
  var root = null;

  var cache = {
    width: {
      new: true
    }
  };

  /**
   * 自上而下更新bf
   * 尤其是在进行了旋转的情况下，根节点为node节点的子树的所有节点的bf都要更新
   * 这里可以优化，毕竟翻转的节点最多影响的节点就是5个
   *
   * @param {*} node 需要更新bf的子树的根节点
   */
  var refresh_bf = function(node) {
    if (node === null) {
      return 0;
    }
    var left_height = refresh_bf(node.leftChild);
    var right_height = refresh_bf(node.rightChild);

    node.bf = right_height - left_height;
    // console.log(node);

    if (right_height > left_height) {
      return right_height + 1;
    } else {
      return left_height + 1;
    }
  };

  /**
   * 找到需要平衡化调整的node节点，在insert情况下
   * 原理：
   * 1.父节点的平衡因子为0，那么万事大吉，插入的这个新节点没有导致不平衡
   * 2.父节点的平衡因子变为2或者-2， 那么这个父节点就不再平衡，需要进行平衡化调整,调整之后平衡子因子不会出现2或-2的情况了
   * 3.父节点的平衡因子变为-1或者1，只能说明这棵子树是平衡的，但这棵子树的高度增加了1，会影响到更高层的节点，
   *     因此要继续向上遍历更新父节点的平衡因子，直到找到平衡因子变为2或-2的节点，或者遍历到整棵树的根节点
   *
   * 实现：
   * 1.更新父节点平衡因子
   * 2.从node开始，一直向上找父节点(不包括node)，终止条件：
   *  1.1.平衡因子为0（意味着父节点的高度肯定不变，所以不会被影响，一定也是平衡的）
   *  1.2.平衡因子为2或-2，开始平衡化调整
   *  1.2.碰到根节点
   * 这样就能确认需要平衡化调整的节点
   *
   * 其实代码还可以精简，但是为了熟悉原理步骤，写的详细点
   *
   * @param {*} node 节点已经通过平衡因子检验，需要判断的是它的父节点的平衡因子情况
   */
  var change_bf_after_add = function(node) {
    if (node.parent === null) {
      // 不需要做平衡旋转
      return null;
    }
    if (node.parent.leftChild && node.parent.leftChild.data === node.data) {
      // 左节点处理
      node.parent.bf -= 1;
      if (node.parent.bf === 0) {
        // 不需要做平衡旋转
        return null;
      } else if (node.parent.bf === -2) {
        // 左节点的改变只可能导致-2的情况
        return node.parent;
      } else if (node.parent.bf === -1) {
        return change_bf_after_add(node.parent);
      } else {
        // 不会在出现其他情况了
        console.log("change_bf_after_add左节点处理");
        console.log(node.parent.bf);
      }
    } else {
      // 右节点处理
      node.parent.bf += 1;
      if (node.parent.bf === 0) {
        // 不需要做平衡旋转
        return null;
      } else if (node.parent.bf === 2) {
        // 右节点的改变只可能导致2的情况
        return node.parent;
      } else if (node.parent.bf === 1) {
        return change_bf_after_add(node.parent);
      } else {
        // 不会在出现其他情况了
        console.log("change_bf_after_add右节点处理");
        console.log(node.parent.bf);
      }
    }
  };

  /**
   * 左单旋转
   * @param {*} node
   */
  var turn_left = function(node) {
    // console.log(node);
    // console.log("左单旋转");
    var old_parent = node.parent;
    var right_child = node.rightChild;

    node.rightChild = right_child.leftChild;
    if (node.rightChild) {
      node.rightChild.parent = node;
    }

    right_child.leftChild = node;
    right_child.parent = old_parent;

    // 处理父节点父子关系
    node.parent = right_child;
    if (old_parent) {
      if (old_parent.leftChild && old_parent.leftChild.data === node.data) {
        old_parent.leftChild = right_child;
      } else {
        old_parent.rightChild = right_child;
      }
    } else {
      root = right_child;
    }

    // right_child为调整之后的子树的根节点
    refresh_bf(right_child);

    // 为了删除操作，返回平衡化之后的子树根节点
    return right_child;
  };

  /**
   * 先右后左双旋转
   * @param {*} node
   */
  var turn_right_left = function(node) {
    // console.log(node);
    // console.log("先右后左双旋转");
    var old_parent = node.parent;
    var right_child = node.rightChild;
    var right_child_left = node.rightChild.leftChild;

    // 先右单旋转
    right_child.leftChild = right_child_left.rightChild;
    if (right_child.leftChild) {
      right_child.leftChild.parent = right_child;
    }
    right_child_left.rightChild = right_child;
    right_child.parent = right_child_left;

    // 再左单旋转
    node.rightChild = right_child_left.leftChild;
    if (node.rightChild) {
      node.rightChild.parent = node;
    }
    node.parent = right_child_left;
    right_child_left.leftChild = node;

    // 处理父节点父子关系
    right_child_left.parent = old_parent;
    if (old_parent) {
      if (old_parent.leftChild && old_parent.leftChild.data === node.data) {
        old_parent.leftChild = right_child_left;
      } else {
        old_parent.rightChild = right_child_left;
      }
    } else {
      root = right_child_left;
    }

    // right_child_left为调整之后的子树的根节点
    refresh_bf(right_child_left);

    // 为了删除操作，返回平衡化之后的子树根节点
    return right_child_left;
  };

  /**
   * 右单旋转
   * @param {*} node
   */
  var turn_right = function(node) {
    // console.log(node);
    // console.log("右单旋转");
    var old_parent = node.parent;
    var left_child = node.leftChild;

    node.leftChild = left_child.rightChild;
    if (node.leftChild) {
      node.leftChild.parent = node;
    }

    left_child.rightChild = node;
    node.parent = left_child;

    // 处理父节点父子关系
    left_child.parent = old_parent;
    if (old_parent) {
      if (old_parent.leftChild && old_parent.leftChild.data === node.data) {
        old_parent.leftChild = left_child;
      } else {
        old_parent.rightChild = left_child;
      }
    } else {
      root = left_child;
    }

    // left_child为调整之后的子树的根节点
    refresh_bf(left_child);

    // 为了删除操作，返回平衡化之后的子树根节点
    return left_child;
  };

  /**
   * 先左后右双旋转
   * @param {*} node
   */
  var turn_left_right = function(node) {
    // console.log(node);
    // console.log("先左后右双旋转");
    var old_parent = node.parent;
    var left_child = node.leftChild;
    var left_child_right = left_child.rightChild;

    //先左单旋转
    left_child.rightChild = left_child_right.leftChild;
    if (left_child.rightChild) {
      left_child.rightChild.parent = left_child;
    }
    left_child.parent = left_child_right;
    left_child_right.leftChild = left_child;

    //再右单旋转
    node.leftChild = left_child_right.rightChild;
    if (node.leftChild) {
      node.leftChild.parent = node;
    }
    node.parent = left_child_right;
    left_child_right.rightChild = node;

    // 处理父节点父子关系
    left_child_right.parent = old_parent;
    if (old_parent) {
      if (old_parent.leftChild && old_parent.leftChild.data === node.data) {
        old_parent.leftChild = left_child_right;
      } else {
        old_parent.rightChild = left_child_right;
      }
    } else {
      root = left_child_right;
    }
    // console.log(left_child_right);
    // left_child_right为调整之后的子树的根节点
    refresh_bf(left_child_right);

    // 为了删除操作，返回平衡化之后的子树根节点
    return left_child_right;
  };
  /**
   * 平衡化调整
   *
   * 当不平衡节点平衡因子为2，其右孩子平衡因子为1时，发生左单旋转。
   * 当不平衡节点的平衡因子为-2，左孩子平衡因子为-1时进行右单翻转。
   * 当不平衡节点的平衡因子为-2，左孩子平衡因子为1的时候发生先左后右双旋转。
   * 当不平衡节点的平衡因子为2，右孩子的平衡因子为-1时，进行先右后左双旋转。
   *
   * @param {*} node
   */
  var turn_node = function(node) {
    // 失衡节点，指的是节点平衡因子为-2的节点
    var unblance_node = change_bf_after_add(node);

    if (unblance_node !== null) {
      // 发生了旋转
      if (unblance_node.bf === 2) {
        // 一定是节点的右子树进行了插入
        if (unblance_node.rightChild.bf === 1) {
          // 左单旋转
          turn_left(unblance_node);
        } else if (unblance_node.rightChild.bf === -1) {
          // 先右后左双旋转
          turn_right_left(unblance_node);
        } else {
          // 绝不可能发生
          console.log("turn_node右子树处理");
          console.log(unblance_node.bf);
        }
      } else if (unblance_node.bf === -2) {
        // 一定是节点的左子树进行了插入
        if (unblance_node.leftChild.bf === -1) {
          // 右单旋转
          turn_right(unblance_node);
        } else if (unblance_node.leftChild.bf === 1) {
          // 先左后右双旋转
          turn_left_right(unblance_node);
        } else {
          // 绝不可能发生
          console.log("turn_node左子树处理");
          console.log(unblance_node.bf);
        }
      } else {
        // 绝不可能发生
        console.log("turn_node非左右子树处理");
        console.log(unblance_node.bf);
      }
    } else {
    }
  };

  /**
   * 插入节点，插入有2个原则，一个是保持搜索二叉树的节点特性，第二是要注意平衡因子，判断是否进行平衡化调整
   * @param {*} node
   * @param {*} data
   */
  var insert_data = function(node, data) {
    var new_node = null;
    if (root === null) {
      new_node = new AVLNode(data);
      root = new_node;
      return true;
    }

    if (data < node.data) {
      if (node.leftChild) {
        return insert_data(node.leftChild, data);
      } else {
        new_node = new AVLNode(data);
        node.leftChild = new_node;
        new_node.parent = node;
        // 插入节点之后一定要判断父节点的平衡因子情况，决定是否进行旋转
        turn_node(new_node);
        return true;
      }
    } else if (data > node.data) {
      if (node.rightChild) {
        return insert_data(node.rightChild, data);
      } else {
        new_node = new AVLNode(data);
        node.rightChild = new_node;
        new_node.parent = node;
        // 插入节点之后一定要判断父节点的平衡因子情况，决定是否进行旋转
        turn_node(new_node);
        return true;
      }
    } else {
      // AVL也是二叉搜索树，需要保持关键码唯一性
      return false;
    }
  };

  this.insert = function(data) {
    var res = insert_data(root, data);
    if (res) {
      cache.width.new = false;
    } else {
    }
    return res;
  };

  /**
   * 找到需要平衡化调整的node节点，在remove情况下
   * 原理：
   * 1.父节点的平衡因子从0变成1或者-1，那么万事大吉，删除节点没有导致高度变化，没有导致不平衡
   * 2.父节点的平衡因子变为2或者-2， 那么这个父节点就不再平衡，需要进行平衡化调整,调整之后平衡子因子不会出现2或-2的情况了
   * 3.父节点的平衡因子从-1或1 变成0，只能说明这棵子树是平衡的，但这棵子树的高度减1，会影响到更高层的节点，
   *     因此要继续向上遍历更新父节点的平衡因子，直到找到平衡因子变为2或-2的节点，或者遍历到整棵树的根节点
   *
   * 实现：
   * 1.更新节点平衡因子
   * 2.从node开始，一直向上找父节点（包括处理node），终止条件：
   *  1.1.平衡因子为1或者-1（意味着父节点的高度肯定不变，所以不会被影响，一定也是平衡的）
   *  1.2.平衡因子为2或-2，开始平衡化调整
   *  1.2.碰到根节点
   * 这样就能确认需要平衡化调整的节点
   *
   * 其实代码还可以精简，但是为了熟悉原理步骤，写的详细点
   *
   * @param {*} node 当前节点为需要改变bf的节点
   * @param {*} child 触发当前节点node的bf改变的子节点，如果是leftChild,bf+1；如果是rightChild,bf-1
   * @param {*} change 当前节点的bf改变值，如果存在child，则不考虑change，这是remove操作节点被删除，找不到影响node的child，所以提前计算传入的改变值
   */
  var change_bf_after_remove = function(node, child, change) {
    if (node === null) {
      return null;
    }
    var tmp = change;
    if (child) {
      if (node.leftChild && node.leftChild.data === child.data) {
        tmp = 1;
      } else {
        tmp = -1;
      }
    } else {
      if (!tmp) {
        console.log("change_bf_after_remove：算法有问题");
      }
    }
    node.bf += tmp;
    if (node.bf === 1 || node.bf === -1) {
      return null;
    } else if (node.bf === 0) {
      return change_bf_after_remove(node.parent, node);
    } else if (node.bf === 2 || node.bf === -2) {
      return node;
    }
  };
  /**
   * 平衡化节点
   * 原理和insert节点的平衡化处理类似，这里就不拆分细化了
   * 但是其实可以抽象左单，右单，先左后右，先右后左
   *
   * 实现：
   * 1.node.bf === 2,左子树进行的remove操作，但是需要判断右子树的情况
   * 1.1 node.rightChild === 0,左单操作，高度不变
   * 1.2 node.rightChild === 1,左单操作，高度-1，需要继续往上判断平衡点
   * 1.3 node.rightChild === -1,先右后左双旋转操作，高度-1，需要继续往上判断平衡点
   * 2.node.bf === -2,右子树进行的remove操作，但是需要判断左子树的情况
   * 2.1 node.rightChild === 0,右单操作，高度不变
   * 2.2 node.rightChild === -1,右单操作，高度-1，需要继续往上判断平衡点
   * 2.3 node.rightChild === 1,先左后右双旋转操作，高度-1，需要继续往上判断平衡点
   *
   * @param {*} node 待平衡化的节点
   */
  var reblance_node = function(node) {
    if (node === null) {
      return false;
    }
    var unblance_node = null;
    var turnNode = null;
    if (node.bf === 2) {
      // 左子树进行的remove操作，但是需要判断右子树的情况
      if (node.rightChild.bf === 0) {
        turn_left(node);
      } else if (node.rightChild.bf === 1) {
        turnNode = turn_left(node);
        unblance_node = change_bf_after_remove(turnNode.parent, turnNode);
        reblance_node(unblance_node);
      } else if (node.rightChild.bf === -1) {
        turnNode = turn_right_left(node);
        unblance_node = change_bf_after_remove(turnNode.parent, turnNode);
        reblance_node(unblance_node);
      }
    } else if (node.bf === -2) {
      // 右子树进行的remove操作，但是需要判断左子树的情况
      if (node.leftChild.bf === 0) {
        turn_right(node);
      } else if (node.leftChild.bf === -1) {
        turnNode = turn_right(node);
        unblance_node = change_bf_after_remove(turnNode.parent, turnNode);
        reblance_node(unblance_node);
      } else if (node.leftChild.bf === 1) {
        turnNode = turn_left_right(node);
        unblance_node = change_bf_after_remove(turnNode.parent, turnNode);
        reblance_node(unblance_node);
      }
    }
  };
  /**
   * 父节点绑定被删除节点的子树（只存在左子树，只存在右子树，null）
   *
   * @param {*} parent 父节点
   * @param {*} node 被删除节点
   * @param {*} next_node 子树
   */
  var link_parent = function(parent, node, next_node) {
    if (parent === null) {
      root = next_node;
      if (next_node) {
        root.parent = null;
      }
    } else {
      if (next_node) {
        next_node.parent = parent;
      }
      var change = 1;
      if (parent.leftChild && parent.leftChild.data === node.data) {
        parent.leftChild = next_node;
        change = 1;
      } else {
        parent.rightChild = next_node;
        change = -1;
      }
    }
    var unblance_node = change_bf_after_remove(parent, null, change);
    reblance_node(unblance_node);
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
        return remove_data(tmp.parent, tmp.data);
      } else {
        var parent = node.parent;
        if (node.leftChild) {
          link_parent(parent, node, node.leftChild);
        } else {
          link_parent(parent, node, node.rightChild);
        }
      }
    }
  };
  this.remove = function(data) {
    var res = remove_data(root, data);
    if (res) {
      cache.width.new = false;
    } else {
    }
    return res;
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

  /**
   * 获得宽度
   */

  var width = function(node, n, doCache) {
    // 实现你的函数
    if (node == null) {
      return 0;
    }
    var queue = new Queue();
    queue.enqueue(node);
    queue.enqueue(0);
    cache.width[node.data] = {};
    var width = 1;
    var level = 0;
    var start = Date.now();
    while (!queue.isEmpty()) {
      var del_item = queue.dequeue();
      // 处理完当前层的数据，此时queue获得了下一层的全部数据信息
      if (del_item === 0) {
        level += 1; // 当前层
        // console.log(
        //   "第 {" + level + "} 层:" + width + "耗时：" + (Date.now() - start)
        // );
        start = Date.now();
        cache.width[node.data][level] = width;
        if (level === n && !doCache) {
          // 这个数据是在上一层处理的时候就已经保存好了的，哪怕是初始化也是提前保存了下一层的数据
          // 并且不要缓存
          return width;
        }
        width = queue.size(); // 下一层的总数
        if (queue.isEmpty()) {
          break;
        } else {
          queue.enqueue(0);
        }
        // console.log("继续第" + (level + 1) + "层的遍历");
      }
      if (del_item.leftChild) {
        queue.enqueue(del_item.leftChild);
      }
      if (del_item.rightChild) {
        queue.enqueue(del_item.rightChild);
      }
    }
    cache.width.new = true;
    return cache.width[node.data][n];
  };
  this.width = function(node, n, doCache = true) {
    if (
      cache.width.new &&
      cache.width[node.data] &&
      cache.width[node.data][n]
    ) {
      console.log("from cache");
      return cache.width[node.data][n];
    } else {
      console.log("from current");
      return width(node, n, doCache);
    }
  };

  var get_line = function(offset, data) {
    var line = "";
    for (var i = 0; i < offset; i++) {
      line += "  ";
    }
    return line + data;
  };

  var set_line = function(lines, index, line) {
    var old_line = lines[index];
    var sub_line = line.substring(old_line.length);
    lines[index] = old_line + sub_line;
  };
  var super_print = function(
    node,
    height,
    curr_height,
    offset,
    direction,
    lines
  ) {
    if (!node) {
      return;
    }
    var new_offset = null;
    var width = 3;
    if (curr_height == 1) {
      new_offset = (height - 1) * 4 * width;
      var line = get_line(new_offset, node.data.toString());
      lines[0] = line;
    } else {
      var line = null;
      var link_length = height - 1;

      if (curr_height % 2 == 0) {
        link_length = 4;
      } else {
        link_length = 3;
      }
      width = height + 1 - curr_height;
      if (direction == 0) {
        for (var i = 1; i <= link_length; i++) {
          new_offset = offset - i * width;
          if (i == link_length) {
            new_offset = offset - link_length * width;
            line = get_line(new_offset, node.data.toString());
          } else {
            line = get_line(new_offset, ".");
          }
          set_line(lines, (curr_height - 2) * 4 + i, line);
        }
      } else {
        for (var i = 1; i <= link_length; i++) {
          new_offset = offset + i * width;
          if (i == link_length) {
            new_offset = offset + link_length * width;
            line = get_line(new_offset, node.data.toString());
          } else {
            line = get_line(new_offset, ".");
          }
          set_line(lines, (curr_height - 2) * 4 + i, line);
        }
      }
    }
    super_print(node.leftChild, height, curr_height + 1, new_offset, 0, lines);
    super_print(node.rightChild, height, curr_height + 1, new_offset, 1, lines);
  };
  this.print = function() {
    var height = this.height();
    var lines = new Array((height - 1) * 4 + 1);

    for (var i = 0; i < lines.length; i++) {
      lines[i] = "";
    }

    super_print(root, height, 1, null, null, lines);
    for (var i = 0; i < lines.length; i++) {
      console.log(lines[i]);
    }
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
};

// require
module.exports = {
  AVLTree
};
