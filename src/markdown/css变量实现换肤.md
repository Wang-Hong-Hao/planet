## css变量

语法：`var( <自定义属性名> [, <默认值 ]? )`
如果我们使用的变量没有定义（注意，仅限于没有定义），则使用后面的值作为元素的属性值

- 变量命名 不能包含$，[，^，(，%等字符，普通字符局限在只要是“数字[0-9]”“字母[a-zA-Z]”“下划线_”和“短横线-”这些组合，但是可以是中文，日文或者韩文，
- 只能在声明块{}
- 变量也是跟着CSS选择器走的，如果变量所在的选择器和使用变量的元素没有交集，是没有效果的。
- 当存在多个同样名称的变量时候，变量的覆盖规则由CSS选择器的权重决定的，但并无!important这种用法，因为没有必要，!important设计初衷是干掉JS的style设置，但对于变量的定义则没有这样的需求。


## 使用方式

1. 直接在标签上绑定style
```
// 实现进度条
<div class="bar" style="--percent: 60;"></div>
.bar::before {
    display: block;
    counter-reset: progress var(--percent);
    content: counter(progress) '%\2002';
    width: calc(1% * var(--percent));
    color: #fff;
    background-color: #2486ff;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
}
```
2. JS中设置CSS变量
```
<div id="box">
    <img src="mm.jpg" style="border: 10px solid var(--color);">
</div>

box.style.setProperty('--color', '#cd0000');
```
3. JS中获取CSS变量
```
// 获取 --color CSS 变量值
var cssVarColor = getComputedStyle(box).getPropertyValue('--color'); 

// 输出cssVarColor
// 输出变量值是：#cd0000 
console.log(cssVarColor);
```

## 实现换肤
首先定义变量skinVariablescss
```
body[data-theme='dark'] {
    --bgColor: #353535;

    --navFontColor: #adb7be;

    --mainFontColor: #fff;

    --mainColor: #3db96d;

    --mainHoverColor: #2aa461;

    --btnBgColor1: #3db96d;

    --btnBgColor2: #1b904e;

    --selectBgColor: #212121;

    --selectOpColor: #afafaf;

    --selectActiveColor: #fff
}

body[data-theme='light'] {

    --bgColor: #f4f5f5;

    --navFontColor: #515767;

    --mainFontColor: #212121;

    --mainColor: #1e80ff;

    --mainHoverColor: #508cf7;

    --btnBgColor1: #1d7dfa;

    --btnBgColor2: #1e80ff;

    --selectBgColor: #fff;

    --selectOpColor: #afafaf;

    --selectActiveColor: #fff
}

```
vue项目在app.vue根组件中为body设置自定义属性
```
      const body = document.body
      body.setAttribute('data-theme','dark')
```
body下所有元素即可使用变量