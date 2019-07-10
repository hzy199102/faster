font-family
font-family 可以把多个字体名称作为一个“回退”系统来保存。如果浏览器不支持第一个字体，则会尝试下一个。
也就是说，font-family 属性的值是用于某个元素的字体族名称或/及类族名称的一个优先表。浏览器会使用它可识别的第一个值。

以下二段字体为样例
/_ font_1 _/
@font-face {
font-family: "Open Sans";
font-style: normal;
font-weight: 400;
src: local("Open Sans Regular"), local("OpenSans-Regular"),
url(https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0b.woff2)
format("woff2");
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
U+FEFF, U+FFFD;
}
/_ font_2 _/
@font-face {
font-family: "Open Sans";
font-style: normal;
font-weight: 700;
src: local("Open Sans Bold"), local("OpenSans-Bold"),
url(https://fonts.gstatic.com/s/opensans/v16/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2)
format("woff2");
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
U+FEFF, U+FFFD;
}

1. font-weight
   <h1 style="font-family: 'Open Sans',sans-serif; font-weight: 400;">资源预拉取（prefetch）</h1>使用字体font_1
   <h1 style="font-family: 'Open Sans',sans-serif; font-weight: 700;">资源预拉取（prefetch）</h1>使用字体font_2
2. unicode-range
   unicode-range 属性是@font-face 中的一项属性，其作用是告知浏览器，通过@font-face 引入的字体覆盖了 unicode 字符体系的哪些部分，以便浏览器仅在该范围内使用该字体。
   U+0000-00FF：覆盖范围是从 U+00 到 U+FF，亦即 unicode 字符表当中的前 256 个字符。
   我们只在范围中选择某个字符，那么我们就可以巧妙地制造出字体的混搭效果。
   demo:
   我们希望用字体 font_1 当中的&符号，但其他的字符使用另外的字体
   1. 单独地将符号&放在一个 span 标签内
      span.amp {
      font-family: "Open Sans", serif;
      }
      然后为它创建一条 CSS 规则。
      每当我们需要使用这个特别的符号时，我们就不得不使用一个 span 来包裹它。
   2. 符号&的 unicode 编号是 U+26
      @font-face {
      font-family: 'Ampersand';
      src: local("Open Sans Regular"), local("OpenSans-Regular"),
      url(https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0b.woff2)
      format("woff2");
      unicode-range: U+26;
      }
      首先创建了一个新的 font-family，紧接着将特定的字体安排在 unicode-range 恰好是 U+26 的位置。最后，只要将这个 font-family 放在其它 font-family 的后面即可（会覆盖）。
      浏览器兼容问题考虑：如果 unicode-range 属性得不到支持，那么类似于上文的代码，其字体覆盖范围不会变成空，相反，它的覆盖范围会默认地变为全范围。也就是说，新创建的这个 font-family，会覆盖到所有的字符。主要是火狐浏览器可能不支持，但是火狐浏览器有个特性：火狐会将我们设置的覆盖范围完全无视，进而铺设到全部范围之上，那么我们的回避策略就是：使用第二条规则覆盖掉第一条。
      @font-face {
      font-family: 'Ampersand';
      src: local("Open Sans Regular"), local("OpenSans-Regular"),
      url(https://fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0b.woff2)
      unicode-range: U+26;
      }
      @font-face {
      font-family: 'Ampersand';
      src: local('Arial');
      unicode-range: U+270C;/_ 注意，没有这一条火狐依然不正常 _/
      }
      上面的代码在我们原先的第一条规则之后又增加了一条规则。
      当火狐遇到第二条规则时，它会用第二条规则覆盖掉第一条，那么只有 Arial 会出现了。这正是我们需要的回避。
      如果浏览器支持 unicode-range，那么第二条规则将覆盖掉一个我们并不会用到的字符，因此并不影响第一条规则。
      U+270C 万一真的要用到呢？你真的会用到吗？它实际上是一个“胜利手势”。

以下是一个简单的测试 font-family 是否存在覆盖操作的代码

<style>
@font-face {
font-family: "Open Sans";
src: local("Times New Roman");
unicode-range: U+0061-0063;
}

/* latin */
@font-face {
font-family: "Open Sans";
src: local("Microsoft YaHei");
unicode-range: U+0064-0066;
}
/* @font-face {
font-family: "Open Sans";
src: local("Times New Roman");
unicode-range: U+0064-0065;
} */
/* Arial */
/* Microsoft YaHei */
</style>
<body>
<h1 style="font-family: 'Open Sans'">abc</h1>
<h1 style="font-family: 'Open Sans'">def</h1>
</body>
