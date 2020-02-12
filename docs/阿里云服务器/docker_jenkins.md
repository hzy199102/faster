Docker 决战到底(四) Jenkins 的安装与使用:[https://www.jianshu.com/p/01bb90bfcabb][https://github.com/jenkinsci/docker]

[docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts]
jenkins/jenkins:lts 比 jenkins/jenkins:alpine 大了 200 多 M，我用了大的

[mkdir -p /docker_volume/jenkins_home]
在宿主机创建挂载文件夹

[chown -R 1000:1000 /docker_volume/jenkins_home]
如果不加这个，是启动不了 jenkins 的，因为用户权限问题，可以在 log 日志中看到，在[https://github.com/jenkinsci/docker]也能看到原因和解决方案

npm install --registry=https://registry.npm.taobao.org
npm run build
echo \${PWD}

docker run -d --restart unless-stopped --name jenkins \
 -p 2201:8080 -p 2202:50000 \
 -v /docker_volume/jenkins_home:/var/jenkins_home \
 -e JAVA_OPTS=-Duser.timezone=Asia/Shanghai \
 -u root \
 jenkins/jenkins:lts

这个命令能解决时区问题，否则定时器会有问题。

[cat /docker_volume/jenkins_home/secrets/initialAdminPassword]
这个是初始化的账户密码

这时候千万不要安装插件，先[cd /docker_volume/jenkins_home/updates][cp default.json default_bak.json]
参考资料:[https://www.cnblogs.com/hellxz/p/jenkins_install_plugins_faster.html]
jenkins 插件安装加速
可以[cat default.json]，任意下载其中的下载链接，会发现很慢，所以要替换里面的下载链接
[sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json]
然后在测试下载就会很快
但是要注意替换完之后要重启容器，否则配置不生效。

这个时候秒安装了，哈哈。

创建第一个管理员账号：zhier/6...0

创建 node 项目

1. 新建任务，单纯在构建中执行 shell
   [echo $RANDOM]
   保存之后运行，看 output 发现成功，说明流程走通
2. 源码管理选择 git，输入基础信息之后，再次运行，很久没反应。
   看 output 发现卡在[git fetch --tags --progress -- https://github.com/hzy199102/zhierblog.git +refs/heads/*:refs/remotes/origin/* # timeout=10]
   也就是说 git clone 项目很慢，为什么这样呢？
   源码管理有 Additional Behaviours，选择新增高级的克隆行为，设定克隆和拉取操作的超时时间（分钟）：1
   再次运行，等待一分钟之后，看到错误信息，定位是 clone 超时。
   参考资料:[https://stackoverflow.com/questions/22013217/on-building-jenkins-project-timeout-after-10-minute-error-happens]
   我检查项目大小，发现有 30 多 M，然后尝试在本机拉取，发现也很慢，于是确定是项目大小问题，我 vue create 了一个新的项目在 git 上，然后拉取他，发现一切顺利了。
   这里给我的提醒是如果项目过大，一定要设置更长的超时时间，jenkins 默认的超时时间是 10 分钟。

[cp -rf /home/docker/nginx-docker-demo/. /docker_volume/jenkins_nginx]

docker_jenkins 的使用场景原本是 build 之后把编译文件直接 ssh 上传到对应的服务器，但是这里 docker_jenkins 和 docker_nginx 是同一服务器，所以直接把挂在的宿主目录指向一个地方即可。
这个地方注意 jenkins 的用户原本是 1000，现在改为 root 了。

docker run -d --restart unless-stopped --name jenkins \
 -p 2201:8080 -p 2202:50000 \
 -v /docker_volume/jenkins_home:/var/jenkins_home \
 -e JAVA_OPTS=-Duser.timezone=Asia/Shanghai \
 -u root \
 jenkins/jenkins:lts

docker run -d --rm --name nginx \
 -p 0.0.0.0:2227:80 -p 0.0.0.0:2228:443 \
 --volume "/docker_volume/jenkins_home/workspace":/usr/share/nginx/html \
 --volume "/docker_volume/nginx_home/conf":/etc/nginx \
 nginx

这个暂时不用
docker run -d --rm --name nginx \
 -p 0.0.0.0:2227:80 -p 0.0.0.0:2228:443 \
 --volume "/docker_volume/jenkins_nginx/html":/usr/share/nginx/html \
 --volume "/docker_volume/jenkins_nginx/conf":/etc/nginx \
 nginx

仔细看挂在的路径都是[/docker_volume/jenkins_home]和[/docker_volume/jenkins_home/workspace]

构建执行 shell：
npm install --registry=https://registry.npm.taobao.org
npm run build

如果错误提示 npm 命令没有，说明没有 node 环境。需要在 jenkins 的构建环境中配置。
注意 jenkins 的构建环境是[Provide Node & npm bin/ folder to PATH]，如果没这个选项，说明没装 nodejs 插件，可以在 jenkins 的系统管理——全局工具配置——nodejs，如果这里也没 nodejs，
说明 nodejs 的插件没安装，需要在 jenkins 的系统管理——插件管理中找 nodejs 安装，安装之后在全局工具配置新建对应的 nodejs，然后在 jenkins 构建环境中就能找到了。

[cp -rf /docker_volume/nginx_home/html/404.html /docker_volume/jenkins_home/workspace][cp -rf /docker_volume/nginx_home/html/zhier.html /docker_volume/jenkins_home/workspace/index.html]

docker run -d --rm --name nginx \
 -p 0.0.0.0:2227:80 -p 0.0.0.0:2228:443 \
 --volume "/docker_volume/jenkins_home/workspace":/usr/share/nginx/html \
 --volume "/docker_volume/nginx_home/conf":/etc/nginx \
 nginx

nginx 的配置
location 中的 alias 和 root 配置的路径不能有中文和空格，

docker jenkins 删除项目之后的空间，在[/docker_volume/jenkins_home/workspace]，手动删除。

博客
[https://www.zhihu.com/question/39388850][https://www.zhihu.com/question/53068081]
[https://hexo.io/zh-cn/docs/][https://blog.csdn.net/iamoldpan/article/details/83317463]
[https://www.zhihu.com/question/28276750][https://www.vuepress.cn/guide/#%e5%ae%83%e6%98%af%e5%a6%82%e4%bd%95%e5%b7%a5%e4%bd%9c%e7%9a%84%ef%bc%9f]

sed -i 's/\/assets/.\/assets/g' index.html
