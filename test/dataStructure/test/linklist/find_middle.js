var Node = function (data) {
    this.data = data;
    this.next = null;
};
var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
var node6 = new Node(6);
var node7 = new Node(7);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
// node5.next = node6;
// node6.next = node7;
/**
 * 返回链表的中间节点
 * 
 * 思路：
 * 2个游标一起走，一个走一步，一个走二步，快的到尾部了，慢的正好到中间
 * 考虑到奇偶性，要判断走的快的节点踏空的问题
 * 
 * @param {*} head 
 */
function find_middle(head) {
    // 在这⾥里里实现你的代码
    var fast_node = head
    var slow_node = head

    while (fast_node && fast_node.next) {
        fast_node = fast_node.next.next
        if (fast_node !== null) {
            slow_node = slow_node.next
        } else {

        }
    }

    return slow_node.data

};
console.log(find_middle(node1));