1. linux 部署 nodejs 服务
   参考资料：https://www.csdn.net/gather_2a/OtTaQgysMDM3LWJsb2cO0O0O.html
   参考资料：https://www.cnblogs.com/chyingp/p/pm2-documentation.html

   1. 连接服务器
      1. ssh root@192.168.130.40
         输入账号密码
      2. 或者使用 xshell4 工具
         new 一个连接配置，输入 host,port number 等信息，链接
         输入账号密码的时候选择 remenber
   2. 配置服务器 nodejs 运行环境

      1. 检查服务器是否安装 nodejs
         node -v
         这里发现是 v.6.9.4，版本过低，要升级到 10+
      2. 升级 nodejs 前先确认下服务器是否有运行的 nodejs 程序
         ps -ef|grep node
         => root 23064 22943 0 11:09 pts/0 00:00:00 grep --color=auto node
         说明没有 nodejs 程序运行，只有一个 ps -ef|grep node 的进程在执行，可以放心升级了。
         kill ID， 即可关闭 node 进程。
      3. 先卸载低版本 nodejs

         1. 卸载 npm
            sudo npm uninstall npm -g
            npm -v
            => bash: /usr/bin/npm: 没有那个文件或目录
         2. 卸载 node
            yum remove nodejs npm -y
            node -v
            => bash: /usr/bin/node: 没有那个文件或目录
         3. 检查是否有残留
            进入 /usr/local/lib 删除所有 node 和 node_modules 文件夹
            进入 /usr/local/include 删除所有 node 和 node_modules 文件夹
            进入 /usr/local/bin 删除 node 的可执行文件

      4. 检查 linux 版本，下载对应的 nodejs 安装文件
         getconf LONG_BIT
         => 64
      5. nodejs 官网下载对应版本安装包
         https://nodejs.org/en/download/
      6. 检查 tar 命令的时候发现乱码，修正中文乱码问题

         1. 判断 linux 是否支持中文
            echo \$LANG
            => zh_CN.UTF-8
            说明 xshell 4 不支持中文

         2. xhell 4 菜单栏——>File(文件)——>Properties(属性)——>Terminal——>Encoding——>Unicode(UTF-8)

      7. 将安装包上传到指定位置并解压
         1. 找到原来 nodejs 软件包的安装地址
            rpm -ql nodejs
            => /usr/share/doc/nodejs-6.9.4
         2. 将安装包上传到这个路径并且解压
            tar -xvf node-v10.16.2-linux-x64.tar.xz
         3. 删除安装包
            rm node-v10.16.2-linux-x64.tar.xz
      8. 重命名文件夹
         mv node-v10.16.2-linux-x64 nodejs-10.16.2
      9. 通过建立软连接变为全局
         1. 进入对应 bin 目录，输入 pwd 命令确保路径正确
            =>/usr/share/doc/nodejs-10.16.2/bin
         2. 建立软连接
            ln -s /usr/share/doc/nodejs-10.16.2/bin/npm /usr/local/bin/
            ln -s /usr/share/doc/nodejs-10.16.2/bin/node /usr/local/bin/
         3. 检查设置是否生效
            1. 在任何路径输入 node -v
               => bash: /usr/bin/npm: 没有那个文件或目录
            2. 在/usr/local/bin/ 输入 ./node -v
               => v10.16.2
      10. 修改配置文件，在/etc/profile
          1. 进入/etc/profile
             vim /etc/profile
             a: 开始编辑
             esc: 退出编辑
             :q!: 不保存退出
             :wq: 保存退出
          2. 最末尾加入 nodejs 的相关配置
             export NODE_HOME=/usr/share/doc/nodejs-10.16.2
             export PATH=$PATH:$NODE_HOME/bin
          3. 让配置生效
             1. env
                => 配置信息，这时候发现 NODE_HOME 不存在
             2. source profile(一定要在/etc 下运行命令，因为 profile 在/etc 下)
             3. env  
                => 配置信息已经包含 NODE_HOME
             4. node -v
                => v10.16.2
             5. npm -v
                => 6.9.0
      11. 切换国内的源
          npm install -g cnpm --registry=https://registry.npm.taobao.org
          cnpm config get registry 确认是否切换成功
      12. 上传 nodejs 项目到服务器指定位置，并进行初始化操作
          cnpm install
          这里有待优化，node_module 应该是公共的，现在是每个项目一个
      13. 进入项目目录，运行 nodejs 项目
          node server/ &
          => 25620(ID)
          加入&代表后台运行，这样不会因为关闭窗口导致服务器挂掉
      14. 使用 pm2
          nodejs 服务器挂了怎么办，日志怎么处理等很多问题，所以使用 pm2
          1. npm install -g pm2
          2. pm2 start ./bin/www --watch
          3. pm2 restart app.js
          4. pm2 stop app_name|app_id
          5. pm2 remove app_name|app_id
          6. pm2 list
          7. pm2 logs
          8. 后期加入配置文件管理
