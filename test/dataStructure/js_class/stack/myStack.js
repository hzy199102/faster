/**
 * push 添加一个元素到栈顶
 * pop 弹出栈顶元素，但是有返回值，就是弹出的那个元素
 * top 返回栈顶的元素，只是看一眼，不拿出
 * isEmpty 判断栈是否为空
 * size 返回栈元素的个数
 * clear 清空栈
 * @constructor
 *
 * v1.0 只是单纯了解栈的数组实现形式，健壮性不做过多要求
 *
 * 1.对数组的封装，栈太简单？
 *  栈是种概念，既然会数组，为什么不用它实现栈，是不知道栈的概念，还是不知道栈的的具体方法，无论
 *  哪种情况，栈对你都是全新的知识
 *
 * 2.既然栈的底层实现是数组，栈能做的事情，数组也能做，为什么弄一个栈出来，不是多此一举吗？
 * 封装是为了隐藏实现的细节，站在栈的肩膀思考问题显然要比站在数组的肩膀思考问题更方便
 *
 *
 *
 */
function Stack() {
    var items = []; // 使用数组存储数据

    /**
     * 从栈顶添加元素，也叫压栈
     * @param item
     */
    this.push = function (item) {
        items.push(item)
    }

    /**
     * 弹出栈顶元素
     * @returns {T}
     */
    this.pop = function () {
        return items.pop()
    }

    /**
     * 返回栈顶元素
     * @returns {*}
     */
    this.top = function () {
        return items[items.length - 1]
    }

    /**
     * 判断栈是否为空
     * @returns {boolean}
     */
    this.isEmpty = function () {
        return items.length === 0
    }

    /**
     * 返回栈的大小
     * @returns {Number}
     */
    this.size = function () {
        return items.length
    }

    /**
     * 返回栈底层元素
     */
    this.tail = function () {
        return items[0]
    }

    /**
     * 清空栈
     */
    this.clear = function () {
        items = []
    }

}

// require
module.exports = {
    Stack
}






