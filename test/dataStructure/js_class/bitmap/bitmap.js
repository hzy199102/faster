/**
 * 1.一个整数32个bit位
 * 2.使用位运算符
 * 3.处理大数据时才有优势，而且要求数据集紧凑，如果处理数只有3个：1,1000，1000000，那么空间利用率太低，最大值决定了bitmap需要用多少内存
 * 4.使用bitmap排序，待排序的集合中不能有重复数据
 * @param {*} size 
 */
function BitMap(size) {
    var bit_arr = new Array(size)
    for (var i = 0; i < bit_arr.length; i++) {
        bit_arr[i] = 0
    }
    this.addMember = function (member) {
        //	决定在数组中的索引		
        var arr_index = Math.floor(member / 32)
        //	决定在整数的32个bit位的哪⼀一位上											
        var bit_index = member % 32;
        bit_arr[arr_index] = bit_arr[arr_index] | 1 << bit_index
    };
    this.isExist = function (member) {
        //	决定在数组中的索引
        var arr_index = Math.floor(member / 32)
        //	决定在整数的32个bit位的哪⼀一位上														
        var bit_index = member % 32;
        var value = bit_arr[arr_index] & 1 << bit_index
        if (value != 0) {
            return true
        } else {
            return false
        }
    };
}
// var bit_map = new BitMap(4);
// var arr = [0, 3, 5, 6, 9, 34, 23, 78, 99];
// for (var i = 0; i < arr.length; i++) {
//     bit_map.addMember(arr[i])
// }
// console.log(bit_map.isExist(3))
// console.log(bit_map.isExist(7))
// console.log(bit_map.isExist(78))

// require
module.exports = {
    BitMap
}