```
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.js"></script>
<script>
  // 插件代码
  const myPlugin = {
    install(Vue) {
      Vue.mixin({
        created() {
          // 获取实例的rules配置项
          const rules = this.$options.rules;
          if (rules) {
            Object.keys(rules).forEach((key) => {
              this.$watch(key, (newVal) => {
                const result = rules[key].validate(newVal);
                if (!result) {
                  console.log(rules[key].message);
                }
              });
            });
          }
        },
      });
    },
  };
  Vue.use(myPlugin);
  const vm = new Vue({
    data: { foo: 10 },
    rules: {
      foo: {
        validate: (value) => value > 1,
        message: "foo must be greater than one",
      },
    },
  });
  vm.foo = 0; // should log: "foo must be greater than one"
</script>

```