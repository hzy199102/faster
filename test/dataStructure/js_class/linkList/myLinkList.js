// 定义链表类
function LinkList() {
  // 定义节点
  var Node = function(data) {
    this.data = data;
    this.next = null;
  };
  var length = 0; // ⻓长度
  var head = null; // 头节点
  var tail = null; // 尾节点

  // 添加⼀一个新元素
  this.append = function(data) {
    // 创建新节点
    var new_node = new Node(data);
    if (head == null) {
      head = new_node;
      tail = new_node;
    } else {
      tail.next = new_node;
      tail = new_node;
    }
    length++;
    return true;
  };

  this.print = function() {
    var curr_node = head;
    while (curr_node) {
      console.log(curr_node.data);
      curr_node = curr_node.next;
    }
  };

  // 在指定位置插⼊入新的元素
  this.insert = function(index, data) {
    if (index < 0 || index > length) {
      return false;
    } else if (index === length) {
      return this.append(data);
    } else {
      var new_node = new Node(data);
      if (index === 0) {
        new_node.next = head;
        head = new_node;
      } else {
        // curr_node.next指的就是下标为insert_index的node
        var insert_index = 1;
        var curr_node = head;
        // 不是数组，没有下标，只能从头开始寻找index前的那个节点，要在其后插入这个新创建的节点
        while (insert_index < index) {
          curr_node = curr_node.next;
          insert_index++;
        }
        // var next_node = curr_node.next
        // new_node.next = next_node
        // curr_node.next = new_node
        new_node.next = curr_node.next;
        curr_node.next = new_node;
      }
    }
  };

  /**
   * 删除指定位置的节点
   *
   * 自己根据理解单独写一遍
   */
  this.remove_me = function(index) {
    if (index < 0 || index >= length) {
      return false;
    } else {
      var del_node = null;
      if (index === 0) {
        head.next = head;
        del_node = head;

        // 如果被删除的是尾节点
        if (head.next == null) {
          tail = head;
        }
      } else {
        var del_index = 0;
        var pre_node = null;
        var curr_node = head;
        while (del_index < index) {
          del_index++;
          pre_node = curr_node;
          curr_node = curr_node.next;
        }
        pre_node.next = curr_node.next;
        del_node = curr_node;

        if (curr_node.next === null) {
          tail = pre_node;
        }
      }
      length--;
      del_node.next = null; // 内存回收
      return del_node.data;
    }
  };

  // 删除指定位置的节点
  this.remove = function(index) {
    if (index < 0 || index >= length) {
      return false;
    } else {
      var del_node = null;
      if (index === 0) {
        del_node = head;
        head = head.next;

        // 如果只有一个节点
        if (head == null) {
          tail = null;
        }
      } else {
        // 使用边界情况考虑程序的正确性，此处边界情况就是index = 1的情况
        var del_index = 0;
        var pre_node = null; // 被删除节点的前一个节点
        var curr_node = head; // 要被删除的节点
        while (del_index < index) {
          del_index++;
          pre_node = curr_node;
          curr_node = curr_node.next;
        }
        del_node = curr_node;
        pre_node.next = curr_node.next;

        // 如果被删除的是尾节点
        if (curr_node.next == null) {
          tail = pre_node;
        }
      }
      length--;
      del_node.next = null; // 也可以不写，但是C++里面需要写，否则指针报错
      return del_node.data;
    }
  };

  // 返回指定位置节点的值
  this.get = function(index) {
    if (index < 0 || index >= length) {
      return false;
    } else {
      var node_index = 0;
      var curr_node = head;
      while (node_index < index) {
        node_index++;
        curr_node = curr_node.next;
      }
      return curr_node.data;
    }
  };

  /**
   * 返回指定元素的索引,如果没有,返回-1
   * 有多个相同元素,返回第⼀一个
   *
   */
  this.indexOf = function(data) {
    var index = -1;
    var curr_node = head;
    while (curr_node) {
      index++;
      if (curr_node.data === data) {
        return index;
      } else {
        curr_node = curr_node.next;
      }
    }
    return -1;
  };

  this.search = function(data) {
    var curr_node = head;
    while (curr_node) {
      if (curr_node.data === data) {
        return curr_node;
      } else {
        curr_node = curr_node.next;
      }
    }
    return null;
  };

  // 返回链表⼤大⼩小
  this.length = function() {
    return length;
  };

  // 删除尾节点
  this.remove_tail = function() {
    return this.remove(length - 1);
  };

  // 删除头节点
  this.remove_head = function() {
    return this.remove(0);
  };

  // 返回链表头节点的值
  this.head = function() {
    return this.get(0);
  };

  // 返回链表尾节点的值
  this.tail = function() {
    return this.get(length - 1);
  };

  // isEmpty
  this.isEmpty = function() {
    return length == 0;
  };

  // 清空链表
  this.clear = function() {
    head = null;
    tail = null;
    length = 0;
  };
}

// var link = new LinkList()
// link.append(2)
// link.append(4)
// link.append(5)

// link.insert(2, 8)
// link.print()
// console.log(link.get(2));

// require
module.exports = {
  LinkList
};
