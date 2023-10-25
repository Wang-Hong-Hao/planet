很多开发者会在watch中某一个变量的handler里调用多个操作，如下所示：
```js
export default {
    data() {
      return {
        value: "",
      };
    },
    methods: {
      fn1() {},
      fn2() {},
    },
    watch: {
      value: {
        handler() {
          fn1();
          fn2();
        },
        immediate: true,
        deep: true,
      },
    },
  };
```
虽然fn1和fn2都需要在value变动的时候调用，但两者的调用时机可能不同。fn1可能仅需要在deep为false的配置下调用既可。因此，Vue在watch的值添加了Array类型来针对上面所说的情况，如果用watch为Array的写法处理可以写成下面这种形式：
```js
  watch:{
      'value':[
          {
              handler:function(){
                  fn1()
              },
              immediate:true
          },
          {
              handler:function(){
                  fn2()
              },
              immediate:true,
              deep:true
          }
      ]
  }
```

同时也印证使用`this.$watch`可重复添加多个handler到相同的监听对象