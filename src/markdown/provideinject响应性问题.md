# provide和inject使用以及响应性问题

```js
  data() {},
  provide() {
    return {
      reportParent: this
    }
  },
```

```js
  data() {},
  inject: ['reportParent'],
```



> provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的

以上引用自官网

可能之所以这样设计，是为了避免数据的混乱。就如同props不能被子组件直接修改一样。

从代码角度讲

```js
 data() {
    return {
        foo: 'foo',
        bar: 'bar'
        baz: {hello: 'world'}
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.bar,
    }
  },
```




当我们以如上的形式书写代码的时候，其实相当于对this.foo和this.baz做了一层浅拷贝，固当子组件inject的时候已经丢失了[响应式](https://so.csdn.net/so/search?q=%E5%93%8D%E5%BA%94%E5%BC%8F&spm=1001.2101.3001.7020)功能了。但由于仅仅是浅拷贝，所以响应式对象的属性仍旧是响应式的。

```js
  // 父组件
  provide() {
    return {
      baz: this.baz,
    }
  },
  // 子组件baz.hello仍旧是响应式的。
  inject: ['baz']
```



## 方法一

通过函数返回响应式的数据,接收的组件直接调用该函数或者通过computed映射

```js
provide() {
	return {
		baz:() => this.baz
	}
}
```

```js
inject:['baz'],
  
computed:{
	_baz() {
		return this.baz()
	}
}

```

## 方法二

把需要传递的参数定义成一个对象

官方解释：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，**如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。**