Docker 决战到底(四) Jenkins 的安装与使用:[https://www.jianshu.com/p/01bb90bfcabb][https://github.com/jenkinsci/docker/blob/master/readme.md#usage]
docker run -d --restart unless-stopped --name jenkins \
 -p 2201:8080 -p 2202:50000 \
 -v /docker_volume/jenkins_home:/var/jenkins_home \
 jenkins/jenkins:alpine
