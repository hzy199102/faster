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
      [yum remove docker-ce.x86_64 docker-ce-cli.x86_64 -y]
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
   8. [yum install docker-ce-18.06.3.ce][yum install docker-ce-<version_string> docker-ce-cli-<version_string> containerd.io]
      [yum install docker-ce-19.03.5 docker-ce-cli-19.03.5 containerd.io]
      升级 docker 版本，发现启动不起来，参考[https://docs.docker.com/install/linux/docker-ce/centos/][yum remove docker-ce][rm -rf /var/lib/docker]
      卸载 Docker 软件包，主机上的映像，容器，卷或自定义配置文件不会自动删除。要删除所有图像，容器和卷。
      这样才能正常启动。
      在正式环境，必须使用统一的稳定版本，而不是总使用最新（这样各 host 上的版本可能不一致）
   9. [systemctl start docker][systemctl enable docker]
      启动、设置开启开机启动,Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
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
   2. 拉取镜像
      [docker pull library/hello-world]
      library/hello-world 是 image 文件在仓库里面的位置，其中 library 是 image 文件所在的组， hello-world 是 image 文件的名字。
      [docker images]
      查看本地镜像列表
      [docker run hello-world]
      运行镜像
      [docker rm $(docker ps -a -q)]
      删除所有已经停止的容器
      [docker rmi <image id>]
      删除 images（镜像），通过 image 的 id 来指定删除谁
      拉取的镜像默认存储在[/var/lib/docker]下面
   3. 创建镜像，构建 dockerfile
      1. [touch Dockerfile]
         FROM nginx
         MAINTAINER ZHIER <203161585@qq.com>
         RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
      2. [docker build -t zhier/nginx_web:v1 .]
         我在这里耽误了至少 2 个小时，因为 build 命令始终出错，我知道是[RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html]出错，
         但是这就是简单的输入文本内容的操作，系统总提示没有找到目录，我先[docker ps -a --no-trunc]，发现 commond 的完整命令似乎有误，就是''和“”的问题，
         涉及转义，就顺带了解了 RUN 命令的两种写法，commond 和[]，但是始终无法解释为什么找不到目录，然后我把命令改为[RUN echo hh]，就没问题了，于是定位
         [/usr/share/nginx/html/index.html]的问题，后来我百度 docker nginx ，才明白，运行基于 Docker 的 Nginx 镜像后，访问 localhost 能看到 Nginx 默认的首页，
         这个首页的位置是 Nginx 镜像内的/usr/share/nginx/html 目录下面。也就是说，路径是镜像内的目录，至此问题解决。
         [docker exec -it containerid/name /bin/sh]：通过交互式的方式进入到 docker 容器内部。
      3. [docker run --name nginx_web -d -p 2223:80 zhier/nginx_web:v1]
      4. [curl http://localhost:8080]
         可以看到<h1>Hello, Docker!</h1>
         外网[http://公网 IP:2223/]，为啥是 2223，因为我的安全组暴露的就是这个区间。

docker——从入门到实践
参考资料：[https://blog.51cto.com/nosmoking/1881033],[https://yeasy.gitbooks.io/docker_practice/image/pull.html]

1. 基本概念
   1. 镜像
      Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。
      镜像不包含任何动态数据，其内容在构建之后也不会被改变。
      镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。比如，删除前一层文件的操作，实际不是真的删除前一层的文件，而是仅在当前层标记为该文件已删除。在最终容器运行的时候，虽然不会看到这个文件，但是实际上该文件会一直跟随镜像。因此，在构建镜像的时候，需要额外小心，每一层尽量只包含该层需要添加的东西，任何额外的东西应该在该层构建结束前清理掉。
   2. 容器
      镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
      每一个容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层。
      容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。
      按照 Docker 最佳实践的要求，容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。
   3. docker overlay2 devicemapper
      daemon.json 中的配置，默认是 overlay2
      参考资料：[https://blog.51cto.com/nosmoking/1881033],[https://www.cnblogs.com/elnino/p/11015076.html]
   4. docker 镜像筛选
      [docker image ls -f since=mongo:3.2]:看到在 mongo:3.2 之后建立的镜像
      [docker image ls ubuntu]:根据仓库名列出镜像
      [docker image ls -f dangling=true][docker image prune]
      由于新旧镜像同名，旧镜像名称被取消，从而出现仓库名、标签均为 <none> 的镜像。这类无标签镜像也被称为 虚悬镜像(dangling image)
      镜像体积
      Docker Hub 中显示的体积是压缩后的体积。在镜像下载和上传过程中镜像是保持着压缩状态的，因此 Docker Hub 所显示的大小是网络传输中更关心的流量大小。而 docker image ls 显示的是镜像下载到本地后，展开的大小，准确说，是展开后的各层所占空间的总和，因为镜像到本地后，查看空间的时候，更关心的是本地磁盘空间占用的大小。
      docker image ls 列表中的镜像体积总和并非是所有镜像实际硬盘消耗。由于 Docker 镜像是多层存储结构，并且可以继承、复用，因此不同镜像可能会因为使用相同的基础镜像，从而拥有共同的层。由于 Docker 使用 Union FS，相同的层只需要保存一份即可，因此实际镜像硬盘占用空间很可能要比这个列表镜像大小的总和要小的多。
      [docker system df]：查看镜像、容器、数据卷所占用的空间。
   5. [docker run -t -i ubuntu:18.04 /bin/bash]
   6. [docker rm $(docker ps -aq -n 5)]：列出最近创建的 5 个容器信息。
      根据状态过滤
      $ docker ps -a --filter 'exited=0'
      $ docker ps --filter status=running
      $ docker ps --filter status=paused
      根据镜像过滤
      #镜像名称
      $ docker ps --filter ancestor=nginx -a #镜像 ID
      $ docker ps --filter ancestor=d0e008c6cf02 -a
      根据启动顺序过滤
      $ docker ps -f before=9c3527ed70ce
      \$ docker ps -f since=6e63f6ff38b0
      [docker container prune]：清理掉所有处于终止状态的容器
   7. [docker run -dit ubuntu][docker exec -i commitid bash][docker exec -it COMMITID bash]
      只用 -i 参数时，由于没有分配伪终端，界面没有我们熟悉的 Linux 命令提示符，但命令执行结果仍然可以返回。
      当 -i -t 参数一起使用时，则可以看到我们熟悉的 Linux 命令提示符。
      如果从这个 stdin 中 exit，不会导致容器的停止。
   8. [docker export 7691a814370e > ubuntu.tar][cat ubuntu.tar | docker import - test/ubuntu:v1.0]
      导出容器和导入容器快照
   9. dockerhub
      [https://hub.docker.com]/huangzy0217/1234567890/203161585@qqc.om
      [docker login]：只有登录了才能做 push 操作
      [docker tag ubuntu:18.04 username/ubuntu:18.04][docker push username/ubuntu:18.04]
      推送自己的镜像到 dockerhub
      [docker search nginx]：查询 nginx
   10. 私有仓库
       参考资料：[http://www.imooc.com/article/263754],[https://blog.csdn.net/duanbiren123/article/details/96482897]。
       建立私有仓库，可以删除镜像，可以http上传镜像
       [docker run -d -p 2224:5000 -v /home/docker/registry:/var/lib/registry -v /home/docker/config.yml:/etc/docker/registry/config.yml --restart always --name registry registry]
       打开私有仓库，必须这个容器在运行才可以，如果 stop 就打不开网址，另外通过-v 标签把镜像默认的存储地址[/var/lib/registry]改为[/home/docker/registry]。
       可以先运行 registry 镜像，[docker exec -it containerid/name /bin/sh][vi /etc/docker/registry/config.yml]，
       创建配置文件，storage 配置中的 delete=true 配置项，是为了允许删除镜像。默认的镜像是没有这个参数。
       启动的时候出错，[docker ps]发现没有开启端口，[docker logs registry]，发现是config.yml的version拼写错误，修复即可。
       ["insecure-registries": ["101.200.192.219"]]
       [docker tag ubuntu:latest 127.0.0.1:2224/ubuntu:latest]
       加个标签，作为自己的镜像。
       [docker images]
       可以查看到自己的镜像[127.0.0.1:2224/ubuntu:latest]。
       [docker push 127.0.0.1:2224/ubuntu:latest]
       上传到私有仓库。
       [curl 127.0.0.1:2224/v2/\_catalog]
       打开这个网址可以看到上传到私有仓库的镜像内容[{"repositories":["ubuntu"]}]。
       [http://127.0.0.1:2224/v2/ubuntu/tags/list]
       可以看到更详细的信息
       [docker image rm 127.0.0.1:2224/ubuntu:latest]
       删除本地镜像。
       [docker pull 127.0.0.1:2224/ubuntu:latest]
       重新从私有仓库拉取镜像。发现可以成功。
       [docker tag zhier/nginx_web 127.0.0.1:2224/nginx_web:v1]
       [docker push 127.0.0.1:2224/nginx_web:v1]
       [curl  http://127.0.0.1:2224/v2/nginx_web/tags/list]
       [curl --header "Accept:application/vnd.docker.distribution.manifest.v2+json" -I -XGET  <仓库地址>/v2/<镜像名>/manifests/<tag>]
       [curl --header "Accept:application/vnd.docker.distribution.manifest.v2+json" -I -XGET  "http://127.0.0.1:2224/v2/nginx_web/manifests/v1"]
       查询镜像digest_hash,注意v1是版本号，注意双引号，注意要加入header，以及-I -XGET，否则下载下来的是个文件，而不是json格式展示内容
       [curl -I -X DELETE "<仓库地址>/v2/<镜像名>/manifests/<镜像digest_hash>"]
       [curl -I -XDELETE http://127.0.0.1:2224/v2/nginx_web/manifests/sha256:cd2cfb28a1568ed57d19b0f650ee5427f0b019798bcaa9fdb5f896efd748bac6]
       [curl  http://127.0.0.1:2224/v2/nginx_web/tags/list]
       此时查看删除成功，这里虽然删除了，但是实际上硬盘地址还没有释放，是因为docker删除p_w_picpath只是删除的p_w_picpath的元数据信息。层数据并没有删除。现在进入registry中进行垃圾回收。
       [docker exec -it registry /bin/sh]
       [cd /var/lib/registry]
       [du -sch]：查看镜像大小
       [registry garbage-collect /etc/docker/registry/config.yml]：开始回收
       [du -sch]：确认回收完成
   11. 数据卷
       [# -v my-vol:/wepapp][docker run -d -p --name web --mount source=my-vol,target=/webapp training/webapp python app.py]
       创建一个名为 web 的容器，并加载一个 数据卷 到容器的 /webapp 目录。
       [docker volume create my-vol]：创建一个数据卷
       [docker volume ls]：查看所有的 数据卷
       [docker volume inspect my-vol]：在主机里使用以下命令可以查看指定 数据卷 的信息
       [docker inspect web]：在主机里使用以下命令可以查看 web 容器的信息
       [docker volume rm my-vol]：删除数据卷
       [docker volume prune]：无主的数据卷可能会占据很多空间，要清理请使用以下命令
   12. 挂载主机目录
       使用 --mount 标记可以指定挂载一个本地主机的目录到容器中去。
       [docker run --rm -it --mount type=bind,source=/home/docker/.bash_history,target=/root/.bash_history ubuntu:18.04 bash]
   13. 使用网络
       1. 外部访问容器
          [docker run -d -p 127.0.0.1:2226:5000 training/webapp python app.py]：映射到指定地址的指定端口
          [docker run -d -p 2226:5000 training/webapp python app.py]：映射所有接口地址
          [docker run -d -p 2226:5000 training/webapp python app.py]：映射到指定地址的指定端口
          [docker run -d -p 127.0.0.1::5000 training/webapp python app.py]：映射到指定地址的任意端口
          [docker port containid 5000]：查看映射端口配置
          [docker run -d -p 2226:5000 -p 2227:80 training/webapp python app.py]：-p 标记可以多次使用来绑定多个端口
       2. 容器互联
          [docker network create -d bridge my-net]：创建一个新的 Docker 网络
          [docker network ls]：查看所有的 Docker 网络
          [docker run -it --rm --name busybox1 --network my-net busybox sh]：运行一个容器并连接到新建的 my-net 网络
          [docker run -it --rm --name busybox2 --network my-net busybox sh]：打开新的终端，再运行一个容器并加入到 my-net 网络
          [ping busybox2]：在 busybox1 容器输入命令，可以发现可以 ping 通
          [docker network inspect my-net]：可以看到 my-net 网络一共被哪些容器使用
       3. DNS
          参考资料：https://linux.cn/article-9943-1.html
          现在用不到，但是感觉很厉害
   14. 高级网络配置
       1. 容器访问外部网络
          [sysctl net.ipv4.ip_forward]
          net.ipv4.ip_forward = 1,检查转发是否打开。如果为 0，说明没有开启转发，则需要手动打开。[sysctl -w net.ipv4.ip_forward=1].
          如果在启动 Docker 服务的时候设定 --ip-forward=true, Docker 就会自动设定系统的 ip_forward 参数为 1。
