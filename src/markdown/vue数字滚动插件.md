1.安装

在控制台输入npm install vue-count-to来安装vue-count-to插件

2. 导入插件并声明

在需要使用的页面导入插件,并声明使用
![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220406090744659-1776508097.png)

3.使用插件:

第一种方法:
```
<template>

<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>

</template>

<script>

import countTo from 'vue-count-to';

export default {

components: { countTo },

data () {

return {

startVal: 0,

endVal: 2017

}

}

}

</script>
```
第二种方法:
```
<template>

<countTo :startVal='0' :endVal='2019' :duration='3600'></countTo>

</template>

<script>

import countTo from 'vue-count-to';

export default {

components: { countTo },

data () {

return {

}

}

}

</script>
```
![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220406090856787-1392827627.png)

下面是可以设置的一些参数,可供参考!
![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220406090944286-1442633026.png)


![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220406090950000-1600508577.png)

转自 https://baijiahao.baidu.com/s?id=1684770570244473157&wfr=spider&for=pc