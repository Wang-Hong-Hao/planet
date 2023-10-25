## 导读

最终实现的效果是：在 vue 文件的 style 标签中以及其它 scss 文件中都可以直接使用全局配置的 scss 变量，不需要再导入对应的 scss 文件。

## 目录结构

```bash
src
│  App.vue
│  main.js
│
├─assets
│  └─styles
│          index.scss
│          variables.scss
```

## 配置

```js
// vue.config.js
module.exports = {
// ... other config
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/variables.scss";`,
      },
    },
  },
  // ... other config
}
```

## 使用

```css
// variables.scss 文件

//  主题色
$themeColor: #0dbc5c; // 一级主题色
$subThemeColor: #51ec97; // 二级主题色

// 字体
$fontColor: #d15656;

// 长度
$w200: 200px;
```

```js
<template>
  <!-- App.vue -->
  <div id="app">
    <h2>配置全局 scss 变量</h2>
    <div class="box1">哈哈哈</div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
.box1 {
  // 👇 直接使用 scss 变量
  width: $w200;
  height: $w200;
  padding: 10px;
  border-radius: 10px;
  background-color: $themeColor;
  color: $fontColor;
}
</style>
```≈