/**
 * 迷宫问题，是用了队列确定最近的路程
 */
var { Queue } = require("../../js_class/queue/myQueue.js");

var maze_array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0]
];

/**
 * @param {*} x 
 * @param {*} y 
 */
var Node = function(x, y) {
  this.x = x;
  this.y = y;
  this.step = 0;
};

var Position = function(x, y) {
  this.x = x;
  this.y = y;
};

function find_near(pos, maze) {
  var near_poses = []
  // 上
  if (pos.x - 1 >= 0) {
    near_poses.push(new Position(pos.x - 1, pos.y))
  }
  // 右
  if (pos.y + 1 < maze[0].length) {
    near_poses.push(new Position(pos.x, pos.y + 1))
  }
  // 下
  if (pos.x + 1 < maze.length) {
    near_poses.push(new Position(pos.x + 1, pos.y))
  }
  // 左
  if (pos.y - 1 >= 0) {
    near_poses.push(new Position(pos.x, pos.y - 1))
  }
  return near_poses
}

/**
 * 思路：
 * 1. 从起点开始，把这个点能一步到达的临近点都标记为1，然后把标记为1的点的临近点标记为2，以此类推，直到找到终点或者找到达不到的地方为止
 *    为了达到这个效果，可以使用队列，先将起点放入队列进行初始化，然后取出对首，计算其可以到达的临近点，将它们放入队列，以此类推，这样标记1的临近点全部处理完才会处理
 *    标记为2的临近点，并以此类推，这是队列的特性，标记为1的临近点一定比标记为2的临近点先进入队列，所以它们也会先被取出进行处理，只有找到终点或者队列已经没有数据的时候
 *    才说明地图被处理完，接着可以根据是否找到终点来决定是否列出最近的路线
 * 2. 终点旁边一定有个最大的标记点，最大的标记点旁边也一定有次一级的标记点，以此类推，最后一定能找到起始点，然后倒序打印即可
 * @param {*} maze
 * @param {*} start_pos
 * @param {*} end_pos
 */
function find_path(maze, start_pos, end_pos) {
  // 带标记数和位置的迷宫
  var maze_node = [];
  for (var i = 0; i < maze.length; i++) {
    var line = [];
    for (var j = 0; j < maze[i].length; j++) {
      line.push(new Node(i, j));
    }
    maze_node.push(line);
  }
  // 是否到达终点
  var is_arrive = false;
  // 到达终点前的最大标记数
  var max_step = 0;
  var queue = new Queue();
  queue.enqueue(start_pos);
  while (true) {
    var curr_pos = queue.dequeue();
    var near_poses = find_near(curr_pos, maze)
    for (var i = 0; i < near_poses.length; i++) {
      // 遇到终点
      if (near_poses[i].x === end_pos.x && near_poses[i].y === end_pos.y) {
        is_arrive = true;
        max_step = maze_node[curr_pos.x][curr_pos.y].step
        break
      }
      // 遇到起点
      if (near_poses[i].x === start_pos.x && near_poses[i].y === start_pos.y) {
        continue
      }
      // 遇到障碍物
      if (maze[near_poses[i].x][near_poses[i].y] === 1) {
        continue
      }
      // 遇到已经走过的地方，就是标记数大于0的地方
      if (maze_node[near_poses[i].x][near_poses[i].y].step > 0) {
        continue
      }
      maze_node[near_poses[i].x][near_poses[i].y].step = maze_node[curr_pos.x][curr_pos.y].step + 1
      queue.enqueue(near_poses[i]);
    }
    if (is_arrive) {
      break
    }
    if(queue.isEmpty()) {
      break
    }
  }
  console.log(maze_node)
  console.log(is_arrive)
  var path = []
  if (is_arrive) {
    path.push(end_pos)
    var curr_pos = end_pos
    var step = max_step

    while(step > 0) {
      var near_poses = find_near(curr_pos, maze)
      for (var i = 0; i < near_poses.length; i++) {
        if (maze_node[near_poses[i].x][near_poses[i].y].step === step) {
          curr_pos = near_poses[i]
          step--
          path.push(near_poses[i])
          break
        }
      }
    }
    path.push(start_pos)
  }
  console.log(path.reverse())
}

var start_pos = new Position(2, 1);
var end_pos = new Position(3, 5);
find_path(maze_array, start_pos, end_pos);
