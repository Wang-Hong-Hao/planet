- `v-bind:herf = ""` :后面穿的是参数 告诉v-bind指令操作herf属性

- `:[attrName]=""` 动态绑定属性

- `@[eventName]="" `动态绑定事件

- `<button disabled></button>` disabled属性存在即为true

- 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不应该在模板表达式中试图访问用户定义的全局变量(window,$data,this)

- 对于模板任何复杂逻辑，你都应当使用计算属性，善用缓存特性，计算属性拥有watch监听的特性，部分情况下使用computed优于watch

- 善用计算属性setter

- 当在一个自定义组件上使用 class property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖

- `:style="styleObject"` 绑定一个用户自定义对象可以通过修改对象方便的更改css

- 当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

- 因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 `<template>` 元素。

- Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
```
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address">
    </template>
    /**
    *那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder
    */
```

- v-for在遍历对象时，会按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。

- Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

- 用新数组替换旧数组 你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

- 有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

- 表单输入 v-model(.lazy,.number，.trim)修饰符

- `is attribute`可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会作为 DOM attribute 被绑定。对于像 value 这样的 property，若想让其如预期般工作，你需要使用 .prop 修饰器。

- 如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 v-bind (取代 v-bind:prop-name)
注意在 JavaScript 中对象和数组是通过引用传入子组件，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。

- 对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：form-control date-picker-theme-dark

- 自定义组件的 v-model
```
    model: {
        prop: 'checked',
        event: 'change'
      },
      props: {
        checked: Boolean
      },
```
- `v-slot` 只能添加在 `<template>`

- 当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot `直接用在组件上

- 所有的子组件都可以通过`this.$root`访问根实例当作全局 `store `来访问或使用，可以简单实现全局数据通信

- 当 ref 和 v-for 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

- 在一个组件实例上手动侦听事件
```
通过 $on(eventName, eventHandler) 侦听一个事件
通过 $once(eventName, eventHandler) 一次性侦听一个事件
通过 $off(eventName, eventHandler) 停止侦听一个事件
```
- 监听生命周期钩子 
```
this.$once('hook:beforeDestroy', function () {
picker.destroy()
})
```

- 组件是可以在它们自己的模板中调用自身的

- 使用webpack 的异步 import异步注册本地组件 可以解决组件之间循环🚰的问题
```
    components: {
      TreeFolderContents: () => import('./tree-folder-contents.vue')
    }
```
- 当 inline-template 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活
```
    <my-component inline-template>
      <div>
        <p>These are compiled as the component's own template.</p>
        <p>Not parent's transclusion content.</p>
      </div>
    </my-component>
```
- 混入对象合并
```
- 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先
- 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用
- 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对
- Vue.extend() 也使用同样的策略进行合并
```
- 如果想让自定义选项以自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数：
```
    Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
      // 返回合并后的值
    }
```





- filters过滤器可以串联、可以接收参数
```
    {{ message | filterA | filterB }}
    
    {{ message | filterA('arg1', arg2) }}
```