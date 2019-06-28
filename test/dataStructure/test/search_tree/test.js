var { AVLTree } = require("../../js_class/search_tree/avl_tree.js");

function test_turn_left() {
  var avl_tree = new AVLTree();
  avl_tree.insert(1);
  avl_tree.insert(5);
  avl_tree.print();
  avl_tree.insert(8); // 此处会发生 单左翻转
  avl_tree.print();

  avl_tree.insert(9);
  avl_tree.print();
}

function test_turn_right() {
  var avl_tree = new AVLTree();
  avl_tree.insert(10);
  avl_tree.insert(9);
  avl_tree.print();
  avl_tree.insert(8); // 此处发生单右翻转
  avl_tree.print();

  avl_tree.insert(7);
  avl_tree.print();
  avl_tree.insert(6); // 此处发生单右翻转
  avl_tree.print();
}

function test_runt_left_right() {
  var avl_tree = new AVLTree();
  avl_tree.insert(30);
  avl_tree.insert(25);
  avl_tree.insert(18);
  avl_tree.insert(10);
  avl_tree.insert(3);
  avl_tree.insert(27);
  avl_tree.insert(15);
  avl_tree.insert(19);
  avl_tree.insert(7);
  avl_tree.print();
  console.log("\n\n");
  avl_tree.insert(13); // 会发生先左后右翻转  节点18被拆
  avl_tree.print();
  console.log("\n\n");

  avl_tree.insert(2);
  avl_tree.insert(1);
  avl_tree.insert(8);
  avl_tree.insert(6);
  avl_tree.print();
  console.log("\n\n");
  avl_tree.insert(5); // 会发生先左后右翻转, 节点7 会被拆散
  avl_tree.print();
}

function test_turn_right_left() {
  var avl_tree = new AVLTree();
  avl_tree.insert(50);
  avl_tree.insert(25);
  avl_tree.insert(18);
  avl_tree.insert(10);
  avl_tree.insert(9);
  avl_tree.insert(45);
  avl_tree.insert(70);
  avl_tree.insert(40);
  avl_tree.insert(47);
  avl_tree.insert(90);
  avl_tree.print();
  console.log("\n\n");
  avl_tree.insert(46); //此处发生先右后左翻转, 节点45会被拆散
  avl_tree.print();
  console.log("\n\n");
  avl_tree.insert(100);
  avl_tree.insert(60);
  avl_tree.insert(55);
  avl_tree.print();
  avl_tree.insert(65); //此处发生先左后右翻转, 节点70会被拆散
  avl_tree.print();
  console.log("\n\n");
  avl_tree.insert(53); // 此处发生先右后左翻转, 节点60被拆散
  avl_tree.print();
}

// test_turn_left();
// test_turn_right();
// test_runt_left_right();
// test_turn_right_left();

function test_remove_1() {
  // 测试删除节点后, 无需调整的情况
  var avl_tree = new AVLTree();
  avl_tree.insert(6);
  avl_tree.insert(4);
  avl_tree.insert(8);
  avl_tree.insert(3);
  avl_tree.insert(9);
  avl_tree.print();

  avl_tree.remove(3);
  avl_tree.print();

  avl_tree.remove(4);
  avl_tree.print();
}

function test_remove_2() {
  // 测试删除后,父节点平衡因子为2,父节点右孩子平衡因子为0的情况, 根节点被替换
  var avl_tree = new AVLTree();
  avl_tree.insert(20);
  avl_tree.insert(15);
  avl_tree.insert(40);
  avl_tree.insert(35);
  avl_tree.insert(45);
  avl_tree.print();

  avl_tree.remove(15); // 删除15后,节点20的平衡因子变2  40 的平衡因子是0  40成为树新的根节点
  avl_tree.print();
}

function test_remove_3() {
  // 测试删除后,父节点平衡因子为2,父节点右孩子平衡因子为0, 根节点不被替换的情况
  var avl_tree = new AVLTree();
  avl_tree.insert(10);
  avl_tree.insert(20);
  avl_tree.insert(8);
  avl_tree.insert(15);
  avl_tree.insert(7);
  avl_tree.insert(40);
  avl_tree.insert(35);
  avl_tree.insert(45);
  avl_tree.print();

  avl_tree.remove(15); //15被删除, 40 顶替20 的位置
  avl_tree.print();
}

