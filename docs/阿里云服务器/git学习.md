git 教程
参考资料：https://www.liaoxuefeng.com/wiki/896043488029600
         http://www.ruanyifeng.com/blog/2015/12/git-workflow.html

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
3. 远程仓库
   1. 定义
      1. 注册 github 账号，利用它做远程仓库
      2. 查找用户主目录是否有.ssh 目录
         参考资料：https://www.cnblogs.com/sxdcgaq8080/p/10570150.html
         [echo $HOME]或者[cd ~][pwd]：都能得到用户主目录，我的是/root
         [ls -ah]可以查看隐藏文件
         [ssh-keygen -t rsa -C "203161585@qq.com"]
         键入命令后，会让你输入密码用来保护你的密钥等，总共三次需要输入的，你都直接三次回车就好！！
         【关键是，设置了你自己以后忘了就得重新生成】
         【-C 是给你的密钥设置注释，你不想设置为邮箱，设置成别的也行】
         可以在用户主目录里找到.ssh 目录，里面有 id_rsa 和 id_rsa.pub 两个文件，这两个就是 SSH Key 的秘钥对，id_rsa 是私钥，不能泄露出去，id_rsa.pub 是公钥，可以放心地告诉任何人。
      3. github 网站——>settings——>SSH and GPG keys——>添加 ssh key
         GitHub 允许你添加多个 Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的 Key 都添加到 GitHub，就可以在每台电脑上往 GitHub 推送了。
   2. 添加远程库
      现在的情景是，你已经在本地创建了一个 Git 仓库后，又想在 GitHub 创建一个 Git 仓库，并且让这两个仓库进行远程同步，这样，GitHub 上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。
      1. github 网站——>new repository——>在 Repository name 填入 learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的 Git 仓库
      2. 建立 repository 之后，会有提示代码告诉你做什么。我安装 push an existing repository from the command line 的提示在服务器的 learngit 文件夹下运行指示命令，
         注意，首次还输入 git 的账号和密码
         …or create a new repository on the command line
         echo "# learngit" >> README.md
         git init
         git add README.md
         git commit -m "first commit"
         git remote add origin https://github.com/hzy199102/learngit.git
         git push -u origin master
         …or push an existing repository from the command line
         git remote add origin https://github.com/hzy199102/learngit.git
         git push -u origin master
      3. 结果
         由于远程库是空的，我们第一次推送 master 分支时，加上了-u 参数，Git 不但会把本地的 master 分支内容推送的远程新的 master 分支，还会把本地的 master 分支和远程的 master 分支关联起来，在以后的推送或者拉取时就可以简化命令。
         推送成功后，可以立刻在 GitHub 页面中看到远程库的内容已经和本地一模一样：
         从现在起，只要本地作了提交，就可以通过命令：[git push origin master]
         分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而 SVN 在没有联网的时候是拒绝干活的！
         当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！
   3. 从远程看克隆
      1. git clone https://github.com/hzy199102/gitskills.git
      2. 会在运行命令的路径下出现 gitskills 文件夹，[cd gitskills][ls -ah]会发现.git 文件夹，说明是 git 管理了。
