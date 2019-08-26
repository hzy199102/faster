// @flow
/**
 * Object Types
 * 对象类型调研
 */

// /**
//  * 1. 对象类型语法
//  */
// var obj1: { foo: boolean } = { foo: true };
// var obj2: {
//   foo: number,
//   bar: boolean,
//   baz: string
// } = {
//   foo: 1,
//   bar: true,
//   baz: "three"
// };

// /**
//  * 2.可选的对象类型属性
//  * 在JavaScript中，访问不存在的属性求值为 undefined。这是JavaScript程序中常见的错误来源，因此Flow将这些错误转换为类型错误。
//  * 如果您有一个有时没有属性的对象，可以通过在对象类型中的属性名称后添加问号使其成为可选属性?。
//  * 除了它们的设定值类型之外，这些可选属性可以 void完全或省略。但是，他们不可能null。
//  */
// // var obj = { foo: "bar" };
// // // $ExpectError
// // obj.bar; // Error!

// var obj: { foo?: boolean } = {};

// obj.foo = true; // Works!
// // $ExpectError 它没被定义
// obj.bar = "bar"; // Error!
// // $ExpectError
// obj.foo = "hello"; // Error!
// function acceptsObject(value: { foo?: string }) {
//   // ...
// }

// acceptsObject({ foo: "bar" }); // Works!
// acceptsObject({ foo: undefined }); // Works!
// // $ExpectError
// acceptsObject({ foo: null }); // Error!
// acceptsObject({}); // Works!

// /**
//  * 对象类型推断
//  * Flow可以根据它们的使用方式以两种不同的方式推断出对象文字的类型。
//  * 密封物体
//  * 使用其属性创建对象时，可在Flow中创建密封对象类型。这些密封对象将知道您声明它们的所有属性及其值的类型。
//  * 但是当对象被密封时，Flow将不允许您向它们添加新属性。
//  * 未密封的物体
//  * 创建没有任何属性的对象时，可以 在Flow中创建未密封的对象类型。这些未密封的对象不会知道它们的所有属性，并允许您添加新属性。
//  * 类似于var和let变量 如果重新分配未密封对象的属性，默认情况下，Flow会为其指定所有可能分配的类型。
//  */
// var obj = {
//   foo: 1,
//   bar: true,
//   baz: "three"
// };

// var foo: number = obj.foo; // Works!
// var bar: boolean = obj.bar; // Works!
// // $ExpectError
// var baz: null = obj.baz; // Error!
// var bat: string = obj.bat; // Error!
// // $ExpectError
// obj.bar2 = true; // Error!
// // $ExpectError
// obj.baz2 = "three"; // Error!

// var obj2 = {};

// obj2.foo = 1; // Works!
// obj2.bar = true; // Works!
// obj2.baz = "three"; // Works!
// var num: number = obj2.foo;

// var obj3 = {};

// if (Math.random()) obj3.prop = true;
// else obj3.prop = "hello";

// // $ExpectError
// var val1: boolean = obj3.prop; // Error!
// // $ExpectError
// var val2: string = obj3.prop; // Error!
// var val3: boolean | string = obj3.prop; // Works!

// var obj4 = {};

// obj4.foo = 1;
// obj4.bar = true;

// var foo: number = obj4.foo; // Works!
// var bar: boolean = obj4.bar; // Works!
// // 未密封对象上的未知属性查找是不安全的,未密封的对象允许随时写入新属性。Flow确保读取与写入兼容，但不确保在读取之前发生写入（按执行顺序）。
// // 这意味着永远不会检查没有匹配写入的未密封对象的读取。这是Flow的一种不安全行为，将来可能会得到改善。
// var baz: string = obj4.baz; // Works? Works!

/**
 * 确切的对象类型
 * 在Flow中，传递具有额外属性的对象被认为是安全的。
 * 这种概念被称为Width Subtyping，在Type System 的测试代码中会有详解
 * 有时禁用此行为并仅允许一组特定属性很有用。为此，Flow支持“精确”对象类型。
 */
// var obj: { foo: string } = {
//   foo: "abc",
//   bar: 123
// }; // Works!

// var obj2: { foo: string } = {
//   bar: 123
// }; // Error!

// function method(obj: { foo: string }) {
//   // ...
// }

// method({
//   foo: "test", // Works!
//   bar: 42 // Works!
// });

var foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!
