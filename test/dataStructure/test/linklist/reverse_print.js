var { LinkList } = require('../../js_class/linkList/myLinkList.js')

/**
 * 从尾到头打印列表
 * @param {*} head 
 */
var reverse_print = function (head) {
    if (head === null) {
        return
    } else {
        reverse_print(head.next); // 甩锅
        console.log(head.data); // 后⾯面的都打印了了，该打印⾃自⼰己了了
    }

}

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

reverse_print(node1)