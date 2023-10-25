```
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.js"></script>
<div id="app">
  <example :tags="['h1','h2','h3']"></example>
</div>
<script>
  Vue.component("example", {
    props: ["tags"],
    render: function (h) {
      //   const children = this.tags.map((tag, i) => h(tag, i));
      //   return h("div", children);
      return h("div",{ attrs: { id: "hello" } },this.tags.map((tag, i) => h(tag, i))
      );
    },
  });
  new Vue({ el: "#app" });
</script>

```


```
<script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.js"></script>
<div id="app">
  <example :ok="ok"></example>
  <button @click="ok = !ok">toggle</button>
</div>
<script>
  const Foo = {
    render: (h) => h("div", "foo"),
  };
  const Bar = {
    render: (h) => h("div", "bar"),
  };
  Vue.component("example", {
    props: ["ok"],
    render: function (h) {
      return this.ok ? h(Foo) : h(Bar);
    },
  });
  new Vue({ el: "#app", data: { ok: true } });
</script>
```