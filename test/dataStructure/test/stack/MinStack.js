var { Stack } = require('../../js_class/stack/myStack.js')

/**
 * 实现一个有min方法的栈
 *
 * 除了常见的push，pop方法之外，提供min方法，返回栈里最小的元素，而且时间复杂度为o(1)
 * 意味着只能循环一次
 *
 * 时间复杂度
 * https://blog.csdn.net/qq_41523096/article/details/82142747
 * 如何推导出时间复杂度呢？有如下几个原则：如果运行时间是常数量级，用常数1表示；只保留时间函数中的最高阶项；如果最高阶项存在，则省去最高阶项前面的系数。
 *
 * 思路
 * 2个栈去实现，一个存放栈的原数据，一个存放当前栈的最小值，
 * 注意，push_2的空间复杂度比push要低
 */
function MinStack() {
    var data_stack = new Stack()
    var min_stack = new Stack()

    this.push = function (item) {
        data_stack.push(item)
        /**
         * 这里是最关键的地方，如果min_stack是空或者不大于min_stack的顶元素，直接push到min_stack的栈顶
         * 如果都不符合，为了保持和data_stack数量一致，肯定也要push进一个值，那这个值就是原来栈顶的的最小值
         * 为什么呢？这样在pop操作之后，data_stack和min_stack同时pop后，min_stack的栈顶还能继续保持最小值，就是
         * data_stack中的那个最小值，
         *
         */
        if (min_stack.isEmpty() || item < min_stack.top()) {
            min_stack.push(item)
        } else {
            min_stack.push(min_stack.top())
        }
    }
    /**
     * 换个思路，如果min_stack是空或者不大于min_stack的顶元素，直接push到min_stack的栈顶
     * 如果都不符合，不放值
     * 注：考虑有2个相同的最小值的情况，所以才是不大于
     */
    this.push_2 = function (item) {
        data_stack.push(item)
        if (min_stack.isEmpty() || item <= min_stack.top()) {
            min_stack.push(item)
        } else {
        }
    }
    /**
     * 直接保持data_stack，和min_stack里面数据的数量是一致的
     */
    this.pop = function () {
        data_stack.pop()
        min_stack.pop()
    }
    /**
     * 需要在pop方法上做文章，判断data_stack栈pop的值不大于min_stack栈顶的最小值，
     * 是的话不处理min_stack，反之min_stack.pop
     */
    this.pop_2 = function () {
        var temp = data_stack.pop()
        if (temp > min_stack.top()) {

        } else {
            min_stack.pop()
        }
    }
    this.min = function () {
        return min_stack.top()
    }
}
var minstack = new MinStack()
//minstack.push(6)
//minstack.push(8)
//minstack.push(3)
//minstack.pop()
//console.log(minstack.min())
//minstack.push(2)
//console.log(minstack.min())
//minstack.pop()
//console.log(minstack.min())

minstack.push_2(6)
minstack.push_2(8)
minstack.push_2(3)
minstack.pop_2()
console.log(minstack.min())
minstack.push_2(2)
minstack.push_2(2)
console.log(minstack.min())
minstack.pop_2()
minstack.pop_2()
console.log(minstack.min())
