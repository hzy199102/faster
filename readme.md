faster faster faster

1.测试下 git 提交!
用 vscode 的时候，git clone 下来的项目首次提交需要输入账号密码，注意是 2 次，注意看弹出框提示！
非常麻烦，解决方案如下：
1.git config --global credential.helper store
这一步会在用户目录下的.gitconfig 文件最后添加：
[credential]
helper = store
以下是我完整的文件内容：
[user]
name = huangzy
email = huangzy@glodon.com
[gui]
recentrepo = E:/gradnsoft/gitspace/ironman
recentrepo = E:/git/hzy
[sendpack]
sideband = false
[credential]
helper = store
完全不担心密码暴露
2.git push 代码
push 你的代码 (git push), 这时会让你输入用户名和密码, 这一步输入的用户名密码会被记住, 下次再 push 代码时就不用输入用户名密码!
这一步会在用户目录下生成文件.git-credential 记录用户名密码的信息
3.git config --global credential.helper reset
如果想清除账号和密码,输入这行命令后，用户目录下的.gitconfig 文件：
helper = store 会变成 helper = reset
这时候的确再次提交 git 需要输入账号密码
4.git config --global credential.helper cache
如果想临时存储（默认 15 分钟）
