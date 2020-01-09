nginx 基本入门(至今为止见过最好的 nginx 入门文章，没有之一。):[https://blog.csdn.net/jisuanji198509/article/details/85230991]
Nginx 容器教程:[http://www.ruanyifeng.com/blog/2018/02/nginx-docker.html]

1. HTTP 服务
   [docker run -d -p 0.0.0.0:2227:80 --rm --name mynginx nginx]
   -d：在后台运行
   -p ：容器的 80 端口映射到 127.0.0.2:8080
   --rm：容器停止运行后，自动删除容器文件
   --name：容器的名字为 mynginx
   [docker container stop mynginx]
   把这个容器终止，由于--rm 参数的作用，容器文件会自动删除。
2. 映射网页目录
   网页文件都在容器里，没法直接修改，显然很不方便。下一步就是让网页文件所在的目录/usr/share/nginx/html 映射到本地。
   [docker run -d -p 0.0.0.0:2227:80 --rm --name mynginx --volume "$PWD/html":/usr/share/nginx/html nginx]
   把这个子目录 html，映射到容器的网页文件目录/usr/share/nginx/html，[$PWD]注意大小写，是当前路径，也就是要挂载的 html 目录路径。
3. 拷贝配置
   [docker cp mynginx:/etc/nginx .]
   把容器里面的 Nginx 配置文件拷贝到本地。
4. 映射配置目录
   [docker run -d -p 0.0.0.0:2227:80 --rm --name mynginx --volume "$PWD/html":/usr/share/nginx/html --volume "$PWD/conf":/etc/nginx nginx]
   浏览器访问网页成功说明配置生效
5. 自定义签名
   现在要为容器加入 HTTPS 支持，第一件事就是生成私钥和证书。正式的证书需要证书当局（CA）的签名，这里是为了测试，搞一张自签名（self-signed）证书就可以了。
   参考资料：OpenSSL 介绍和使用:[https://www.jianshu.com/p/fb2ae3dc7986]。

   1. [openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout example.key -out example.crt]
      req：处理证书签署请求。
      -x509：生成自签名证书。
      -nodes：跳过为证书设置密码的阶段，这样 Nginx 才可以直接打开证书。
      -days 365：证书有效期为一年。
      -newkey rsa:2048：生成一个新的私钥，采用的算法是 2048 位的 RSA。
      -keyout：新生成的私钥文件为当前目录下的 example.key。
      -out：新生成的证书文件为当前目录下的 example.crt。
      其中最重要的一个问题是 Common Name，正常情况下应该填入一个域名，这里可以填 0.0.0.0。
   2. conf 目录下新建一个子目录 certs，把这两个文件[example.key]和[example.crt]放入这个子目录。
      [mkdir conf/certs][mv example.crt example.key conf/certs]
   3. HTTPS 配置
      [docker run -d -p 0.0.0.0:2227:80 -p 0.0.0.0:2228:443 --rm --name mynginx --volume "$PWD/html":/usr/share/nginx/html --volume "$PWD/conf":/etc/nginx nginx]
      server {
      listen 443 ssl http2;
      server_name localhost;

      #要让 https 和 http 并存，不能在配置文件中使用 ssl on，配置 listen 443 ssl;
      #ssl on;
      ssl_certificate /etc/nginx/certs/example.crt;
      ssl_certificate_key /etc/nginx/certs/example.key;

      ssl_session_timeout 5m;

      ssl_ciphers HIGH:!aNULL:!MD5;
      ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
      ssl_prefer_server_ciphers on;

      # [emerg] duplicate location “/”,在配置文件时，访问路径设置了两个，重复配置 webroot 路径导致，去掉一个就可以了

      #location / {
      #root /usr/share/nginx/html;
      #index index.html index.htm;
      #}
      }
