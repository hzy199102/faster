1. 入门(Getting Started)
   1. 设置一个编译器来去除 Flow 类型
      1. cnpm install --save-dev @babel/core @babel/cli @babel/preset-flow
      2. 创建一个.babelrc 在你的项目的根文件
         {
         "presets": ["@babel/preset-flow"]
         }
      3. package.json 添加脚本
         "scripts": {
         "build": "babel flow/src/ -d flow/lib/",
         "prepublish": "npm run build"
         }
   2. 设置 flow
      1. cnpm install --save-dev flow-bin
      2. npm run flow init
         第一次运行使用，生成.flowconfig 文件在根目录，就是 package.json 同级目录
      3. 在 JavaScript 文件中的任何代码之前放置以下内容是进程用来回答该问题的标志。
         // @flow
         否则 js 文件不会被处理，但是可以在这个注释之上在加上其他注释，不影响检查。
      4. npm run flow
         开始检测
2. FAQ
3. Type Annotations

   1. 输入注释
      添加类型注释是您与 Flow 交互的重要部分，使用类型设置“边界”意味着您可以在已经进行的推理之上告诉 Flow 您的意图。
      function concat(a, b) {
      return a + b;
      }
      concat("A", "B"); // Works!
      concat(1, 2); // Works!
      ***
      // @flow
      function concat(a: string, b: string) {
      return a + b;
      }
      concat("A", "B"); // Works!
      concat(1, 2); // Error!
   2. 原始类型
      Booleans,Strings,Numbers,null,undefined (void in Flow types),Symbols (new in ECMAScript 2015, not yet supported in Flow)
      示例：true;"hello";3.14;null;undefined;new Boolean(false);new String("world");new Number(42);Symbol("foo");
      // @flow
      function method(x: number, y: string, z: boolean) {
      // ...
      }
      method(3.14, "hello", true); // Works!
      method(Number(42), String("world"), Boolean(false)); // Works!

      ***

      // @flow
      function method(x: Number, y: String, z: Boolean) {
      // ...
      }
      method(new Number(42), new String("world"), new Boolean(false)); // 很少使用这些包装器对象。
      method(3.14, "hello", true); // Error!

      1. boolean
         布尔类型需要通过转换非布尔值来显式化。你可以用 Boolean(x)或做!!x。千万别用 new Boolean(x)，一个是值，一个是包装器对象。
         // @flow
         function acceptsBoolean(value: boolean) {
         // ...
         }
         acceptsBoolean(true); // Works!
         acceptsBoolean(false); // Works!
         acceptsBoolean("foo"); // Error!
         acceptsBoolean(0); // Error!
         acceptsBoolean(Boolean(0)); // Works!
         acceptsBoolean(!!0); // Works!
      2. Numbers
         JavaScript 只有一种类型的数字。这些值可能显示为 42 或 3.14。JavaScript 也考虑 Infinity 并且 NaN 是数字。该 number 类型捕获 JavaScript 认为数字的所有内容。
         // @flow
         function acceptsNumber(value: number) {
         // ...
         }

         acceptsNumber(42); // Works!
         acceptsNumber(3.14); // Works!
         acceptsNumber(NaN); // Works!
         acceptsNumber(Infinity); // Works!
         acceptsNumber("foo"); // Error!

      3. Strings
         Flow 只会在将它们连接到字符串时接受字符串和数字。
         必须明确并将其他类型转换为字符串。您可以使用 String 方法或使用其他方法对字符串化值进行此操作。
         string 和 String 是不同的类型
         // @flow
         "foo" + "foo"; // Works!
         "foo" + 42; // Works!
         "foo" + {}; // Error!
         "foo" + []; // Error!
         "foo" + String({}); // Works!
         "foo" + [].toString(); // Works!
         "" + JSON.stringify({}) // Works!

      4. null 和 void
         // @flow
         function acceptsNull(value: null) {
         /_ ... _/
         }
         function acceptsUndefined(value: void) {
         /_ ... _/
         }
         acceptsNull(null); // Works!
         acceptsNull(undefined); // Error!
         acceptsUndefined(null); // Error!
         acceptsUndefined(undefined); // Works!

      5. Maybe types
         也许类型适用于值是可选的地方，您可以通过在类型前面添加问号来创建它们，例如?string 或?number。
         除了 typein ?type，也许类型也可以是 null 或 void
         // @flow
         function acceptsMaybeString(value: ?string) {
         // ...
         }
         acceptsMaybeString("bar"); // Works!
         acceptsMaybeString(undefined); // Works!
         acceptsMaybeString(null); // Works!
         acceptsMaybeString(); // Works!

      6. 可选对象属性
         和 Maybe types 类似,就是不能取 null
         // @flow
         function acceptsObject(value: { foo?: string }) {
         // ...
         }
         acceptsObject({ foo: "bar" }); // Works!
         acceptsObject({ foo: undefined }); // Works!
         acceptsObject({ foo: null }); // Error!
         acceptsObject({}); // Works!
         acceptsObject({ zoo: 123 }); // Works!

      7. 可选功能参数
         和 可选对象属性 一致，只不过一个是对象属性，一个是对象
         // @flow
         function acceptsOptionalString(value?: string) {
         // ...
         }
         acceptsOptionalString("bar"); // Works!
         acceptsOptionalString(undefined); // Works!
         acceptsOptionalString(null); // Error!
         acceptsOptionalString(); // Works!

      8. 带默认值的函数参数
         函数参数也可以有默认值。这是 ECMAScript 2015 的一个功能。
         除了它们的集合类型之外，还可以 void 完全或省略默认参数。但是，他们不可能 null。
         // @flow
         function acceptsOptionalString(value: string = "foo") {
         // ...
         }

         acceptsOptionalString("bar"); // Works!
         acceptsOptionalString(undefined); // Works!
         acceptsOptionalString(null); // Error!
         acceptsOptionalString(); // Works!

      9. Symbols 不被支持
         https://github.com/facebook/flow/issues/810
         https://github.com/facebook/flow/issues/1015

   3. 文字类型
      // @flow
      function getColor(name: "success" | "warning" | "danger") {
      switch (name) {
      case "success" : return "green";
      case "warning" : return "yellow";
      case "danger" : return "red";
      }
      }

      getColor("success"); // Works!
      getColor("danger"); // Works!
      // \$ExpectError
      getColor("error"); // Error!

   4. 混合类型

      1. 单一类型
         function square(n: number) {
         return n \* n;
         }
      2. 一组不同的可能类型
         function stringifyBasicValue(value: string | number) {
         return '' + value;
         }
      3. 基于另一种类型的类型
         这里的返回类型将与传递给函数的任何值的类型相同
         function identity<T>(value: T): T {
         return value;
         }
      4. 任意类型
         function getTypeOf(value: mixed): string {
         return typeof value;
         }
         当您尝试使用某种 mixed 类型的值时，您必须先弄清楚实际类型是什么，否则最终会出现错误。
         // @flow
         function stringify(value: mixed) {
         // \$ExpectError
         return "" + value; // Error!
         }
         stringify("foo");
         相反，你必须通过改进它来确保价值是某种类型
         // 由于 typeof value === 'string'检查，Flow 知道 value 只能是语句的 string 内部 if。这被称为 改进。
         // @flow
         function stringify(value: mixed) {
         if (typeof value === 'string') {
         return "" + value; // Works!
         } else {
         return "";
         }
         }
         stringify("foo");

   5. 任何类型
      如果你想要一种选择不使用类型检查器 any 的方法，那就是这样做的方法。使用 any 完全不安全，应尽可能避免使用。
      // @flow
      function add(one: any, two: any): number {
      return one + two;
      }
      add(1, 2); // Works.
      add("1", "2"); // Works.
      add({}, []); // Works.
      Flow 甚至不会捕获导致运行时错误的代码：
      // @flow
      function getNestedProperty(obj: any) {
      return obj.foo.bar.baz;
      }
      getNestedProperty({});
      您可以考虑使用 any 以下几种方案：
      当您正在将现有代码转换为使用 Flow 类型时，您当前被阻止检查代码类型（可能需要首先转换其他代码）。
      当您确定您的代码有效且出于某种原因 Flow 无法键入时，请检查它是否正确。在 JavaScript 中，流量无法静态输入（减少）惯用语数量。
      避免泄漏 any
      当您具有类型的值时 any，可以使 Flow 推断 any 您执行的所有操作的结果。
      // @flow
      function fn(obj: any) /_ (:any) _/ {
      let foo /_ (:any) _/ = obj.foo;
      let bar /_ (:any) _/ = foo \* 2;
      return bar;
      }

      let bar /_ (:any) _/ = fn({ foo: 2 });
      let baz /_ (:any) _/ = "baz:" + bar;
      any 通过将其转换为其他类型来尽快切断，以防止这种情况发生。
      // @flow
      function fn(obj: any) /_ (:number) _/ {
      let foo: number = obj.foo;
      let bar /_ (:number) _/ = foo \* 2;
      return bar;
      }

      let bar /_ (:number) _/ = fn({ foo: 2 });
      let baz /_ (:string) _/ = "baz:" + bar;

   6. 也许类型
      参考原始类型 5,6,7
   7. 变量类型(如果语句，函数和其他有条件运行的代码都可以阻止 Flow 精确地确定类型是什么。这里会涉及一个重要的知识点谓词函数，他可以解决这个问题，看后续)
      JavaScript 有三种声明局部变量的方法：
      var - 声明一个变量，可选择赋值。（MDN）
      let - 声明一个块范围的变量，可选择赋值。（MDN）
      const - 声明一个块范围的变量，分配一个无法重新赋值的值。（MDN）
      在 Flow 中，这些分为两组：
      let 和 var- 可以重新分配的变量。
      const- 无法重新分配的变量。
      var varVariable = 1;
      let letVariable = 1;
      const constVariable = 1;
      varVariable = 2; // Works!
      letVariable = 2; // Works!
      // \$ExpectError
      constVariable = 2; // Error!
      由于 const 变量不能在以后重新分配，因此非常简单。low 可以从您为其分配的值推断类型，也可以为其提供类型。
      默认情况下，当您重新分配变量时，Flow 会为其指定所有可能分配的类型。
      let foo = 42;
      if (Math.random()) foo = true;
      if (Math.random()) foo = "hello";
      let isOneOf: number | boolean | string = foo; // Works!
      如果语句，函数和其他有条件运行的代码都可以阻止 Flow 精确地确定类型是什么。
      // @flow
      let foo = 42;
      function mutate() {
      foo = true;
      foo = "hello";
      }
      mutate();
      // \$ExpectError
      let isString: string = foo; // Error!
   8. 功能类型
      谓词函数 %checks 似乎只支持原始类型
      function concat(a: ?string, b: ?string): string {
      if (a && b) {
      return a + b;
      }
      return '';
      }
      但是，Flow 会在下面的代码中标记错误：
      function truthy(a, b): boolean {
      return a && b;
      }
      function concat(a: ?string, b: ?string): string {
      if (truthy(a, b)) {
      // \$ExpectError
      return a + b;
      }
      return '';
      }
      您可以通过解决这个问题 truthy 一个谓语功能，通过使用%checks 像这样的注释：
      function truthy(a, b): boolean %checks {
      return !!a && !!b;
      }
      function concat(a: ?string, b: ?string): string {
      if (truthy(a, b)) {
      return a + b;
      }
      return '';
      }
      功能函数概念很多，但是示例大多没有实际场景，暂时作为概念扩展
   9. 对象类型

      1. 语法
         // @flow
         var obj1: { foo: boolean } = { foo: true };
         var obj2: {
         foo: number,
         bar: boolean,
         baz: string,
         } = {
         foo: 1,
         bar: true,
         baz: 'three',
         };
      2. 对象类型推断
         使用其属性创建对象时，可在 Flow 中创建密封对象类型。这些密封对象将知道您声明它们的所有属性及其值的类型。
         // @flow
         var obj = {
         foo: 1,
         bar: true,
         baz: 'three'
         };

         var foo: number  = obj.foo; // Works!
         var bar: boolean = obj.bar; // Works!
         // $ExpectError
         var baz: null    = obj.baz; // Error!
         var bat: string  = obj.bat; // Error!
         创建没有任何属性的对象时，可以 在 Flow 中创建未密封的对象类型。这些未密封的对象不会知道它们的所有属性，并允许您添加新属性。

