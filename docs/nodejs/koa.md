Koa 框架教程
参考资料:[http://www.ruanyifeng.com/blog/2017/08/koa.html]
示例:[test/koa]

1. 基本用法
   1. 架设 http 服务
   2. Context 对象
      Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。
   3. HTTP Response 的类型
      Koa 默认的返回类型是 text/plain，如果想返回其他类型的内容，可以先用 ctx.request.accepts 判断一下，客户端希望接受什么数据（根据 HTTP Request 的 Accept 字段），然后使用 ctx.response.type 指定返回类型。
   4. 网页模板
2. 路由
   1. 原生路由
   2. koa-router
      没使用 koa-route，因为落伍了。
   3. 静态资源
      koa-static
   4. 重定向
      有些场合，服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。ctx.response.redirect()方法可以发出一个 302 跳转，将用户导向另一个路由。
3. 中间件
   1. Logger 功能
   2. 中间件的概念
      像上面代码中的 logger 函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。
      基本上，Koa 所有的功能都是通过中间件实现的，前面例子里面的 main 也是中间件。每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是 next 函数。只要调用 next 函数，就可以把执行权转交给下一个中间件。
   3. 中间件栈
      多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。
   4. 异步中间件
      所有例子的中间件都是同步的，不包含异步操作。如果有异步操作（比如读取数据库），中间件就必须写成 async 函数。
      重点看 12.js 的源码
   5. 中间件的合成
      koa-compose
      这个中间件的源码在[nodejs 中间件源码解读.md]中会有详解，是个面试点
4. 错误处理
   1. 500 错误
      如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回 500 状态码。Koa 提供了 ctx.throw()方法，用来抛出错误，ctx.throw(500)就是抛出 500 错误。
   2. 404 错误
      如果将 ctx.response.status 设置成 404，就相当于 ctx.throw(404)，返回 404 错误。
   3. 处理错误的中间件
      为了方便处理错误，最好使用 try...catch 将其捕获。但是，为每个中间件都写 try...catch 太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。
   4. error 事件的监听
      运行过程中一旦出错，Koa 会触发一个 error 事件。监听这个事件，也可以处理错误。
   5. 释放 error 事件
      需要注意的是，如果错误被 try...catch 捕获，就不会触发 error 事件。这时，必须调用 ctx.app.emit()，手动释放 error 事件，才能让监听函数生效。
5. Web App 的功能
   1. Cookies
      ctx.cookies 用来读写 Cookie。
   2. 表单
      koa-body
   3. 文件上传
      这个和表单都主要看[test/pic]项目
