function Queue() {
  var items = new Array(); // 存储数据

  // 向队列尾部添加一个元素
  this.enqueue = function(item) {
    items.push(item);
  };

  // 移除队列头部的元素
  this.dequeue = function() {
    return items.shift();
  };

  // 返回队列头部的元素
  this.head = function() {
    return items[0];
  };

  // 返回队列尾部的元素
  this.tail = function() {
    return items[items.length - 1];
  };

  // 返回队列的大小
  this.size = function() {
    return items.length;
  };

  // clear
  this.clear = function() {
    items = [];
  };

  // 判断空队列
  this.isEmpty = function() {
    return items.length === 0;
  };
}

// import
// export default Queue;

// require
module.exports = {
  Queue
};
