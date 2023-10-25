如果想监听子组件的生命周期时，可以像下面例子中这么做：
```
<template>
  <child @hook:mounted="removeLoading" />
</template>
```
这样的写法可以用于处理加载第三方的初始化过程稍漫长的子组件时，我们可以加loading动画，等到子组件加载完毕，到了mounted生命周期时，把loading动画移除。
初次之外hook还有一个常用的写法，在一个需要轮询更新数据的组件上，我们通常在created里开启定时器，然后在beforeDestroy上清除定时器。而通过hook,开启和销毁定时器的逻辑我们都可以在created里实现：
```
<script>
  export default {
    created() {
      const timer = setInterval(() => {
        // 更新逻辑
      }, 1000);
      // 通过$once和hook监听实例自身的beforeDestroy，触发该生命周期时清除定时器
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  };
</script>
```