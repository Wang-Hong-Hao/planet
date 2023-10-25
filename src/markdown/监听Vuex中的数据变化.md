`方法1`
### 将state数据映射到组件的computed,然后监听映射的计算属性即可
```
// vuex中的state数据
  state: {
    count: 0
  },
     
//  A组件中映射 state数据到计算属性
  computed: {
   //  this.$store.state.count
  // mapState       把全局  count 变成 可以直接使用的 数据
    ...mapState(['count'])
  }
// A组件监听 count计算属性的变化
   watch: {
     // watch 可以监听 data 数据 也可以监听 全局 vuex数据
    count () {
      // 用本身的数据进行一下计数
      this.changeCount++
    }
  }
```
`方法2`
### vuex中store对象本身提供了watch函数 
watch(fn: Function, callback: Function, options?: Object): Function
响应式地侦听 fn 的返回值，当值改变时调用回调函数。fn 接收 store 的 state 作为第一个参数，其 getter 作为第二个参数。最后接收一个可选的对象参数表示 Vue 的 vm.$watch 方法的参数。
```
  created () {
    this.$store.watch((state, getters) => {
      return state.count
    }, () => {
      this.changeCount++
    })
  }

```
`方法3`
### 直接对Vuex对象进行watch监听
```
export default{
	component:{},
	data(){
		return{}
	},
	watch:{
		'$store.state.data.age'(newVal,oldVal){
			//对数据执行操作
			console.log(newVal,oldVal)
		}
	},
	methods:{}
}
```