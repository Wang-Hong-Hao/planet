![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220401142944477-1913514044.png)

```
.border {
	margin: 300px auto;
	width: 200px;
	height: 100px;
	background: linear-gradient(blue, blue) left top,
		linear-gradient(blue, blue) left top,
		linear-gradient(blue, blue) right top,
		linear-gradient(blue, blue) right top,
		linear-gradient(blue, blue) left bottom,
		linear-gradient(blue, blue) left bottom,
		linear-gradient(blue, blue) right bottom,
		linear-gradient(blue, blue) right bottom;
	background-repeat: no-repeat;
	background-size: 1px 24px, 24px 1px;
}
```
这里主要是利用了一个background可以定义多个linear-gradient，且可以定义位置的原理实现。

 

此时的linear-gradient的主要作用不再是线性渐变，所以多余的属性可以去掉，定义两个相同的颜色即可，然后接线条位置。

这里总共有8条线，第一条线对应background-size为1px 24px；第二条线对应24px 1px。后续几条线重复，所以省略了。

background-repeat: no-reapeat；表示每条线不需要重复。



转自 https://blog.csdn.net/u013344993/article/details/80980555