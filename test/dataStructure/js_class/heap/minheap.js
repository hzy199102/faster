function MinHeap(size) {
  var heap = new Array(size); // 数组
  var curr_size = 0; // 当前堆的大小
  var max_size = size; // 堆最大容量

  var shif_down = function(start, m) {
    var parent_index = start; // 从start开始往下下滑调整
    var min_child_index = parent_index * 2 + 1; //分支节点一定有1个左子树

    // 保证一直有左子树才继续循环操作
    while (min_child_index <= m) {
      if (
        min_child_index < m &&
        heap[min_child_index] > heap[min_child_index + 1]
      ) {
        min_child_index = min_child_index + 1;
      }

      if (heap[parent_index] <= heap[min_child_index]) {
        break;
      } else {
        var tmp = heap[parent_index];
        heap[parent_index] = heap[min_child_index];
        heap[min_child_index] = tmp;
        parent_index = min_child_index;
        min_child_index = parent_index * 2 + 1;
      }
    }
  };

  this.init = function(arr) {
    max_size = arr.length;
    curr_size = max_size;
    heap = new Array(arr.length);
    // 填充heap，目前还不是一个最小堆
    for (let i = 0; i < curr_size; i++) {
      heap[i] = arr[i];
    }
    var curr_pos = Math.floor((max_size - 2) / 2); //堆的最后一个分支节点
    while (curr_pos >= 0) {
      shif_down(curr_pos, curr_size - 1);
      curr_pos--;
    }
  };

  var shif_up = function(start) {
    var child_index = start;
    var parent_index = Math.floor((child_index - 1) / 2);
    while (child_index > 0) {
      if (heap[child_index] > heap[parent_index]) {
        break;
      } else {
        var tmp = heap[parent_index];
        heap[parent_index] = heap[child_index];
        heap[child_index] = tmp;
        child_index = parent_index;
        parent_index = Math.floor((child_index - 1) / 2);
      }
    }
  };

  this.insert = function(item) {
    if (curr_size === max_size) {
      return false;
    }
    heap[curr_size] = item;
    shif_up(curr_size);
    curr_size++;
    return true;
  };

  this.remove_min = function() {
    if (curr_size <= 0) {
      return null;
    }
    var min_value = heap[0];
    heap[0] = heap[curr_size - 1];
    curr_size--;
    shif_down(0, curr_size - 1);
    return min_value;
  };

  this.size = function() {
    return curr_size;
  };

  this.print = function() {
    console.log(heap);
  };

  this.get_min = function() {
    if (curr_size > 0) {
      return heap[0];
    }
    return null;
  };
}
module.exports = {
  MinHeap
};
