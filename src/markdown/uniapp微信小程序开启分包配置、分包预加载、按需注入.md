# 小程序配置分包

在**manifest.json**对应平台的配置下添加`"optimization":{"subPackages":true}`开启分包优化

目前只支持`mp-weixin`、`mp-qq`、`mp-baidu`、`mp-toutiao`、`mp-kuaishou`的分包优化

分包优化具体逻辑：

- 静态文件：分包下支持 static 等静态资源拷贝，即分包目录内放置的静态资源不会被打包到主包中，也不可在主包中使用
- js文件：当某个 js 仅被一个分包引用时，该 js 会被打包到该分包内，否则仍打到主包（即被主包引用，或被超过 1 个分包引用）
- 自定义组件：若某个自定义组件仅被一个分包引用时，且未放入到分包内，编译时会输出提示信息

在**pages.json**文件中`pages`数组中存放主包页面，`subPackages`为分包

```js
"pages":[],
"subPackages":[{
  	"root": "pagesA",
  	"pages":[]
	},
  {
   	"root":"pagesB",
    "pages":[]
  }         
]
```

**manifest.json**文件内`ma-weixin`配置

```
"runmode": "liberate", // 开启分包优化后，必须配置资源释放模式
```



# 分包预加载配置

在访问`pages/index/index`页面时加载**pagesA**分包

```js
"preloadRule": {
	"pages/index/index": {
		"network": "all",
		"packages": ["pagesA"]
	}
},
```

# 开启按需注入

**manifest.json**文件内`ma-weixin`配置

```
"lazyCodeLoading": "requiredComponents"
```
