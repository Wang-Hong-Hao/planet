
## **基本操作**

### **Webpack配置**

### **uglifyjs-webpack-plugin**

![](https://pic4.zhimg.com/v2-ef5c530f01dfaf7fe7f5cf343bfe041b_b.jpg)

![](https://pic4.zhimg.com/v2-ef5c530f01dfaf7fe7f5cf343bfe041b_r.jpg)

我们可以看一下该插件介绍，该插件是用于减少我们代码`js`代码体积。并且如果安装运行该插件的话，`node`版本是在`v6.9.0+`和`Webpack`版本`v4.0.0+`。

官网地址看这里：**[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)**

**安装**

```text
npm i uglifyjs-webpack-plugin
```

**使用**

在`webpack.config.js`文件下进行如下配置。

```text
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
 // 省略...
    mode: "production",
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              // 删除注释
              output:{
                comments: false
              },
              compress: {
                drop_console: true, // 删除所有调式带有console的
                drop_debugger: true,
                pure_funcs: ['console.log'] // 删除console.log
              }
            }
          })
        ]
      } 
}
```

配置完上面代码，重启即可看到效果。**注意：代码只会在production（生产环境）环境下有效**，看上面我们的配置`mode: production`，就是生产环境。来讲解一下上面这俩个属性`drop_console`和`pure_funcs`的区别，前者则是删除所有带console的前缀的调试方法，如：`console.log`、`console.table`、`console.dir`只要带有`console`前缀则全部删除。而后者则是配置，就是数组的值是什么它才会删除什么，比如`pure_funcs：[console.log, console.dir]`那么只会删除这两项，则不会删除代码中的`console.table`代码。

> 以上代码放到生产环境下，console调试代码即可清除，但是还有一个问题需要注意，就是该插件只支持`ES5`语法，如果你的代码中涉及到`ES6`语法则会报错。  

### **terser-webpack-plugin**

![](https://pic2.zhimg.com/v2-16c5227384bfe12d6e4edc523c5a1f65_b.jpg)

![](https://pic2.zhimg.com/v2-16c5227384bfe12d6e4edc523c5a1f65_r.jpg)

该插件跟上面`uglifyjs-webpack-plugin`一样，都是用于减少我们代码`js`代码体积。

看上面描述：如果你的`Webpack`版本大于5+，则不需要安装此`terser-webpack-plugin`插件，会自带`terser-webpack-plugin`。但你的`Webpack`版本还是4，则你需要安装`terser-webpack-plugin`4的版本

**安装**

```text
npm i terser-webpack-plugin@4
```

**使用**

```text
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    // 省略...
    mode: "production",
    optimization: {
     minimizer: [
           new TerserWebpackPlugin({
                terserOptions: {
                  compress: {
                    warnings: true,
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log', "console.table"] // 删除console
                  }
                }
            });
        ]
    }
}
```

该插件功能与上面一样，属性用法也一样，唯一该插件可支持`ES6`语法。都是在**生产环境**代码生效。

### **Vue-cli配置**

这是在`Vue-cli`项目中推荐使用的清除console插件。更多介绍看这里 **[babel-plugin-transform-remove-console](https://www.npmjs.com/package/babel-plugin-transform-remove-console)**

**安装**

```text
npm i babel-plugin-transform-remove-console --save-dev
```

**使用**

在项目根目录`babel.config.js`文件下配置。该插件不区分**生产环境**或者**开发环境**，只要你配置都能生效。

```text
module.exports = {
 plugins: [
  "transform-remove-console"
 ]
}

// 生产环境如下配置

const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
 prodPlugins.push('transform-remove-console')
}
module.exports = {
 plugins: [
  ...prodPlugins
 ]
}
```

### **简单粗暴删除**

接下来这个可是一个骚操作，瞪大眼睛看好了，哈哈哈。直接重写`console.log`的方法。

```text
console.log = function () {};
```

### **灵活运用VScode编辑器**

![](https://pic4.zhimg.com/v2-9978c12eb32d6dd4d59357e8c250f38b_b.jpg)

![](https://zhuanlan.zhihu.com/p/data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='327' height='208'></svg>)

**使用**

直接全局搜索本项目里`console.log`正则匹配，然后全部替换为空即可。

```text
console\.log\(.*?\)
```

### **手写Loader删除console**

我们来写一个简易版的清除console插件。

新建一个`js`文件，我这里名为`clearConsole.js`，其实这里也是用正则去匹配然后替换为空。如果不懂`loader`则可看我这篇文章**[手写一个Sass-loader](https://mp.weixin.qq.com/s?__biz=Mzg5MTU3MDA1MA==&mid=2247486478&idx=1&sn=12c6832c1e5d6866fedd6b11d03fc6ad&chksm=cfca1ee3f8bd97f54c76ad8a03d2d2a78bedb14a2ba5dfc28cfc22a002b82a236cc67411f893&token=1266031560&lang=zh_CN#rd)**。

**clearConsole.js**

```text
const reg = /(console.log\()(.*)(\))/g;
module.exports = function(source) {
    source = source.replace(reg, "")
    return source;
}
```

在`Vue.config.js`配置

```text
module.exports = {
    // 省略...
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    loader: path.resolve(__dirname, "./clearConsole.js")
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: path.resolve(__dirname, "./clearConsole.js")
                }
            ],
        }
    },
}
```
