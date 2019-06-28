
/**
 * 
 * @param {*} data 
 */
var Node = function (data) {
    this.data = data;
    this.next = null;
}
var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
function print(node) {
    var curr_node = node;
    while (curr_node) {
        console.log(curr_node.data);
        curr_node = curr_node.next;
    }
};
// 迭代翻转
function reverse_iter(head) {
    if (!head) {
        return null;
    }
    var pre_node = null; // 前⼀一个节点
    var curr_node = head; // 当前要翻转的节点
    while (curr_node) {
        var next_node = curr_node.next; // 下⼀一个节点
        curr_node.next = pre_node; // 对当前节点进⾏行行翻转
        pre_node = curr_node; // pre_node向后滑动
        curr_node = next_node; // curr_node向后滑动
    }
    //最后要返回pre_node,当循环结束时,pre_node指向翻转前链表的最后⼀一个节点
    return pre_node;
};

// 递归翻转
function reverse_digui(head) {
    // 如果head 为null
    if (!head) {
        return null;
    }
    if (head.next == null) {
        return head;
    }
    // 从下⼀一个节点开始进⾏行翻转
    var new_head = reverse_digui(head.next);
    head.next.next = head; // 把当前节点连接到新链表上
    head.next = null;
    return new_head;
}

/**
 * 迭代翻转，自己编写
 * 
 * @param {*} head 
 */
function reverse_iter_2(head) {
    if (!head) {
        return null
    }
    var pre_node = null
    var curr_node = head
    // 如果while的条件是curr_node,那么循环体内一定不能出现在curr_node还未进行判断就直接获取next的情况
    // 这是所有while的准则，即循环体内对于条件的设定必须写在最后一行，这里就是curr_node = next_node 必须是循环体的最后一行
    while (curr_node) {
        var next_node = curr_node.next
        curr_node.next = pre_node
        pre_node = curr_node
        curr_node = next_node
    }
    return pre_node
};

// 递归翻转，自己编写
function reverse_digui_2(head) {
    // 如果head 为null
    if (!head) {
        return null;
    }
    // 递归的核心是有终止条件，这里就是找到了尾节点，那么停止递归，返回尾节点
    if (head.next === null) {
        return head
    }
    // 返回尾节点，并且，这个递归操作的核心是接下来的2行代码，就是2个相邻节点的互换
    var tail_node = reverse_digui_2(head.next)
    head.next.next = head
    head.next = null
    return tail_node
}

// print(reverse_iter(node1));
// print(reverse_iter_2(node1));
// print(reverse_digui(node1));
print(reverse_digui_2(node1));