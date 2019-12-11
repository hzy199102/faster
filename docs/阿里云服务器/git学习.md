git 教程
参考资料：https://www.liaoxuefeng.com/wiki/896043488029600

1. git 简介
   1. 安装 git
      在环境搭建.md 中有详细教程
   2. 创建版本库
      什么是版本库呢？版本库又名仓库，英文名 repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被 Git 管理起来，每个文件的修改、删除，Git 都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。
      1. 创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录
         [mkdir learngit][cd learngit][pwd]：/home/learngit
      2. 通过 git init 命令把这个目录变成 Git 可以管理的仓库：
         [git init]
         可以发现当前目录下多了一个.git 的目录，这个目录是 Git 来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把 Git 仓库给破坏了。
         如果你没有看到.git 目录，那是因为这个目录默认是隐藏的，用 [ls -ah] 命令就可以看见。
      3. 把文件添加到版本库
         1. 创建文件
            [touch readme.txt]
         2. 录入文件内容
            参考资料：https://www.cnblogs.com/qiuhe/p/10263166.html
            [vi readme.txt][i]
            输入内容
            [:wq]
         3. 把一个文件放到 Git 仓库
            1. [git add readme.txt]
            2. [git commit -m "wrote a readme file"]
               git commit 命令，-m 后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。
2. 时光穿梭机
   1. 修改 readme.txt 内容并且重新提交，查看期间的 git 变化
      1. 修改 readme.txt 内容
      2. [git status]
         git status 命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，readme.txt 被修改过了，但还没有准备提交的修改。
      3. [git diff readme.txt]
         git diff 顾名思义就是查看 difference，显示的格式正是 Unix 通用的 diff 格式，可以从上面的命令输出看到，我们在第一行添加了一个 distributed 单词。
      4. [git add readme.txt]
         知道了对 readme.txt 作了什么修改后，再把它提交到仓库就放心多了，提交修改和提交新文件是一样的两步，第一步是 git add：
      5. [git status]
         git status 告诉我们，将要被提交的修改包括 readme.txt，下一步，就可以放心地提交了：
      6. [git commit -m "add distributed"]
      7. [git status]
         Git 告诉我们当前没有需要提交的修改，而且，工作目录是干净（working tree clean）的。
   2. 版本回退
      1. 重复[2.1]的步骤
      2. [git log]，如果内容多[:q]退出
      3. [git log --pretty=oneline]
         如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline 参数
      4. [git reset --hard HEAD^]
         我们启动时光穿梭机，准备把 readme.txt 回退到上一个版本，也就是 add distributed 的那个版本，怎么做呢？
         首先，Git 必须知道当前版本是哪个版本，在 Git 中，用 HEAD 表示当前版本，也就是最新的提交 1094adb...（注意我的提交 ID 和你的肯定不一样），上一个版本就是 HEAD^，上上一个版本就是 HEAD^^，当然往上 100 个版本写 100 个^比较容易数不过来，所以写成 HEAD~100。
      5. [cat readme.txt]
         看看 readme.txt 的内容是不是版本 add distributed：
      6. [git log]
         最新的那个版本 append GPL 已经看不到了！好比你从 21 世纪坐时光穿梭机来到了 19 世纪，想再回去已经回不去了，肿么办？
      7. [git reflog]
         用 [git reflog] 查看命令历史，以便确定要回到未来的哪个版本。
         8e4c51c (HEAD -> master) HEAD@{0}: reset: moving to 8e4c51
         4d5e691 HEAD@{1}: reset: moving to HEAD^
         8e4c51c (HEAD -> master) HEAD@{2}: commit: append GPL
         4d5e691 HEAD@{3}: commit: add distributed
         8e4620a HEAD@{4}: commit (initial): wrote a readme file
      8. [git reset --hard 8e4c51d]
         版本号没必要写全，前几位就可以了，Git 会自动去找。当然也不能只写前一两位，因为 Git 可能会找到多个版本号，就无法确定是哪一个了。
   3. 工作区和暂存区
      1. 工作区
         就是你在电脑里能看到的目录，比如我的 learngit 文件夹就是一个工作区：
      2. 版本库（Repository）
         工作区有一个隐藏目录.git，这个不算工作区，而是 Git 的版本库。
         Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD。
      3. git 提交步骤
         第一步是用 git add 把文件添加进去，实际上就是把文件修改添加到暂存区；
         第二步是用 git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支。
         因为我们创建 Git 版本库时，Git 自动为我们创建了唯一一个 master 分支，所以，现在，git commit 就是往 master 分支上提交更改。
         你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。
      4. demo
         修改 readme.txt 的内容
         新建 LICENSE 文件
         [git status][git add readme.txt][git add LICENSE][git status]
         [git commit -m "understand how stage works"][git status]
   4. 管理修改
      1. 第一次修改 -> [git add] -> 第二次修改 -> [git commit]-> [git status]
         Git 管理的是修改，当你用 git add 命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit 只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。
      2. [git diff HEAD -- readme.txt]
         可以查看工作区和版本库里面最新版本的区别，注意命令区分大小写。
      3. 小结
         现在，你又理解了 Git 是如何跟踪修改的，每次修改，如果不用 git add 到暂存区，那就不会加入到 commit 中。
   5. 撤销修改
      1. 修改了 readme.txt 和 LICENSE 两个文件的内容
      2. [git status]
         修改之后还没提交暂存区，可以查看状态，并且根据提示判断如何撤销修改，
         如果是 v2.2.23 以后的 git 版本，使用[git restore readme.txt]撤销工作区的修改，
         之前的版本使用[git checkout -- readme.txt]撤销工作区的修改，
         注意，只能一个个撤销
      3. [git add --all][git status]
         已经提交到暂存区，可以查看状态，并且根据提示判断如何撤销修改，
         如果是 v2.2.23 以后的 git 版本，使用[git restore --staged readme.txt]可以把暂存区的修改撤销掉（unstage），重新放回工作区，再[git restore readme.txt]撤销工作区的修改，
         之前的版本使用[git reset HEAD readme.txt]可以把暂存区的修改撤销掉（unstage），重新放回工作区，再[git checkout -- readme.txt]撤销工作区的修改
         注意，只能一个个撤销
   6. 删除文件
      1. [touch test.txt][git add test.txt][git commit -m "add test.txt"]
         新建一个文件并且添加到版本库
      2. [rm test.txt]
         删除文件
      3. [git rm test.txt][git commit -m "remove test.txt"]
         彻底删除，但是可以通过[2.2 版本回退]恢复
      4. [git checkout -- test.txt]
         如果没有执行[2.6.3]，可以[git checkout -- test.txt]，或者[git restore test.txt]，反正删除文件也是修改文件的一种，可以参考[3.5]的全部方式。
