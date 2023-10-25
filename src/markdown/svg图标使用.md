## 封装图标组件
icon-svg
```
/** * Created by wanghonghao on 2023/03/08 */
<!-- Icon-svg -->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'Icon-svg',
  props: {
    iconClass: {
      typeof: 'string',
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
  },
}
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

```
main.js
```
// 引入symbol图标js
import '@/assets/font/iconfont.js'
// 引入icon-svg组件
import IconSvg from '@/components/icon-svg/icon-svg.vue'
// 全局注册icon-svg
Vue.component('icon-svg',IconSvg)
```
页面使用
```
<icon-svg iconClass="edit_line"></icon-svg>
```