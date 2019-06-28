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

/**
 * 在这里实现你的代码,返回倒数第k个节点的值
 * 
 * 思路：
 * 设置2个游标节点，第二个比第一个慢K个位置
 * 2个节点同时向尾部移去，当第一个达到尾部的时候，第二个正好在倒数第K个
 * 
 * 递归思路在此处并不适用，但是如果是link，肯定会包含length，这个就好处理了
 * @param {*} head 
 * @param {*} k 
 */
function reverse_find(head, k) {
    var fast_node = head
    var slow_node = head
    var step = k // 除非特殊情况，永远不要去改变形参

    while (step > 0 && fast_node) {
        fast_node = fast_node.next
        step--
    }
    // 链表长度不够
    if (step !== 0) {
        return null
    }

    while (fast_node) {
        slow_node = slow_node.next
        fast_node = fast_node.next
    }

    return slow_node.data
};
console.log(reverse_find(node1, 2));