4. 分支管理
   1. 简介
      分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了 50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。
      如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。
      现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，
      直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。
   2. 创建与合并分支
      Git 鼓励大量使用分支：
      查看分支：[git branch]
      创建分支：[git branch <name>]
      切换分支：[git checkout <name>]或者[git switch <name>]
      创建+切换分支：[git checkout -b <name>]或者[git switch -c <name>]
      合并某分支到当前分支：[git merge <name>]
      删除分支：[git branch -d <name>]
      注意，切换分支没有 commit，所以[git reflog]或者[git log]的时候，会发现 commitid 只有 2 个，[git reset --hard commitid]只会在当前分支下切换 commit 文件的状态
   3. 解决冲突
      [git checkout -b dev][vi readme.md]
      [git switch dev]因为此时只是修改了工作区，但并没有放入暂存区，更没有提交到版本库，所以此时如果切换分支[git switch master]，会发现工作去的 README.MD 内容也发生了修改。
      [git add --all][git commit -m "and simple"]，此时 dev 分支的修改内容已经提交到版本库了
      [git switch master]，此时[cat README.MD]，会发现内容还是原来内容，不是 dev 分支上被修改过的内容
      [vi README.MD][git add --all][git commit -m "&&"]，此时 master 分支的修改内容已经提交到版本库了
      [git merge dev],Git 无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突
      [git status]可以看到冲突文件是哪个：both modified: readme.txt
      [cat README.MD]可以看到冲突的内容，Git 用<<<<<<<，=======，>>>>>>>标记出不同分支的内容
      [vi README.MD]解决冲突
      [git add --all][git commit -m "merge"]，此时 matser 分支上就是最终版本的内容
      [git branch -d dev]删除 dev 分支
      [git push]工作完成
      当 Git 无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
      解决冲突就是把 Git 合并失败的文件手动编辑为我们希望的内容，再提交。
      用[git log --graph]命令可以看到分支合并图。
      [git log --graph --pretty=oneline --abbrev-commit]
   4. 分支管理策略
      合并分支时，如果可能，Git 会用 Fast forward 模式，但这种模式下，删除分支后，会丢掉分支信息。
      如果要强制禁用 Fast forward 模式，Git 就会在 merge 时生成一个新的 commit，这样，从分支历史上就可以看出分支信息。
      [git merge --no-ff -m "merge with no-ff" dev][git log --graph --pretty=oneline --abbrev-commit]
      \$ git log --graph --pretty=oneline --abbrev-commit
      - e1e9c68 (HEAD -> master) merge with no-ff
        |\  
        | \* f52c633 (dev) add merge
        |/
      - cf810e4 conflict fixed
        看到上图有(dev)，这就代表从哪个分支合并的。
        总结：合并分支时，加上--no-ff 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并。
   5. Bug 分支
      软件开发中正在 dev 分支进行工作，但是 master 分支有个 bug 要修复，这个时候怎么办？
      1. [git stash]可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
      2. [git checkout master][git switch -c issue-101]，从 master 分支拉一个 issue-101 分支修复 bug
      3. [git add --all][git commit -m 'fix bug 10'][git switch master][git merge --no-ff -m "merged bug fix 101" issue-101]完成 bug 修复并且在 master 分支同步了正确代码
      4. [git reflog]查看[git commit -m 'fix bug 10']对应的 commitid，因为 master 分支上的 bug 在 dev 上肯定也有，同样的 bug，要在 dev 上修复，
         我们只需要把 4c805e2 fix bug 101 这个提交所做的修改“复制”到 dev 分支。
         注意：我们只想复制 commitid fix bug 101 这个提交所做的修改，并不是把整个 master 分支 merge 过来。
         [git cherry-pick commitid]
      5. 注意，如果修复的 bug 涉及的文件和 dev 本身工作的文件有冲突，如果[stash pop][git cherry-pick commitid]，则肯定出错：
         error: your local changes would be overwritten by cherry-pick.
         hint: commit your changes or stash them to proceed.
         fatal: cherry-pick failed
         这个时候你肯定不能 commit 你的 dev，因为你的工作还没完成，但是这时候你又想把修正的 bug 移到 dev 上，则
         [git stash][git cherry-pick commitid][stash pop]，还是先将当前工作现场“储藏”起来，然后把修正 bug 的 commit 在 dev 上执行，这时候 dev 和 master 分支的代码是完全一致的，
         接着在执行[stash pop]，这时候就成功了，但是注意看 git 提示：
         Auto-merging readme.txt
         CONFLICT (content): Merge conflict in readme.txt
         The stash entry is kept in case you need it again.
         所以你需要手动修正下冲突，然后就能接着正常开发了，开发完之后
         [git add --all][git commit -m 'new work'][git switch master][git merge --no-ff -m "merged dev" dev]
         这个时候注意看 git 提示，如果有手动修正就修正，没有最好，然后在 master 分支上[git add --all][git commit -m 'new work']即可。
      6. [git stash list]查看工作现场
         [git stash apply]恢复，但是恢复后，stash 内容并不删除，你需要用[git stash drop]来删除
         [git stash pop]，恢复的同时把 stash 内容也删了：
         你可以多次[git stash]，恢复的时候，先用[git stash list]查看，然后恢复指定的 stash，用命令：[git stash apply staskid]
      7. 小结
         修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除；
         当手头工作没有完成时，先把工作现场 [git stash] 一下，然后去修复 bug，修复后，再 [git stash pop]，回到工作现场；
         在 master 分支上修复的 bug，想要合并到当前 dev 分支，可以用 [git cherry-pick <commit>]命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。
   6. Feature分支
      [git branch -D dev]强行删除分支，注意是D不是d
   7. 多人协作
      1. 在github上创建了一个分支dev，在本地运行[git branch -a]是看不到[origin/dev]的，需要[git pull]，接着[git switch -c dev origin/dev]即可
      2. [git branch --set-upstream-to dev origin/dev]在你本地已经建立了dev分支，但是还没有和远程dev分支关联的时候采用，否则你创建本地分支dev，在[git push]的
         时候会发现错误提示，没有指定本地dev分支与远程origin/dev分支的链接，但是可以根据提示创建连接。
      3. [git remote -v]查看远程库信
      4. [git push origin branch-name],从本地推送分支，如果推送失败，先用git pull抓取远程的新提交
   8. Rebase
      1. [git rebase],rebase操作可以把本地未push的分叉提交历史整理成直线
         参考资料：https://www.jianshu.com/p/f7ed3dd0d2d8
         1. dev分支做2次commit，修改test.txt和hello.py文件内容
         2. 在另一台电脑push origin/dev，test.text和hello.py的内容修改
         3. 此时dev分支git push，失败，提示git pull
         4. [git pull]之后可能因为内容冲突还需要手动修正冲突，并且[git add --all]
         5. [git log --graph --pretty=oneline --abbrev-commit]可以看到有分叉了，对于强迫症者，想要梳理成直线
         6. git rebase，根据提示信息操作
         7. 如果有内容冲突，可以[git rebase --abort]，相当于回滚到[git rebase]之前
         8. 如果有内容冲突，也可以手动修改对应冲突，[git am --show-current-patch]查看冲突的文件，修正之后[git add --all]，也可以[git add/rm <conflicted_files>]，
            接着[git rebase --continue]
         9. [git log --graph --pretty=oneline --abbrev-commit]，这时候可以看到分叉已经变成直线了
         10. [git push]
      2. 整合本地多个[git commit]记录为一个。
         参考资料：https://www.codercto.com/a/45325.html，https://www.jianshu.com/p/4a8f4af4e803
         1. [git rebase -i HEAD~3]或者[git rebase -i commitid]，注意这个commitid为合并commitid的外边界commitid，具体看vi编辑文本
         2. pick：保留该commit（缩写:p）
            reword：保留该commit，但我需要修改该commit的注释（缩写:r）
            edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
            squash：将该commit和前一个commit合并（缩写:s）
            fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
            exec：执行shell命令（缩写:x）
            drop：我要丢弃该commit（缩写:d）
            一般用到s和p
         3. 因为是vi编辑，不详述了，[:wq]之后，会出现第二个vi文本提示你确认commit信息
         4. [git log --graph --pretty=oneline --abbrev-commit]，这时候可以看到多个commit已经变成一个了。
         5. 虽然[git log]已经看不到对应的日志，但是[git reflog]还是能看到所有原始操作。
