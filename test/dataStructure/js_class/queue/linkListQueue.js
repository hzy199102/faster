var { LinkList } = require("../linkList/myLinkList.js");

function LinkListQueue() {
  var linklist = new LinkList();
  // ⼊入队列
  this.enqueue = function(item) {
    linklist.append(item);
  };
  // 出队列
  this.dequeue = function() {
    return linklist.remove_head();
  };
  // 返回队⾸
  this.head = function() {
    return linklist.head();
  };
  // 返回队尾
  this.tail = function() {
    return linklist.tail();
  };
  // size
  this.size = function() {
    return linklist.length();
  };
  //clear
  this.clear = function() {
    linklist.clear();
  };
  // isEmpty
  this.isEmpty = function() {
    return linklist.isEmpty();
  };
}

// var l_queue = new LinkListQueue();
// l_queue.enqueue(1);
// l_queue.enqueue(2);
// l_queue.enqueue(4);
// console.log(l_queue.head()); // 栈顶是 1
// console.log(l_queue.dequeue()); // 移除 1
// console.log(l_queue.head()); // 栈顶变成 2
// console.log(l_queue.dequeue()); // 移除 2
// console.log(l_queue.head()); // 移除 4

// require
module.exports = {
  LinkListQueue
};
