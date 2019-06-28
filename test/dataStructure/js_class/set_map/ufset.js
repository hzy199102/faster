var { Tree, TreeNode } = require("../tree/tree");
function UFSets() {
  var parent = [];

  this.init = function(size) {
    parent = new Array(size);
    for (let i = 0; i < size; i++) {
      parent[i] = -1;
    }
  };
  this.find = function(item) {
    while (parent[item] >= 0) {
      item = parent[item];
    }
    return item;
  };
  this.union = function(root1, root2) {
    parent[root1] += parent[root2];
    parent[root2] = root1;
  };

  /**
   * root1和root2是不相交的，这一点union方法自身没有做判断，需要你在应用的时候自己去判断。
   */
  this.build_relation = function(i, j) {
    var root1 = this.find(i);
    var root2 = this.find(j);
    if (root1 !== root2) {
      this.union(root1, root2);
    }
  };

  this.is_friend = function(i, j) {
    var root1 = this.find(i);
    var root2 = this.find(j);
    return root1 === root2;
  };

  this.get_friend_group_count = function() {
    var count = 0;
    for (let i = 0, len = parent.length; i < len; i++) {
      if (parent[i] < 0) {
        count++;
      }
    }
    return count;
  };

  this.show_group = function() {
    var treeMap = {};
    for (let i = 0, len = parent.length; i < len; i++) {
      var treeNode = new TreeNode(i);

      if (parent[i] < 0) {
        var tree = new Tree();
        tree.set_root(new TreeNode(i));
      }
    }
    return treeMap;
  };
}

var friends = [[0, 7], [1, 6], [4, 8], [8, 2], [9, 0], [3, 5], [1, 2]];

var ufset = new UFSets();
ufset.init(10);

for (var i = 0; i < friends.length; i++) {
  var item = friends[i];
  ufset.build_relation(item[0], item[1]);
}

console.log("朋友圈个数为 " + ufset.get_friend_group_count());
console.log(ufset.is_friend(2, 6));
console.log(ufset.is_friend(6, 8));
console.log(ufset.is_friend(4, 8));
console.log(ufset.is_friend(9, 7));
console.log(ufset.is_friend(2, 4));
console.log(ufset.is_friend(2, 7));
console.log(ufset.is_friend(0, 7));
