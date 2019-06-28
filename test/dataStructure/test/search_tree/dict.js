var {
  BinarySearchTree
} = require("../../js_class/search_tree/binarysearchtree.js");

var Term = function(key, value) {
  this.key = key;
  this.value = value;

  this.toString = () => {
    return this.key;
  };
};
function MyDict() {
  var bst = new BinarySearchTree();
  this.set = function(key, value) {
    // 向字典中添加key-value对
    var term = new Term(key, value);
    bst.insert(term);
  };

  this.get = function(key) {
    // 返回key所对应的value
    var data = bst.search(key);
    // console.log(data);
    if (data) {
      return data.data.value;
    }
    return null;
  };

  this.hasKey = function(key) {
    // 是否存在key
    if (bst.search(key)) {
      return true;
    }
    return false;
  };

  this.print = function() {
    console.log(bst.get_root());
    bst.in_order(bst.get_root());
  };
}

var md = new MyDict();
md.set("name", "javascript");
md.set("age", 20);

console.log(md.hasKey("class"));
console.log(md.hasKey("name"));
console.log(md.hasKey("age"));
console.log(md.get("name"));
console.log(md.get("age"));
