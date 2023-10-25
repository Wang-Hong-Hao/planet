监听对象中的属性，我们一般这样写
```
watch: {
    'obj.a' (val, oldVal) {
        ...your code
    }
}
```
对于对象中复杂的字符串监听，比如form.zh-CN这种怎么办？如果还用之前的那种监听方式，可能会报下诉错误
`Failed watching path: “XXXXX” Watcher only accepts simple dot-delimited paths. For full control, use a function instead.`
意思是说，只接受简单的点分隔路径。 要完全控制，请改用函数。
那么问题来了，如何改写成函数形式？方法如下：

```
created () {
     this.$watch(
        function () {  // 第一个函数就是处理你要监听的属性，只要将其return出去就行
            return this.form['zh-CN']
        },
        function (val, oldVal) {
            ... your code
        }
    )
}
```
