vue 项目的权限限制功能, 有一种实现方案是这样的

+   进入项目
+   只设置没有权限要求的路由
+   向后台提供当前用户的权限
+   后台根据用户权限, 返回该用户可以用的路由信息
+   将路由信息翻译成 “符合 routes 选项要求的数组”
+   用 router.addRoutes(routes) 方法把 “符合 routes 选项要求的数组” 添加到路由

这个方案涉及到两个问题:

1.  怎么添加路由规则
2.  怎么删除路由规则

* * *

# 路由规则

首先明确一下什么叫路由规则?  
下例的 { path: ‘/foo’, [component](https://so.csdn.net/so/search?q=component&spm=1001.2101.3001.7020): Foo } 就是一条路由规则

```javascript
var router = new VueRouter({
	routes: [{
		path: '/foo',
		component: Foo
	}, {
		path: '/bar',
		component: Bar
	}]
})
```

将路由规则包装成[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020), 这个数组就是下面要提供给 router.addRoutes 方法的数据

  
  

# 添加路由规则

官方有提供添加规则的方法 router.addRoutes()

> router.addRoutes(routes: Array)  
> 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。

```javascript
var router = new VueRouter({
	routes: [{
		path: '/foo',
		component: Foo
	}]
});

router.addRoutes([{
	path: '/bar',
	component: Bar
}])
```

这样就已经把 bar 添加到路由当中, 可以说是简单粗暴且高效

  

添加路由规则时, 要注意一个细节  
addRoutes 只能把新路由规则添加到末尾  
如你的路由规则很复杂, 一个路径可以匹配好几个路由的话, 那你要仔细设计你的路由了  
因为路由规则的顺序是有意义的, 越靠前优先级越高, 这将直接影响匹配结果

  
  

# 删除路由规则

神奇的是官方只提供了增加规则的方法, 却不提供删除规则的方法  
经过学习, 我找到了一个效果相近的方法

```javascript
var router = new VueRouter({
	routes: [{
		path: '/foo',
		component: Foo
	}]
});

router.addRoutes([{
	path: '/bar',
	component: Bar
}])

// 获取原始路由数据
var options = router.options

// 用原始数据重新 new 一个路由
var _VueRouter = new VueRouter(options)

// 用新路由的 matcher 替换旧路由的 matcher
router.matcher = _VueRouter.matcher
```

这样就相当于把路由重置了  
获得原始数据后, 也可以根据项目要求, 向 options 插入路由规则, 再重新 new 一个路由

  
  

## 删除方法原理简析

看过 vue router 源码的朋友大概都知道

new VueRouter() 后, routes 数据会被传给内部方法 createMatcher()

createMatcher 方法中有三个对象 pathList, pathMap, nameMap 和两个方法 addRoutes, match

三个对象用于保存编译后的路由数据, 因为没有暴露出去, 所以 router 并不能查询到编译后的路由数据( router.options 其实是初始化时的数据, 上面的例子也有用到它)

两个方法被 createMatcher return, 最终保存在 this.matcher 上面, 可以被 router.matcher 调用

  
  

上面的方法本质就是用新数据 new 一个新路由对象 \_VueRouter  
从而得到新的 pathList, pathMap, nameMap

因为 pathList, pathMap, nameMap 是内部变量, 不能直接调用  
只能被内部方法如 addRoutes, match 调用  
所以用替换 matcher 的方式, 替换了整个 createMatcher (这里是闭包的知识)

简单点说就是  
新的 matcher 包含新的 addRoutes, match  
新的 addRoutes, match 可以调用新的 pathList, pathMap, nameMap

  
  

# 关于 vue router@4.x 的 removeRoute

随着 vue3.x 的发展, vue router 也推出了 4.x(不知道为什么中文官网好像没提到这个)  
而 4.x 中新增了 removeRoute 方法, 就是用户删除路由规则的

如果你已经在使用 vue router@4.x  
那么上面的话当我没说

end

 

文章知识点与官方知识档案匹配，可进一步学习相关知识

[Vue入门技能树](https://edu.csdn.net/skill/vue/vue-ffb7401f51a7483bb21eaa81827c0e73)[Vue-router](https://edu.csdn.net/skill/vue/vue-ffb7401f51a7483bb21eaa81827c0e73)[vue-router是什么？](https://edu.csdn.net/skill/vue/vue-ffb7401f51a7483bb21eaa81827c0e73)17994 人正在系统学习中