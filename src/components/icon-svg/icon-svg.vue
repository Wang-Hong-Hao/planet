/** * Created by wanghonghao on 2023/03/08 */
<!-- Icon-svg -->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { computed } from 'vue'
// 声明 `props` 和 `return` 的数据类型
interface Data {
  [key: string]: unknown
}
export default {
  name: 'IconSvg',
  setup(props: Data) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    return { iconName }
  }

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
