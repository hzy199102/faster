// /**
//  * 原始类型
//  */
// function acceptsBoolean(value: boolean) {
//   // ...
// }
// acceptsBoolean(true); // Works!
// acceptsBoolean(false); // Works!
// acceptsBoolean("foo"); // Error!
// acceptsBoolean(0); // Error!
// acceptsBoolean(Boolean(0)); // Works!
// acceptsBoolean(!!0); // Works!
// function acceptsNumber(value: number) {
//   // ...
// }
// acceptsNumber(42); // Works!
// acceptsNumber(3.14); // Works!
// acceptsNumber(NaN); // Works!
// acceptsNumber(Infinity); // Works!
// acceptsNumber("foo"); // Error!
// function acceptsString(value: string) {
//   // ...
// }
// acceptsString("foo"); // Works!
// acceptsString(false); // Error!
// "foo" + "foo"; // Works!
// "foo" + 42; // Works!
// "foo" + {}; // Error!
// "foo" + []; // Error!
// "foo" + String({}); // Works!
// "foo" + [].toString(); // Works!
// "" + JSON.stringify({}); // Works!
// function acceptsMaybeString(value: ?string) {
//   // ...
// }
// acceptsMaybeString("bar"); // Works!
// acceptsMaybeString(undefined); // Works!
// acceptsMaybeString(null); // Works!
// acceptsMaybeString(); // Works!
// function acceptsObject(value: { foo?: string }) {
//   // ...
// }
// acceptsObject({ foo: "bar" }); // Works!
// acceptsObject({ foo: 123 }); // Works!
// acceptsObject({ foo: undefined }); // Works!
// acceptsObject({ foo: null }); // Error!
// acceptsObject({}); // Works!
// acceptsObject({ zoo: 123 }); // Works!
// function acceptsOptionalString(value: string = "foo") {
//   // ...
// }
// acceptsOptionalString("bar"); // Works!
// acceptsOptionalString(undefined); // Works!
// acceptsOptionalString(null); // Error!
// acceptsOptionalString(); // Works!
// /**
//  * 文字类型
//  */
// function getColor(name: "success" | "warning" | "danger") {
//   switch (name) {
//     case "success":
//       return "green";
//     case "warning":
//       return "yellow";
//     case "danger":
//       return "red";
//   }
// }
// getColor("success"); // Works!
// getColor("danger"); // Works!
// // $ExpectError
// getColor("error"); // Error!
// /**
//  * 混合类型
//  */
// function identity<T>(value: T): T {
//   return value;
// }
// identity(123);
// function stringify(value: mixed) {
//   // ...
// }
// stringify("foo");
// stringify(3.14);
// stringify(null);
// stringify({});
// function stringify(value: mixed) {
//   // $ExpectError
//   return "" + value; // Error!
// }
// stringify("foo");
// function stringify(value: mixed) {
//   if (typeof value === "string") {
//     return "" + value; // Works!
//   } else {
//     return "";
//   }
// }
// stringify("foo");
// /**
//  * 也许类型
//  */
// function acceptsMaybeProp({ value }: { value: ?number }) {
//   // ...
// }
// acceptsMaybeProp({ value: undefined }); // Works!
// acceptsMaybeProp({}); // Error!
// /**
//  * 变量类型
//  */
// var varVariable = 1;
// let letVariable = 1;
// const constVariable = 1;
// varVariable = 2; // Works!
// letVariable = 2; // Works!
// // $ExpectError
// constVariable = 2; // Error!
// let foo = 42;
// if (Math.random()) foo = true;
// if (Math.random()) foo = "hello";
// let isOneOf: number | boolean | string = foo; // Works!
// // let isOneOf: number | string = foo; // Error! Flow会为其指定所有可能分配的类型
// let foo = 42;
// function mutate() {
//   foo = true;
//   foo = "hello";
// }
// // mutate();
// // $ExpectError
// // let isString: string = foo; // Error!
// let isString: number = foo; // Error!
// async function method(): Promise<number> {
//   return 123;
// }
function isString(y) {
  return typeof y === "string";
}

function isNumber(y) {
  return typeof y === "number";
}

function isNumberOrString(y) {
  return isString(y) || isNumber(y);
}

function foo(x) {
  if (isNumberOrString(x)) {
    return x + x;
  } else {
    console.log(x);
    return x.length; // no error, because Flow infers that x can only be an array
  }
}

// foo("a");
// foo(5);
// foo([]);
console.log(foo({}));
