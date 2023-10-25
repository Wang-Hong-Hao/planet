## 使用chainWebpack配置TerserWebpackPlugin插件
### 安装插件版本要和webpack的版本匹配
```
npm install terser-webpack-plugin --save-dev
```

```
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config.optimization.minimizer([
            new TerserPlugin({
              terserOptions: {
                // 移除 console
                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                compress: {
                  warnings: false,
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log']
                }
              }
            })
          ])
        }
      )
  }
```
```
```