process 对象是一个全局变量，提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。

process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，

其中：

数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径

第二个元素process.argv[1]——为当前执行的JavaScript文件路径

剩余的元素为其他命令行参数

例如：

输入命令：node scripts/build.js "web-runtime-cjs,web-server-renderer"
  结果：

console.log(process.argv[0])   // 打印 D:\nodeJs\node.exe
console.log(process.argv[1])   // 打印 E:\Study_document\vue-resource\vue-dev\scripts\build.js
console.log(process.argv[2])   // 打印 web-runtime-cjs,web-server-renderer