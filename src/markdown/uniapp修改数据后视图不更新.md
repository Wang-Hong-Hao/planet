## uniapp修改数据后视图不更新
使用父组件`props`渲染数据，`props`更改后视图未更新

此时使用this.$forceUpdate()方法强制更新视图
this.$forceUpdate()迫使vue实例重新渲染 注意它只影响实例本身和插入插槽的子组件，而不是所有的子组件