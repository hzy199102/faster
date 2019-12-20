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
