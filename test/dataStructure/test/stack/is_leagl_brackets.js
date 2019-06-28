var { Stack } = require('../../js_class/stack/myStack.js')

/**
 * 下面的字符串包含小括号，请编写一个函数判断字符串中的括号是否合法，所谓合法，就是括号成对出现
 *
 * sdf(asd(aas(dddd)aa))
 * asdas(dd)(asdas(aaaa)dsa)()vvvv
 * asd(asd)((asdsad)asdsadsad)(asd(asdsad)(
 *
 * 思路：
 * 循环整个字符串
 * 遇到左括号。压入栈中
 * 遇到右括号，判断栈是否为空，为空缺乏左括号，不为空，移除栈顶左括号
 * for循环结束，如果栈中还有元素，说明缺乏右括号
 *
 *
 * 场景：
 * 1.代码编译器，格式校验
 * 2.word文档的撤销和恢复
 */
function is_leagl_brackets(string) {
    var stack = new Stack()
    for (var i = 0; i < string.length; i++) {
        var item = string[i]
        // 遇到左括号入栈
        if (item === '(') {
            stack.push(item)
        } else if (item === ')') {
            // 遇到右括号，判断栈是否为空
            if (stack.isEmpty()) {
                return false
            } else {
                stack.pop()
            }
        }
    }
    // 如果栈为空，说明字符串括号合法
    return stack.isEmpty()
}
//console.log(is_leagl_brackets('sdf(asd(aas(dddd)aa))'))
//console.log(is_leagl_brackets('asdas(dd)(asdas(aaaa)dsa)()vvvv'))
//console.log(is_leagl_brackets('asd(asd)((asdsad)asdsadsad)(asd(asdsad)('))