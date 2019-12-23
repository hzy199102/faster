参考资料：https://blog.csdn.net/deng624796905/article/details/86493330

1. docker 简介
2. docker 安装

   1. [lsb_release -a]
      在 Centos7 进行安装，可以使用以上命令查看 CentOS 版本

   2. [uname -r]：linux 内核版本号查看：3.10.0-1062.1.2.el7.x86_64
      参考资料：https://blog.csdn.net/xd_12138/article/details/84400512
      第一项（3）：当前内核主版本号；
      第二项（10）：当前内核次版本号；
      第三项（0-1062）：0 表示为当前内核更新次数，1062 表示当前内核修补次数；
      第四项（el7）：当前内核为 RHEL7 系列的；
      第五项（x86_64）：代表这是 64bit 的系统；
      注意，次版本号为奇偶数的不同含义：
      奇数 开发版本内核，功能多，更新速度快
      偶数 稳定版本内核，稳定，功能相对较少
   3. [yum list installed | grep docker]
      查询 docker 安装过的包
      [ps -ef |grep docker]
      检查系统中是否已经安装了 docker
      [yum remove docker-ce.x86_64 ddocker-ce-cli.x86_64 -y]
      删除安装包
   4. 卸载掉旧版本的 Docker
      yum remove docker \
       docker-client \
       docker-client-latest \
       docker-common \
       docker-latest \
       docker-latest-logrotate \
       docker-logrotate \
       docker-selinux \
       docker-engine-selinux \
       docker-engine
   5. [yum install -y yum-utils device-mapper-persistent-data lvm2]
      安装需要的软件包，yum-util 提供 yum-config-manager 功能，另外两个是 devicemapper 驱动依赖的
   6. [sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo]
      设置 yum 源
   7. [yum list docker-ce --showduplicates | sort -r]
      可以查看所有仓库中所有 docker 版本，并选择特定版本安装
   8. [yum install docker-ce-18.06.3.ce]  
      在正式环境，必须使用统一的稳定版本，而不是总使用最新（这样各 host 上的版本可能不一致）
   9. [systemctl start docker][systemctl enable docker]
      启动、设置开启开机启动
   10. [docker version]
       验证安装是否成功(有 client 和 service 两部分表示 docker 安装启动都成功了)，如果 docker 没启动，则只有 client，没有 server 信息
   11. [systemctl status docker]
       查看 docker 启动状态
   12. [rm -rf /var/lib/docker]
       删除镜像/容器等
       可以在对应路径下查看 docker 文件夹下有什么内容
   13. [systemctl list-unit-files]
       列出所有配置文件
       enabled：已建立启动链接
       disabled：没建立启动链接
       static：该配置文件没有[Install]部分（无法执行），只能作为其他配置文件的依赖
       masked：该配置文件被禁止建立启动链接
       如果看到 docker.service 是 disabled，则[systemctl enable docker]
       Systemd 默认从目录/etc/systemd/system/读取配置文件。但是，里面存放的大部分文件都是符号链接，指向目录/usr/lib/systemd/system/，真正的配置文件存放在那个目录。
       systemctl enable 命令用于在上面两个目录之间，建立符号链接关系。
       [systemctl enable clamd@scan.service] <==> [ln -s '/usr/lib/systemd/system/clamd@scan.service' '/etc/systemd/system/multi-user.target.wants/clamd@scan.service']
       如果配置文件里面设置了开机启动，systemctl enable 命令相当于激活开机启动。
       与之对应的，systemctl disable 命令用于在两个目录之间，撤销符号链接关系，相当于撤销开机启动。
   14. docker 镜像加速器
       docker 拉取镜像的速度太慢了，需要配置加速器
       本来使用 DaoCloud [https://www.daocloud.io/mirror#accelerator-doc]，但是发现需要运行脚本，担心脚本中有我无法驾驭的配置，所以暂时改用阿里云。
       使用阿里云镜像拉取需要在阿里云官网搜索容器镜像服务，然后注册账号，我的密码是 6d，然后在左侧菜单中选择镜像加速器就 OK，有详细教程，主要在 daemon.json 中加入镜像。

3. docker 示例
   1. 配置 docker 的远程访问
      参考资料：https://blog.csdn.net/longzhanpeng/article/details/82217398
      1. [cd /etc/docker]
         如果目录下没有 daemon.json，则新建一个，因为之前已经配置阿里云镜像，所以一定有，在里面添加：
         {
         "hosts": [
         "tcp://0.0.0.0:2222",
         "unix:///var/run/docker.sock"
         ],
         "registry-mirrors": ["https://zhe6ftwn.mirror.aliyuncs.com"]
         }
      2. [cd /etc/systemd/system/multi-user.target.wants][vi docker.service]
         ExecStart=/usr/bin/dockerd
         因为有配置 daemon.json，所以这个地方保持这样既可，其实本来就是这样，只不过有些版本可能有多余参数，那时候要删去，保持上面的样子
      3. [systemctl daemon-reload]
         使配置生效
      4. [systemctl restart docker]
         重启 docker
      5. [curl http://localhost:2222/version]
         有结果，说明配置生效，[curl http://localhost:2223/version]，则肯定失败。
      6. 需要外网能访问，还需要添加安全组配置
         在云服务器上，以我的阿里云为例，我刚开始做了如上配置一直外网访问失败，直到找到了参考资料，才知道根源。
         进入阿里云实例，选择本实例安全组，对指定实例点配置规则，加入内网入放心规则，有参考，写对端口号即可。
         此时外网输入[docker -H tcp://公网 IP:2222 info]，就能得到结果了。
