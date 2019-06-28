
var { LinkList } = require('../linkList/myLinkList.js')

function LinkListStack() {
    var linklist = new LinkList()

    // 从栈顶添加元素
    this.push = function (item) {
        linklist.append(item);
    };
    // 弹出栈顶元素
    this.pop = function () {
        return linklist.remove_tail();
    };
    // 返回栈顶元素
    this.top = function () {
        return linklist.tail();
    };
    // 返回栈的⼤大⼩小
    this.size = function () {
        return linklist.length();
    };
    // 判断是否为空
    this.isEmpty = function () {
        return linklist.isEmpty();
    };
    // 清空栈
    this.clear = function () {
        linklist.clear()
    };
}

// var l_stack = new LinkListStack();
// l_stack.push(1);
// l_stack.push(2);
// l_stack.push(4);
// console.log(l_stack.top()); // 栈顶是 4
// console.log(l_stack.pop()); // 移除 4
// console.log(l_stack.top()); // 栈顶变成 2
// console.log(l_stack.pop()); // 移除 2
// console.log(l_stack.pop()); // 移除 1

// require
module.exports = {
    LinkListStack
}