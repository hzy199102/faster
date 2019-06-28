/**
 * 双向链表
 */
function DoubleLinkList() {
    // 定义节点
    var Node = function (data) {
        this.data = data; // 数据
        this.next = null; // 后继指针
        this.pre = null; // 前驱指针
    }
    var length = 0; // 长度
    var head = null; // 头节点
    var tail = null; // 尾节点
    this.append = function (data) {
        // 在这⾥里里实现append⽅方法
        var new_node = new Node(data)
        if (!head) {
            head = new_node
            tail = new_node
        } else {
            tail.next = new_node
            new_node.pre = tail
            tail = new_node
        }
        length++
        return true
    };
    this.get = function (index) {
        if (index < 0 || index >= length) {
            return null
        } else {
            var curr_node = head
            var node_index = 0
            while (node_index < index) {
                curr_node = curr_node.next
                node_index++
            }
            return curr_node
        }
    }
    this.insert = function (index, data) {
        // 在这⾥里里实现insert⽅方法
        if (index < 0 || index > length) {
            return false
        } else if (index === length) {
            return this.append(data)
        } else {
            var new_data = new Node(data)
            if (index === 0) {
                head.pre = new_data
                new_data.next = head
                head = new_data
            } else {
                var pre_node = this.get(index - 1)
                var next_node = pre_node.next
                pre_node.next = new_data
                new_data.pre = pre_node
                new_data.next = next_node
                next_node.pre = new_data
            }
            length++
            return true
        }

    };
    this.remove = function (index) {
        // 在这⾥里里实现remove⽅方法
        if (index < 0 || index >= length) {
            return null
        } else {
            var del_node = null
            if (index === 0) {
                del_node = head
                head = head.next
                // 如果head == null,说明之前链表只有一个节点
                if (!head) {
                    tail = null
                } else {
                    head.pre = null
                }
            } else {
                var pre_node = this.get(index - 1)
                del_node = pre_node.next
                if (del_node.next) {
                    del_node.next.pre = pre_node
                    pre_node.next = del_node.next
                } else {
                    pre_node.next = null
                    tail = pre_node
                }
            }
            length--
            return del_node
        }
    }
    // 输出链表
    this.print = function () {
        var curr_node = head;
        var str_link = ""
        while (curr_node) {

            str_link += curr_node.data.toString() + " ->";
            curr_node = curr_node.next;
        }
        str_link += "null";
        console.log(str_link);
        console.log("长度为" + length.toString());
    }
}

// var double_link = new DoubleLinkList();
// double_link.append(1);
// double_link.append(2);
// double_link.print();
// double_link.insert(0, 9);
// double_link.insert(3, 10);
// double_link.print();
// double_link.remove(0);
// double_link.print();
// double_link.remove(2);
// double_link.print();

// require
module.exports = {
    DoubleLinkList
}