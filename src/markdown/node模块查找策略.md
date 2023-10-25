# Node模块查找策略

先附链接[Node模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)

- 当你使用

  - `import * as foo from 'foo'`，将会按如下顺序查找模块：

  - `./node_modules/foo`
  - `../node_modules/foo`
  - `../../node_modules/foo`
  - 直到系统的根目录

- 当你使用`import * as foo from 'something/foo'`，将会按照如下顺序查找内容

  - `./node_modules/something/foo`
  - `../node_modules/something/foo`
  - `../../node_modules/something/foo`
  - 直到系统的根目录