5. 标签管理
   和commitid的含义类似，但是commitid是毫无逻辑的字符串，但是tag是容易记忆的代号，所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。
   1. 创建标签
      1. [git tag v1.0],默认标签是打在最新提交的commit上
      2. [git tag]查看所有
      3. [git log --pretty=oneline --abbrev-commit][git tag v0.9 commitid]找到指定commit提交打标签
         标签不是按时间顺序列出，而是按字母排序的
      4. [git show <tagname>],查看标签信息
      5. [git tag -a v0.1 -m "version 0.1 released" commitid],还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
   2. 操作标签
      1. [git tag -d <tagname>]，删除标签
         因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。
      2. [git push origin <tagname>]或者[git push origin --tags]
         推送某个标签到远程，或者，一次性推送全部尚未推送到远程的本地标签
      3. 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：[git tag -d <tagname>]
         然后，从远程删除。删除命令也是push:[git push origin :refs/tags/v0.9]
6. 自定义GIT
   1. 忽略特殊文件
      1. [touch .gitignore][ls -a][vi .gitignore]把LICENSE加入
      2. [git rm -r --cached LICENSE]，如果LICENSE在.gitignore生效之前就建好，需要清理下git缓存
      3. [vi LICENSE]修改内容，[git status]会发现还是有LICENSE的内容，别管，[git add --add][git commit -m 'update .gitignore']，
         之后会发现在修改LICENSE不会在[git status]中出现了。
   2. 配置别名
      1. [git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"]
         [git lg]
         相信我，输入这行命令，你会开心到哭的
         当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中
         [cd ~][pwd][ls -a][cat .gitconfig]
   3. 搭建git服务器
7. git submodule
   1. [git submodule add [gitskill url]][git status]
      可以看到在仓库中多出来文件 gitskill 以及 .gitmodules
   2. [git submodule add [subrepo1 url] ./module/module1][git status][ll]
      指定了路径
   3. [git submodule init][git submodule update]
      git clone项目的时候需要初始化子库，[git clone --recursive]可以达到同样的效果
   4. 子仓库也可以切换分支，提交代码，但是在git push之后，记住在主仓库中要[git add --all][git commit -m 'update submodule'][git push]，这样其他人才可以用得到。
   5. 参考资料：https://blog.csdn.net/wangyiyungw/article/details/83818144
8. 小知识
   1. git fetch和git pull的区别？
      git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。
      而git pull 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。
