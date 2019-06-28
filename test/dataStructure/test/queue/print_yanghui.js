var { Queue } = require('../../js_class/queue/myQueue.js')
// console.log(Queue)

/**
 * 使用队列打印杨辉三角前N行，N > 1
 * 
 * @param {*} n 
 */
function print_yanghui(n) {
    var queue = new Queue()
    queue.enqueue(1)

    for (let i = 1; i <= n; i++) {
        var pre = 0
        var line = ""

        for (let j = 0; j < i; j++) {
            var item = queue.dequeue()
            line = line + " " + item
            var value = item + pre
            queue.enqueue(value)
            pre = item
        }

        queue.enqueue(1)

        console.log(line)

    }
}

function print_yanghui_2(n) {
    var queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(0)

    for (let i = 1; i <= n; i++) {
        var pre = 0
        var line = ""

        while (true) {
            var item = queue.dequeue()
            if (item === 0) {
                queue.enqueue(1)
                queue.enqueue(0)
                break
            } else {
                line = line + " " + item
                var value = item + pre
                pre = item
                queue.enqueue(value)
            }
        }
        console.log(line)
    }
}
    // print_yanghui(5)
    print_yanghui_2(5)