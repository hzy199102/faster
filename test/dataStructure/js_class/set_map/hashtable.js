var { LinkList } = require("../linkList/myLinkList.js");

function murmurhash3_32_gc(key, seed) {
  var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 =
      ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 =
      ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b =
      ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;

      k1 =
        ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) &
        0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 =
        ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) &
        0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 =
    ((h1 & 0xffff) * 0x85ebca6b +
      ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) &
    0xffffffff;
  h1 ^= h1 >>> 13;
  h1 =
    ((h1 & 0xffff) * 0xc2b2ae35 +
      ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) &
    0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}

function HashTable() {
  var items = []; // 存储数据
  var key_count = 0; // key的数量，扩容的重要指数
  var divisor = 7; // 除数

  var is_prime = function(number) {
    if (number % 2 === 0) {
      return false;
    }
    for (let i = 3; i <= Math.sqrt(number); i = i + 2) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  };
  var is_prime_low = function(number) {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  };

  this.init = function(size) {
    items = new Array(size);
    // 初始化存储数据的数组
    for (let i = 0; i < size; i++) {
      items[i] = new LinkList();
    }
    // 设置除数
    var start = Date.now();
    var temp = size;
    while (temp > 2) {
      if (is_prime(temp)) {
        divisor = temp;
        break;
      }
      temp--;
    }
  };

  var get_index = function(key) {
    var index = Math.abs(murmurhash3_32_gc(key.toString(), 0));
    return index % divisor;
  };

  var is_too_crowd = function() {
    if (Math.floor(key_count / divisor) >= 5) {
      return true;
    } else {
      return false;
    }
  };

  var expend = function() {
    var tmp_arr = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      tmp_arr[i] = items[i];
    }

    // 初始化数组
    items = new Array(items.length * 2);
    for (var i = 0; i < items.length; i++) {
      items[i] = new LinkList();
    }

    // 设置除数
    var temp = items.length;
    while (temp > 2) {
      if (is_Prime(temp)) {
        divisor = temp;
        break;
      }
      temp--;
    }

    // 把临时数组里的数据导入到items中
    for (var i = 0; i < tmp_arr.length; i++) {
      var link = tmp_arr[i];
      // 获得链表的头
      var curr_node = link.get_head();
      while (curr_node) {
        this.set(curr_node.key, curr_node.value);
        key_count--;
        curr_node = curr_node.next;
      }
    }
  };

  this.set = function(key, value) {
    var index = get_index(key);
    var node = items[index].search(key);
    if (node) {
      node.value = value;
    } else {
      items[index].append(value);
      key_count++;
    }
    // 如果内容拥挤，就扩容
    if (is_too_crowd()) {
      expend();
    }
  };
}

var a = new HashTable();
