参考资料
https://blog.csdn.net/franktaoge/article/details/51473823【前端性能优化－－预加载技术】

prefetch
资源预拉取（prefetch）是一种性能优化的技术。通过预拉取可以告诉浏览器用户在未来可能用到哪些资源。
Pre-fetching 会提示浏览器那些未来一定或可能使用到的资源，有时在当前页面见效，有些则在未来可能打开的页面生效。 作为开发者，我们比浏览器更懂自己的应用。
我们可以利用这些技术提前告知浏览器 web 中用到的核心资源。
dns-prefetch, subresource, prefetch, preconnect, 和 prerender.

1. DNS prefetch
   DNS prefetching 通过指定具体的 URL 来告知客户端未来会用到相关的资源，这样浏览器可以尽早的解析 DNS。
   <link rel="dns-prefetch" href="//op-gdq.glodon.com" />
   在浏览器请求资源时，DNS查询就已经准备好了。这可能看起来是个非常微不足道的性能提升，而且还不是必须的–Chrome总是会做类似的处理，用户只要在地址栏敲入一部分域名，如果命中了历史常用的网站，Chrome就会提前解析DNS、预拉取页面。（效果确实有限，但是聊胜于无）
   我的测试代码（test/prefetch）发现，加上这个配置，但是无效，仍然会进行cdn解析，而且在360和谷歌浏览器都是这样的情况
   href="//op-gdq.glodon.com" 写成 href="https://op-gdq.glodon.com" 也一样无效
2. Preconnect
   和 DNS prefetch 类似，preconnect 不光会解析 DNS，还会建立 TCP 握手连接和 TLS 协议（如果需要）。
   浏览器先拉 html、再拉 CSS 并建立好 CSSOM 后，发现需要两个外链的字体（在 fonts.gstatic.com 上）,然后浏览器开始发起两个请求，具体来说，需要对这个域进行 DNS 解析、TCP 和 TLS 握手（一个建立后可以复用给另一个连接）。
   <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto+Slab:700|Open+Sans"
      rel="stylesheet"
    />
    <h1 style="font-family: 'Open Sans',sans-serif;">
      资源预拉取（prefetch）3
    </h1>
   增加了上面的代码来从 fonts.gstatic.com preconnect 资源。可以看到，浏览器在请求 CSS 的同时并行的建立字体资源需要的连接，等到真正开始需要字体时立刻就开始返回数据。
   我也做了实现，但是也没有任何效果，不确定是否是因为我的测试代码由问题，但是真的毫无效果
