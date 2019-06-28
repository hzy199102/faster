// import Queue from '../js_class/queue/myQueue'
var { Queue } = require('../queue/myQueue.js')
// console.log(Queue)

/**
 * 用2个队列实现一个栈
 * 
 * 思路：
 * 栈就实现push,pop,top3个方法
 * 
 * push: 如果2个队列为空，那么默认向queue_1里添加数据，如果有一个不为空，则向其添加数据
 * 
 * top: 如果2个队列都为空，或者有一个不为空，就返回不为空队列的尾部元素即可
 * 
 * pop: pop要删除的是栈顶，但这个栈顶其实是不为空的队列的尾部元素，每一次做pop操作时，将不为空的队列里的元素一次删除并放入到另一个队列中
 * 直到遇到队列只剩下最后一个元素，删除这个元素，其余元素都跑到了之前为空的队列
 * 
 * 注：定义2个额外的变量，data_queue和empty_queue,始终分别指向不为空的队列和为空的队列，防止每次操作都要找来找去麻烦
 */
function QueueStack() {
    var queue_1 = new Queue()
    var queue_2 = new Queue()
    var data_queue = null
    var empty_queue = null

    // 确认哪个队列放数据，哪个队列做备份空队列
    var init_queue = function () {
        // 都为空，默认返回queue_1
        if (queue_1.isEmpty() && queue_2.isEmpty()) {
            data_queue = queue_1
            empty_queue = queue_2
        } else if (queue_1.isEmpty()) {
            data_queue = queue_2
            empty_queue = queue_1
        } else {
            data_queue = queue_1
            empty_queue = queue_2
        }
    }

    this.push = function (item) {
        init_queue();
        data_queue.enqueue(item)
    }

    this.top = function () {
        init_queue()
        return data_queue.tail()
    }

    /**
    * pop⽅方法要弹出栈顶元素,这个栈顶元素,其实就是queue的队尾元素
    * 但是队尾元素是不不能删除的,我们可以把data_queue⾥里里的元素(除了了队尾元素)都移除放⼊入到empty_queue中
    * 最后移除data_queue的队尾元素并返回
    * data_queue 和 empty_queue 交换了了身份
    */
    this.pop = function () {
        init_queue();
        while (data_queue.size() > 1) {
            empty_queue.enqueue(data_queue.dequeue());
        }
        return data_queue.dequeue();
    };
}
// var q_stack = new QueueStack();
// q_stack.push(1);
// q_stack.push(2);
// q_stack.push(4);
// console.log(q_stack.top()); // 栈顶是 4
// console.log(q_stack.pop()); // 移除 4
// console.log(q_stack.top()); // 栈顶变成 2
// console.log(q_stack.pop()); // 移除 2
// console.log(q_stack.pop()); // 移除 1

// require
module.exports = {
    QueueStack
}