项目里遇到一个富文本在编辑器内和页面上渲染出来的样式不一致的问题，具体表现在fons-size和line-height等可继承的属性上，经过排查发现确实是继承了父元素的样式导致的

随即我在想如何隔离父元素的样式，经过我在张鑫旭的博客里一整翻，终于`style:"all: initial;"`解决问题

### CSS3的all属性
all属性实际上是所有CSS属性的缩写，表示，所有的CSS属性都怎样怎样，但是，不包括unicode-bidi和direction这两个CSS属性。
支持三个CSS通用属性值，initial, inherit, unset. 这三个属性值分别表示什么意思呢？
#### initial
initial是初始值的意思，也就是，父元素下面所有的第一级子元素都除了unicode-bidi和direction以外的CSS都使用初始值。
#### inherit
inherit是继承的意思，也就是，父元素下面所有的相邻子元素都除了unicode-bidi和direction以外的CSS都继承了父元素的CSS。
### unset
unset是取消设置的意思，也就是，article元素下面所有的相邻子元素除了unicode-bidi和direction以外的CSS都干掉都不要，不要了那用什么呢？unset值的特性如下，当前元素浏览器或用户设置的CSS忽略，然后如果是具有继承特性的CSS，如color, 则使用继承值；如果是没有继承特性的CSS属性，如background-color, 则使用初始值。
