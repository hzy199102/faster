var { Queue } = require('../../js_class/queue/myQueue.js')
// console.log(Queue)
/**
 * 约瑟夫环
 *
 * 有一个数组a[100]存放0-99;要求没隔2个数删除一个数，到末尾时环至开头继续进行，求最后一个呗删掉的数。
 *
 *
 * 思路：
 * 1.从队列头部删除一个元素，index+1
 * 2.如果index % 3 === 0，就说明这个元素是需要删除的元素，如果不等于0，就不是需要删除的元素，则把它添加到队列的尾部
 * 3.直到只剩下一个元素
 */
function del_ring(arr_list) {
    // 把数组里的元素放到队列中
    var queue = new Queue()
    for (let i = 0; i < arr_list.length; i++) {
        queue.enqueue(arr_list[i]);
    }

    var index = 0;
    while (queue.size() !== 1) {
        // 弹出一个元素，判断是否需要被删除
        var item = queue.dequeue();
        index += 1;
        // 每个2个元素要删除掉一个，那么不是被删除的元素就放回队列尾部
        if (index % 3 != 0) {
            queue.enqueue(item)
        }
    }

    return queue.head();
}

var arr_list = [];
for (let index = 0; index < 4; index++) {
    arr_list.push(index)
}
// console.log(arr_list)
console.log(del_ring(arr_list))