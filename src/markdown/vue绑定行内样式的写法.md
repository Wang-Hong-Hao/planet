







### vue绑定行内样式的写法

> 第一种写法  

`注意: Style对象的属性与CSS中使用的属性几乎是一一对应的，只是包含连接符的属性则被替换为无连接符的属性，并且替换后的连击符后的单词第一个字母要大写，如CSS中的font-size在Style中被替换为fontSize,类似的还有text-align替换为textAlign等等`

```html
<div class="myBox" :style="{'width':screenWidth,'fontSize':'20px'}"></div>
```

> 第二种写法

```js
<div :style="styleObj"></div>
data() {
	return {
		styleObj:{
            width:'100px',
            color:'red',
            fontSize:'20px'
        }
	}
}
```

> 第三种写法

```js
<div :style="[styleObj1,styleObj2]"></div>
data() {
	return {
		styleObj1:{
            width:'100px',
            color:'red',
            fontSize:'20px'
        },
        styleObj2:{
            height:'100px'
        }
	}
}
```