function test_remove_3_2() {
  // 测试删除,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 根节点被替换
  var avl_tree = new AVLTree();
  avl_tree.insert(20);
  avl_tree.insert(15);
  avl_tree.insert(40);
  avl_tree.insert(45);
  avl_tree.print();

  avl_tree.remove(15);
  avl_tree.print();
}

function test_remove_4() {
  // 测试删除后,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 根节点不被替换的情况
  var avl_tree = new AVLTree();
  avl_tree.insert(10);
  avl_tree.insert(20);
  avl_tree.insert(8);
  avl_tree.insert(15);
  avl_tree.insert(7);
  avl_tree.insert(40);
  avl_tree.insert(45);
  avl_tree.print();

  avl_tree.remove(15);
  avl_tree.print();
}

function test_remove_5() {
  // 测试删除后,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 调整后,树依然不平衡,需要继续调整的情况
  var avl_tree = new AVLTree();
  avl_tree.insert(14);
  avl_tree.insert(20);
  avl_tree.insert(9);
  avl_tree.insert(10);

  avl_tree.insert(15);
  avl_tree.insert(5);
  avl_tree.insert(11);
  avl_tree.insert(6);
  avl_tree.insert(4);
  avl_tree.insert(40);
  avl_tree.insert(45);
  avl_tree.insert(7);
  avl_tree.print();

  avl_tree.remove(15);
  avl_tree.print();
}

function test_remove_6() {
  // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 根节点被替换
  var avl_tree = new AVLTree();
  avl_tree.insert(20);
  avl_tree.insert(15);
  avl_tree.insert(40);
  avl_tree.insert(35);
  avl_tree.print();

  avl_tree.remove(15);
  avl_tree.print();
}

function test_remove_7() {
  // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 根节点不被替换
  var avl_tree = new AVLTree();
  avl_tree.insert(10);
  avl_tree.insert(8);
  avl_tree.insert(20);
  avl_tree.insert(15);
  avl_tree.insert(7);
  avl_tree.insert(40);
  avl_tree.insert(35);
  avl_tree.print();

  avl_tree.remove(15);
  avl_tree.print();
}

function test_remove_8() {
  // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 调整后,依然不平衡,需要继续向上寻找调整节点
  var avl_tree = new AVLTree();
  avl_tree.insert(14);
  avl_tree.insert(20);
  avl_tree.insert(9);
  avl_tree.insert(10);

  avl_tree.insert(15);
  avl_tree.insert(5);
  avl_tree.insert(11);
  avl_tree.insert(6);
  avl_tree.insert(4);
  avl_tree.insert(40);
  avl_tree.insert(35);
  avl_tree.insert(7);
  avl_tree.print();

  avl_tree.remove(15); // 删除15后,35顶替20的位置,14 的bf为-2 , 9的bf是 -1 需要继续调整
  avl_tree.print();
}

function test_remove_9() {
  // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 调整后,依然不平衡,需要继续向上寻找调整节点
  var avl_tree = new AVLTree();
  avl_tree.insert(28);
  avl_tree.insert(30);
  avl_tree.insert(19);
  avl_tree.insert(23);

  avl_tree.insert(29);
  avl_tree.insert(15);
  avl_tree.insert(26);
  avl_tree.insert(16);
  avl_tree.insert(14);
  avl_tree.insert(50);
  avl_tree.insert(45);
  avl_tree.insert(22);
  avl_tree.insert(25);
  avl_tree.print();

  avl_tree.remove(29); // 删除29,45顶替30的位置,28的bf是-2 ,19的bf是1,双旋转平衡
  avl_tree.print();
}

function test_remove_10() {
  // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 调整后,依然不平衡,需要继续向上寻找调整节点
  var avl_tree = new AVLTree();
  avl_tree.insert(28);
  avl_tree.insert(30);
  avl_tree.insert(19);
  avl_tree.insert(14);
  avl_tree.insert(23);

  avl_tree.insert(29);
  avl_tree.insert(15);
  avl_tree.insert(26);
  avl_tree.insert(50);
  avl_tree.insert(45);
  avl_tree.insert(22);
  avl_tree.insert(21);
  avl_tree.print();

  avl_tree.remove(21); // 删除29,45顶替30的位置,28的bf是-2 ,19的bf是1,双旋转平衡
  avl_tree.print();
}
// test_remove_1();
// test_remove_2();
// test_remove_3();
// test_remove_3_2();
// test_remove_4();
// test_remove_5();
// test_remove_6();
// test_remove_7();
// test_remove_8();
// test_remove_9();
test_remove_10();
