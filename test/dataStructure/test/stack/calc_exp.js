var { Stack } = require('../../js_class/stack/myStack.js')

/**
 * 逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式，
 * 例如：（a+b）*（c+d）转换为ab+cd+*
 *
 * 前缀、中缀、后缀表达式(逆波兰表达式)
 * https://www.cnblogs.com/chensongxian/p/7059802.html
 *
 * 后缀表达式好处
 * 计算机是使用后缀表达式计算公式的，它不会像人类一样用中缀表达式做，效率太低
 *
 *  运算符前2个数加起来运算符计算出结果，替换这3个数
 *  [4, 13, 5, /, +]
 *  [4, 2, +]
 *  这个思路太low，太复杂
 *
 *  用栈实现的思路
 *  遍历数组
 *  如果元素不是运算符，压栈
 *  如果是运算符，则从栈弹出2个元素，计算，将结果从新压栈
 *  注意：运算符左边是栈的次顶元素，右边是顶元素
 *  循环结束，栈里只会剩下一个元素，就是计算结果
 *
 */
function calc_exp(exp) {
    var stack = new Stack()
    for (var i = 0; i < exp.length; i++) {
        var item = exp[i]
        if (["+", "-", "*", "/"].indexOf(item) > -1) {
            var value_1 = stack.pop()
            var value_2 = stack.pop()
            // 注意2个数字在运算符的左右位置
            var exp_str = value_2 + item + value_1
            // 计算
            var res = parseInt(eval(exp_str))
            // 计算结果压入栈中
            stack.push(res.toString())
        } else {
            stack.push(item)
        }
    }
    return stack.pop()
}
//console.log(calc_exp(['4', '13', '5', '/', '+']))