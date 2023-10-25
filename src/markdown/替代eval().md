方法1:
//计算表达式的值
```
function evil(fn) {
    var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
```
方法2
```
function eval1 (str) {
    var script = document.createElement('script');
    script.type="text/javascript";
    script.text=str;
    document.getElementsByTagName('head')[0].appendChild(script);
    document.head.removeChild(document.head.lastChild);
}
```
小程序替代eval使用eval5
`https://gitee.com/bplok20010/eval5`
```
import { Interpreter } from 'eval5'
const interpreter = new Interpreter(window, {})
interpreter.evaluate(str)
```