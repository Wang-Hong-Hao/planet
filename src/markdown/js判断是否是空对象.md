> 1.将json对象转化为json字符串，再判断该字符串是否为"{}"
```
var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//true

```

> 2.for in 循环判断
```
var obj = {};
var b = function() {
    for(var key in obj) {
        return false;
    }
    return true;
}
alert(b());//true

```

> 3.Object.getOwnPropertyNames()方法
```
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//true

```

> 4.使用ES6的Object.keys()方法
```
var data = {};
var arr = Object.keys(data);
alert(arr.length == 0);//true

```