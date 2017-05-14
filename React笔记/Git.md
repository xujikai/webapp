
## 分支管理

创建develop分支

    git checkout -b develop master

将develop分支合并到Master分支

    # 切换到Master分支
    git checkout master
    # 对Develop分支进行合并
    git merge --no-ff develop

    --no-ff 采用正常合并，默认快进式合并

删除分支

    git branch -d develop

对合并生成的新节点，做一个标签，在合并分支操作后执行

    git tag -a 1.2

临时性分支

    功能(feature)分支
    预发布(release)分支
    修补(fixbug)分支

## 远程操作

#### > git clone
该命令会在本地主机生成一个目录，与远程主机的版本库同名。
如果要指定不同的目录名，可以将目录名作为git clone命令的第二个参数。

    git clone <版本库的网址>
    git clone <版本库的网址> <本地目录名>

#### > git remote
为了便于管理，Git要求每个远程主机都必须指定一个主机名。
git remote命令就用于管理主机名。

不带选项的时候，git remote命令列出所有远程主机。

    git remote

#### > git pull
该命令会取回远程主机某个分支的更新，再与本地的指定分支合并。

    git pull <远程主机名> <远程分支名>:<本地分支名>

#### > git push
该命令用于将本地分支的更新，推送到远程主机。

    git push <远程主机名> <本地分支名>:<远程分支名>
    git push origin master

如果省略本地分支名，则表示删除指定的远程分支，
因为这等同于推送一个空的本地分支到远程分支。

    git push origin :master
    # 等同于
    git push origin --delete master

不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机

    git push --all origin

## 发布项目

	git status						查看当前git状态
	git add -A 						将未加入track的文件加进来
	git commit -m "提交文字说明"	提交到本地
	git push						push到github

	git subtree push --prefix=build,images origin gh-pages