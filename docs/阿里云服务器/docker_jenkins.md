Docker 决战到底(四) Jenkins 的安装与使用:[https://www.jianshu.com/p/01bb90bfcabb][https://github.com/jenkinsci/docker]

[docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts]
jenkins/jenkins:lts 比 jenkins/jenkins:alpine 大了 200 多 M，我用了大的

[mkdir -p /docker_volume/jenkins_home]
在宿主机创建挂载文件夹

[chown -R 1000:1000 /docker_volume/jenkins_home]
如果不加这个，是启动不了 jenkins 的，因为用户权限问题，可以在 log 日志中看到，在[https://github.com/jenkinsci/docker]也能看到原因和解决方案

docker run -d --restart unless-stopped --name jenkins \
 -p 2201:8080 -p 2202:50000 \
 -v /docker_volume/jenkins_home:/var/jenkins_home \
 jenkins/jenkins:lts

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
