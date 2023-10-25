```
<template>
  <div id="app">
    <h3>{{ timeFormat }}</h3>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        // 用于显示时间的变量，是一个HH:MM:SS时间格式的字符串
        timeFormat: "",
      };
    },
    methods: {
      genTime: function* () {
        // 声明存储时、分、秒的变量
        let hour = 0;
        let minute = 0;
        let second = 0;
        while (true) {
          // 递增秒
          second += 1;
          // 如果秒到60了，则分加1，秒清零
          if (second === 60) {
            second = 0;
            minute += 1;
          }
          // 如果分到60了，则时加1，分清零
          if (minute === 60) {
            minute = 0;
            hour += 1;
          }
          // 最后返回最新的时间字符串
          yield `${hour}:${minute}:${second}`;
        }
      },
    },
    created() {
      // 通过生成器生成迭代器
      const gen = this.genTime();
      // 设置计时器定时从迭代器获取最新的时间字符串
      const timer = setInterval(() => {
        this.timeFormat = gen.next().value;
      }, 1000);
      // 在组件销毁的时候清空定时器和迭代器以免发生内存泄漏
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
        gen = null;
      });
    },
  };
</script>
```