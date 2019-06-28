var { LinkListStack } = require('../stack/linkListStack.js')
var Stack = LinkListStack
// var { Stack } = require('../stack/myStack.js')

/**
 * 用2个栈实现一个队列
 * 
 * 
 * 我实现的方法效率上有问题，其实enqueue直接操作stack_1,dequeue直接操作stack_2即可
 * 如果stack_2为空，在把stack_1的值倒进去，这样又可以进行dequeue操作了，见enqueue_2和dequeue_2和head_2
 */
function StackQueue() {

    var stack_1 = new Stack()
    var stack_2 = new Stack()

    this.enqueue = function (item) {
        while (!stack_2.isEmpty()) {
            stack_1.push(stack_2.pop())
        }
        stack_1.push(item)
    }
    this.dequeue = function () {
        while (!stack_1.isEmpty()) {
            stack_2.push(stack_1.pop())
        }
        return stack_2.pop()
    }
    this.head = function () {
        while (!stack_1.isEmpty()) {
            stack_2.push(stack_1.pop())
        }
        return stack_2.top()
    }
    this.head_2 = function () {
        if (stack_1.isEmpty() && stack_2.isEmpty()) {
            return null
        }
        if (stack_2.isEmpty()) {
            while (!stack_1.isEmpty()) {
                stack_2.push(stack_1.pop())
            }
        }
        return stack_2.top()
    }
    this.dequeue = function () {
        if (stack_1.isEmpty() && stack_2.isEmpty()) {
            return null
        }
        if (stack_2.isEmpty()) {
            while (!stack_1.isEmpty()) {
                stack_2.push(stack_1.pop())
            }
        }
        return stack_2.pop()
    }
    this.enqueue_2 = function (item) {
        this.stack_1.push(item)
    }
}
var s_queue = new StackQueue();
s_queue.enqueue(1);
s_queue.enqueue(2);
s_queue.enqueue(4);
console.log(s_queue.head()); // 栈顶是 1
console.log(s_queue.dequeue()); // 移除 1
console.log(s_queue.head()); // 栈顶变成 2
console.log(s_queue.dequeue()); // 移除 2
console.log(s_queue.head()); // 移除 4

// require
module.exports = {
    StackQueue
}