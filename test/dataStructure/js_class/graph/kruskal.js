const { MinHeap } = require("../heap/minheap");
const { UFSets } = require("./ufset");
const { Graph } = require("./graph");

/**
 * 图的边
 * 为了并查集，才记录首尾节点的
 *
 * @param {*} head 首节点
 * @param {*} tail 尾节点
 * @param {*} cost 权值
 */
var Edge = function(head, tail, cost) {
  this.head = head;
  this.tail = tail;
  this.cost = cost;

  // 为了方便最小堆关键码比对，更好的做法是最小堆的存储是对象，有个关键码专门做比对，当时设计的时候为了方便了解原理，直接存储的是数字，改起来麻烦，就这样将就了。
  this.toString = () => {
    // console.log(this.cost);
    return this.cost;
  };
};
/**
 * 最小生成树，连通图，无向图
 * 使用kruskal算法
 * 1.克鲁斯卡尔算法与哈夫曼树的生成算法非常相似，先将所有的边都存入到一个最小堆中，用权值做关键码，
 * 2.那么堆顶的边，一定会被至少一棵最小生成树所采用，于是将堆顶删除放入到最小生成树中，现在，堆顶是剩余的边中权值最小的，继续删除并放入到最小生成树中。
 * 3.在反复的删除堆顶的边并加入到最小生成树的过程中，要判断边的两个顶点是否在同一个连通分量中，如果是，那么这个边就不能使用，否则会形成回路。
 * 4.边的数量最小，N个顶点，N-1个边，为什么N-1个边呢？因为3判断回路情况
 *
 * 需要使用到最小堆，并查集，图
 * @param {*} graph
 */
function kruskal(graph) {
  var mst = [];
  var node_num = graph.get_node_num();
  var edge_num = graph.get_edge_num();
  var min_heap = new MinHeap(edge_num);
  var ufset = new UFSets(node_num);

  // 先将所有的边都存入到一个最小堆中，用权值做关键码
  for (let i = 0; i < node_num; i++) {
    for (let j = i + 1; j < node_num; j++) {
      var cost = graph.get_weight(i, j);
      if (cost !== Graph.MAX_VALUE) {
        var ed = new Edge(i, j, cost);
        min_heap.insert(ed);
      }
    }
  }

  var count = 1;
  while (count < node_num) {
    var ed = min_heap.remove_min();
    var head_node = ufset.find(ed.head);
    var tail_node = ufset.find(ed.tail);
    if (head_node !== tail_node) {
      mst.push(ed);
      ufset.union(head_node, tail_node);
      count++;
    } else {
      console.log("构成环路");
      console.log(ed);
    }
  }

  return mst;
}

var maps = [
  [
    0,
    28,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE,
    10,
    Graph.MAX_VALUE
  ],
  [28, 0, 16, Graph.MAX_VALUE, Graph.MAX_VALUE, Graph.MAX_VALUE, 14],
  [
    Graph.MAX_VALUE,
    16,
    0,
    12,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE
  ],
  [Graph.MAX_VALUE, Graph.MAX_VALUE, 12, 0, 22, Graph.MAX_VALUE, 18],
  [Graph.MAX_VALUE, Graph.MAX_VALUE, Graph.MAX_VALUE, 22, 0, 25, 24],
  [
    10,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE,
    Graph.MAX_VALUE,
    25,
    0,
    Graph.MAX_VALUE
  ],
  [Graph.MAX_VALUE, 14, Graph.MAX_VALUE, 18, 24, Graph.MAX_VALUE, 0]
];
var graph = new Graph();
graph.init(maps);

var mst = kruskal(graph);
console.log(mst);
