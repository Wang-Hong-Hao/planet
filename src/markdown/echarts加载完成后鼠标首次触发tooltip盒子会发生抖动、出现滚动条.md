> echarts加载完成后鼠标首次触发tooltip盒子会发生抖动、出现滚动条



原因：

在echarts图表中出现tooltip时，画布的父标签（即：echarts.init()的标签）的有时宽高都会发生变化，导致相对布局的div可能大小发生变化（画布大小却不变），导致页面闪动。



解决方法 ：

1. 在该画布的父标签（即：echarts.init()的标签）外层套一个div，设置overflow:hidden；然后，设置tooltip的confine：true;(设置tooltip不超出图表)。
2. tooltip：{ transitionDuration: 0, }//加上这个可以防止抖动