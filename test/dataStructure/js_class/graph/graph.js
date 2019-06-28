/**
 * 图的存储结构——邻接矩阵
 * 这里处理的是无向图
 */
const { LinkListQueue } = require("../queue/linkListQueue");
var max_value = 9999;

function Graph() {
  // 用二维数组存储顶点和边的关系，图有N个顶点，则N*N的矩阵，每个顶点应该有最多N-1个边，在加上对自己的权值为0的边，就是N*N的矩阵
  var maps = [];
  var node_num = 0; // 顶点数目
  var edge_num = 0; //边的数目

  this.init = function(input_maps) {
    maps = input_maps;
    node_num = this.get_node_num();
    edge_num = this.get_edge_num();
  };
  /**
   * 获得顶点的个数
   */
  this.get_node_num = function() {
    // 这就是缓存机制
    if (node_num !== 0) {
      return node_num;
    }
    return maps.length;
  };

  /**
   * 获得边的个数
   */
  this.get_edge_num = function() {
    if (edge_num !== 0) {
      return edge_num;
    }

    var count = 0;
    for (var i = 0; i < node_num; i++) {
      // 无边图只需要算一半即可
      for (var j = i + 1; j < node_num; j++) {
        if (maps[i][j] > 0 && maps[i][j] < max_value) {
          count++;
        }
      }
    }
    return count;
  };

  /**
   * 获取指定2个顶点的边的权值
   */
  this.get_weight = function(u, v) {
    return maps[u][v];
  };

  /**
   * 深度优先遍历
   * 是递归遍历
   * @param {*} v
   * @param {*} visited
   * @param {*} component
   */
  var graph_dfs = function(v, visited, component) {
    visited[v] = 1; // 表示v已经访问过
    console.log(v);
    component.push(v);
    var row = maps[v];
    for (let i = 0; i < row.length; i++) {
      if (row[i] < max_value && visited[i] === 0) {
        // v 与i 是连通的,且i还没有被遍历过
        graph_dfs(i, visited, component);
      }
    }
  };

  /**
   * 深度优先遍历
   * 树的遍历默认从root根节点开始，而图不存在根节点的概念，因此在遍历时，要指定起始顶点v
   * 先找出v所能连接的所有顶点，遍历这些顶点，并对这些顶点做同v一样的操作。这是一个递归操作
   * 不同于树的遍历，图中各点有可能互相连通，为了不重复遍历，必须对已经遍历过的点进行标识，示例中使用数组visited[i]=1标识i已经遍历过。
   *
   * @param v 起始遍历节点
   * @returns 连通分量
   */
  this.dfs = function(v) {
    var visited = new Array(node_num);
    var component = []; // 存储连通分量
    // 初始化，表示节点都没遍历过
    for (let i = 0; i < node_num; i++) {
      visited[i] = 0;
    }
    graph_dfs(v, visited, component);
    return component;
  };

  /**
   * 广度优先遍历
   * 队列，从最近关系开始扩散，到第二层，第三层，以此类推，直到队列为空
   * @param {*} v
   * @param {*} visited
   * @param {*} component
   */
  var graph_bfs = function(v, visited, component) {
    var queue = new LinkListQueue();
    queue.enqueue(v);
    visited[v] = 1;
    while (!queue.isEmpty()) {
      var visited_v = queue.dequeue();
      var row = maps[visited_v];
      for (let i = 0; i < row.length; i++) {
        if (row[i] < max_value && visited[i] === 0) {
          queue.enqueue[i];
          visited[i] = 1;
          component.push(i);
          console.log(i);
        }
      }
    }
  };

  /**
   * 广度优先遍历
   * 同样使用数组visited[i]=1标识i已经遍历过，和树的分层打印节点一样，
   * 需要借助队列，将顶点v所能连通的其他顶点放入到队列中，而后出队列，对这个刚刚对队列的顶点做和v相同的操作
   * @param v 起始遍历节点
   * @returns 连通分量
   */
  this.bfs = function(v) {
    var visited = new Array(node_num);
    var component = []; // 存储连通分量
    // 初始化，表示节点都没遍历过
    for (let i = 0; i < node_num; i++) {
      visited[i] = 0;
    }
    graph_bfs(v, visited, component);
    return component;
  };

  /**
   * 获取连通分量集合
   */
  this.components = function() {
    var visited = new Array(node_num);
    var component_lst = [];
    for (var i = 0; i < node_num; i++) {
      visited[i] = 0;
    }

    for (var i = 0; i < node_num; i++) {
      if (visited[i] === 0) {
        var component = [];
        graph_bfs(i, visited, component);
        component_lst.push(component);
      }
    }
    return component_lst;
  };
}

Graph.MAX_VALUE = max_value;

// require
module.exports = {
  Graph
};
