```
function require(modulePath) {
    //1.根据传入的模块路径 得到模块完整的绝对路径
    const moduleId = getModuleId(modulePath)
    //2.判断缓存
    if (cache[moduleId]) {
        return cache[moduleId]
    }
    //3.真正运行代码模块的辅助函数
    function _require(exports, require, module, __filename, __dirname) {
        //目标模块的代码在这里执行
    }
    //4.准备并运行辅助函数
    const module = {
        exports:{}
    }
    const exports = module.exports
    //得到模块文件的绝对路径
    const __filename = moduleId
    const __dirname = getDirname(__filename)
    _require.call(exports, exports, require, module, __filename, __dirname)
    //5.缓存module.exports
    cache[moduleId] = module.exports
    //6.返回module.exports
    return module.exports
}
```



**getModuleId、getDirname实现细节不必过多关注**

###模块内代码会放在_require函数内执行，所以可以在代码内直接打印arguments

```test.js
console.log(argument)
```

直接执行`node test.js`  会有以下输出

```
arguments [Arguments] {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: '/Users/whh/Documents/webpack5',
      exports: {},
      filename: '/Users/whh/Documents/webpack5/test.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      '/Users/whh/Documents/webpack5/test.js': [Module]
    }
  },
  '2': Module {
    id: '.',
    path: '/Users/whh/Documents/webpack5',
    exports: {},
    filename: '/Users/whh/Documents/webpack5/test.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/whh/Documents/webpack5/node_modules',
      '/Users/whh/Documents/node_modules',
      '/Users/whh/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  '3': '/Users/whh/Documents/webpack5/test.js',
  '4': '/Users/whh/Documents/webpack5'
}
```

###_require函数接受exports, require, module, __filename, __dirname参数

所以在commonJS规范下 模块内可直接使用`require`,` module.exports`,`exports`,`filename`,`dirname`

###_require辅助函数通过`.call`执行绑定`this`指向`exports`

所以在模块加载执行前 `this`,`exports`,`module.exports`是相等的

```test.js
console.log(this === exports,this === module.exports)
```

直接执行`node test.js`上面的代码会打印 true true

###最终返回的是`module.exports`

所以有一下代码test.js

```
this.a = 1
exports.b = 2
export = {
	c:3
}
module.exports = {
	d:4
}
exports.e = 5
this.f = 6


/**
解析 初始 this = exports = module.exports
执行后：

this,
{a:1,b:2,f:6}

export,
{c:3,e:5}

module.exports,
{d:4}
*/

```



最终在别的模块内引入

```
const test = require(./test.js)
console.log(test)
```

输出

```
{d:4}
```
