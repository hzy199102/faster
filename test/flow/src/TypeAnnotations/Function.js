// @flow
/**
 * Function Types
 * 功能类型调研
 */

// // 1.函数有两个应用类型的位置：参数（输入）和返回值（输出）。
// function concat(a: string, b: string): string {
//   return a + b;
// }
// concat("foo", "bar"); // Works!
// // $ExpectError
// concat(true, false); // Error!

// // 2.使用推理，这些类型通常是可选的：
// // 如果是js，会自动进行强转，强转机制会在另一篇文档中介绍
// function concat(a, b) {
//   return a + b;
// }
// concat("foo", "bar"); // Works!
// // $ExpectError
// concat(true, false); // Error!
// concat(1, 2);         // Works!

// // 3.可选参数
// // 可选参数将接受缺失undefined，或匹配类型。但他们不会接受null。
// function method(optionalValue?: string) {
//   // ...
// }
// method(); // Works.
// method(undefined); // Works.
// method("string"); // Works.
// // $ExpectError
// method(null); // Error!

// // 4.JavaScript还支持在参数列表的末尾使用rest参数或参数来收集参数数组。它们...之前有省略号 。
// // 如果向rest参数添加类型注释，则它必须始终显式为Array类型。
// function method(foo: string, ...args: Array<number>) {
//   // ...
// }
// method("foo", "1", 2, 3); // Error.
// method("foo"); // Works.
// method("foo", 1); // Works.
// method("foo", 1, 2); // Works.

// /**
//  * 5.功能返回
//  * 函数返回还可以使用冒号:后跟参数列表后面的类型添加类型。
//  * 返回类型确保函数的每个分支返回相同的类型。这可以防止您在某些条件下意外不返回值。
//  * 异步函数隐式返回一个promise，因此返回类型必须始终为a Promise。
//  */
// // $ExpectError
// function method(): boolean {
//   if (Math.random() > 0.5) {
//     return true;
//   }
// }

// async function method(): Promise<number> {
//   return 123;
// }

/**
 * 6.谓词函数
 * 涉及2个知识点
 * 1. 布尔类型需要通过转换非布尔值来显式化。你可以用!!x，但是这里用Boolean(x)会出错
 * 2. %checks，这些谓词函数的主体需要是表达式（即不支持局部变量声明）。但是可以在谓词函数中调用其他谓词函数
 */
// function truthy(a, b): boolean {
//   return a && b;
// }
function truthy(a, b): boolean %checks {
  return !!a && !!b;
}

function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    // $ExpectError
    return a + b;
  }
  return "";
}

function isString(y): %checks {
  return typeof y === "string";
}

function isNumber(y): %checks {
  return typeof y === "number";
}

function isNumberOrString(y): %checks {
  return isString(y) || isNumber(y);
}

function isObject(z): %checks {
  return typeof z === "object";
}

function foo(x): string | number {
  if (isNumberOrString(x)) {
    return x + x;
  } else if (isObject(x)) {
    return 0;
  } else {
    return x.length; // 可能是对象或者数组，如果是对象，这里是undefined，这似乎与string | number 不符合，但是就是能通过flow
  }
}

foo("a");
foo(5);
foo([]);
foo({});

/**
 * any 可以破除一切阻碍，但是需要慎用
 */
