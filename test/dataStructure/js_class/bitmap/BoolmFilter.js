/**
 * murmurhash 计算快，冲突少的hash算法
 * @param {*} key
 * @param {*} seed
 */
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


/**
 * 布隆过滤器
 * 网页爬虫，判断是否爬过
 * hadoop
 * 运用hash算法把不定长的字符串转为一个整数，这样就能进行大数据存在判断
 * 涉及：最多存放数据，错误率，和以此得到的哈希数量K（创建K个hash值）和bitmap可存放的最大整数
 * @param {*} max_count 
 * @param {*} error_rate 
 */
function BoolmFilter(max_count, error_rate) {
  //	位图映射变量
  var bitMap = [];
  //	最多可放的数量
  var max_count = max_count;
  //	错误率
  var error_rate = error_rate;
  //	位图变量的长度
  var bit_size = Math.ceil(
    max_count * (-Math.log(error_rate) / (Math.log(2) * Math.log(2)))
  );
  //	哈希数量
  var hash_ount = Math.ceil(Math.log(2) * (bit_size / max_count));

  console.log(bit_size, hash_ount);

  // 设置位的值
  var set_bit = function(bit) {
    var arr_index = Math.floor(bit / 32);
    var bit_index = Math.floor(bit % 32);
    bitMap[arr_index] |= 1 << bit_index;
  };
  // 读取位的值
  var get_bit = function(bit) {
    var arr_index = Math.floor(bit / 32);
    var bit_index = Math.floor(bit % 32);
    return (bitMap[arr_index] &= 1 << bit_index);
  };
  // 添加key
  this.add = function(key) {
    if (this.isExist(key)) {
      return -1; //表示已经存在
    }
    for (var i = 0; i < hash_ount; i++) {
      var hash_value = murmurhash3_32_gc(key, i);
      set_bit(Math.abs(Math.floor(hash_value % bit_size)));
    }
  };
  // 检测是否存在
  this.isExist = function(key) {
    for (var i = 0; i < hash_ount; i++) {
      var hash_value = murmurhash3_32_gc(key, i);
      if (!get_bit(Math.abs(Math.floor(hash_value % bit_size)))) {
        return false;
      }
    }
    return true;
  };
}

var bloomFilter = new BoolmFilter(10000000, 0.001);
bloomFilter.add("https://blog.csdn.net/houzuoxin/article/details/20907911");
bloomFilter.add("https://www.jianshu.com/p/888c5eaebabd");
console.log(
  bloomFilter.isExist(
    "https://blog.csdn.net/houzuoxin/article/details/20907911"
  )
);
console.log(bloomFilter.isExist("https://www.jianshu.com/p/888c5eaebabd"));
console.log(bloomFilter.isExist("https://www.jianshu.com/p/888c5eaebab2"));
console.log(bloomFilter.isExist("https://www.jianshu.com/p/888c5eaebabd435"));
