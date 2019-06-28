const { MinHeap } = require("../heap/minheap");
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
 * 使用prim算法
 * 1.prim（普里姆）算法要求指定一个顶点v，从这个顶点开始构建最小生成树。
 * 2.与kruskal算法类似，也需要一个最小堆存储边，存储图的边，顶点v是第一个加入到最小生成树顶点集合的顶点，记做b_mst[v]=1。
 * 3.用数组b_mst[i]=1 表示顶点i在最小生成树顶点集合中，每次选出一个端点在生成树中，而另一个端点不在生成树的权值最小的边(u，v)，而它恰好是堆顶的边，将其从最小堆中删除，并加入到生成树中，
 * 然后将新出现的所有一个端点在生成树中，另一个端点不在生成树中的边加入到最小堆中，如此重复，直到找到n-1条边。
 *
 * @param {*} graph
 * @param {*} v
 */
function prim(graph, v) {
  var mst = [];
  var node_num = graph.get_node_num();
  var edge_num = graph.get_edge_num();
  var b_mst = new Array(node_num);
  for (let i = 0; i < node_num; i++) {
    b_mst[i] = 0;
  }

  b_mst[v] = 1;
  var count = 1;
  var start_v = v;
  var min_heap = new MinHeap(edge_num);
  // 确保是N-1条边的最小生成树
  while (count < node_num) {
    // 先找到所有start_v 能够到达的顶点，且这个顶点不在树中（根据b_mst[i] === 0判断，1表示已经在树中，肯定能排除自己，因为自己肯定在树中）
    // 将满足条件的边放入最小堆中
    for (let i = 0; i < node_num; i++) {
      if (b_mst[i] === 0) {
        var cost = graph.get_weight(start_v, i);
        if (cost !== Graph.MAX_VALUE) {
          var ed = new Edge(start_v, i, cost);
          min_heap.insert(ed);
        }
      }
    }
    // 当将从start_v开始所有满足条件的边放入最小堆之后，说明这个start_v已经被处理了，于是从最小堆找出最小权值的边，这个边的首节点head肯定在树中，需要判断尾节点tail是否在树中
    // 或许有疑问，按上面那个for循环得到的边的tail肯定不在树中啊？需要注意，最开始的确不在树中，但是如果已经进行了多次逻辑判断，堆中的边可能存在tail被多个边共用，而某个边已经作为
    // 最小边被处理的情况，这时候tail就可能已经在树中了，所以还需要进行b_mst[ed.tail] == 0的判断
    // 找到满足条件的最小边（tail不在树中的最小边），把tail设置成start_v，以它为顶点继续之前的逻辑操作，这样就能找到所有的边，同时要结束这个小循环
    while (min_heap.size() !== 0) {
      var ed = min_heap.remove_min();
      // ed.tail还没有加入到生成树的顶点集合中
      if (b_mst[ed.tail] === 0) {
        mst.push(ed);
        start_v = ed.tail;
        b_mst[start_v] = 1;
        count++;
        break;
      }
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

var mst = prim(graph, 1);
console.log(mst);
