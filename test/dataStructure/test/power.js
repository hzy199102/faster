/**
 * 快速幂算法
 */

function Power() {
  /**
   * 普通的求幂函数
   *
   * @param {*} base 底数
   * @param {*} power 指数
   * @param {*} mod 模
   */
  this.normal_1 = function(base, power, mod) {
    var start = Date.now();
    var res = 1;
    for (let i = 0; i < power; i++) {
      res = res * base;
    }
    console.log("normal耗时：" + (Date.now() - start));
    return res % mod;
  };

  /**
   * 优化的求幂函数
   * ( a * b ) % c = ( ( a % c ) * ( b % c ) ) % c
   * 解决计算数据res过大的情况，这样可能导致溢出
   *
   * @param {*} base 底数
   * @param {*} power 指数
   * @param {*} mod 模
   */
  this.normal_2 = function(base, power, mod) {
    var start = Date.now();
    var res = 1;
    for (let i = 0; i < power; i++) {
      res = res * base;
      res = res % mod;
    }
    console.log("normal耗时：" + (Date.now() - start));
    return res % mod;
  };

  /**
   * 优化的求幂函数
   * ( a * b ) % c = ( ( a % c ) * ( b % c ) ) % c
   * 解决计算数据res过大的情况，这样可能导致溢出
   *
   * 快速幂算法的核心思想就是每一步都把指数分成两半，而相应的底数做平方运算。这样不仅能把非常大的指数给不断变小，所需要执行的循环次数也变小，而最后表示的结果却一直不会变。
   * 最后求出的幂结果实际上就是在变化过程中所有当指数为奇数时底数的乘积。
   *
   * @param {*} base 底数
   * @param {*} power 指数
   * @param {*} mod 模
   */
  this.normal_3 = function(base, power, mod) {
    var start = Date.now();
    var res = 1;
    while (power > 0) {
      if (power % 2 === 0) {
        //如果指数为偶数
        power = power / 2; //把指数缩小为一半
        base = (base * base) % mod; //底数变大成原来的平方
      } else {
        //如果指数为奇数
        power = power - 1; //把指数减去1，使其变成一个偶数
        res = (res * base) % mod; //此时记得要把指数为奇数时分离出来的底数的一次方收集好
        power = power / 2; //此时指数为偶数，可以继续执行操作
        base = (base * base) % mod;
      }
    }
    console.log("normal耗时：" + (Date.now() - start));
    return res;
  };

  /**
   * 优化的求幂函数
   * ( a * b ) % c = ( ( a % c ) * ( b % c ) ) % c
   * 解决计算数据res过大的情况，这样可能导致溢出
   *
   * 快速幂算法的核心思想就是每一步都把指数分成两半，而相应的底数做平方运算。这样不仅能把非常大的指数给不断变小，所需要执行的循环次数也变小，而最后表示的结果却一直不会变。
   * 最后求出的幂结果实际上就是在变化过程中所有当指数为奇数时底数的乘积。
   *
   * 因为power是一个整数，例如当power是奇数5时,power-1=4,power/2=2；而如果我们直接用power/2=5/2=2。在整型运算中得到的结果是一样的，因此，我们的代码可以压缩成下面这样：
   *
   * @param {*} base 底数
   * @param {*} power 指数
   * @param {*} mod 模
   */
  this.normal_4 = function(base, power, mod) {
    var start = Date.now();
    var res = 1;
    while (power > 0) {
      if (power % 2 === 1) {
        res = (res * base) % mod;
      }
      power = Math.floor(power / 2);
      base = (base * base) % mod;
    }
    console.log("normal耗时：" + (Date.now() - start));
    return res;
  };

  /**
   * 优化的求幂函数
   * ( a * b ) % c = ( ( a % c ) * ( b % c ) ) % c
   * 解决计算数据res过大的情况，这样可能导致溢出
   *
   * 快速幂算法的核心思想就是每一步都把指数分成两半，而相应的底数做平方运算。这样不仅能把非常大的指数给不断变小，所需要执行的循环次数也变小，而最后表示的结果却一直不会变。
   * 最后求出的幂结果实际上就是在变化过程中所有当指数为奇数时底数的乘积。
   *
   * 因为power是一个整数，例如当power是奇数5时,power-1=4,power/2=2；而如果我们直接用power/2=5/2=2。在整型运算中得到的结果是一样的，因此，我们的代码可以压缩成下面这样：
   *
   *
   * 位运算
   * 因为如果power为偶数，则其二进制表示的最后一位一定是0；如果power是奇数，则其二进制表示的最后一位一定是1。
   * 将他们分别与1的二进制做“与”运算，得到的就是power二进制最后一位的数字了，是0则为偶数，是1则为奇数。例如5是奇数，则5&1=1；而6是偶数，则6&1=0；因此奇偶数的判断就可以用“位运算”来替换了。
   * 同样，对于power=power/2来说，也可以用更快的“位运算”进行替代，我们只要把power的二进制表示向右移动1位就能变成原来的一半了。
   *
   * @param {*} base 底数
   * @param {*} power 指数
   * @param {*} mod 模
   */
  this.normal_5 = function(base, power, mod) {
    var start = Date.now();
    var res = 1;
    while (power > 0) {
      if (power & 1) {
        //此处等价于if(power%2==1)
        res = (res * base) % mod;
      }
      power >>= 1; //此处等价于Math.floor(power / 2)
      base = (base * base) % mod;
    }
    console.log("normal耗时：" + (Date.now() - start));
    return res;
  };
  /**
   * 1、当矩阵A的列数（column）等于矩阵B的行数（row）时，A与B可以相乘。
   * 2、矩阵C的行数等于矩阵A的行数，C的列数等于B的列数。
   * 3、乘积C的第m行第n列的元素等于矩阵A的第m行的元素与矩阵B的第n列对应元素乘积之和。
   * @param {*} x
   * @param {*} y
   */
  this.matrixMultiplication = function(x, y) {
    if (x.length === 0 || y.length === 0 || x[0].length !== y.length) {
      console.log("必须做到：a[][N],int b[N][]");
      return null;
    }
    var res = new Array(x.length);
    for (var i = 0; i < x.length; i++) {
      res[i] = new Array(y[0].length);
      for (var j = 0; j < y.length; j++) {
        res[i][j] = 0;
        for (var l = 0; l < y.length; l++) {
          res[i][j] += x[i][l] * y[l][j];
        }
      }
    }
    // console.log(x, y, res);
    return res;
  };
  /**
   * 矩阵求幂
   *
   * @param {*} base 底数，是个矩阵
   * @param {*} power 指数
   */
  this.normal_6 = function(base, power) {
    var start = Date.now();
    var res = [[1, 0], [0, 1]];
    while (power > 0) {
      if (power & 1) {
        res = this.matrixMultiplication(res, base);
      }
      power >>= 1;
      base = this.matrixMultiplication(base, base);
    }
    console.log("normal_6耗时：" + (Date.now() - start));
    return res;
  };
}

// require
module.exports = {
  Power
};

// var a = new Power();
// 取值过大直接为NAN，因为溢出
// console.log(a.normal_1(5, 100003, 12));
// console.log(a.normal_1(2, 10000, 1000));
// console.log(a.normal_2(5, 100000000, 12));
// console.log(a.normal_4(2, 10000000, 1000));
// console.log(a.normal_5(2, 10000000, 1000));
