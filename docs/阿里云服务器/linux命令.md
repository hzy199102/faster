1. Systemd
   1. 参考资料：https://www.cnblogs.com/zwcry/p/9602756.html
   2. [hostnamectl]：显示当前主机的信息
      [hostnamectl set-hostname zhier]：设置主机名，如果是 CentOS 7 操作系统，修改完毕后重新 SHELL 登录或者重启服务器即可。
      如果是其他服务器，还需要在[/etc/sysconfig/network]，添加一条 HOSTNAME=zhier。
      [systemctl reboot]：重启系统
2. linux 中文乱码问题
   参考资料：https://blog.csdn.net/benben0729/article/details/80882553
   1. 检查 xshell 的编码
      File——properties(设置)——Terminal——Encoding，选择 Unicode(UTF-8)——重启 xshell
      如果无效，进入下一步
   2. [curl https://www.1ting.com | more]
      1. 加入 more 可以让网页不全部显示出来，否则内容太多
      2. 有的网址需要写全，如果输入[curl www.1ting.com | more]，会报错：The actual URL is '/'.
         如果无效，进入下一步
   3. [curl -H "Accept-Encoding: gzip" https://www.1ting.com | gunzip | more]
      在 curl 后面加上 Accept-Encoding:gzip，再用 gunzip 解压缩，则基本上可以保存数据不乱码。
      如果无效，进入下一步
   4. [locale -a |grep "zh_CN"]
      查看是否安装中文语言包，没有输出，则未安装，可先安装。
      [yum -y install kde-l10n-Chinese]
      安装中文语言包
      [echo "LANG="zh_CN.UTF-8"" >> /etc/sysconfig/i18n]
      向/etc/sysconfig/i18n 内容底部输入一行字符串 LANG="zh_CN.UTF-8"，如果 i18n 不存在，会自动创建
      [vi /etc/locale.conf]
      LANG=en_US.UTF-8（可以一一替换已安装的中文包尝试）
      其实 i18n 和 locale.conf 到底什么区别我不清楚，不过 2 个都加吧
      [systemctl reboot]：重启系统
      如果无效，进入下一步
   5. [curl -H "Accept-Encoding: gzip" https://www.1ting.com | gunzip | iconv -f utf-8 -t utf-8 | more]
      iconv 命令是运行于 linux 平台的文件编码装换工具。当我们在 linux 系统 shell 下通过 curl 命令或者 wget 命令获取一个网页的源代码，当网页的编码与当前操作系统坏境的设置的编码不同时，
      就会发现网页中有很多乱码。如在网页"meta"标签"charset"属性值设置为"gb2312"的http://www.baidu.com百度首页，在系统坏境变量"$LANG"值为"en_US.UTF-8"的linux系统即会产生中文乱码现象。这时我们可以尝试使用iconv命令进行编码装换，让中文不在是乱码。
3. 查看主机公网 IP
   1. [curl cip.cc]
      就是请求一个专门检测网络 IP 信息的网址
   2. [curl ifconfig.me]
      这个能直接得到公网 IP，但是很卡，经常得不到结果，所以建议使用第一种。
4. echo
   1. echo 是打印变量的值或者给定的字符串
      输入 echo hello 或者 echo "hello"都是在控制台打印出 hello 单词
      [echo $HOME]
   2. 我们需要把打印出来的字符串记录到文本文件中，就需要>和>>命令
      [echo hello > a.txt]
      a.txt 中会记录下 hello，但是如果再次执行 echo hello > a.txt。则会覆盖之前的 hello.
      [echo world >> a.txt ]
      a.txt 中会记录的是 hello word,但是 hello 和 word 不是写在一行的，而是每个单词占用一行的。
