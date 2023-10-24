

## 1.hash模式

这里的hash就是指url尾巴后的 # 号以及后面的字符。这里的 # 和css里的 # 是一个意思。hash也称作锚点，本身是用来做页面定位的，他可以使对应的id元素显示在可视区域内。

特点：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

监听hash值变化
```
// 浏览器url不包含hash值 基于hash模式的vueRouter在hash值改变后不会影响url,页面不会进行刷新
  // 监听hash值改变后重新刷新浏览器
  window.onhashchange = function () {
    if (window.location.hash.includes('guidePage')) {
      window.location.reload()
    }
  }
```

由于hash值变化不会导致浏览器向服务器发出请求，而且hash改变会触发hashchange事件，浏览器的进后退也能对其进行控制，所以人们在html5的history出现前，基本都是使用hash来实现前端路由的。他的特点在于：hash虽然出现url中，但不会被包含在HTTP请求中，对后端完全没有影响，因此改变hash不会重新加载页面。hash 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。其次，hash的而传参是基于url的，如果要传递复杂的数据，会有体积的限制.

## 2.history模式

history模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
history———利用了HTML5 History Interface 中新增的pushState（）和replaceState（）方法。（需要特定浏览器的支持，history不能运用与IE8一下）

这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

因此可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。

### 注意
history模式下，前端的url必须和实际后端发起请求的url一致，如http://www.abc.com/book/id 。如果后端缺少对/book/id 的路由处理，将返回404错误。
history模式下vue.config.js中publicPath不支持./相对路径