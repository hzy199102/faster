var TreeNode = function(data) {
  this.data = data; // 数据
  this.leftChild = null; //左孩子
  this.rightChild = null; //右孩子
  this.parentNode = null; // 父节点
};
var Tree = function() {
  var root = null; // 根节点
  // 返回根节点
  this.get_root = function() {
    return root;
  };
  this.set_root = function(node) {
    root = node;
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
};
// require
module.exports = {
  TreeNode,
  Tree
};
