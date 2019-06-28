function Cat(name, color) {
    return {
        name: name,
        color: color
    }
}
var cat1 = Cat('大猫', '黄色')
console.log(cat1.constructor === Cat)

/**
 * 
 * @param {*} name 
 * @param {*} color 
 */

function Cat2(name, color) {
    this.name = name
    this.color = color
}
Cat2.prototype.eat = '吃老鼠'
var cat2 = new Cat2('大猫', '黄色')
var cat22 = new Cat2('大猫2', '绿色')
console.log(cat2.constructor === Cat2)
console.log(cat2 instanceof Cat2)
/**
 * 注：如果实例上改变继承至原型的eat属性的值，那只会对这个实例产生影响，其他实例上的值不会有影响,
 * 如果此时在对原型上的eat属性进行直接的修改，那也只会影响其他实例上的eat，对这个实例的eat不会产生影响了！
 */
console.log(cat2.eat)
cat2.eat = '不吃老鼠'
console.log(cat2.eat)
console.log(cat22.eat)
cat2.constructor.prototype.eat = '不吃老鼠222'
console.log(cat2.eat)
console.log(cat22.eat)

