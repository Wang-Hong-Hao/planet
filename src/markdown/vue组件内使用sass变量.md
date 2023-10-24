```
<style lang="scss" scoped>

@import "~@/styles/variables.scss";
.fixed-header {
  background-color: $documentBg;
  width: calc(100% - #{$sideBarWidth});
}


</style>
```
```
<template>
  <div :active-text-color="variables.menuActiveText"></div>
</template>
<script>
import variables from '@/styles/variables.scss'
</script>
```