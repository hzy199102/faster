var { Stack } = require('../../js_class/stack/myStack.js')

var priority_map = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
};

/**
 * 中缀转后缀表达式
 */
function infix_exp_2_postfix_exp(exp) {
    var stack = new Stack()

    var postfix_list = []
    for (let i = 0; i < exp.length; i++) {
        var item = exp[i];
        // 如果是数字，直接放入postfix_list中
        if (!isNaN(item)) {
            postfix_list.push(item)
            // 遇到左括号直接入栈
        } else if (item === '{') {
            stack.push(item)
            // 遇到右括号，把栈顶元素弹出，直到遇到左括号
        } else if (item === '}') {
            while (stack.top() !== '{') {
                postfix_list.push(stack.pop())
            }
            stack.pop() // 左括号出栈，不需要放入数组中
        } else {
            // 如果遇到运算符，把栈顶的运算符弹出，直到栈顶的运算符优先级小于当前的运算符
            while (!stack.isEmpty() && ["+", "-", "*", "/"].indexOf(stack.top()) >= 0 && priority_map[stack.top()] >= priority_map[item]) {
                // 把弹出的运算符加入到postfix_list中
                postfix_list.push(stack.pop())
            }
            // 当前运算符入栈
            stack.push(item)
        }
    }
    while (!stack.isEmpty()) {
        // 把弹出的运算符加入到postfix_list中
        postfix_list.push(stack.pop())
    }
    return postfix_list
}

console.log(infix_exp_2_postfix_exp(['12', '+', '3', "*", "15"]))