4) Type System
5) 流程 CLI(Flow CLI)
   1. flow --help
      查看更多命令
6) .flowconfig 文件详解
   .flowconfig 文件可以添加注释，方式如下：# This is a comment

   1. [include]
      文件中的[include]部分.flowconfig 告诉 Flow 包含指定的文件或目录。递归地包括目录包括该目录下的所有文件。只要符号链接指向同时包含的文件或目录，就会遵循符号链接。
      include 部分中的每一行都是要包含的路径。这些路径可以相对于根目录或绝对路径，并支持单星和双星通配符。
      如果/path/to/root/.flowconfig 包含以下[include] 部分：
      [include]
      ../externalFile.js
      ../externalDir/
      ../otherProject/\*.js
      ../otherProject/\*\*/coolStuff/
      然后当 Flow 检查项目时/path/to/root，它将读取并观察
      /path/to/root/ （自动包含）
      /path/to/externalFile.js
      /path/to/externalDir/
      /path/to/otherProject/ 以.js 结尾的任何文件
      /path/to/otherProject/ 下的任何目录，只要目录名是 coolStuff
   2. [ignore]
      文件中的[ignore]部分.flowconfig 告诉 Flow 在类型检查代码时忽略与指定正则表达式匹配的文件。默认情况下，不会忽略任何内容
      要记住的事情：

      1. 这些是 OCaml 正则表达式。
      2. 这些正则表达式与绝对路径匹配。他们可能应该从一开始.\*
      3. 如果您同时包含和忽略文件，它将被忽略。

      示例[ignore]部分可能如下所示：
      [ignore]
      ._/**tests**/._
      ._/src/\(foo\|bar\)/._
      .\*\.ignore\.js
      [ignore]将忽略：
      **tests**目录下的任何文件或目录
      ._/src/foo 或下._/src/bar 目录下的任何文件或目录
      任何以扩展名 .ignore.js 为结尾的文件

      可以在正则表达式中使用占位符<PROJECT_ROOT>，在运行时，Flow 会将占位符视为项目根目录的绝对路径。这对于编写相对而非绝对的正则表达式很有用。
      [ignore]
      <PROJECT_ROOT>/**tests**/.\*
      [ignore]将忽略项目目录下**tests**目录下的任何文件或目录，和之前的示例不一样的是，非项目目录下**tests**目录下的任何文件或目录不会被忽略
