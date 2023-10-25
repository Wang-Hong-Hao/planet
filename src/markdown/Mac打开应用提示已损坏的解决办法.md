Mac打开应用提示已损坏的解决办法：

　　一、10.15及以上新系统出现应用提示损坏打不开的解决方法：

　　打开终端(屏幕下方Dock栏中的的小火箭图标“启动台”——“其他”——打开“终端”)，在终端中粘贴下面命令：

　　sudo xattr -r -d com.apple.quarantine 

　　(注意quarantine后面有个空格，复制上面命令的时候注意一定不要漏了)

　　打开屏幕下方的“访达(笑脸图标)”—选择左侧边栏的“应用程序”，再找到你需要处理的软件拖拽到命令后面，按回车后输入密码执行，举个例子，比如需要打开sketch应用的命令是：

　　sudo xattr -r -d com.apple.quarantine /Applications/sketch.app/

![](https://img2023.cnblogs.com/blog/2483371/202306/2483371-20230619103446364-2030216450.png)
