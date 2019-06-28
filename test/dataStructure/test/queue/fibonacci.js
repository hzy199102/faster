// import Queue from '../js_class/queue/myQueue'
var { Queue } = require("../../js_class/queue/myQueue.js");
var { Power } = require("../../test/power");
// console.log(Queue)

/**
 * 使用队列计算斐波那契数列的第N项
 *
 *
 *
 * 斐波那契数列的前2项是1 1，此后的每一项都是该项前两项之和，即f(n) = f(n-1) + f(n-2)
 *
 * 思路
 * 1.先将2个1放入队列中，之后while循环，用index计数，循环终止的条件是index < n -2
 * 2.dequeue队列元素，该元素为del_item
 * 3.head获得队列头部元素，该元素为head_item
 * 4.del_item + head_item = nex_item,将next_item放入队列
 * 5.index+1
 * 6。循环结束之后的队列tail就是我们需要的数
 *
 */
function fibonacci(n) {
  var start = Date.now();
  var queue = new Queue();
  var index = 0;
  queue.enqueue(1);
  queue.enqueue(1);

  while (index < n - 2) {
    var del_item = queue.dequeue();
    var head_item = queue.head();
    var next_item = del_item + head_item;
    queue.enqueue(next_item);
    index = index + 1;
  }
  console.log("fibonacci耗时：" + (Date.now() - start));
  return queue.tail();
}

function fibonacci_2(n) {
  var start = Date.now();
  let num1 = 1,
    num2 = 2,
    num3 = 0;
  if (n < 1) return -1;
  if (n == 1 || n == 2) return 1;
  for (let i = 3; i < n; i++) {
    num3 = num1 + num2;
    num1 = num2;
    num2 = num3;
  }
  console.log("fibonacci_2耗时：" + (Date.now() - start));
  return num3;
}

/**
 * [f(n)f(n−2)f(n−1)f(n−3)]=[f(n−1)f(n−3)f(n−2)f(n−4)][1110]
 * [f(n)f(n−2)f(n−1)f(n−3)]=[f(4)f(2)f(3)f(1)][1110]n−4
 * 用矩阵加速算法求出[1110]n−4，再做一次矩阵乘法，所得矩阵的(0,0)元素就是最终结果。
 *
 * @param {*} n
 */
function fibonacci_3(n) {
  var res = null;
  var start = Date.now();
  var power = new Power();

  // [[1,1],[1,0]]
  var coefficient = [[1, 1], [1, 0]];
  var constant = [[3, 2], [1, 1]];

  coefficient = power.normal_6(coefficient, n - 4);
  res = power.matrixMultiplication(constant, coefficient)[0][0];

  console.log("fibonacci_3耗时：" + (Date.now() - start));
  return res;
}

var num = 30000000;
console.log(fibonacci(num));
console.log(fibonacci_2(num));
console.log(fibonacci_3(num));
